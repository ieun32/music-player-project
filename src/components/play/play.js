import * as styles from "./play.module.css";
import save_lyrics from "../../constants/save_lyrics";
import summer_lyrics from "../../constants/summer_lyrics";

export function getPlayView() {
  const path = location.pathname.substring(1);

  const curMusic = path === "save" ? save_lyrics : summer_lyrics;
  const curLyrics = [...curMusic.lyrics];
  const firstLyrics = curLyrics.shift();

  const lyrics = curLyrics
    .map((li) => `<li data-time="${li.time}">${li.lyric}</li>`)
    .join("");

  const play = `
<main class="${styles.main}">
  <section class="${styles.album}">
    <img src="${curMusic.albumCover}"/>
    <h1 id="title">${curMusic.title}</h1>
    <h2 id="artist">${curMusic.artist}</h2>
  </section>
  <section class="${styles.lyrics}">
    <ul>
      <li data-time="0" class=${styles.current}>${firstLyrics.lyric}</li>
      ${lyrics}
    </ul>
  </section>
  <section class="${styles.control}">
    <input class="inputRange ${styles.rangeTrack}" type="range" min="0" max="${curMusic.playTime}" value="0" />
    <div>
      <button id="prevBtn" class="material-icons">fast_rewind</button>
      <button id="playBtn" class="material-icons">play_arrow</button>
      <button id="nextBtn" class="material-icons">fast_forward</button>
    </div>
  </section>
</main>
`;
  return play;
}
