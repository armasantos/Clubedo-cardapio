const products = { '7_DIAS': { name: 'Cardápio 7 dias', description: 'Uma semana organizada para você saber o que comer e o que preparar.' }, '30_DIAS': { name: 'Cardápio 30 dias', description: 'Um mês de planejamento para transformar a organização alimentar em rotina.' } };
const params = new URLSearchParams(window.location.search);
const productInputs = [...document.querySelectorAll('input[name="product"]')];
const summaryName = document.querySelector('#summary-name');
const summaryDescription = document.querySelector('#summary-description');
const message = document.querySelector('#checkout-message');
function selectProduct(type) { const product = products[type]; if (!product) return; summaryName.textContent = product.name; summaryDescription.textContent = product.description; }
const initialProduct = products[params.get('product')] ? params.get('product') : '7_DIAS';
document.querySelector(`input[value="${initialProduct}"]`).checked = true;
selectProduct(initialProduct);
productInputs.forEach((input) => input.addEventListener('change', () => selectProduct(input.value)));
document.querySelector('#checkout-form').addEventListener('submit', (event) => { event.preventDefault(); const selected = document.querySelector('input[name="product"]:checked').value; localStorage.setItem('clubeCardapioPurchaseInterest', JSON.stringify({ product: selected, name: document.querySelector('#checkout-name').value.trim(), email: document.querySelector('#checkout-email').value.trim() })); message.textContent = 'Interesse registrado neste navegador. O pagamento será disponibilizado em breve.'; });
