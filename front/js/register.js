document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const mail = document.getElementById("mail").value;
  const password = document.getElementById("password").value;
  
  try{  
  const response = await fetch("http://localhost:3000/api/users/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, mail, password }),
  });

  const data = await response.json();

  if (response.ok) {
    alert("Compte créé avec succès !");
    localStorage.setItem("userId", data.id); // Stocke l'ID de l'utilisateur
    window.location.href = "login.html";
  } else {
    document.getElementById("error").textContent = data.message || "Erreur inconnue";
  }
} catch (error) {
    console.error(error);
    document.getElementById("error").textContent = "Erreur lors de la requête.";
  }
});
