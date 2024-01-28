import {
  LoaderComponent,
  UnmountLoaderComponent
} from '../components/loader.component.js';
import calorieService from '../services/calorie.service.js';

export const CaloriePage = async (data) => {
  const payload = {
    ...data,
    weightInKg: Number(data.weightInKg),
    caloriePercentageValue:
      data.caloriePercentageValue && Number(data.caloriePercentageValue),
    gramOfProteinPerKgOfWeight: Number(data.gramOfProteinPerKgOfWeight),
    gramOfFatPerKgOfWeight: Number(data.gramOfFatPerKgOfWeight)
  };

  console.log(payload);

  const $caloriePage = document.getElementById('caloriePage');
  const $calorieError = document.getElementById('calorieError');

  if ($calorieError.hasChildNodes())
    $calorieError.removeChild($calorieError.firstChild);

  if ($caloriePage.hasChildNodes())
    $caloriePage.removeChild($caloriePage.firstChild);

  let response;

  try {
    LoaderComponent();

    response = await calorieService.calculateCalorieRequirement(payload);

    UnmountLoaderComponent();

    if (response.status !== 200 && response.status !== 201) {
      if ($caloriePage.hasChildNodes())
        $caloriePage.removeChild($caloriePage.firstChild);

      handleErrors(response);

      return;
    }
  } catch (error) {
    if ($caloriePage.hasChildNodes())
      $caloriePage.removeChild($caloriePage.firstChild);

    handleErrors(error);

    return;
  }

  if ($calorieError.hasChildNodes())
    $calorieError.removeChild($calorieError.firstChild);

  if ($caloriePage.hasChildNodes())
    $caloriePage.removeChild($caloriePage.firstChild);

  const $caloriePageInfo = document.createElement('div');
  $caloriePageInfo.innerText = JSON.stringify(response.data, null, 4);
  $caloriePage.appendChild($caloriePageInfo);
};

const handleErrors = (error) => {
  const $calorieError = document.getElementById('calorieError');

  if ($calorieError.hasChildNodes())
    $calorieError.removeChild($calorieError.firstChild);

  const $messageElement = document.createElement('div');

  $messageElement.classList.add(...['alert', 'alert-danger']);

  switch (error.status) {
    case 400:
      $messageElement.innerText = error.data.message;
      $calorieError.appendChild($messageElement);
      break;
    case 404:
      $messageElement.innerText = 'resource not available';
      $calorieError.appendChild($messageElement);
      break;

    default:
      $messageElement.innerText = error.message;
      $calorieError.appendChild($messageElement);
      break;
  }
};

export const loadFields = () => {
  const genderElement = document.getElementById('gender');

  genderElement.appendChild(new Option('Masculino', 'Man'));
  genderElement.appendChild(new Option('Femenino', 'Women'));

  const goalTypeElement = document.getElementById('goalType');

  goalTypeElement.appendChild(new Option('Superávit Calórico', 'Surplus'));
  goalTypeElement.appendChild(new Option('Déficit Calórico', 'Deficit'));
  goalTypeElement.appendChild(
    new Option('Mantenimiento Calórico', 'Maintenance')
  );

  const caloriePercentageValueElement = document.getElementById(
    'caloriePercentageValue'
  );

  const caloriePercentages = (start = 10, end = 30) => {
    return Array.from({ length: end - start + 1 }, (_, i) => i + start);
  };

  caloriePercentages().forEach((value) => {
    const option = new Option(`${value} %`, value);

    caloriePercentageValueElement.appendChild(option);
  });

  const gramOfProteinPerKgOfWeightElement = document.getElementById(
    'gramOfProteinPerKgOfWeight'
  );

  const gramsOfProtein = (start = 8, end = 25) => {
    return Array.from({ length: end - start + 1 }, (_, i) => (i + start) / 10);
  };

  gramsOfProtein().forEach((value) => {
    const option = new Option(`${value} g`, value);

    gramOfProteinPerKgOfWeightElement.appendChild(option);
  });

  const gramOfFatPerKgOfWeightElement = document.getElementById(
    'gramOfFatPerKgOfWeight'
  );

  const gramsOfFat = (start = 10, end = 20) => {
    return Array.from({ length: end - start + 1 }, (_, i) => (i + start) / 10);
  };

  gramsOfFat().forEach((value) => {
    const option = new Option(`${value} g`, value);

    gramOfFatPerKgOfWeightElement.appendChild(option);
  });
};
