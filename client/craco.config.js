// craco.config.js
const ReactCompilerConfig = {
  // Optional: You can specify options for the React Compiler here if needed.
  // For example, to process only specific files/folders (though by default it targets 'src'):
  // sources: (filename) => {
  //   return filename.includes('src'); // This is often the default behavior
  // },
  // If you installed 'react-compiler-runtime' (for React < 19),
  // the babel plugin usually detects it automatically.
  // If not, you might explicitly set it, but try without it first:
  // runtimeModule: "react-compiler-runtime",
};

module.exports = {
  babel: {
    plugins: [
      // Add the React Compiler plugin.
      // It's generally recommended to place it early in the plugin array.
      ["babel-plugin-react-compiler", ReactCompilerConfig],
    ],
    // You typically don't need to add presets here if you're using CRA,
    // as 'babel-preset-react-app' (used by CRA) already includes necessary presets
    // like @babel/preset-env and @babel/preset-react.
    // presets: [],
  },
  // If you have other CRAC O configurations (e.g., for Webpack, ESLint, PostCSS),
  // they would go here as well.
};
