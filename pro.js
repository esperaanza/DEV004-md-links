// file system functions
import { existsSync, statSync, readdirSync, readFileSync, readFile } from 'fs';
// para funciones de las rutas
import { isAbsolute, resolve, extname, join } from 'path';
// para peticiones con http
import fetch from 'node-fetch';
// modulo jsom para recrear y manipular objetos en el DOM
// import jsdom from 'jsdom';
// // constructor de jsom con propiedades
// const { JSDOM } = jsdom;
// // modulo markdown it convertir texto escrito en formato HTML
// import md from 'markdown-it';
// import axios from 'axios'; 
// funcion para ver si la ruta existe, es asincrona
const existsPath = (link) => { return (existsSync(link)) };

// funcion para ver si la ruta es absoulta, si no lo es convertimos 
const absolutePath = (link) => {  return (isAbsolute(link)) ? link : resolve(link) };
// console.log(absolutePath('C:/Users/Esperanza/proyecto/DEV004-md-links/Directory'));

// funcion para ver si es un archivo 
const isFile = (link) => { return statSync(link).isFile(); };
//console.log(isFile('C:/Users/Esperanza/proyecto/DEV004-md-links/Directory'));

// funcion para ver si es un directorio
const isDirectory = (link) => { return statSync(link).isDirectory(); };
//console.log(isFile('C:/Users/Esperanza/proyecto/DEV004-md-links/Directory'));

// funcion para ver si es directorio
const readDir = (link) => { return (readdirSync(link)) };
//console.log(readDir('C:/Users/Esperanza/proyecto/DEV004-md-links/Directory'));

// Funcion para leer archivos
//const readFile = (link) => { return (readFileSync(link,{ encoding: "utf-8"}));};
//console.log(readFile('C:/Users/Esperanza/proyecto/DEV004-md-links/Directory/README.md'))

 // Checar extension .md de los archivos
const extensionMd = (link) => { return (extname(link) == '.md') }
// console.log(extensionMd('C:/Users/Esperanza/proyecto/DEV004-md-links/Directory'));
 // Buscando archivos .md
const getMdFiles = (link) => {
//   // creando array vacio para los archivos md
  let mdArrayFiles = [];
   // Revisar si el link es un archivo
    if (isDirectory(link) == false && extensionMd(link)) {
    // covertir a absoluto el path
    let absoluteFile = absolutePath(link);
    // agregar path a mi array
    mdArrayFiles.push(absoluteFile)
  } else if (isDirectory(link)) {
    // si es directorio vamos a leer archivos y encontrar los .md
    readDir(link).forEach((file) => {
      // unir los paths de cada archivo
      let joinedPaths = join(link, file);
      // convertirlos a absolutos
      let absoluteLinks = absolutePath(joinedPaths);
      // agregar links a mi array
      // (…) occurs in a function call or alike, it's called a "spread operator" and expands an array into a list.
      mdArrayFiles = [...mdArrayFiles, ...getMdFiles(absoluteLinks)]
    });
  }
  return mdArrayFiles;
}
// console.log(getMdFiles('C:/Users/Esperanza/proyecto/DEV004-md-links/Directory'));

const readFiles = (link) => new Promise((resolve, reject) => {
  readFile(link, 'utf-8', (err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }
  });
});

const getLinks = (link) => new Promise((resolve, reject) => {
  const links = [];
  readFiles(link)
    .then((data) => {
      const urlLinks = /\[(.+?)\]\((https?:\/\/[^\s]+)\)/g;
      let match = urlLinks.exec(data);
      while (match !== null) {
        links.push({
          href: match[2],
          text: match[1],
          file: link,
          
        });
        match = urlLinks.exec(data);
      }
      resolve(links); // Corrección: elimina los paréntesis aquí
    })
    .catch((error) => reject(error));
});

getLinks('C:/Users/Esperanza/proyecto/DEV004-md-links/Directory/README.md')
.then((res) => console.log('este es de aqui', res))
.catch((error) => console.error(error));

// funcion para traer todos los links de los archivos .md
// const getAllLinks = (link) => {
// // creamos array vacio para introducir links
//   let linksArr = [];
//   // vamos a recorrer cada archivo mdLinks para buscar los links
//   getMdFiles(link).forEach((file) => {
//        // creamos constante de expresiones regulares para poder extraer el link con https correctamente buscando este formato [texto del enlace](URL del enlace)
//        // '/' cuandp empieza y cuando termina,  'g' es una busqueda global, 'i' no distingue mayusculas de minusculas, 'm' es una busqueda multilenea
//       const urlLinks = /\[([^[]+)\](\(.*\))/gmi;
//       // creamos constante en donde guardaremos los links que encuentre y hagan match 
//       let linksTextArr = readFile(file).match(urlLinks); 
//       // si es diferente a cero
//       if (linksTextArr != null ) {
//           // convertimos el archivo .md en texto HTML usando el markdown it
//           let result = md().render(readFile(file));
//           // Recreamos el DOM con JSDOM para acceder y buscar los tags <a>
//           let dom = new JSDOM(result);
//           // rendereamos el archivo en el dom.window y su contenido y buscamos todos los elementos que tengan el tag de link <a> 
//           linksTextArr = dom.window.document.querySelectorAll('a');
//           // por cada link the encuentre     
//           linksTextArr.forEach((linksText) => {
//               // retorna solo el URL del link 
//               const links = linksText.href
//               // retorna el texto contenido en un elemento HTML de enlace <a> y limitar la cantidad de caracteres a los primeros 100 para que si es muy largo el link lo limite
//               const text = linksText.textContent.substring(0, 100);
//               // usamos push href, text y file al array de links y los vamos añadiendo
//               linksArr.push({
//                   href: links,
//                   text: text,
//                   file: file,
//               });
//           });
//       }
//   });
//   // retorna el array de links
//   return linksArr;
// }
// //prueba de desarrollo
// console.log(getAllLinks('C:/Users/Esperanza/proyecto/DEV004-md-links/Directory'))

