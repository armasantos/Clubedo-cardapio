const query = new URLSearchParams(window.location.search);
const utm = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'].reduce((values, key) => { if (query.get(key)) values[key] = query.get(key); return values; }, {});
if (Object.keys(utm).length) sessionStorage.setItem('clubeCardapioUtm', JSON.stringify(utm));
document.querySelectorAll('[data-checkout]').forEach((link) => link.addEventListener('click', () => {
  const destination = new URL(link.href, window.location.href);
  const savedUtm = JSON.parse(sessionStorage.getItem('clubeCardapioUtm') || '{}');
  Object.entries(savedUtm).forEach(([key, value]) => destination.searchParams.set(key, value));
  link.href = destination.toString();
}));
