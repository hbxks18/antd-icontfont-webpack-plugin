import babel from "rollup-plugin-babel"

export default {
  input: "src/antd-icontfont-webpack-plugin.js",
  output: {
    file: "dist/index.js",
    format: "cjs",
  },
  plugins: [
    babel({
      exclude: "node_modules/**",
    }),
  ],
}
