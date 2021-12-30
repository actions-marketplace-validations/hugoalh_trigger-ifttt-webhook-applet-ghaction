param (
	[Parameter()][boolean]$Arbitrary,
	[Parameter()][boolean]$DryRun,
	[Parameter(Mandatory = $true, Position = 0)][ValidatePattern('^[\da-zA-Z_-]+$')][string]$EventName,
	[Parameter(Mandatory = $true, Position = 1)][ValidatePattern('^(https:\/\/maker\.ifttt\.com\/use\/)?[\da-zA-Z_-]+$')][string]$Key,
	[Parameter(Mandatory = $true, Position = 2, ValueFromPipeline = $true)][ValidateNotNullOrEmpty()][string]$Payload
)
Import-Module -Name 'hugoalh.GitHubActionsToolkit' -Scope Local
[string]$GHActionUserAgent = 'TriggerIFTTTWebhookApplet.GitHubAction/4.1.0'
[string]$REIFTTTMakerURL = '^https:\/\/maker\.ifttt\.com\/use\/(?<Key>[\da-zA-Z_-]+)$'
if ($Key -cmatch $REIFTTTMakerURL) {
	$Key -creplace $REIFTTTMakerURL,'${Key}'
}
Add-GHActionsSecretMask -Value $Key
[string]$PayloadStringify = (ConvertFrom-Json -InputObject $Payload -Depth 100 | ConvertTo-Json -Compress -Depth 100)
if ($DryRun) {
	Write-Host -Object "Event Name: $EventName"
	Write-Host -Object "Payload Content: $PayloadStringify"
	[string]$PayloadFakeStringify = (ConvertFrom-Json -InputObject '{"body": "bar", "title": "foo", "userId": 1}' -Depth 100 | ConvertTo-Json -Compress -Depth 100)
	Write-Host -Object 'Post network request to test service.'
	[pscustomobject]$Response = Invoke-WebRequest -UseBasicParsing -Uri 'https://jsonplaceholder.typicode.com/posts' -UserAgent $GHActionUserAgent -MaximumRedirection 5 -Method Post -Body $PayloadFakeStringify -ContentType 'application/json; charset=utf-8'
	$Response.PSObject.Properties | ForEach-Object -Process {
		Enter-GHActionsLogGroup -Title $_.Name
		Write-Host -Object "$($_.Value | ConvertTo-Json -Compress -Depth 100)"
		Exit-GHActionsLogGroup
	}
} else {
	Write-GHActionsDebug -Message "Event Name: $EventName"
	Write-GHActionsDebug -Message "Payload Content: $PayloadStringify"
	Write-Host -Object 'Post network request to IFTTT.'
	[string]$WebRequestURL = "https://maker.ifttt.com/trigger/$EventName"
	if ($Arbitrary -eq $true) {
		$WebRequestURL += '/json'
	}
	$WebRequestURL += "/with/key/$Key"
	[pscustomobject]$Response = Invoke-WebRequest -UseBasicParsing -Uri $WebRequestURL -UserAgent $GHActionUserAgent -MaximumRedirection 5 -Method Post -Body $PayloadStringify -ContentType "application/json; charset=utf-8"
	$Response.PSObject.Properties | ForEach-Object {
		Enter-GHActionsLogGroup -Title $_.Name
		Write-GHActionsDebug -Message ($_.Value | ConvertTo-Json -Compress -Depth 100)
		Exit-GHActionsLogGroup
	}
}
