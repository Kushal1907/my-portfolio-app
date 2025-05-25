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
    plugins: [["babel-plugin-react-compiler", ReactCompilerConfig]],
  },
};
