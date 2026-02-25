const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbymGwjNrIxVIDEQmjr0UEYC9TqmMJYmD_kFhkljUC42JfCIfD9qEpIuHxXiG-uCYFQ/exechttps://script.google.com/macros/s/AKfycbwMVcTfFK75Qe-xLJ1GAL4CgjbtD374_1o6dTZ_Ba6f8r5U8mV3Fp8y6FGSvehCCoCY/exec
// تغییر تم
function toggleTheme() {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark"));
}

window.onload = () => {
  if (localStorage.getItem("theme") === "true") {
    document.body.classList.add("dark");
  }
};

// تولید examId تصادفی
function generateId() {
  return Math.random().toString(36).substr(2, 8);
}

// ارسال دیتا به گوگل شیت
async function sendData(data) {
  document.querySelector(".loader").style.display = "block";
  await fetch(SCRIPT_URL, {
    method: "POST",
    body: JSON.stringify(data)
  });
  document.querySelector(".loader").style.display = "none";
}
