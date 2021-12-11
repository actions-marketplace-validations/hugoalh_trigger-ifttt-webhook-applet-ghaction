param (
	[Parameter()][boolean]$Arbitrary,
	[Parameter()][boolean]$DryRun,
	[Parameter(Mandatory = $true, Position = 0)][ValidatePattern("^[\da-zA-Z_-]+$")][string]$EventName,
	[Parameter(Mandatory = $true, Position = 1)][ValidatePattern("^(https:\/\/maker\.ifttt\.com\/use\/)?[\da-zA-Z_-]+$")][string]$Key,
	[Parameter(Mandatory = $true, Position = 2, ValueFromPipeline = $true)][ValidateNotNullOrEmpty()][string]$Payload
)
$GHActionUserAgent = "TriggerIFTTTWebhookApplet.GitHubAction/4.1.0"
$REIFTTTMakerURL = "^https:\/\/maker\.ifttt\.com\/use\/(?<Key>[\da-zA-Z_-]+)$"
if ($Key -cmatch $REIFTTTMakerURL) {
	$Key -creplace $REIFTTTMakerURL,'${Key}'
}
Write-Output -InputObject "::add-mask::$Key"
$PayloadStringify = (ConvertFrom-Json -InputObject $Payload -Depth 100 | ConvertTo-Json -Depth 100 -Compress)
if ($DryRun -eq $true) {
	Write-Output -InputObject "Event Name: $EventName"
	Write-Output -InputObject "Payload Content: $PayloadStringify"
	$PayloadFakeStringify = (ConvertFrom-Json -InputObject '{"body": "bar", "title": "foo", "userId": 1}' -Depth 100 | ConvertTo-Json -Depth 100 -Compress)
	Write-Output -InputObject "Post network request to test service."
	$Response = Invoke-WebRequest -UseBasicParsing -Uri "https://jsonplaceholder.typicode.com/posts" -UserAgent $GHActionUserAgent -MaximumRedirection 5 -Method Post -Body $PayloadFakeStringify -ContentType "application/json; charset=utf-8"
	$Response.PSObject.Properties | ForEach-Object {
		Write-Output -InputObject "::group::$($_.Name)"
		Write-Output -InputObject "$($_.Value | ConvertTo-Json -Depth 100 -Compress)"
		Write-Output -InputObject "::endgroup::"
	}
} else {
	Write-Output -InputObject "::debug::Event Name: $EventName"
	Write-Output -InputObject "::debug::Payload Content: $PayloadStringify"
	Write-Output -InputObject "Post network request to IFTTT."
	$WebRequestURL = "https://maker.ifttt.com/trigger/$EventName"
	if ($Arbitrary -eq $true) {
		$WebRequestURL += "/json"
	}
	$WebRequestURL += "/with/key/$Key"
	$Response = Invoke-WebRequest -UseBasicParsing -Uri $WebRequestURL -UserAgent $GHActionUserAgent -MaximumRedirection 5 -Method Post -Body $PayloadStringify -ContentType "application/json; charset=utf-8"
	$Response.PSObject.Properties | ForEach-Object {
		Write-Output -InputObject "::group::$($_.Name)"
		Write-Output -InputObject "::debug::$($_.Value | ConvertTo-Json -Depth 100 -Compress)"
		Write-Output -InputObject "::endgroup::"
	}
}
