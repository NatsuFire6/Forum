document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("http://localhost:3000/routes/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Connexion réussie !");
      window.location.href = "home.html";
    } else {
      document.getElementById("error").textContent = data.message || "Erreur inconnue";
    }
  } catch (error) {
    document.getElementById("error").textContent = "Erreur réseau ou serveur.";
    console.error(error);
  }
});
