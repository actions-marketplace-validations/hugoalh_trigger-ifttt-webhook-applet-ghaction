Param (
	[Parameter(Mandatory = $True, Position = 0)][ValidatePattern('^[\da-zA-Z_-]+$')][String]$EventName,
	[Parameter(Mandatory = $True, Position = 1)][ValidatePattern('^(https:\/\/maker\.ifttt\.com\/use\/)?[\da-zA-Z_-]+$')][String]$Key,
	[Parameter(Mandatory = $True, Position = 2)][String]$Payload,
	[Switch]$Arbitrary
)
Import-Module -Name 'hugoalh.GitHubActionsToolkit' -Scope 'Local'
[RegEx]$IFTTTMakerURLRegEx = '^https:\/\/maker\.ifttt\.com\/use\/(?<Key>[\da-zA-Z_-]+)$'
Enter-GitHubActionsLogGroup -Title 'Import inputs.'
If ($Key -imatch $IFTTTMakerURLRegEx) {
	$Key = $Key -ireplace $IFTTTMakerURLRegEx, '${Key}'
}
Add-GitHubActionsSecretMask -Value $Key
Try {
[String]$PayloadStringify = ($Payload | ConvertFrom-Json -Depth 100 | ConvertTo-Json -Depth 100 -Compress)
} Catch {
	Write-GitHubActionsFail -Message 'Input `Payload` is not a valid JSON payload!'
}
Write-Host -Object "$($PSStyle.Bold)Event Name:$($PSStyle.Reset) $EventName"
Write-Host -Object "$($PSStyle.Bold)Payload Content:$($PSStyle.Reset) $PayloadStringify"
Exit-GitHubActionsLogGroup
Enter-GitHubActionsLogGroup -Title 'Post network request to IFTTT.'
Invoke-WebRequest -Uri "https://maker.ifttt.com/trigger/$EventName$($Arbitrary ? '/json' : '')/with/key/$Key" -UseBasicParsing -UserAgent 'TriggerIFTTTWebhookApplet.GitHubAction/4.2.0' -MaximumRedirection 1 -MaximumRetryCount 5 -RetryIntervalSec 5 -Method 'Post' -Body $PayloadStringify -ContentType 'application/json; charset=utf-8' | Format-List -Property '*' | Out-String
Exit-GitHubActionsLogGroup
