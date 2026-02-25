// لینک Google Apps Script Web App
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzjdhJSxeQqnCcrbLbwD3YT9KZonfELjXThivRPWhd9Pgj6-0udImj90yBjcx9BF9-4/exec";

// تغییر تم
function toggleTheme() {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark"));
}

// بارگذاری تم قبلی
window.onload = () => {
  if (localStorage.getItem("theme") === "true") {
    document.body.classList.add("dark");
  }

  // Event Listeners
  document.getElementById("signupBtn").addEventListener("click", signUp);
  document.getElementById("signinBtn").addEventListener("click", signIn);
};

// ثبت‌نام استاد
async function signUp() {
  const data = {
    type: "teacher",
    name: document.getElementById("su_name").value,
    nationalId: document.getElementById("su_nationalId").value,
    phone: document.getElementById("su_phone").value,
    school: document.getElementById("su_school").value
  };

  if (!data.name || !data.nationalId || !data.phone || !data.school) {
    alert("Please fill all fields");
    return;
  }

  document.querySelector(".loader").style.display = "block";

  try {
    const res = await fetch(SCRIPT_URL, {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(data)
    });

    const result = await res.json();
    if (result.status === "success") alert("Registration successful!");
    else alert("Error: " + result.message);

  } catch(err) {
    alert("Network or script error: " + err.message);
  } finally {
    document.querySelector(".loader").style.display = "none";
  }
}

// ورود استاد
async function signIn() {
  const nationalId = document.getElementById("si_nationalId").value;
  if (!nationalId) {
    alert("Please enter National ID");
    return;
  }

  document.querySelector(".loader").style.display = "block";

  try {
    const res = await fetch(`${SCRIPT_URL}?checkTeacher=${nationalId}`);
    const result = await res.json();

    if (result.exists) {
      alert("Login successful");
      localStorage.setItem("teacherNationalId", nationalId);
      window.location.href = "create.html";
    } else {
      alert("Teacher not found. Please register first.");
    }

  } catch(err) {
    alert("Network or script error: " + err.message);
  } finally {
    document.querySelector(".loader").style.display = "none";
  }
}
