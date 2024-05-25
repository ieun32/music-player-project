import * as styles from "./main.module.css";
import musics from "../../utils/musics.js";
import getHeader from "../header/header.js";

/**
 * main HTML을 반환하는 함수
 * @returns {string} main HTML
 */
export default function mainView() {
  const main = `
${getHeader()}
  <main class="${styles.main}">
  ${musics
    .map((music) => {
      return `
      <section class="${styles.section}">
        <div class="${styles.info}">
          <img src="${music.albumCover}" alt="albumCover" width="5rem" height="5rem" />
          <span>
            <h1>${music.title}</h1>
            <h2>${music.artist}</h2>
          </span>
        </div>
        <a data-navigate="${music.navigate}" class="material-icons">play_arrow</a>
      </section>
    `;
    })
    .join("")}
    ${musics
      .map((music) => {
        return `<link rel="preload" fetchpriority="high" as="image" href="${music.albumCover}" type="image/jpg">`;
      })
      .join("")}
  </main>
`;

  return main;
}
