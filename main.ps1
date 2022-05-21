param (
	[Parameter(Mandatory = $true, Position = 0)][ValidatePattern('^[\da-zA-Z_-]+$')][string]$EventName,
	[Parameter(Mandatory = $true, Position = 1)][ValidatePattern('^(https:\/\/maker\.ifttt\.com\/use\/)?[\da-zA-Z_-]+$')][string]$Key,
	[Parameter(Mandatory = $true, Position = 2)][string]$Payload,
	[switch]$Arbitrary
)
Import-Module -Name 'hugoalh.GitHubActionsToolkit' -Scope 'Local'
[string]$IFTTTMakerURLRegExp = '^https:\/\/maker\.ifttt\.com\/use\/(?<Key>[\da-zA-Z_-]+)$'
Enter-GitHubActionsLogGroup -Title 'Import inputs.'
if ($Key -match $IFTTTMakerURLRegExp) {
	$Key = $Key -replace $IFTTTMakerURLRegExp, '${Key}'
}
Add-GitHubActionsSecretMask -Value $Key
[string]$PayloadStringify = (ConvertFrom-Json -InputObject $Payload -Depth 100 | ConvertTo-Json -Depth 100 -Compress)
Write-Host -Object "Event Name: $EventName"
Write-Host -Object "Payload Content: $PayloadStringify"
Exit-GitHubActionsLogGroup
Enter-GitHubActionsLogGroup -Title 'Post network request to IFTTT.'
Invoke-WebRequest -Uri "https://maker.ifttt.com/trigger/$EventName$($Arbitrary ? '/json' : '')/with/key/$Key" -UseBasicParsing -UserAgent 'TriggerIFTTTWebhookApplet.GitHubAction/4.1.2' -MaximumRedirection 1 -MaximumRetryCount 3 -RetryIntervalSec 5 -Method 'Post' -Body $PayloadStringify -ContentType 'application/json; charset=utf-8'
Exit-GitHubActionsLogGroup
