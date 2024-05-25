import * as styles from "./play.module.css";
import getHeader from "../header/header.js";
import musics from "../../utils/musics.js";
import { loadLyrics, setStateforEdit } from "../../utils/lyrics.js";

/**
 * play HTML을 반환하는 함수
 * @returns {string} play HTML
 */
export default function playView() {
  const currentPath = location.pathname;
  const matchMusic = musics.find((music) => music.navigate === currentPath);
  let lyrics = [...matchMusic.lyrics];
  const savedLyrics = loadLyrics(matchMusic.songId);

  const $lyrics = savedLyrics
    ? [...savedLyrics]
      .map((li, i) => {
        if (i === 0) {
          return `<li data-time="${li.time}" class=${styles.current}><span class="lyric-text" contenteditable="false">${li.lyric}</span></li>`;
        } else {
          return `<li data-time="${li.time}"><span class="lyric-text" contenteditable="false">${li.lyric}</span></li>`;
        }
      })
      .join("")
    : [...lyrics]
      .map((li, i) => {
        if (i === 0) {
          return `<li data-time="${li.time}" class=${styles.current}><span class="lyric-text" contenteditable="false">${li.lyric}</span></li>`;
        } else {
          return `<li data-time="${li.time}"><span class="lyric-text" contenteditable="false">${li.lyric}</span></li>`;
        }
      })
      .join("");

  const play = `
${getHeader()}
<main class="${styles.main}">
  <section class="${styles.album}">
    <img src="${matchMusic.albumCover}" alt="albumCover"/>
    <h1 id="title">${matchMusic.title}</h1>
    <h2 id="artist">${matchMusic.artist}</h2>
    <button id="editModeToggle">가사 수정</button>
  </section>
  <section class="${styles.lyrics}">
    <ul id="lyricsList">
      ${$lyrics}
    </ul>
  </section>
  <section class="${styles.control}">
    <label><input class="inputRange ${styles.rangeTrack}" type="range" min="0" max="${matchMusic.playTime}" value="0" /></label>
    <div>
      <button id="prevBtn" class="material-icons">fast_rewind</button>
      <button id="playBtn" class="material-icons">play_arrow</button>
      <button id="nextBtn" class="material-icons">fast_forward</button>
    </div>
  </section>
  <section class=${styles.iframe}>
    <iframe title="melon" src="https://www.melon.com/song/detail.htm?songId=${matchMusic.songId}" width="100%" height="100%"></iframe>
  </section>
  <link rel="preload" fetchpriority="high" as="image" href="${matchMusic.albumCover}" type="image/jpg">
</main>
`;
  setTimeout(() => {
    setStateforEdit(matchMusic.songId);
  }, 0);

  return play;
}