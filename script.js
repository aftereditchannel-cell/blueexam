const SCRIPT_URL = "https://script.google.com/macros/s/AKfycby8GDeRbqcqTxJA5tb_YbDalowLHzJ5X9m2Za60cZqJ-Av-D1UyXpYRH-TnM_CfHACY/exec";

// ثبت نام
async function signUp() {
  const data = {
    type: "teacher",
    name: document.getElementById("su_name").value,
    nationalId: document.getElementById("su_nationalId").value,
    phone: document.getElementById("su_phone").value,
    school: document.getElementById("su_school").value
  };

  try {
    const res = await fetch(SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await res.json();

    if (result.status === "success") {
      alert("Registration successful!");
    } else {
      alert("Error: " + result.message);
    }

  } catch (err) {
    alert("Fetch error: " + err.message);
  }
}

// ورود
async function signIn() {
  const nationalId = document.getElementById("si_nationalId").value;

  try {
    const res = await fetch(`${SCRIPT_URL}?checkTeacher=${nationalId}`);
    const result = await res.json();

    if (result.exists) {
      localStorage.setItem("teacherNationalId", nationalId);
      window.location.href = "create.html";
    } else {
      alert("Teacher not found. Please register first.");
    }

  } catch (err) {
    alert("Fetch error: " + err.message);
  }
}
