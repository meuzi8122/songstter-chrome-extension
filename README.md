# songstter-chrome-extension

## これは何のchrome拡張

- Youtubeの音楽動画を開くと、その曲のTAB譜がsongstterに投稿されているかを表示する
- TAB譜が投稿されていない場合は、動画のURLをクリップボードにコピーしてから、songstterのAI TAB譜作成ページを開く
  - 投稿されてない場合は、バックグラウンドでTAB譜の作成リクエストを投げるようにしたい（URLのコピペがめんどい）

## ビルド

```
// .outputディレクトリが作成される
bun run build
```

- `chrome://extensions/`の「パッケージ化されていない拡張機能を読み込む」で、.outputのchrome-mv3を選択
  - .outputが隠しディレクトリになっているので`Command + Shift + .`で表示
