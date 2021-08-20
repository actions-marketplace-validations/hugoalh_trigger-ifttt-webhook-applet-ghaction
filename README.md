# Trigger IFTTT Webhook Applet (GitHub Action Edition)

[`TriggerIFTTTWebhookApplet.GitHubAction`](https://github.com/hugoalh/trigger-ifttt-webhook-applet-ghaction) - A GitHub action to trigger IFTTT webhook applet.

[![GitHub Contributors](https://img.shields.io/github/contributors/hugoalh/trigger-ifttt-webhook-applet-ghaction?label=Contributors&logo=github&logoColor=ffffff&style=flat-square)](https://github.com/hugoalh/trigger-ifttt-webhook-applet-ghaction/graphs/contributors)
[![GitHub Issues](https://img.shields.io/github/issues-raw/hugoalh/trigger-ifttt-webhook-applet-ghaction?label=Issues&logo=github&logoColor=ffffff&style=flat-square)](https://github.com/hugoalh/trigger-ifttt-webhook-applet-ghaction/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr-raw/hugoalh/trigger-ifttt-webhook-applet-ghaction?label=Pull%20Requests&logo=github&logoColor=ffffff&style=flat-square)](https://github.com/hugoalh/trigger-ifttt-webhook-applet-ghaction/pulls)
[![GitHub Discussions](https://img.shields.io/github/discussions/hugoalh/trigger-ifttt-webhook-applet-ghaction?label=Discussions&logo=github&logoColor=ffffff&style=flat-square)](https://github.com/hugoalh/trigger-ifttt-webhook-applet-ghaction/discussions)
[![GitHub Stars](https://img.shields.io/github/stars/hugoalh/trigger-ifttt-webhook-applet-ghaction?label=Stars&logo=github&logoColor=ffffff&style=flat-square)](https://github.com/hugoalh/trigger-ifttt-webhook-applet-ghaction/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/hugoalh/trigger-ifttt-webhook-applet-ghaction?label=Forks&logo=github&logoColor=ffffff&style=flat-square)](https://github.com/hugoalh/trigger-ifttt-webhook-applet-ghaction/network/members)
![GitHub Languages](https://img.shields.io/github/languages/count/hugoalh/trigger-ifttt-webhook-applet-ghaction?label=Languages&logo=github&logoColor=ffffff&style=flat-square)
[![CodeFactor Grade](https://img.shields.io/codefactor/grade/github/hugoalh/trigger-ifttt-webhook-applet-ghaction?label=Grade&logo=codefactor&logoColor=ffffff&style=flat-square)](https://www.codefactor.io/repository/github/hugoalh/trigger-ifttt-webhook-applet-ghaction)
[![LGTM Alerts](https://img.shields.io/lgtm/alerts/g/hugoalh/trigger-ifttt-webhook-applet-ghaction?label=Alerts&logo=lgtm&logoColor=ffffff&style=flat-square)
![LGTM Grade](https://img.shields.io/lgtm/grade/javascript/g/hugoalh/trigger-ifttt-webhook-applet-ghaction?label=Grade&logo=lgtm&logoColor=ffffff&style=flat-square)](https://lgtm.com/projects/g/hugoalh/trigger-ifttt-webhook-applet-ghaction)
[![License](https://img.shields.io/static/v1?label=License&message=MIT&color=brightgreen&style=flat-square)](./LICENSE.md)

| **Release** | **Latest** | **Pre** |
|:-:|:-:|:-:|
| [**GitHub**](https://github.com/hugoalh/trigger-ifttt-webhook-applet-ghaction/releases) ![GitHub Total Downloads](https://img.shields.io/github/downloads/hugoalh/trigger-ifttt-webhook-applet-ghaction/total?label=%20&style=flat-square) | ![GitHub Latest Release Version](https://img.shields.io/github/release/hugoalh/trigger-ifttt-webhook-applet-ghaction?sort=semver&label=%20&style=flat-square) (![GitHub Latest Release Date](https://img.shields.io/github/release-date/hugoalh/trigger-ifttt-webhook-applet-ghaction?label=%20&style=flat-square)) | ![GitHub Latest Pre-Release Version](https://img.shields.io/github/release/hugoalh/trigger-ifttt-webhook-applet-ghaction?include_prereleases&sort=semver&label=%20&style=flat-square) (![GitHub Latest Pre-Release Date](https://img.shields.io/github/release-date-pre/hugoalh/trigger-ifttt-webhook-applet-ghaction?label=%20&style=flat-square)) |

## 📝 Description

*Previous named "\[GitHub Action\] Send To IFTTT".*

### 🌟 Feature

- Simple setup.
- Support placeholder to create dynamic/rich content.

## 📚 Documentation

> **⚠ Important:** This documentation is v4.0.0 based. To visit other version's documentation, visit [this tag list](https://github.com/hugoalh/trigger-ifttt-webhook-applet-ghaction/tags) and select the correct version.

### 🎯 Target

> **🐛 Known Issue:** GitHub Action seems not working as expected currently when using NodeJS as entrypoint, thus Docker is now the default and only entrypoint until fixed.

<table>
  <tr>
    <td align="center"></td>
    <td align="center"><b>Docker (Default / <code>/use/docker</code>)</b></td>
    <td align="center"><b>NodeJS (<code>/use/nodejs</code>)</b></td>
  </tr>
  <tr>
    <td align="center"><b>Operating System</b></td>
    <td>Linux</td>
    <td><i>Any</i></td>
  </tr>
  <tr>
    <td align="center"><b>Software</b></td>
    <td>Docker</td>
    <td><ul>
      <li>NodeJS (>= v14.15.0)</li>
      <li>NPM (>= v6.14.8)</li>
    </ul></td>
  </tr>
</table>

### 📥 Input

> | **Legend** | **Description** |
> |:-:|:--|
> | 🔐 | Should be an encrypted secret. |
> | 🅿 | Support placeholder. |
>
> To use placeholder in the supported argument, follow the pattern:
>
> | **List** | **Via GitHub Action Runner** | **Via Replaceholder** |
> |:-:|:-:|:-:|
> | External | *N/A* | `"<Prefix>external<Namespace><Suffix>"` |
> | GitHub Event Webhook Payload | `"${{github.event.<Namespace>}}"` | `"<Prefix>payload<Namespace><Suffix>"` |

#### `webhook`

**🔐🅿 \[Optional\]** `<string>` IFTTT webhook address; Must be one of the listed format:
- **Full URL with standard payload:** `https://maker.ifttt.com/trigger/<EventName>/with/key/<Key>`
- **Full URL with custom payload:** `https://maker.ifttt.com/trigger/<EventName>/json/with/key/<Key>`

Do not define this argument if need a detail adjust; When this argument is defined, will ignore:
- `webhook_custompayload`
- `webhook_eventname`
- `webhook_key`

#### `webhook_custompayload`

**\[Optional\]** `<boolean = false>` Trigger with a standard payload (IFTTT default ingredient namespace `value1`, `value2`, and `value3`) or a custom payload.

#### `webhook_eventname`

**🅿 \[Optional\]** `<string>` IFTTT webhook event name; Recommended to keep in lower case to prevent issue (except using placeholder).

*This argument is required when argument `webhook` is not defined.*

#### `webhook_key`

**🔐 \[Optional\]** `<string>` IFTTT webhook key.

*This argument is required when argument `webhook` is not defined.*

#### `replaceholder_list_external`

**\[Optional\]** `<object = {}>` External list of the placeholder, can import from other action's output.

#### `replaceholder_prefix`

**\[Optional\]** `<string = "%">` Prefix of the placeholder.

#### `replaceholder_replaceundefined`

**\[Optional\]** `<(boolean | null | string) = false>` Replace undefined placeholder when placeholder is not in the list.
- **`false`:** Keep the placeholder.
- **`null`:** Remove the placeholder.
- **`true`:** Replace the placeholder with `"undefined"`.
- **Custom Text:** Replace the placeholder with custom text.
- **`"\\false"`:** Replace the placeholder with `"false"`.
- **`"\\null"`:** Replace the placeholder with `"null"`.
- **`"\\true"`:** Replace the placeholder with `"true"`.

#### `replaceholder_suffix`

**\[Optional\]** `<string = "%">` Suffix of the placeholder.

#### `replaceholder_typetransform`

**\[Optional\]** `<boolean = true>` Transform placeholder to the target value's type.

#### `value1`

**🅿 \[Optional\]** `<string>` IFTTT default ingredient namespace `value1`.

#### `value2`

**🅿 \[Optional\]** `<string>` IFTTT default ingredient namespace `value2`.

#### `value3`

**🅿 \[Optional\]** `<string>` IFTTT default ingredient namespace `value3`.

#### `payload`

**🅿 \[Optional\]** `<object = {}>` Custom payload.

#### `dryrun`

**\[Optional\]** `<boolean = false>` Dry run this action.

### 📤 Output

*N/A*

### Example

```yml
jobs:
  trigger-ifttt-webhoook-applet:
    name: "Trigger IFTTT Webhook Applet"
    runs-on: "ubuntu-latest"
    steps:
        uses: "hugoalh/trigger-ifttt-webhook-applet-ghaction@v4.0.0"
        with:
          # dryrun:
          webhook_eventname: "greeting"
          webhook_key: "${{secrets.IFTTT_WEBHOOK_KEY}}"
          # replaceholder_list_external:
          # replaceholder_prefix:
          # replaceholder_replaceundefined:
          # replaceholder_suffix:
          # replaceholder_typetransform:
          value1: "Hello, world!"
          # value2:
          # value3:
          # payload:
```

### Guide

#### GitHub

- [Webhook events and payloads](https://docs.github.com/en/developers/webhooks-and-events/webhooks/webhook-events-and-payloads)

#### GitHub Actions

- [Enabling debug logging](https://docs.github.com/en/actions/managing-workflow-runs/enabling-debug-logging)
- [Encrypted secrets](https://docs.github.com/en/actions/reference/encrypted-secrets)

#### IFTTT

##### Obtain the webhook key

To obtain the webhook key, click "Menu" > "My Services" > "Webhooks" > "Settings", the key is at "Account Info" > "URL" and after `https://maker.ifttt.com/use/`; To regenerate it, click "Edit".

<img src="https://i.imgur.com/ihnqN5B.png" width="256px"/>
