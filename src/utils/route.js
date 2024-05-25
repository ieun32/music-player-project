import * as tags from "../constants/tags.js";
import * as styles from "../styles/style.module.css";
import musics from "./musics.js";
import mainView from "../components/main/main.js";
import PlayView from "../components/play/play.js";

const container = tags.$root;

const routes = {
  pages: [],
  add({ path, view }) {
    this.pages.push({ path, view });
    return this;
  },
};

/**
 * 라우트 배열에 페이지 추가, 초기 페이지 렌더링
 */
export function start() {
  container.classList.add(styles.root);
  routes.add({ path: "/main", view: mainView });

  musics.forEach((music) => {
    routes.add({ path: `${music.navigate}`, view: PlayView });
  });

  navigate(window.location.pathname);
}

/**
 * 페이지 이동 함수
 * @param {string} path 경로
 */
export function navigate(path) {
  if (path === "/") path = "/main"; // 루트 경로일 때 main으로 이동
  history.pushState({ path: path }, null, path);
  const route = routes.pages.find((route) => route.path === path);
  container.innerHTML = route.view();
}
