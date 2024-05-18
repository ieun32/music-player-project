import * as tags from "../constants/tags.js";
import * as styles from "../styles/style.module.css";
import header from "../components/header/header.js";
import mainView from "../components/main/main.js";
import { getPlayView } from "../components/play/play.js";

const container = tags.$root;
const pages = {
  main: () => (container.innerHTML = header + mainView),
  summer: () => (container.innerHTML = header + getPlayView()),
  save: () => (container.innerHTML = header + getPlayView()),
};

export function start() {
  container.classList.add(styles.root);
  pages.main();
  handleRouting();
}

export function navigate(state) {
  const component = pages[state.path];
  if (component) {
    component();
  } else {
    pages.main();
  }
}

function handleRouting() {
  const path = location.pathname.substring(1) || "main";
  if (path) {
    navigate({ path });
  } else {
    pages.main();
  }
}
