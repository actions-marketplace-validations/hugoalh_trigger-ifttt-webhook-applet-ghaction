$ghactionUserAgent = "TriggerIFTTTWebhookApplet.GitHubAction/4.0.0"
function Import-GHActionInput {
	param (
		[string]$name
	)
	Write-Output -InputObject "::debug::Import input ``$name``."
	(Get-Item -Path "GITHUB_PATH:INPUT_$($name.ToUpper())").Value
}
Write-Output -InputObject "Import inputs."
$dryrun = [bool]::Parse((Import-GHActionInput -name "dryrun"))
$eventname = Import-GHActionInput -name "eventname"
if ($eventname.Length -eq 0) { throw "Input ``eventname`` must be type of string (non-nullable)!" }
$key = Import-GHActionInput -name "key"
if ($key.Length -eq 0) { throw "Input ``key`` must be type of string (non-nullable)!" }
$arbitrary = [bool]::Parse((Import-GHActionInput -name "arbitrary"))
$payload = (Import-GHActionInput -name "payload" | ConvertFrom-Json)
$payloadStringify = ConvertTo-Json -InputObject $payload -Compress
if ($dryrun -eq $true) {
	Write-Output -InputObject "Event Name: $eventname"
	Write-Output -InputObject "Payload Content: $payloadStringify"
	Write-Output -InputObject "Payload Length: $($payloadStringify.Length)"
	$payloadFakeStringify = "{`"body`": `"bar`",`"title`": `"foo`",`"userId`": 1}"
	Write-Output -InputObject "Post network request to test service."
	Invoke-WebRequest -UseBasicParsing -Uri "https://jsonplaceholder.typicode.com/posts" -UserAgent $ghactionUserAgent -Headers @{ "Content-Length" = $($payloadFakeStringify.Length) } -Method Post -Body $payloadFakeStringify -ContentType "application/json"
} else {
	Write-Output -InputObject "::debug::Event Name: $eventname"
	Write-Output -InputObject "::debug::Payload Content: $payloadStringify"
	Write-Output -InputObject "::debug::Payload Length: $($payloadStringify.Length)"
	Write-Output -InputObject "Post network request to IFTTT."
	$webRequestURL = "https://maker.ifttt.com/trigger/$eventname"
	if ($arbitrary -eq $true) {
		$webRequestURL += "/json"
	}
	$webRequestURL += "/with/key/$key"
	Invoke-WebRequest -UseBasicParsing -Uri $webRequestURL -UserAgent $ghactionUserAgent -Headers @{ "Content-Length" = $($payloadStringify.Length) } -Method Post -Body $payloadStringify -ContentType "application/json"
}
