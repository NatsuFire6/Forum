document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const mail = document.getElementById("mail").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mail, password }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Connexion réussie !");
      localStorage.setItem('userId', data.id); // Pareille ici je stocke l'ID de l'utilisateur
      window.location.href = "home.html";
    } else {
      document.getElementById("error").textContent = data.message || "Connexion impossible"; 
    }
  } catch (error) {
    document.getElementById("error").textContent = "Erreur réseau ou serveur.";
    console.error(error);
  }
});
