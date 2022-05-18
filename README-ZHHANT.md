🌐 | [English](./README.md) / [中文](./README-ZHHANT.md)

# 觸發IFTTT網絡鉤手小程式（GitHub Action）

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

*之前稱為「［GitHub Action］傳送至IFTTT」。*

## 📚 文檔

> <b>⚠ 重要：</b>此文檔基於v4.1.0；如果要查看其他標籤／版本的文檔，請瀏覽[標籤／版本列表](https://github.com/hugoalh/trigger-ifttt-webhook-applet-ghaction/tags)並選擇正確的標籤／版本。

### 🎯 進入點／目標

#### 預設 (`+default`)

> <b>⚠ 重要：</b>此進入點目前是基於<kbd>Docker (`+docker`)</kbd>，基底可能在沒有通知的情況下變更以確保正常運作。

```yml
jobs:
  job_id:
    runs-on: # 取決於基底要求，推薦"ubuntu-________"
    steps:
      - uses: "hugoalh/trigger-ifttt-webhook-applet-ghaction@<tag/version>"
```

##### 需要軟體

*取決於基底要求。*

#### Docker (`+docker`)

```yml
jobs:
  job_id:
    runs-on: "ubuntu-________"
    steps:
      - uses: "hugoalh/trigger-ifttt-webhook-applet-ghaction/use-docker@<tag/version>"
```

##### 需要軟體

- Docker

#### NodeJS (`+nodejs`)

> <b>⚠ 重要：</b>此進入點可能需要額外的步驟來手動設置NodeJS版本。

```yml
jobs:
  job_id:
    runs-on: *any*
    steps:
      - uses: "hugoalh/trigger-ifttt-webhook-applet-ghaction/use-nodejs@<tag/version>"
```

##### 需要軟體

- NodeJS (>= v14.15.0) + NPM (>= v6.14.8)

#### PowerShell (`+powershell`)

> <b>⚠ 重要：</b>此進入點適合進階用戶。

```yml
jobs:
  job_id:
    runs-on: *any*
    steps:
      - uses: "hugoalh/trigger-ifttt-webhook-applet-ghaction/use-powershell@<tag/version>"
```

##### 需要軟體

- PowerShell (>= v7.2.0)

### 📥 輸入

> | **圖解** | **說明** |
> |:-:|:--|
> | 🔐 | 應該是已加密的秘密。 |

#### `eventname`

`<字串>` 事件名稱；建議保持小寫以防止出現問題。

#### `key`

**🔐** `<字串>` 密鑰；長格式和短格式都可以接受。

```
https://maker.ifttt.com/use/ifttt-webhook-key
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^  長
                            ^^^^^^^^^^^^^^^^^  短
```

#### `arbitrary`

<b>［選擇性］</b>`<布爾值 = false>` 使用任意JSON負載觸發。

#### `payload`

<b>［選擇性］</b>`<物件 = {}>` JSON負載。

- **任意（輸入`arbitrary`是`true`）：**
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
- **標準（輸入`arbitrary`是`false`）：**
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

<b>（< v4.1.2）［選擇性］</b>`<布爾值 = false>` 試運行；供調試使用。

### 📤 輸出

*不適用*

### 例子

```yml
jobs:
  job_id:
    name: "Trigger IFTTT Webhook Applet"
    runs-on: "ubuntu-latest"
    steps:
      - uses: "hugoalh/trigger-ifttt-webhook-applet-ghaction@v4.1.0"
        with:
          eventname: "greeting"
          key: "${{secrets.IFTTT_WEBHOOKS_KEY}}"
          payload: |
            {
              "value1": "Hello, world!"
            }
```

### 指南

#### GitHub Actions

- [啟用調試日誌記錄（英文）](https://docs.github.com/en/actions/managing-workflow-runs/enabling-debug-logging)
- [已加密的秘密（英文）](https://docs.github.com/en/actions/reference/encrypted-secrets)

#### IFTTT

##### 獲取網絡鉤子密鑰

要獲取網絡鉤子密鑰，請點擊「Menu」 > 「My Services」 > 「Webhooks」 > 「Settings」，密鑰位於「Account Info」 > 「URL」（短格式密鑰在`https://maker.ifttt.com/use/`後面）；要重新生成它，請點擊"Edit"。

<img src="https://i.imgur.com/ihnqN5B.png" width="384px"/>
