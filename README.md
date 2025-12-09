## これは何のchrome拡張

- Youtubeの音楽動画を開くと、その曲のTAB譜がsongstterに投稿されているかを表示する
- 投稿されていない場合は動画URLをクリップボードにコピーしてから、songstterのAI TAB譜作成ページを開く
  - 将来的にはバックグラウンドでTAB譜の作成リクエストを投げるようにしたい（URLのコピペがめんどい）
    
<img width="300" alt="スクリーンショット 2025-12-09 18 10 41" src="https://github.com/user-attachments/assets/e68e9886-024a-40e6-bba7-fe4e90a42185" />
<img width="300" alt="スクリーンショット 2025-12-09 18 23 28" src="https://github.com/user-attachments/assets/5eb215ff-e95e-4cc9-85a1-f677b0b2c723" />


## ビルド

```
// .outputディレクトリが作成される
bun run build
```

- `chrome://extensions/`の「パッケージ化されていない拡張機能を読み込む」で、.outputのchrome-mv3を選択
  - .outputが隠しディレクトリになっているので`Command + Shift + .`で表示
