import { existsSync, statSync, readdirSync, readFile } from "fs";
import { isAbsolute, resolve, extname, join } from "path";
import fetch from "node-fetch";

export const existsPath = (link) => existsSync(link);

export const absolutePath = (link) => (isAbsolute(link) ? link : resolve(link));

export const isFile = (link) => statSync(link).isFile();

const isDirectory = (link) => statSync(link).isDirectory();

const readDir = (link) => readdirSync(link);

const extensionMd = (link) => extname(link) === ".md";

export const getMdFiles = (link) => {
    let mdArrayFiles = [];
    if (!isDirectory(link) && extensionMd(link)) {
        const absoluteFile = absolutePath(link);
        mdArrayFiles.push(absoluteFile);
    } else if (isDirectory(link)) {
        const files = readDir(link);
        for (const file of files) {
            const joinedPath = join(link, file);
            const absoluteLink = absolutePath(joinedPath);
            mdArrayFiles.push(...getMdFiles(absoluteLink));
        }
    }

    return mdArrayFiles;
};
// console.log(
//     getMdFiles("C:/Users/Esperanza/proyecto/DEV004-md-links/Directory")
// );

const readFiles = (link) =>
    new Promise((resolve, reject) => {
        readFile(link, "utf-8", (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });

export const getLinks = (link) =>
    new Promise((resolve, reject) => {
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



// funcion para validar los links
export const validateLink = (arrayAllLinks) => {
    
    let arrayPromises = [];
    
    arrayPromises = arrayAllLinks.map((link) => fetch(link.href)
        .then((result) => {
                if (result) {
                return {
                    Href: link.href,
                    Text:link.text,
                    status: result.status,
                    message:'OK',
                }
            }
            
        }).catch((error) => {
            return {
                link,
                status: 'FAIL',
                message: error.code,
            }
        }))
    return Promise.all(arrayPromises);
}
//prueba de desarrollo
// getLinks('C:/Users/Esperanza/proyecto/DEV004-md-links/Directory/README.md').then(((res) => (validateLink(res).then(((resolve) => console.log(resolve))))));
