# 勉強会趣旨
## 目的

- 参加者でワイワイプログラミングする。
- 参加者間のコミュニケーションを促進する。
- (できれば)TDD、アプリケーションの設計を意識した実装。

## 日時

- 毎週火曜日 17:00~18:00

## 対象者
- モブプロに興味がある人
- オブジェクト指向に興味がある人
- TDDに興味がある人

## やること

- [TDD Boot Camp](http://devtesting.jp/tddbc/?TDDBC%E5%A4%A7%E9%98%AA3.0%2F%E8%AA%B2%E9%A1%8C) を題材にして、参加者でモブプロを行う。

## 進行イメージ

- 参加者は軽く自己紹介する(5 分)
  - 名前
  - 所属
  - 一言
- 勉強会当日に実装する機能の確認、TODO の洗い出し(10~15 分)
- TODO をモブプロで実装する(35~40 分)
- 終わりの挨拶(5 分)

## 参加要件

- 見物も歓迎です。
- モブプロは TypeScript を使って行う予定なので、TypeScript でクラス、メソッド、可視性辺りを実現する方法は分かっていると楽だと思います。
  また、テスティングフレームワークは jest を使う予定です。こちらも事前にさらっとドキュメントを読んでもらえると楽だと思います。

## 参加方法

- エンジニアリング本部\_勉強会カレンダーを登録されている「TDD Boot Camp(TDDBC)をモブでやる会」という勉強会を編集する。
- 自分のメールアドレスに招待を送る。
- しくは、山口まで一報いただけたら、招待します。


## 参考資料
- [TDDBC 和田卓人さんのライブコーディング動画](https://www.youtube.com/watch?v=Q-FJ3XmFlT8&t=1855s)
- [テスト駆動開発(訳者 和田卓人さん)](https://www.amazon.co.jp/dp/B077D2L69C/)

## 備考

初回の勉強会なので、ちょっとお試し的な要素も多くなります。ご容赦いただけると助かります。
全員がドライバー回せるかは状況次第です。回らなかった場合は次週の勉強会で優先的にドライバーをやってもらおうと思っています。

# プロジェクト開始方法

## docker-compose
```sh
$ docker compose up --build
...building image...
...jestのwatchモードが動き出す...
$ docker compose exec node bash # shell入りたいとき
```

## docker
```sh
$ bash docker-run.sh
// run docker container
// tsc --watch /app/src/index.ts
$ bash docker-login.sh
// exec $CONTAINER_ID /bin/bash
# npm test
// jest
```