//*funcion para validar los links

const validateLink = (arrayAllLinks) => {
  if (!Array.isArray(arrayAllLinks)) {
    return Promise.reject(new Error('El argumento no es un array válido.'));
  }
  // creo un array que va a contener las promesas
  let arrayPromises = [];
  // creamos un ciclo para que recorra cada link
  // usamos fetch para realizar solicitudes HTTP desde el servidor y obtener datos de recursos externos, ver is esta ok o fail
  arrayPromises = arrayAllLinks.map((link) => fetch(link.href)
    .then((result) => {
      // promesa redulta el resultado es OK
      if (result) {
        return {
          // agregamos a nuestro array estos elemento a nuestro arrayAllLinks el original
          // (…) occurs in a function call or alike, it's called a "spread operator" and expands an array into a list.
          link,
          status: result.status,
          message: result.statusText ? 'OK' : 'FAIL',
        }
      }
      // cuando la promesa no es resuelta el resultado es FAIL
    }).catch((error) => {
      return {
        link,
        status: 'FAIL',
        message: error.code,
      }
    }))
  return Promise.all(arrayPromises);
}

 //* funcion para --stats --validate
const statsValidate = (arrayAllLinks) => {
  // creo una constante que guarde todos los liks que estan rotos
  // los filtra por el estatus que sea == a FAIL
  const broken = arrayAllLinks.filter((link) => link.status == 'FAIL').length;
  // regresa un objeto con el total de los links rotos
  return {
    total: arrayAllLinks.length,
    // creamos un new Set para almacenar cuantos son los valores únicos que filtramos del arayAllLinks
    // usamos .size para traer el numero
    unique: new Set(arrayAllLinks.map((link) => link.href)).size,
    // mostramos el numero de los links que estan rotos
    broken: broken
  }
}

//* funcion para --stats
const stats = (arrayAllLinks) => {
  return {
    // traemos el numero total de todos los links del arrayAllLinks
    total: arrayAllLinks.length,
    // creamos un new Set para almacenar cuantos son los valores únicos que filtramos del arayAllLinks
    // usamos .size para traer el numero
    unique: new Set(arrayAllLinks.map((link) => link.href)).size,
  }
}

//* funcion para --validate
const validate = (arrayPromises) => {
  // del array que tenemos de promesas lo filtramos para traer la informacion de los links
  return arrayPromises.map((link) => {
    // mostramos el archivo, el link, el mensaje, el estatus, y el texto
    return `${link.file} ${link.href} ${link.message} ${link.status} ${link.text}`
  })
}

//*inputs path y options
const mdLinks = (path, options) => {
  //creo una nueva promesa
  return new Promise((resolve, reject) => {
    // Identificar si la ruta existe
    if (existsPath(path)) {
      // Si no es ruta absoluta, convertirla en absoluta
      const absPath = absolutePath(path)
      // Checar si es un solo archivo o directorio y filtrar archivos .md llamando a funcion getMdFiles
      const mdFilesArr = getMdFiles(absPath);
      // Si hay mas de un archivo .md recorrerlos 
      if (mdFilesArr.length >= 1) {
        // Leer archivos .md y extraer los links
        const linksArr = getLinks(absPath);
        // si hay mas de un link y se cumple la opcion de validar es true
        if (linksArr.length >= 1 && options.validate == true) {
          // resuelve aplicando la funcion validateLink a todos los links del array
          resolve((validateLink(linksArr)))
          // si hay mas de un link y la opcion de validar es falsa O nula
        } else if (linksArr.length >= 1 && (options.validate != true || options == null)) {
          // resuelve aplicando la funcion de getAllLinks a los paths absolutos y me muestra solo el array de links
          resolve((getLinks(absPath)))
        }
        // cuando el array sea igual a 0 manda el error que no encontro links
        else if (linksArr.length == 0) {
          reject('ERROR: NO PATH FOUND')
        }
      }
    }
  })
}

// prueba de desarrollo para cuando option. validate es true
// mdLinks('Users/Esperanza/proyecto/DEV004-md-links/Directory', {validate : true})
// .then((resolve) => { console.log(resolve)})
// .catch((error) => { console.log(error)});

// //?prueba de desarrollo para cuando option. validate es diferente a true O nula
// mdLinks('C:/Users/Esperanza/proyecto/DEV004-md-links/Directory/README.md', '')
// .then((resolve) => console.log(resolve))
// .catch((error) => console.log(error));

// //?prueba de desarrollo para cuando option. validate es diferente a true O undefined
// mdLinks('C:/Users/Esperanza/proyecto/DEV004-md-links/Directory/README.mdd', {validate : undefined})
// .then((resolve) => console.log(resolve))
// .catch((error) => console.log(error));

// //?prueba de desarrollo para cuando option. validate es falsa
// mdLinks('C:/Users/Esperanza/proyecto/DEV004-md-links/Directory/README.md', {validate : false})
// .then((resolve) => console.log(resolve))
// .catch((error) => console.log(error));

// //?prueba de desarrollo para cuando no encuentra links en el archivo .md
// mdLinks('C:/Users/Esperanza/proyecto/DEV004-md-links/Directory/archivo.md', {validate : true})
// .then((resolve) => console.log(resolve))
// .catch((error) => console.log(error));

// //?prueba de desarrollo para cuando path no existe
// mdLinks('C:/Users/Esperanza/proyecto/DEV004-md-links/Directory/README1.md', {validate : false})
// .then((resolve) => console.log(resolve))
// .catch((error) => console.log(error));









