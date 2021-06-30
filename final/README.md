## sports-team-system

專題名稱：球隊系統

### 在 localhost 安裝及測試的詳細步驟

以下的操作都請在 `master` branch 進行。

#### 前端

```bash
cd frontend
yarn install
yarn start # start frontend
# local frontend url: localhost:3000/
```

#### 後端

```bash
cd backend
yarn install
yarn start # start server
# local server url: localhost:5000/
```

#### 功能


* 註冊
* 註冊後發認證信
* 登入/登出
* RWD（前端盡力達成 RWD 的目標）
* Conditional frontend routing（登入前後能 routing 到的是不一樣的東西）
* 畫面佈景主題切換功能（亮/暗主題）
* 練球以及活動的月曆
* 可以參加或退出練球活動，後端會寄信給帳號的信箱
* 比賽影片紀錄（建立與刪除）
* 帳號總覽頁面（首頁）
* 只要是建立或刪除的動作都有 subscribe
* 帳號設定（可以透過輸入管理員密碼升級帳號成管理員）
* 帳號分為兩種：管理員和一般球員
  * 一般球員的功能：
    * 建立練球活動
    * 參加、退出練球活動
    * 刪除自己建立的練球活動
    * 上傳影片紀錄
  * 管理員的權限：
    * 所有一般球員的功能
    * 刪除任何練球活動
    * 刪除任何影片紀錄
    * 刪除任何帳號


### 組員負責的項目

* B07902055 謝宗晅
  * 所有前端部份（`/frontend` 資料夾裡的所有東西）
* B07902022 張鈞堯
  * 所有後端部份（`/backend` 資料夾裡的所有東西）

### 臉書貼文內容

（以下內容和臉書貼文重複）


### [109-2] Web Programming Final

#### Group 61 球隊系統

Demo 影片連結：https://www.youtube.com/watch?v=e_myzCr7B3o

#### 內容

管理系隊練球活動的系統，也有記錄比賽影片相關資訊的功能，帳號分為一般的球員和管理員兩種，分別有不同的功能和權限。

Deploy 連結：不公開

#### 使用的框架
<< 前端 >>
```
material-ui // UI Library
apollo // GraphQL client
date-io // Date picking component
moment // Date formatting
yup // Form validation
react-hook-form // Form control
react-async-hook // For loading async contents
react-player // Embedding youtube video
react-calendar // Calendar component for displaying activities
react-cookie // Cookie management
react-router-dom // Frontend routing
```
有參考外部程式碼的部份都有在註解標示來源

<< 後端 >>

```
NodeJS
GraphQL-yoga // Querying database and subscription to changes
Mongoose // Connect to atabase
uuid // create unique link for verification
mailgen // Generate the format of the email
sendgrid // Send the mail
```

#### 專題製作心得

**資工三 謝宗晅 B07902055**

透過這次專題真的是接觸到不少新的東西。不管是前端 routing 也好，或是 UI Library 也好，都是以前沒有用過的東西。這次專題我幾乎是從無到有的摸索 Material UI 的用法，從一開始什麼 Container 都不知道怎麼用，到最後其實的還算順手，只要腦中有畫面就有辦法做出一個 prototype，真的進步蠻多的。不得不說寫前端真的很累人，因為面對的是使用者，所以要考慮很多有的沒的，特別是表單的地方，雖然在這次我只用到蠻粗淺的 validation schema，不過也是有種踏實感。最有趣的地方應該是使用 Material UI 的 Grid，以前完全不懂 breakpoint，寫出來的東西就只能在電腦上面看，用手機看的畫面都醜的可憐，但在了解 breakpoint 了之後，就可以達到 RWD 的目標，雖然在手機上面看還是稍微比較醜，不過已經比不會用的時候漂亮很多了。

**資工三 張鈞堯 B07902022**

之前在管理球隊的時候，就一直想要把一些FB社團做不到的功能實作出來，這次主要負責的是後端的部分，因為要儲存的東西還蠻多的，所以在建立schema的時候就要考慮許多東西。再來就是根據前端的需求，寫好對應的API讓他去呼叫，最後則是寄信的部分，在處理信件的外觀、格式上也花了不少時間。透過這次的專題，我們做出了一個能夠方便管理球隊的系統，也感謝我的隊友，讓我不用花心思在前端的UI上面。
