document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const mail = document.getElementById("mail").value;
  const password = document.getElementById("password").value;

  const response = await fetch("http://localhost:3000/api/users/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, mail, password }),
  });

  const data = await response.json();

  if (response.ok) {
    alert("Compte créé avec succès !");
    window.location.href = "login.html";
  } else {
    document.getElementById("error").textContent = data.message || "Erreur inconnue";
  }
});
