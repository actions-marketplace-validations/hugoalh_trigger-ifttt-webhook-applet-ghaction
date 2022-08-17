#Requires -PSEdition Core
#Requires -Version 7.2
Param (
	[Parameter(Mandatory = $True, Position = 0)][ValidatePattern('^[\da-zA-Z_-]+$', ErrorMessage = '`{0}` is not a valid IFTTT webhook event name!')][String]$EventName,
	[Parameter(Mandatory = $True, Position = 1)][ValidatePattern('^(https:\/\/maker\.ifttt\.com\/use\/)?[\da-zA-Z_-]+$', ErrorMessage = 'Input `key` is not a valid IFTTT webhook key.')][String]$Key,
	[Parameter(Mandatory = $True, Position = 2)][String]$Payload,
	[Switch]$Arbitrary
)
Import-Module -Name 'hugoalh.GitHubActionsToolkit' -Scope 'Local'
[RegEx]$IftttMakerUriRegEx = '^https:\/\/maker\.ifttt\.com\/use\/(?<Key>[\da-zA-Z_-]+)$'
Enter-GitHubActionsLogGroup -Title 'Import inputs.'
Write-Host -Object "$($PSStyle.Bold)Event Name:$($PSStyle.BoldOff) $EventName"
If ($Key -imatch $IftttMakerUriRegEx) {
	$Key = $Key -ireplace $IftttMakerUriRegEx, '${Key}'
}
Add-GitHubActionsSecretMask -Value $Key
Try {
	[String]$PayloadStringify = ($Payload | ConvertFrom-Json -Depth 100 | ConvertTo-Json -Depth 100 -Compress)
} Catch {
	Write-GitHubActionsFail -Message "``$Payload`` is not a valid IFTTT webhook JSON payload!"
}
Write-Host -Object "$($PSStyle.Bold)Payload:$($PSStyle.BoldOff) $PayloadStringify"
Exit-GitHubActionsLogGroup
Enter-GitHubActionsLogGroup -Title 'Post network request to IFTTT.'
Invoke-WebRequest -Uri "https://maker.ifttt.com/trigger/$EventName$($Arbitrary ? '/json' : '')/with/key/$Key" -UseBasicParsing -UserAgent "PowerShell/$($PSVersionTable.PSVersion.ToString()) TriggerIFTTTWebhookApplet.GitHubAction/4.2.3" -MaximumRedirection 1 -MaximumRetryCount 5 -RetryIntervalSec 5 -Method 'Post' -Body $PayloadStringify -ContentType 'application/json; charset=utf-8' | Format-List -Property '*' | Out-String
Exit-GitHubActionsLogGroup
