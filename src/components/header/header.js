import * as styles from "./header.module.css";
import musics from "../../utils/musics";

/**
 * 헤더 HTML을 반환하는 함수
 * @returns {string} header HTML
 */
export default function getHeader() {
  const currentPath = location.pathname;
  const matchMusic = musics.find((music) => music.navigate === currentPath);

  const header = `
<header class="${styles.header}">
  <button data-navigate="/main">maelong</button>
  <ul id="musicinfo">
  ${matchMusic ? `<li>${matchMusic.title}</li><li>-</li><li>${matchMusic.artist}</li>` : ""}
  </ul>
</header>
`;
  return header;
}
