module.exports = {
  plugins: {
    "@tailwindcss/postcss": {},
    "postcss-prefix-selector": {
      // id="songstter-chrome-extension"とその子要素にだけスタイルを適用する（ページ全体にスタイルが適用されるのを防ぐ）
      prefix: "#songstter-chrome-extension",
      transform: transformSelector,
    },
    autoprefixer: {},
  },
};

function transformSelector(
  prefix: string,
  selector: string,
  prefixedSelector: string
) {
  // daisyUI: src/base/colors.css
  if (selector.match(/:root/)) {
    return selector.replace(/:root/, prefix);
  }

  // daisyUI: src/base/general.css
  if (selector.match(/html/)) {
    return selector.replace(/html/, prefix);
  }

  return prefixedSelector;
}
