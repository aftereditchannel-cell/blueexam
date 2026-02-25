const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzjdhJSxeQqnCcrbLbwD3YT9KZonfELjXThivRPWhd9Pgj6-0udImj90yBjcx9BF9-4/exec";

// تغییر تم
function toggleTheme() {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark"));
}

window.addEventListener("DOMContentLoaded", () => {
  // اعمال تم قبلی
  if (localStorage.getItem("theme") === "true") {
    document.body.classList.add("dark");
  }

  // Event listeners
  document.getElementById("themeBtn").addEventListener("click", toggleTheme);
  document.getElementById("signupBtn").addEventListener("click", signUp);
  document.getElementById("signinBtn").addEventListener("click", signIn);
});

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
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    });

    const result = await res.json();
    alert(result.status === "success" ? "Registration successful!" : "Error: " + result.message);

  } catch(err) {
    alert("Error: " + err.message);
  } finally {
    document.querySelector(".loader").style.display = "none";
  }
}

async function signIn() {
  const nationalId = document.getElementById("si_nationalId").value;
  if (!nationalId) {
    alert("Enter National ID");
    return;
  }

  document.querySelector(".loader").style.display = "block";

  try {
    const res = await fetch(`${SCRIPT_URL}?checkTeacher=${nationalId}`);
    const result = await res.json();

    if (result.exists) {
      localStorage.setItem("teacherNationalId", nationalId);
      window.location.href = "create.html";
    } else {
      alert("Teacher not found. Please register first.");
    }
  } catch(err) {
    alert("Error: " + err.message);
  } finally {
    document.querySelector(".loader").style.display = "none";
  }
}
