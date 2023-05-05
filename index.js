import { existsSync, readFile, readdirSync, statSync } from 'fs';
import { resolve, extname, isAbsolute } from 'path';
import chalk from 'chalk';
import { promisify } from 'util';

// valida si existe la ruta
const validatePath = (path) => existsSync(path);

// ver si la ruta es absoluta, si es relativa se convierte
const resolveRelativePath = (path) => {
  if (isAbsolute(path)) {
    return path;
  } else {
    return resolve(path);
  }
};

// valida si es directorio
const validateDirectory = (absolutePath) => statSync(absolutePath).isDirectory();

// valida si es un archivo md
const validateMDFile = (filePath) => extname(filePath) === '.md';

// lee el archivo y busca los links
const readFileAndSearchLinks = (filePath) => {
  const promisifiedReadFile = promisify(readFile);
  return promisifiedReadFile(filePath, 'utf-8').then((result) => {
    console.log({ filePath, result });
  }).catch((err) => {
    console.error(err);
    throw err;
  });
};

// lista archivos del directorio
const listFilesFromDirectory = (absolutePath) => {
  const files = readdirSync(absolutePath);
  const promises = files.map((file) => {
    const path = `${absolutePath}/${file}`;
    if (validateDirectory(path)) {
      return listFilesFromDirectory(path);
    } else if (validateMDFile(path)) {
      return readFileAndSearchLinks(path);
    } else {
      return Promise.resolve();
    }
  });
  return Promise.all(promises);
};

export const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    if (!validatePath(path)) {
      reject(new Error('Invalid path'));
      return;
    }
    console.log('Path exists');
    const absolutePath = resolveRelativePath(path);
    console.log('Path absolute', absolutePath);
    if (validateDirectory(absolutePath)) {
      console.log(chalk.bgHex('#69FF63').bold('is directory'));
      listFilesFromDirectory(absolutePath).then(() => {
        resolve('OK directory');
      }).catch((err) => {
        reject(err);
      });
    } else if (validateMDFile(absolutePath)) {
      console.log('is md file');
      readFileAndSearchLinks(absolutePath).then(() => {
        resolve('OK file');
      }).catch((err) => {
        reject(err);
      });
    } else {
      reject(new Error('Invalid path'));
    }
  });
};

const path = '/Users/Esperanza/proyecto/DEV004-md-links';
mdLinks(path)
  .then((result) => console.log(result))
  .catch((error) => console.log(error));

  // import { resolve, extname, isAbsolute } from 'path';
// import chalk from 'chalk';


// // valida si existe la ruta
// const validatePath = (path) => existsSync(path);

//  // ver si la ruta es absoluta, si es relativa se convierte
// const resolveRelativePath = (path) => {
//    if(isAbsolute(path)) /* <is absolute path?> */ {
//     return path;
//    } else {
//     return resolve(path);
//    }
// }
// //valida si es directorio
// const validateDirectory = (absolutePath) => statSync(absolutePath).isDirectory();

// //valida si es un archivo md
// const validateMDFile = (filePath) => extname(filePath) === ".md"; 

// //lee el archivo y busca los links
// const readFileAndSearchLinks = (filePath) => {
//   readFile(filePath, 'utf-8', (err, result) => {
//     if (err) {
//       console.error(err);
//       return;
//     } else {
//       console.log({filePath, result})
//     }
//   })
// }
// //lista archivos del directorio
// const listFilesFromDirectory = (absolutePath) => {
//      const files = readdirSync(absolutePath) 
//      files.forEach(file => {
//        const path = `${absolutePath}/${file}` // concatenamos el path del directorio con el nombre del archivo/directorio
//       if(validateDirectory(path)){
//         listFilesFromDirectory(path); // recursividad
//       } else if (validateMDFile(path)) { // si es md se lee el archivo
//         readFileAndSearchLinks(path)
//       } 
//   })
// }

// export const mdLinks = (path, options) => {
//   return new Promise((resolve, reject) => { 
//     if (!validatePath(path)) /* <Path exists> */ {
//       reject(new Error('dont exist path'));
//       return;
//     } 
//     console.log('path exists');
//     const absolutePath = resolveRelativePath(path); /* <is abosolute path?> */
//     console.log('path absolute', absolutePath);

//       // probar si es un directorio o un archivo
//     if(validateDirectory(absolutePath)) /* <is directory?> */ {
//       console.log(chalk.bgHex('#69FF63').bold('is directory    '));
//        //leemos directorio
//        listFilesFromDirectory(absolutePath);
//        resolve('ok directory')
//     } else if(validateMDFile(absolutePath)) /*<is md?>*/ {
//       console.log('is md file');
//       resolve('ok file')
//     } else {
//       reject('invalid path');
//     }
//   })
// }
// const path = '/Users/Esperanza/proyecto/DEV004-md-links';



// mdLinks(path) // consumiendo la promesa
// .then(result => console.log(result))
// .catch(error => console.log(error))



// import { resolve as _resolve, isAbsolute as _isAbsolute } from 'path';
// import { existsSync } from 'fs';

// export function mdLinks(route) {
//   return new Promise((resolve, reject) => {
//     let absolutePath = _resolve(route);
//     let isAbsolute = _isAbsolute(absolutePath);
//     let isExisting = existsSync(absolutePath);
//     let result;

//     if (!isExisting) {
//       result = 'La ruta no existe';
//     } else if (isAbsolute) {
//       result = 'Ruta absoluta';
//     } else {
//       result = 'Ruta relativa';
//     }
//     console.log (resolve(result));
//     console.log('hola')
//   });
// // }
// mdLinks('C:\Users\Esperanza\proyecto\DEV004-md-links\README.md')
//   .then(result => console.log(result))
//   .catch(error => console.error(error));
