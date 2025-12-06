export default defineContentScript({
  matches: ["https://www.youtube.com/watch?v=*"],
  // runAt: "document_end",
  main() {
    new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
      const title = document.getElementsByClassName(
        "yt-video-attribute-view-model__title"
      )[0]?.textContent;
      console.log(title);
    });
  },
});
