import { existsPath, absolutePath, getMdFiles, getLinks, validateLink } from './api.js'

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
mdLinks('Users/Esperanza/proyecto/DEV004-md-links/Directory', { validate: true })
    .then((resolve) => { console.log(resolve) })
    .catch((error) => { console.log(error) });



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