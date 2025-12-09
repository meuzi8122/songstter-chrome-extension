## これは何のchrome拡張

- Youtubeの音楽動画を開くと、その曲のTAB譜がsongstterに投稿されているかを表示する
- TAB譜が投稿されていない場合は、動画のURLをクリップボードにコピーしてから、songstterのAI TAB譜作成ページを開くボタンを表示
  - 投稿されてない場合は、バックグラウンドでTAB譜の作成リクエストを投げるようにしたい（URLのコピペがめんどい）
    
<img width="300" alt="スクリーンショット 2025-12-09 18 10 41" src="https://github.com/user-attachments/assets/e68e9886-024a-40e6-bba7-fe4e90a42185" />

## ビルド

```
// .outputディレクトリが作成される
bun run build
```

- `chrome://extensions/`の「パッケージ化されていない拡張機能を読み込む」で、.outputのchrome-mv3を選択
  - .outputが隠しディレクトリになっているので`Command + Shift + .`で表示
