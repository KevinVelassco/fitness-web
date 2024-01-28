import { CaloriePage, loadFields } from './pages/calorie.page.js';

async function main() {
  loadFields();

  document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.target));

    await CaloriePage(data);
  });

  document.querySelector('#goalType').addEventListener('click', (e) => {
    if (e.target.value === 'Maintenance') {
      document.querySelector('#caloriePercentageValue').value = null;
      document.querySelector('#caloriePercentageValue').disabled = true;
      return;
    }

    document.querySelector('#caloriePercentageValue').disabled = false;
  });
}

main();
