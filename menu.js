const days = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'];
const meals = [['Café da manhã', 'CAFE_MANHA'], ['Colação', 'COLACAO'], ['Almoço', 'ALMOCO'], ['Lanche', 'LANCHE'], ['Jantar', 'JANTAR'], ['Ceia', 'CEIA']];
const grid = document.querySelector('#meals-grid');
const dayLabel = document.querySelector('#day-label');
const dayCount = document.querySelector('#day-count');
function renderDay(index) { dayLabel.textContent = days[index]; dayCount.textContent = `${String(index + 1).padStart(2, '0')} / 07`; grid.innerHTML = meals.map(([label, type], mealIndex) => `<article class="meal-card"><span class="meal-number">0${mealIndex + 1}</span><div><p class="meal-type">${label}</p><h3>Conteúdo demonstrativo</h3><p class="meal-placeholder">Substituir pelo conteúdo real da proprietária.</p></div><span class="meal-symbol">${type === 'ALMOCO' ? '●' : '○'}</span></article>`).join(''); }
document.querySelectorAll('.day-tab').forEach((tab) => tab.addEventListener('click', () => { document.querySelectorAll('.day-tab').forEach((item) => { item.classList.remove('active'); item.setAttribute('aria-selected', 'false'); }); tab.classList.add('active'); tab.setAttribute('aria-selected', 'true'); renderDay(Number(tab.dataset.day)); }));
renderDay(0);
