/**
 * require.context API를 통해 파일을 불러오는 함수
 * @param {import("webpack").WebpackPluginFunction.RequireContext} r require.context 반환값
 * @returns {object} 키가 모듈 경로이고 값이 가져온 모듈인 객체
 * @see https://webpack.kr/guides/dependency-management/
 */
function importAll(r) {
  let files = {};
  r.keys().forEach((key) => {
    files[key] = r(key);
  });
  return files;
}

const files = importAll(
  require.context("../constants/musics", false, /\.json$/),
);
const musics = Object.keys(files).map((key) => {
  return files[key];
});

export default musics;
