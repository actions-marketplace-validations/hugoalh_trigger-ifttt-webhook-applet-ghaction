🌐 | [English](./README.md) / [中文](./README-ZHHANT.md)

# 觸發IFTTT網絡鉤手小程式（GitHub Action版本）

[`TriggerIFTTTWebhookApplet.GitHubAction`](https://github.com/hugoalh/trigger-ifttt-webhook-applet-ghaction)—用於觸發IFTTT網絡鉤手小程式的GitHub Action。

[![GitHub貢獻者](https://img.shields.io/github/contributors/hugoalh/trigger-ifttt-webhook-applet-ghaction?label=%E8%B2%A2%E7%8D%BB%E8%80%85&logo=github&logoColor=ffffff&style=flat-square)](https://github.com/hugoalh/trigger-ifttt-webhook-applet-ghaction/graphs/contributors)
[![GitHub議題](https://img.shields.io/github/issues-raw/hugoalh/trigger-ifttt-webhook-applet-ghaction?label=%E8%AD%B0%E9%A1%8C&logo=github&logoColor=ffffff&style=flat-square)](https://github.com/hugoalh/trigger-ifttt-webhook-applet-ghaction/issues)
[![GitHub拉取請求](https://img.shields.io/github/issues-pr-raw/hugoalh/trigger-ifttt-webhook-applet-ghaction?label=%E6%8B%89%E5%8F%96%E8%AB%8B%E6%B1%82&logo=github&logoColor=ffffff&style=flat-square)](https://github.com/hugoalh/trigger-ifttt-webhook-applet-ghaction/pulls)
[![GitHub討論](https://img.shields.io/github/discussions/hugoalh/trigger-ifttt-webhook-applet-ghaction?label=%E8%A8%8E%E8%AB%96&logo=github&logoColor=ffffff&style=flat-square)](https://github.com/hugoalh/trigger-ifttt-webhook-applet-ghaction/discussions)
[![GitHub星](https://img.shields.io/github/stars/hugoalh/trigger-ifttt-webhook-applet-ghaction?label=%E6%98%9F&logo=github&logoColor=ffffff&style=flat-square)](https://github.com/hugoalh/trigger-ifttt-webhook-applet-ghaction/stargazers)
[![GitHub分支](https://img.shields.io/github/forks/hugoalh/trigger-ifttt-webhook-applet-ghaction?label=%E5%88%86%E6%94%AF&logo=github&logoColor=ffffff&style=flat-square)](https://github.com/hugoalh/trigger-ifttt-webhook-applet-ghaction/network/members)
![GitHub語言](https://img.shields.io/github/languages/count/hugoalh/trigger-ifttt-webhook-applet-ghaction?label=%E8%AA%9E%E8%A8%80&logo=github&logoColor=ffffff&style=flat-square)
[![CodeFactor評等](https://img.shields.io/codefactor/grade/github/hugoalh/trigger-ifttt-webhook-applet-ghaction?label=%E8%A9%95%E7%AD%89&logo=codefactor&logoColor=ffffff&style=flat-square)](https://www.codefactor.io/repository/github/hugoalh/trigger-ifttt-webhook-applet-ghaction)
[![LGTM警報](https://img.shields.io/lgtm/alerts/g/hugoalh/trigger-ifttt-webhook-applet-ghaction?label=%E8%AD%A6%E5%A0%B1&logo=lgtm&logoColor=ffffff&style=flat-square)
![LGTM評等](https://img.shields.io/lgtm/grade/javascript/g/hugoalh/trigger-ifttt-webhook-applet-ghaction?label=%E8%A9%95%E7%AD%89&logo=lgtm&logoColor=ffffff&style=flat-square)](https://lgtm.com/projects/g/hugoalh/trigger-ifttt-webhook-applet-ghaction)
[![授權條款](https://img.shields.io/static/v1?label=%E6%8E%88%E6%AC%8A%E6%A2%9D%E6%AC%BE&message=MIT&color=brightgreen&style=flat-square)](./LICENSE-ZHHANT.md)

| **發佈** | **最新** | **預覽** |
|:-:|:-:|:-:|
| [**GitHub**](https://github.com/hugoalh/trigger-ifttt-webhook-applet-ghaction/releases) ![GitHub總下載](https://img.shields.io/github/downloads/hugoalh/trigger-ifttt-webhook-applet-ghaction/total?label=%20&style=flat-square) | ![GitHub最新發佈版本](https://img.shields.io/github/release/hugoalh/trigger-ifttt-webhook-applet-ghaction?sort=semver&label=%20&style=flat-square) (![GitHub最新發佈日期](https://img.shields.io/github/release-date/hugoalh/trigger-ifttt-webhook-applet-ghaction?label=%20&style=flat-square)) | ![GitHub最新預覽版本](https://img.shields.io/github/release/hugoalh/trigger-ifttt-webhook-applet-ghaction?include_prereleases&sort=semver&label=%20&style=flat-square) (![GitHub最新預覽日期](https://img.shields.io/github/release-date-pre/hugoalh/trigger-ifttt-webhook-applet-ghaction?label=%20&style=flat-square)) |

## 📝 說明

*Previous named "\[GitHub Action\] Send To IFTTT".*

### 🌟 特色

- Simple setup.
- Support placeholder to create dynamic/rich content.

## 📚 文檔

> **⚠ 重要：** This documentation is v4.0.0 based. To visit other version's documentation, visit [this tag list](https://github.com/hugoalh/trigger-ifttt-webhook-applet-ghaction/tags) and select the correct version.

### 🎯 進入點／目標

<table>
  <tr>
    <td></td>
    <td align="center"><b>作業系統</b></td>
    <td align="center"><b>軟體</b></td>
    <td align="center"><b>平均執行時間（秒）</b></td>
  </tr>
  <tr>
    <td align="center"><b>Docker（預設／<code>/use/docker</code>）</b></td>
    <td>Linux</td>
    <td>Docker</td>
    <td align="center">30～45</td>
  </tr>
  <tr>
    <td align="center"><b>NodeJS（<code>/use/nodejs</code>）</b></td>
    <td><i>任何</i></td>
    <td>NodeJS（>= v14.15.0） + NPM（>= v6.14.8）</td>
    <td align="center">5～8</td>
  </tr>
</table>

> **⚠ 重要：** In order to use NodeJS as entrypoint, please ensure the software(s) is already meeted the requirement; Add an extra step before this step with [`actions/setup-node`](https://github.com/actions/setup-node) is recommended.

### 📥 Input

> | **圖解** | **說明** |
> |:-:|:--|
> | 🔐 | Should be an encrypted secret. |
> | 🅿 | Support placeholder. |
>
> To use placeholder in the supported argument, follow the pattern:
>
> | **List** | **Via GitHub Action Runner** | **Via Replaceholder** |
> |:-:|:-:|:-:|
> | External | *不適用* | `"<Prefix>external<Namespace><Suffix>"` |
> | GitHub Event Webhook Payload | `"${{github.event.<Namespace>}}"` | `"<Prefix>payload<Namespace><Suffix>"` |

#### `webhook_eventname`

**🅿** `<string>` IFTTT webhook event name; Recommended to keep in lower case to prevent issue.

#### `webhook_key`

**🔐** `<string>` IFTTT webhook key.

#### `webhook_custompayload`

**［選擇性］** `<boolean = false>` Trigger the webhook applet with a standard payload (IFTTT default ingredient namespace `value1`, `value2`, and `value3`) or a custom payload.

When this argument's value is `"false"`, will ignore:
- `payload`

When this argument's value is `"true"`, will ignore:
- `value1`
- `value2`
- `value3`

#### `replaceholder_list_external`

**［選擇性］** `<(object | string)>` External list of the placeholder.
- **Externally:** A relative JSON (`.json`), JSONC (`.jsonc`), or YAML/YML (`.yaml`/`.yml`) file path which in the same repository, file size must be smaller than 1 MB (restricted by GitHub).
- **Locally:** A JSON, JSONC, or YAML/YML.

#### `replaceholder_prefix`

**［選擇性］** `<string = "%">` Prefix of the placeholder.

#### `replaceholder_replaceundefined`

**［選擇性］** `<(boolean | null | string) = false>` Replace undefined placeholder when placeholder is not in the list.
- **`false`:** Keep the placeholder.
- **`null`:** Remove the placeholder.
- **`true`:** Replace the placeholder with `"undefined"`.
- **Custom Text:** Replace the placeholder with custom text.
- **`"\\false"`:** Replace the placeholder with `"false"`.
- **`"\\null"`:** Replace the placeholder with `"null"`.
- **`"\\true"`:** Replace the placeholder with `"true"`.

#### `replaceholder_suffix`

**［選擇性］** `<string = "%">` Suffix of the placeholder.

#### `replaceholder_typetransform`

**［選擇性］** `<boolean = true>` Transform placeholder to the target value's type.

#### `value1`

**🅿 ［選擇性］** `<string>` IFTTT default ingredient namespace `value1`.

#### `value2`

**🅿 ［選擇性］** `<string>` IFTTT default ingredient namespace `value2`.

#### `value3`

**🅿 ［選擇性］** `<string>` IFTTT default ingredient namespace `value3`.

#### `payload`

**🅿 ［選擇性］** `<(object | string)>` Custom payload.
- **Externally:** A relative JSON (`.json`), JSONC (`.jsonc`), or YAML/YML (`.yaml`/`.yml`) file path which in the same repository, file size must be smaller than 1 MB (restricted by GitHub).
- **Locally:** A JSON, JSONC, or YAML/YML.

#### `githubtoken`

**🔐 ［選擇性］** `<string = "${{github.token}}">` GitHub personal access token; Use for fetch external file(s).

#### `dryrun`

**［選擇性］** `<boolean = false>` Dry run this action.

### 📤 Output

*不適用*

### 例子

```yml
jobs:
  trigger-ifttt-webhoook-applet:
    name: "Trigger IFTTT Webhook Applet"
    runs-on: "ubuntu-latest"
    steps:
        uses: "hugoalh/trigger-ifttt-webhook-applet-ghaction@v4.0.0"
        with:
          webhook_eventname: "greeting"
          webhook_key: "${{secrets.IFTTT_WEBHOOK_KEY}}"
          # webhook_custompayload:
          # replaceholder_list_external:
          # replaceholder_prefix:
          # replaceholder_replaceundefined:
          # replaceholder_suffix:
          # replaceholder_typetransform:
          value1: "Hello, world!"
          # value2:
          # value3:
          # payload:
          # githubtoken:
          # dryrun:
```

### 指南

#### GitHub

- [Webhook events and payloads](https://docs.github.com/en/developers/webhooks-and-events/webhooks/webhook-events-and-payloads)

#### GitHub Actions

- [Enabling debug logging](https://docs.github.com/en/actions/managing-workflow-runs/enabling-debug-logging)
- [Encrypted secrets](https://docs.github.com/en/actions/reference/encrypted-secrets)

#### IFTTT

##### Obtain the webhook key

To obtain the webhook key, click "Menu" > "My Services" > "Webhooks" > "Settings", the key is at "Account Info" > "URL" and after `https://maker.ifttt.com/use/`; To regenerate it, click "Edit".

<img src="https://i.imgur.com/ihnqN5B.png" width="256px"/>
