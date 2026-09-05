const user = JSON.parse(localStorage.getItem('clubeCardapioUser') || 'null');
if (localStorage.getItem('clubeCardapioLoggedIn') !== 'true' || !user) window.location.href = 'auth.html?mode=login';
else document.querySelector('#user-name').textContent = user.name || 'você';
document.querySelector('#logout').addEventListener('click', () => { localStorage.removeItem('clubeCardapioLoggedIn'); window.location.href = 'index.html'; });
