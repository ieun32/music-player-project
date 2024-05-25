const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: "C:/Users/undud/Desktop/이은영/소스코드/music-player-project/dist",
    clean: true,
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        exclude: /\.module\.css$/i, // 모듈 파일 제외 설정
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      // CSS Module ([filename].module.css)
      {
        test: /\.module\.css$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
        ],
      },
      {
        test: /\.(?:js|mjs|cjs)$/, // 캡쳐하지 않는 그룹 (?:)
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ["@babel/preset-env", { targets: "> 5% in KR and not dead" }],
            ],
            plugins: [
              [
                "@babel/plugin-transform-runtime",
                {
                  corejs: 3,
                  regenerator: true,
                },
              ],
            ],
          },
        },
      },
    ],
  },
  devServer: {
    port: 3000,
    host: "0.0.0.0",
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
    new MiniCssExtractPlugin(),
  ],
};
