import * as styles from "../components/play/play.module.css";
import * as tags from "../constants/tags";
import { navigate } from "./route";
import musics from "./musics";

/**
 * 클릭 이벤트 리스너
 */
export function listenClickEvent() {
  let rangeInterval; // range 값을 증가시키는 interval

  window.addEventListener("click", (event) => {
    // 라우트 관련
    if (event.target.matches("[data-navigate]")) {
      const path = event.target.dataset.navigate;
      navigate(path);
      clearInterval(rangeInterval);
    }

    // 재생 버튼
    if (event.target.matches("#playBtn")) {
      const curText = event.target.innerText;
      const songDuration = parseInt(tags.$inputRange[0].max, 10); // songDuration을 숫자로 변환

      if (curText === "play_arrow") {
        event.target.innerText = "pause";

        // range 값을 증가시키는 interval 설정
        rangeInterval = setInterval(() => {
          const currentValue = parseInt(tags.$inputRange[0].value, 10); // currentValue를 숫자로 변환
          if (currentValue < songDuration) {
            tags.$inputRange[0].value = currentValue + 1;
            handleInputEvent(currentValue + 1);
            setStyleOfRange(currentValue + 1, songDuration);
          } else {
            // 노래가 끝나면 play 버튼으로 변경하고 interval 중지
            event.target.innerText = "play_arrow";
            clearInterval(rangeInterval);
          }
        }, 1000);
      } else {
        event.target.innerText = "play_arrow";
        clearInterval(rangeInterval); // 증가하던 range 중지
      }
    }

    // 이전 노래 버튼
    if (event.target.matches("#prevBtn")) {
      prevBtnHandler();
      clearInterval(rangeInterval);
    }

    // 다음 노래 버튼
    if (event.target.matches("#nextBtn")) {
      nextBtnHandler();
      clearInterval(rangeInterval);
    }

    // 가사 span 클릭
    if (event.target.matches(".lyric-text")) {
      const li = event.target.closest("li")
      const time = li.dataset.time;
      tags.$inputRange[0].value = parseInt(time, 10);
      handleInputEvent(parseInt(tags.$inputRange[0].value, 10));
    }
  });
}

/**
 * popstate 이벤트 리스너
 * 뒤로가기, 앞으로 가기 버튼을 눌렀을 때 발생하는 이벤트
 */
export function listenPopStateEvent() {
  window.addEventListener("popstate", (event) => {
    navigate(event.state.path);
  });
}

/**
 * input range 이벤트 리스너
 */
export function listenRangeEvent() {
  document.addEventListener("input", (event) => {
    if (event.target.matches("input[type='range']")) {
      handleInputEvent(event.target.value);
    }
  });
}

/**
 * input range 이벤트 핸들러
 * @param {number} value input range의 value 값
 */
function handleInputEvent(value) {
  const lyricTags = document.querySelectorAll("[data-time]");
  const targetTag = document.querySelector(`[data-time='${value}']`);
  if (lyricTags && targetTag) {
    lyricTags.forEach((tag) => {
      tag.classList.remove(styles.current);
    });
  }
  if (targetTag) {
    targetTag.classList.add(styles.current);
  }
  scrollToCurrentTag();
  setStyleOfRange(value, parseInt(tags.$inputRange[0].max, 10));
}

/**
 * 현재 활성화된 가사 태그가 화면 중앙에 위치하도록 스크롤 조정하는 함수
 */
function scrollToCurrentTag() {
  const currentTag = document.querySelector(`.${styles.current}`);
  if (currentTag) {
    currentTag.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

/**
 * input range의 style을 변경하는 함수
 * @param {number} cur input range의 value 값
 * @param {number} max input range의 max 값
 */
function setStyleOfRange(cur, max) {
  const progress = (cur / max) * 100;
  const currentTag = document.querySelector(`.${styles.rangeTrack}`);
  if (currentTag) {
    currentTag.style.background = `linear-gradient(to right, #0acf42 ${progress}%, #242424 ${progress}%)`;
  }
}

/**
 * 이전 버튼 핸들러
 * 첫번째 노래일 경우 마지막 노래로 이동, 그 외에는 이전 노래로 이동
 */
function prevBtnHandler() {
  const titleTag = document.querySelector(`#title`);
  const title = titleTag.innerText;
  musics.forEach((music, index) => {
    if (music.title === title) {
      if (index === 0) {
        navigate(musics[musics.length - 1].navigate);
      } else {
        navigate(musics[index - 1].navigate);
      }
    }
  });
}

/**
 * 다음 버튼 핸들러
 * 마지막 노래일 경우 첫번째 노래로 이동, 그 외에는 다음 노래로 이동
 */
function nextBtnHandler() {
  const titleTag = document.querySelector(`#title`);
  const title = titleTag.innerText;
  musics.forEach((music, index) => {
    if (music.title === title) {
      if (index === musics.length - 1) {
        navigate(musics[0].navigate);
      } else {
        navigate(musics[index + 1].navigate);
      }
    }
  });
}
