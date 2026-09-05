const params = new URLSearchParams(window.location.search);
const signup = params.get('mode') === 'signup';
const form = document.querySelector('#auth-form');
const nameField = document.querySelector('.signup-only');
const nameInput = document.querySelector('#name');
const authMessage = document.querySelector('#auth-message');
document.querySelector('#auth-eyebrow').textContent = signup ? 'Comece com leveza' : 'Bem-vinda de volta';
document.querySelector('#auth-title').textContent = signup ? 'Criar minha conta' : 'Entrar na sua conta';
document.querySelector('#auth-subtitle').textContent = signup ? 'Crie seu espaço para acompanhar seus cardápios.' : 'Acesse seu espaço para encontrar seu cardápio.';
document.querySelector('#auth-submit').innerHTML = signup ? 'Criar conta <span>→</span>' : 'Entrar <span>→</span>';
nameField.hidden = !signup;
nameInput.required = signup;
document.querySelector('#auth-switch').innerHTML = signup ? 'Já tem uma conta? <a href="auth.html?mode=login">Entrar</a>' : 'Ainda não tem uma conta? <a href="auth.html?mode=signup">Criar conta</a>';
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const storedUser = JSON.parse(localStorage.getItem('clubeCardapioUser') || 'null');
  const email = document.querySelector('#email').value.trim();
  const user = signup ? { name: nameInput.value.trim(), email } : storedUser;
  if (!signup && (!storedUser || storedUser.email !== email)) { authMessage.textContent = 'Não encontramos essa conta neste navegador. Crie uma conta primeiro.'; return; }
  localStorage.setItem('clubeCardapioUser', JSON.stringify(user));
  localStorage.setItem('clubeCardapioLoggedIn', 'true');
  window.location.href = 'dashboard.html';
});
