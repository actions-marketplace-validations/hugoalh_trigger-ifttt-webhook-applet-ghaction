🌐 | [English](./README.md) / [中文](./README-ZHHANT.md)

---

# Trigger IFTTT Webhook Applet (GitHub Action)

[`TriggerIFTTTWebhookApplet.GitHubAction`](https://github.com/hugoalh/trigger-ifttt-webhook-applet-ghaction)
[![GitHub Contributors](https://img.shields.io/github/contributors/hugoalh/trigger-ifttt-webhook-applet-ghaction?label=Contributors&logo=github&logoColor=ffffff&style=flat-square)](https://github.com/hugoalh/trigger-ifttt-webhook-applet-ghaction/graphs/contributors)
[![GitHub Issues](https://img.shields.io/github/issues-raw/hugoalh/trigger-ifttt-webhook-applet-ghaction?label=Issues&logo=github&logoColor=ffffff&style=flat-square)](https://github.com/hugoalh/trigger-ifttt-webhook-applet-ghaction/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr-raw/hugoalh/trigger-ifttt-webhook-applet-ghaction?label=Pull%20Requests&logo=github&logoColor=ffffff&style=flat-square)](https://github.com/hugoalh/trigger-ifttt-webhook-applet-ghaction/pulls)
[![GitHub Discussions](https://img.shields.io/github/discussions/hugoalh/trigger-ifttt-webhook-applet-ghaction?label=Discussions&logo=github&logoColor=ffffff&style=flat-square)](https://github.com/hugoalh/trigger-ifttt-webhook-applet-ghaction/discussions)
[![GitHub Stars](https://img.shields.io/github/stars/hugoalh/trigger-ifttt-webhook-applet-ghaction?label=Stars&logo=github&logoColor=ffffff&style=flat-square)](https://github.com/hugoalh/trigger-ifttt-webhook-applet-ghaction/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/hugoalh/trigger-ifttt-webhook-applet-ghaction?label=Forks&logo=github&logoColor=ffffff&style=flat-square)](https://github.com/hugoalh/trigger-ifttt-webhook-applet-ghaction/network/members)
![GitHub Languages](https://img.shields.io/github/languages/count/hugoalh/trigger-ifttt-webhook-applet-ghaction?label=Languages&logo=github&logoColor=ffffff&style=flat-square)
[![CodeFactor Grade](https://img.shields.io/codefactor/grade/github/hugoalh/trigger-ifttt-webhook-applet-ghaction?label=Grade&logo=codefactor&logoColor=ffffff&style=flat-square)](https://www.codefactor.io/repository/github/hugoalh/trigger-ifttt-webhook-applet-ghaction)
[![License](https://img.shields.io/static/v1?label=License&message=MIT&style=flat-square)](./LICENSE.md)

| **Release** | **Latest** (![GitHub Latest Release Date](https://img.shields.io/github/release-date/hugoalh/trigger-ifttt-webhook-applet-ghaction?label=%20&style=flat-square)) | **Pre** (![GitHub Latest Pre-Release Date](https://img.shields.io/github/release-date-pre/hugoalh/trigger-ifttt-webhook-applet-ghaction?label=%20&style=flat-square)) |
|:-:|:-:|:-:|
| [**GitHub**](https://github.com/hugoalh/trigger-ifttt-webhook-applet-ghaction/releases) ![GitHub Total Downloads](https://img.shields.io/github/downloads/hugoalh/trigger-ifttt-webhook-applet-ghaction/total?label=%20&style=flat-square) | ![GitHub Latest Release Version](https://img.shields.io/github/release/hugoalh/trigger-ifttt-webhook-applet-ghaction?sort=semver&label=%20&style=flat-square) | ![GitHub Latest Pre-Release Version](https://img.shields.io/github/release/hugoalh/trigger-ifttt-webhook-applet-ghaction?include_prereleases&sort=semver&label=%20&style=flat-square) |

## 📝 Description

A GitHub Action to trigger IFTTT webhook applet.

*Previous named "\[GitHub Action\] Send To IFTTT".*

## 📚 Documentation

> **⚠ Important:** This documentation is v4.2.0 based; To view other tag's/version's documentation, please visit the [tag/version list](https://github.com/hugoalh/trigger-ifttt-webhook-applet-ghaction/tags) and select the correct tag/version.

### 🎯 Entrypoint / Target

```yml
jobs:
  job_id:
    runs-on: "________"
    steps:
      - uses: "hugoalh/trigger-ifttt-webhook-applet-ghaction________@<tag/version>"
```

|  | **`jobs.job_id.runs-on`** | **`jobs.job_id.steps[*].uses`** | **Require Software** |
|:-:|:-:|:-:|:-:|
| **Default (`+default`)** | `ubuntu-________` | *None* | Docker |
| **Docker (`+docker`)** | `ubuntu-________` | `/use-docker` | Docker |
| **NodeJS (`+nodejs`)** | Any | `/use-nodejs` | NodeJS (>= v14.15.0) + NPM (>= v6.14.8) |
| **PowerShell (`+powershell`)** | Any | `/use-powershell` | PowerShell (>= v7.2.0) |

> **⚠ Important:**
>
> - Default entrypoint is currently based to Docker (`+docker`), base can be changed between versions without announcement to ensure the stability.
> - NodeJS entrypoint maybe need extra steps to manually setup NodeJS version.
> - PowerShell entrypoint is suitable for advanced user.

### 📥 Input

> | **Legend** | **Description** |
> |:-:|:--|
> | 🔐 | Should be an encrypted secret. |

#### `eventname`

`<string>` Event name; Recommended to keep in lower case to prevent issue.

#### `key`

**🔐** `<string>` Key; Both long and short forms are acceptable.

```
https://maker.ifttt.com/use/ifttt-webhook-key
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^  Long
                            ^^^^^^^^^^^^^^^^^  Short
```

#### `arbitrary`

**\[Optional\]** `<boolean = false>` Trigger with an arbitrary payload.

#### `payload`

**\[Optional\]** `<object>` JSON/YAML/YML payload.

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

> **⚠ Important:** PowerShell entrypoint only accept JSON payload.

### 📤 Output

*N/A*

### Example

```yml
jobs:
  job_id:
    name: "Trigger IFTTT Webhook Applet"
    runs-on: "ubuntu-latest"
    steps:
      - uses: "hugoalh/trigger-ifttt-webhook-applet-ghaction@v4.2.0"
        with:
          eventname: "greeting"
          key: "${{secrets.IFTTT_WEBHOOKS_KEY}}"
          payload: |
            value1: "Hello, world!"
```

### Guide

#### GitHub Actions

- [Enabling debug logging](https://docs.github.com/en/actions/managing-workflow-runs/enabling-debug-logging)
- [Encrypted secrets](https://docs.github.com/en/actions/reference/encrypted-secrets)

#### IFTTT

##### Obtain the webhook key

To obtain the webhook key, click "Menu" > "My Services" > "Webhooks" > "Settings", the key is at "Account Info" > "URL" (short form key is behind `https://maker.ifttt.com/use/`); To regenerate it, click "Edit".

<img src="https://i.imgur.com/ihnqN5B.png" width="384px"/>
