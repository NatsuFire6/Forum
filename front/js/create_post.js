document.getElementById('postForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;

  try {
    const response = await fetch('http://localhost:3000/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, content })
    });

    if (response.ok) {
      alert('Post publié !');
      window.location.href = 'home.html';
    } else {
      const data = await response.json();
      alert(`Erreur : ${data.message}`);
    }
  } catch (err) {
    alert('Erreur lors de la publication');
    console.error(err);
  }
});
