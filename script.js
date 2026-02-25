const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxtK9-4g0xWVqyZYpcbm02QrNff0xZSAAHQvOn2mVN2G4nq9vorMpaZ7yDNootSytTJ6g/exec";

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
