async function fetchProfile() {
  const container = document.getElementById("profileContainer");
  if (!container) {
    console.error("Container introuvable !");
    return;
  }

  try {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      container.innerHTML = "Utilisateur non connecté.";
      return;
    }

    const response = await fetch(`http://localhost:3000/api/users/id/${userId}`);
    if (!response.ok) throw new Error("Erreur lors de la récupération du profil");

    const user = await response.json();

    container.innerHTML = `
      <h2>Nom d'utilisateur : ${user.username}</h2>
      <p>Adresse mail : ${user.mail}</p>
      <p>Date d'inscription : ${user.date_inscription || "Non spécifiée"}</p>
    `;
  } catch (err) {
    console.error(err);
    container.innerHTML = "Erreur de chargement du profil.";
  }
}

// Bouton déconnexion
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("userId");
  window.location.href = "login.html";
});

window.onload = fetchProfile;
