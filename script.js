const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyULTHObvnzn0xuDU5aolKMru1a9hHddjLBUwZqz85Vea_xniMoocG6deTeUm1S69jQnQ/exec";

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
