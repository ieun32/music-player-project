import * as styles from "./main.module.css";
import musics from "../../constants/musics";

const main = `
  <main class="${styles.main}">
    ${musics
      .map((music) => {
        return `
        <section class="${styles.section}">
          <div class="${styles.info}">
            <img src="${music.albumCover}" />
            <span>
              <h1>${music.title}</h1>
              <h2>${music.artist}</h2>
            </span>
          </div>
          <button data-navigate="${music.navigate}" class="material-icons">play_arrow</button>
        </section>
      `;
      })
      .join("")}
  </main>
`;

export default main;
