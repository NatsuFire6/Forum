async function fetchProfile() {
  try {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      document.getElementById("profileContainer").innerHTML = "Utilisateur non connecté.";
      return;
    }

    const response = await fetch(`http://localhost:3000/api/users/id/${userId}`);
    if (!response.ok) throw new Error("Erreur lors de la récupération du profil");

    const user = await response.json();

    const container = document.getElementById("profileContainer");
    container.innerHTML = `
      <h2>Nom d'utilisateur : ${user.username}</h2>
      <p>Adresse mail : ${user.mail}</p>
      <p>Date d'inscription : ${user.date_inscription || "Non spécifiée"}</p>
    `;
  } catch (err) {
    console.error(err);
    document.getElementById("profileContainer").innerHTML = "Erreur de chargement du profil.";
  }
}

// Bouton déconnexion
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("userId");
  window.location.href = "login.html";
});

window.onload = fetchProfile;
