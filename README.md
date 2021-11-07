🌐 | [English](./README.md) / [中文](./README-ZHHANT.md)

# Trigger IFTTT Webhook Applet (GitHub Action Edition)

[`TriggerIFTTTWebhookApplet.GitHubAction`](https://github.com/hugoalh/trigger-ifttt-webhook-applet-ghaction)
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

| **Release** | **Latest** (![GitHub Latest Release Date](https://img.shields.io/github/release-date/hugoalh/trigger-ifttt-webhook-applet-ghaction?label=%20&style=flat-square)) | **Pre** (![GitHub Latest Pre-Release Date](https://img.shields.io/github/release-date-pre/hugoalh/trigger-ifttt-webhook-applet-ghaction?label=%20&style=flat-square)) |
|:-:|:-:|:-:|
| [**GitHub**](https://github.com/hugoalh/trigger-ifttt-webhook-applet-ghaction/releases) ![GitHub Total Downloads](https://img.shields.io/github/downloads/hugoalh/trigger-ifttt-webhook-applet-ghaction/total?label=%20&style=flat-square) | ![GitHub Latest Release Version](https://img.shields.io/github/release/hugoalh/trigger-ifttt-webhook-applet-ghaction?sort=semver&label=%20&style=flat-square) | ![GitHub Latest Pre-Release Version](https://img.shields.io/github/release/hugoalh/trigger-ifttt-webhook-applet-ghaction?include_prereleases&sort=semver&label=%20&style=flat-square) |

## 📝 Description

A GitHub Action to trigger IFTTT webhook applet.

*Previous named "\[GitHub Action\] Send To IFTTT".*

## 📚 Documentation

> **⚠ Important:** This documentation is v4.0.1 based. To view other tag's/version's documentation, visit the [tag/version list](https://github.com/hugoalh/trigger-ifttt-webhook-applet-ghaction/tags) and select the correct tag/version.

### 🎯 Entrypoint / Target

#### Default (`+default`)

> **⚠ Important:** This entrypoint is currently based to <u>Docker (`+docker`)</u>, base can be changed between versions without announcement to ensure the stability.

```yml
jobs:
  job_id:
    runs-on: # Depend on the base requirement, recommended "ubuntu-________"
    steps:
      - uses: "hugoalh/trigger-ifttt-webhook-applet-ghaction@<tag/version>"
```

##### Require Software

*Depend on the base requirement.*

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

> | **Legend** | **Description** |
> |:-:|:--|
> | 🔐 | Should be an encrypted secret. |

#### `eventname`

`<string>` Event name; Recommended to keep in lower case to prevent issue.

#### `key`

**🔐** `<string>` Key; Both long and short form are acceptable.

```
https://maker.ifttt.com/use/ifttt-webhook-key
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^  Long
                            ^^^^^^^^^^^^^^^^^  Short
```

#### `arbitrary`

**\[Optional\]** `<boolean = false>` Trigger with an arbitrary JSON payload.

#### `payload`

**\[Optional\]** `<object = {}>` JSON payload.

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
- **Standard (Input `arbitrary` is `false`):**
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

**\[Optional\]** `<boolean = false>` Dry run; For debug use.

### 📤 Output

*N/A*

### Example

```yml
jobs:
  job_id:
    name: "Trigger IFTTT Webhook Applet"
    runs-on: "ubuntu-latest"
    steps:
      - uses: "hugoalh/trigger-ifttt-webhook-applet-ghaction@v4.0.1"
        with:
          eventname: "greeting"
          key: "${{secrets.IFTTT_WEBHOOK_KEY}}"
          payload: |
            {
              "value1": "Hello, world!"
            }
```

### Guide

#### GitHub Actions

- [Enabling debug logging](https://docs.github.com/en/actions/managing-workflow-runs/enabling-debug-logging)
- [Encrypted secrets](https://docs.github.com/en/actions/reference/encrypted-secrets)

#### IFTTT

##### Obtain the webhook key

To obtain the webhook key, click "Menu" > "My Services" > "Webhooks" > "Settings", the key is at "Account Info" > "URL" (short form key is tailed after `https://maker.ifttt.com/use/`); To regenerate it, click "Edit".

<img src="https://i.imgur.com/ihnqN5B.png" width="384px"/>
