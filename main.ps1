param (
	[Parameter()][boolean]$arbitrary,
	[Parameter()][boolean]$dryRun,
	[Parameter(Mandatory = $true, Position = 0)][ValidatePattern("^[\da-zA-Z_-]+$")][string]$eventName,
	[Parameter(Mandatory = $true, Position = 1)][ValidatePattern("^(https:\/\/maker\.ifttt\.com\/use\/)?[\da-zA-Z_-]+$")][string]$key,
	[Parameter(Mandatory = $true, Position = 2, ValueFromPipeline = $true)][ValidateNotNullOrEmpty()][string]$payload
)
$ghactionUserAgent = "TriggerIFTTTWebhookApplet.GitHubAction/4.0.3"
$reIFTTTMakerURL = "^https:\/\/maker\.ifttt\.com\/use\/(?<key>[\da-zA-Z_-]+)$"
if ($key -cmatch $reIFTTTMakerURL) {
	$key -creplace $reIFTTTMakerURL,'${key}'
}
Write-Output -InputObject "::add-mask::$key"
$payloadStringify = (ConvertFrom-Json -InputObject $payload -Depth 100 | ConvertTo-Json -Depth 100 -Compress)
if ($dryRun -eq $true) {
	Write-Output -InputObject "Event Name: $eventName"
	Write-Output -InputObject "Payload Content: $payloadStringify"
	$payloadFakeStringify = (ConvertFrom-Json -InputObject '{"body": "bar", "title": "foo", "userId": 1}' -Depth 100 | ConvertTo-Json -Depth 100 -Compress)
	Write-Output -InputObject "Post network request to test service."
	$response = Invoke-WebRequest -UseBasicParsing -Uri "https://jsonplaceholder.typicode.com/posts" -UserAgent $ghactionUserAgent -MaximumRedirection 5 -Method Post -Body $payloadFakeStringify -ContentType "application/json; charset=utf-8"
	$response.PSObject.Properties | ForEach-Object {
		Write-Output -InputObject "::group::$($_.Name)"
		Write-Output -InputObject "$($_.Value | ConvertTo-Json -Depth 100 -Compress)"
		Write-Output -InputObject "::endgroup::"
	}
} else {
	Write-Output -InputObject "::debug::Event Name: $eventName"
	Write-Output -InputObject "::debug::Payload Content: $payloadStringify"
	Write-Output -InputObject "Post network request to IFTTT."
	$webRequestURL = "https://maker.ifttt.com/trigger/$eventname"
	if ($arbitrary -eq $true) {
		$webRequestURL += "/json"
	}
	$webRequestURL += "/with/key/$key"
	$response = Invoke-WebRequest -UseBasicParsing -Uri $webRequestURL -UserAgent $ghactionUserAgent -MaximumRedirection 5 -Method Post -Body $payloadStringify -ContentType "application/json; charset=utf-8"
	$response.PSObject.Properties | ForEach-Object {
		Write-Output -InputObject "::group::$($_.Name)"
		Write-Output -InputObject "::debug::$($_.Value | ConvertTo-Json -Depth 100 -Compress)"
		Write-Output -InputObject "::endgroup::"
	}
}
