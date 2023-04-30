/* eslint-disable no-console */
import mdLinks from './api';

// Ejemplo de uso con validate:false
mdLinks('./README.md', { validate: false })
  // eslint-disable-next-line no-console
  .then((links) => console.log(links))
  .catch((err) => console.error(err));

// Ejemplo de uso con validate:true
mdLinks('./README.md', { validate: true })
  .then((links) => console.log(links))
  .catch((err) => console.error(err));