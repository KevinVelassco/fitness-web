export const LoaderComponent = () => {
  const $loader = document.getElementById('loader');

  const $loaderElement = document.createElement('div');
  $loaderElement.classList.add('loader');
  $loader.appendChild($loaderElement);
};

export const UnmountLoaderComponent = () => {
  const $loader = document.getElementById('loader');

  if ($loader.hasChildNodes()) $loader.removeChild($loader.firstChild);
};
