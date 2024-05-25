/**
 * 로컬 스토리지에서 가사 데이터를 불러오는 함수
 * @param {string} musicId - 음악 ID
 * @returns {Array|null} 저장된 가사 데이터 또는 null
 */
export function loadLyrics(musicId) {
  const savedLyrics = localStorage.getItem(`lyrics_${musicId}`);
  return savedLyrics ? JSON.parse(savedLyrics) : null;
}

/**
 * 로컬 스토리지에 가사 데이터를 저장하는 함수
 * @param {string} musicId - 음악 ID
 * @param {Array} lyrics - 저장할 가사 데이터
 */
function saveLyrics(musicId, lyrics) {
  localStorage.setItem(`lyrics_${musicId}`, JSON.stringify(lyrics));
  alert("가사가 저장되었습니다.");
}

/**
 * 가사 수정 및 읽기 모드 전환 기능을 설정하는 함수
 * @param {string} musicId - 음악 ID
 */
export function setStateforEdit(musicId) {
  const lyricsList = document.getElementById("lyricsList");
  const editModeToggle = document.getElementById("editModeToggle");
  let editMode = false;

  editModeToggle.addEventListener("click", () => {
    editMode = !editMode;
    editModeToggle.textContent = editMode ? "가사 저장" : "가사 수정";
    lyricsList.querySelectorAll(".lyric-text").forEach((span) => {
      span.contentEditable = editMode;
    });

    if (!editMode) {
      const updatedLyrics = [...lyricsList.children].map(li => ({
        time: li.dataset.time,
        lyric: li.querySelector(".lyric-text").innerText,
      }));
      saveLyrics(musicId, updatedLyrics);
    }
  });
}