# WXT を使った chrome 拡張の実装メモ

## entrypoints

### popup

- 拡張機能ボタンを押した時に表示されるUI
- ページのDOMやURL（location.href）にアクセスできない
- 外部APIにアクセスするとcorsに引っかかる

### content script

- ページ読み込み時に実行される処理
- ページのDOMやURLにアクセスできる
- 外部APIにアクセスするとcorsに引っかかる
  - "https://www.songsterr.com/api/search?pattern=Trrrrrrrrrrrrrrrrrrrue+Lies' from origin 'https://www.youtube.com"

### background (service worker)

- 外部APIにアクセスしてもcorsに引っかからない

## その他アイデア

- 拡張ボタンを押した時は設定画面を表示し、検索画面は youtube アクセス時に自動表示だけで良いかも
  - 参考: [WXT + React で Youtube 動画のスクショ撮影 Chrome 拡張機能を作る](https://qiita.com/kerobot/items/886ae7ed6598d763b8bf#%E3%83%9D%E3%83%83%E3%83%97%E3%82%A2%E3%83%83%E3%83%97%E3%83%9A%E3%83%BC%E3%82%B8%E8%A8%AD%E5%AE%9A%E3%83%9A%E3%83%BC%E3%82%B8%E3%82%92%E4%BD%9C%E6%88%90%E3%81%99%E3%82%8B)
