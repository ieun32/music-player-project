import * as styles from "../components/play/play.module.css";
import * as tags from "../constants/tags";
import { navigate } from "./route";

// 클릭 이벤트 리스너
export function listenClickEvent() {
  let rangeInterval; // range 값을 증가시키는 interval

  window.addEventListener("click", (event) => {
    // 라우트 관련
    if (event.target.matches("[data-navigate]")) {
      const path = event.target.dataset.navigate;
      const state = { path };
      history.pushState(state, "", path);
      navigate(state);
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
      navigateBtnHandler();
      clearInterval(rangeInterval);
    }

    // 다음 노래 버튼
    if (event.target.matches("#nextBtn")) {
      navigateBtnHandler();
      clearInterval(rangeInterval);
    }

    // 가사 클릭
    if (event.target.matches("[data-time]")) {
      const time = event.target.dataset.time;
      tags.$inputRange[0].value = parseInt(time, 10);
      handleInputEvent(parseInt(tags.$inputRange[0].value, 10));
    }
  });
}

// 뒤로가기, 앞으로 가기 이벤트 리스너
export function listenPopStateEvent() {
  window.addEventListener("popstate", (event) => {
    navigate(event.state);
  });
}

// input range value 변경 이벤트 리스너
export function listenRangeEvent() {
  document.addEventListener("input", (event) => {
    if (event.target.matches("input[type='range']")) {
      handleInputEvent(event.target.value);
    }
  });
}

// input range 이벤트 핸들러
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

// 활성화 된 가사 태그가 화면 중앙에 위치하도록 스크롤 조정하는 함수
function scrollToCurrentTag() {
  const currentTag = document.querySelector(`.${styles.current}`);
  if (currentTag) {
    currentTag.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

function setStyleOfRange(cur, max) {
  const progress = (cur / max) * 100;
  const currentTag = document.querySelector(`.${styles.rangeTrack}`);
  if (currentTag) {
    currentTag.style.background = `linear-gradient(to right, #0acf42 ${progress}%, #242424 ${progress}%)`;
  }
}

function navigateBtnHandler() {
  const titleTag = document.querySelector(`#title`);
  const title = titleTag.innerText;
  if (title === "summer") {
    const state = { path: "save" };
    history.pushState(state, "", "save");
    navigate(state);
  } else {
    const state = { path: "summer" };
    history.pushState(state, "", "summer");
    navigate(state);
  }
}
