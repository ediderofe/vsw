const vastUrl = "https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/single_preroll_skippable&sz=640x480&ciu_szs=300x250%2C728x90&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator="; 

const surveyContainer = document.getElementById("survey-container");
const videoPlayer = document.getElementById("video-player");
const answerButtons = document.querySelectorAll(".answer-btn");
const skipBtn = document.getElementById("skip-btn");
const thankYouMessage = document.getElementById("thank-you");

// Kullanıcı bir seçenek seçtiğinde
answerButtons.forEach(button => {
  button.addEventListener("click", () => {
    const pixelUrl = button.getAttribute("data-pixel");
    trackPixel(pixelUrl); // Pixel'i takip et
    showThankYouMessage();
  });
});

// "GEÇ" butonuna tıklandığında doğrudan videoya geç
skipBtn.addEventListener("click", () => {
  hideSurveyAndStartVideo();
});

// Pixel takibi için fonksiyon
function trackPixel(pixelUrl) {
  const img = new Image();
  img.src = pixelUrl; // Pixel URL'sini yükle
}

// Teşekkür mesajını göster ve 2 saniye sonra videoya geç
function showThankYouMessage() {
  thankYouMessage.classList.remove("hidden");

  setTimeout(() => {
    hideSurveyAndStartVideo();
  }, 2000); // 2 saniye bekleme
}

// Anketi gizle ve videoyu başlat
function hideSurveyAndStartVideo() {
  surveyContainer.remove(); // Anketi DOM'dan tamamen kaldır

  fetch(vastUrl)
    .then(response => response.text())
    .then(vastXml => {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(vastXml, "application/xml");
      const mediaFileUrl = xmlDoc.querySelector("MediaFile").textContent;

      videoPlayer.src = mediaFileUrl;
      videoPlayer.classList.remove("hidden");
      videoPlayer.play();
    })
    .catch(err => console.error("VAST videosu yüklenemedi:", err));
}
