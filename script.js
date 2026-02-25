// لینک Web App Google Apps Script
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwMVcTfFK75Qe-xLJ1GAL4CgjbtD374_1o6dTZ_Ba6f8r5U8mV3Fp8y6FGSvehCCoCY/exec";

// تغییر تم
function toggleTheme() {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark"));
}

// بارگذاری تم از LocalStorage
window.onload = () => {
  if (localStorage.getItem("theme") === "true") {
    document.body.classList.add("dark");
  }
};

// ================= Sign Up =================
async function signUp() {
  const name = document.getElementById("su_name").value.trim();
  const nationalId = document.getElementById("su_nationalId").value.trim();
  const phone = document.getElementById("su_phone").value.trim();
  const school = document.getElementById("su_school").value.trim();

  if (!name || !nationalId || !phone || !school) {
    alert("Please fill all fields");
    return;
  }

  const data = {
    type: "teacher",
    name,
    nationalId,
    phone,
    school
  };

  const loader = document.getElementById("signupLoader");
  loader.style.display = "block";

  try {
    const res = await fetch(SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await res.json();

    if (result.status === "success") {
      alert("Registration successful!");
      localStorage.setItem("teacherNationalId", nationalId);
      window.location.href = "create.html"; // صفحه بعد از ثبت نام
    } else {
      alert("Error: " + result.message);
    }
  } catch (err) {
    console.error(err);
    alert("Connection error");
  } finally {
    loader.style.display = "none";
  }
}

// ================= Sign In =================
async function signIn() {
  const nationalId = document.getElementById("si_nationalId").value.trim();
  if (!nationalId) {
    alert("Please enter your National ID");
    return;
  }

  const loader = document.getElementById("signinLoader");
  loader.style.display = "block";

  try {
    const res = await fetch(`${SCRIPT_URL}?checkTeacher=${nationalId}`);
    const result = await res.json();

    if (result.exists) {
      localStorage.setItem("teacherNationalId", nationalId);
      window.location.href = "create.html"; // صفحه بعد از ورود
    } else {
      alert("Teacher not found. Please register first.");
    }
  } catch (err) {
    console.error(err);
    alert("Connection error");
  } finally {
    loader.style.display = "none";
  }
}

// ================= Utility =================
// تولید examId تصادفی
function generateId() {
  return Math.random().toString(36).substr(2, 8);
}

// ارسال دیتا به گوگل شیت عمومی
async function sendData(data) {
  document.querySelector(".loader").style.display = "block";
  await fetch(SCRIPT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  document.querySelector(".loader").style.display = "none";
}
