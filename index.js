import { existsPath, absolutePath, getMdFiles, getLinks, validateLink, isFile } from './api.js'

//*inputs path y options
const mdLinks = (path, options) => {
    return new Promise((resolve, reject) => {
        if (!existsPath(path)) {
            reject('ERROR: Path does not exist');
            return;
        }

        const absPath = absolutePath(path);
        if (!isFile(absPath)) {
            reject('ERROR: Not a file');
            return;
        }

        getLinks(absPath)
            .then((linksArr) => {
                if (linksArr.length >= 1 && options.validate === true) {
                    validateLink(linksArr)
                        .then((validatedLinks) => resolve(validatedLinks))
                        .catch((error) => reject(error));
                } else if (linksArr.length >= 1 && (options.validate !== true || options == null)) {
                    resolve(linksArr);
                } else if (linksArr.length === 0) {
                    reject('ERROR: No links found');
                }
            })
            .catch((error) => reject(error));
    });
};

// Prueba de desarrollo para cuando option.validate es true
mdLinks('C:\\Users\\Esperanza\\proyecto\\DEV004-md-links\\Directory\\README.md', { validate: false })
    .then((resolve) => {
        console.log(resolve);
    })
    .catch((error) => {
        console.log(error);
    });


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
export {
    mdLinks, statsValidate, stats, validate
}