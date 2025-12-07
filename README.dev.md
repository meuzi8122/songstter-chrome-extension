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

```
https://www.songsterr.com/api/search?pattern=Trrrrrrrrrrrrrrrrrrrue+Lies' from origin 'https://www.youtube.com"
```

### background (service worker)

- 外部APIにアクセスしてもcorsに引っかからない

## その他メモ

- 再度`bun run dev`しないとbackgroundの変更が反映されない？
