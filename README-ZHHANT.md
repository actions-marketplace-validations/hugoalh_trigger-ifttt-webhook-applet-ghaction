🌐 | [English](./README.md) / [中文](./README-ZHHANT.md)

# 觸發IFTTT網絡鉤手小程式（GitHub Action版本）

[`TriggerIFTTTWebhookApplet.GitHubAction`](https://github.com/hugoalh/trigger-ifttt-webhook-applet-ghaction)
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

| **發佈** | **最新**（![GitHub最新發佈日期](https://img.shields.io/github/release-date/hugoalh/trigger-ifttt-webhook-applet-ghaction?label=%20&style=flat-square)） | **預覽**（![GitHub最新預覽日期](https://img.shields.io/github/release-date-pre/hugoalh/trigger-ifttt-webhook-applet-ghaction?label=%20&style=flat-square)） |
|:-:|:-:|:-:|
| [**GitHub**](https://github.com/hugoalh/trigger-ifttt-webhook-applet-ghaction/releases) ![GitHub總下載](https://img.shields.io/github/downloads/hugoalh/trigger-ifttt-webhook-applet-ghaction/total?label=%20&style=flat-square) | ![GitHub最新發佈版本](https://img.shields.io/github/release/hugoalh/trigger-ifttt-webhook-applet-ghaction?sort=semver&label=%20&style=flat-square) | ![GitHub最新預覽版本](https://img.shields.io/github/release/hugoalh/trigger-ifttt-webhook-applet-ghaction?include_prereleases&sort=semver&label=%20&style=flat-square) |

## 📝 說明

用於觸發IFTTT網絡鉤手小程式的GitHub Action。

*Previous named "\[GitHub Action\] Send To IFTTT".*

## 📚 文檔

> **⚠ Important:** This documentation is v4.0.0-beta.5 based. To view other tag's/version's documentation, visit the [tag/version list](https://github.com/hugoalh/trigger-ifttt-webhook-applet-ghaction/tags) and select the correct tag/version.

### 🎯 進入點／目標

#### Default (`+default`)

> **⚠ Important:** This entrypoint is currently based to <u>Docker (`+docker`)</u>, base can be changed between versions without announcement to ensure the stability.

```yml
jobs:
  job_id:
    runs-on: # Depend on the base requirement, recommended "ubuntu-________"
    steps:
      - uses: "hugoalh/trigger-ifttt-webhook-applet-ghaction@<tag/version>"
```

#### Docker (`+docker`)

```yml
jobs:
  job_id:
    runs-on: "ubuntu-________"
    steps:
      - uses: "hugoalh/trigger-ifttt-webhook-applet-ghaction/use-docker@<tag/version>"
```

##### Require Software

- Docker

#### NodeJS (`+nodejs`)

> **⚠ Important:** This entrypoint maybe need extra steps to manually setup NodeJS version.

```yml
jobs:
  job_id:
    runs-on: *any*
    steps:
      - uses: "hugoalh/trigger-ifttt-webhook-applet-ghaction/use-nodejs@<tag/version>"
```

##### Require Software

- NodeJS (>= v14.15.0) + NPM (>= v6.14.8)

#### PowerShell (`+powershell`)

> **🧪 Experimental:** This entrypoint is in testing.

> **⚠ Important:** This entrypoint is suitable for advanced user.

```yml
jobs:
  job_id:
    runs-on: *any*
    steps:
      - uses: "hugoalh/trigger-ifttt-webhook-applet-ghaction/use-powershell@<tag/version>"
```

##### Require Software

- PowerShell (>= v7.1.0)

### 📥 Input

> | **圖解** | **說明** |
> |:-:|:--|
> | 🔐 | Should be an encrypted secret. |

#### `eventname`

`<string>` Event name; Recommended to keep in lower case to prevent issue.

#### `key`

**🔐** `<string>` Key.

#### `arbitrary`

<b>［選擇性］</b>`<boolean = false>` Trigger with an arbitrary JSON payload.

#### `payload`

<b>［選擇性］</b>`<object = {}>` JSON payload.

- **Arbitrary (Input `arbitrary` is `true`):**
  ```yml
  jobs:
    job_id:
      steps:
        - with:
            payload: |
              {
                "this": [
                  {
                    "is": {
                      "some": [
                        "test",
                        "data"
                      ]
                    }
                  }
                ]
              }
  ```
- **Standard (Not Arbitrary)(Input `arbitrary` is `false`):**
  ```yml
  jobs:
    job_id:
      steps:
        - with:
            payload: |
              {
                "value1": "Hello",
                "value2": "World",
                "value3": "this is some test data"
              }
  ```

#### `dryrun`

<b>［選擇性］</b>`<boolean = false>` Dry run; For debug use.

### 📤 Output

*不適用*

### 例子

```yml
jobs:
  job_id:
    name: "Trigger IFTTT Webhook Applet"
    runs-on: "ubuntu-latest"
    steps:
      - uses: "hugoalh/trigger-ifttt-webhook-applet-ghaction@v4.0.0"
        with:
          eventname: "greeting"
          key: "${{secrets.IFTTT_WEBHOOK_KEY}}"
          payload: |
            {
              "value1": "Hello, world!"
            }
```

### 指南

#### GitHub Actions

- [Enabling debug logging](https://docs.github.com/en/actions/managing-workflow-runs/enabling-debug-logging)
- [Encrypted secrets](https://docs.github.com/en/actions/reference/encrypted-secrets)

#### IFTTT

##### Obtain the webhook key

To obtain the webhook key, click "Menu" > "My Services" > "Webhooks" > "Settings", the key is at "Account Info" > "URL" and after `https://maker.ifttt.com/use/`; To regenerate it, click "Edit".

<img src="https://i.imgur.com/ihnqN5B.png" width="384px"/>
