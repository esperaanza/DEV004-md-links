import { existsPath, absolutePath, getMdFiles, getLinks, validateLink } from './api.js'

//*inputs path y options
const mdLinks = (path, options) => {

    return new Promise((resolve, reject) => {
        if (existsPath(path)) {
            const absPath = absolutePath(path)
            const mdFilesArr = getMdFiles(absPath);
                        console.log(mdFilesArr);
            if (mdFilesArr.length >= 1) {

                const linksArr = getLinks(absPath);

                if (linksArr.length >= 1 && options.validate == true) {

                    resolve((validateLink(linksArr)))

                } 
                  if (linksArr.length >= 1 && (options.validate != true || options == null)) {

                    resolve((getLinks(absPath)))
                }

                else if (linksArr.length == 0) {
                    reject('ERROR: NO PATH FOUND')
                }
            }
        }
    })
}

//prueba de desarrollo para cuando option
// mdLinks('Users/Esperanza/proyecto/DEV004-md-links/Directory', { validate: null})
//     .then((resolve) => { console.log(resolve) })
//     .catch((error) => { console.log(error) });
    
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
export{
    mdLinks, statsValidate, stats, validate
}