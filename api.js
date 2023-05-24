import { existsSync, statSync, readdirSync, readFileSync, readFile } from "fs";
import { isAbsolute, resolve, extname, join } from "path";
import chalk from "chalk";
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

// getLinks('C:/Users/Esperanza/proyecto/DEV004-md-links/Directory/README.md')
//     .then((res) => console.log('los link md', res))
//     .catch((error) => console.error(error));
// C:/Users/Esperanza/proyecto/DEV004-md-links/Directory
// C:/Users/Esperanza/proyecto/DEV004-md-links/README.md

// const getLinks = (link) => {
//     return new Promise((resolve, reject) => {
//         readFiles(link)
//             .then((data) => {
//                 const md = new MarkdownIt();
//                 const tokens = md.parse(data, {});

//                 const links = tokens
//                     .filter((token) => token.type === 'inline' && token.tag === 'a')
//                     .map((token) => ({
//                         href: token.attrs[0][1],
//                         text: token.children[0].content,
//                         file: link,
//                     }));

//                 resolve(links);
//             })
//             .catch((error) => {
//                 reject(error);
//             });
//     });
// };

// getLinks('C:/Users/Esperanza/proyecto/DEV004-md-links/Directory/README.md')
//     .then((links) => {
//         console.log('Los enlaces MD son:', links);
//     })
//     .catch((error) => {
//         console.error(error);
//     });

// const getLinks = (link) => {
//     return new Promise((resolve, reject) => {
//         readFiles(link)
//             .then((data) => {
//                 const ast = parse(data);

//                 const links = [];

//                 const findLinks = (node) => {
//                     if (node.type === 'link') {
//                         links.push({
//                             href: node.url,
//                             text: node.text,
//                             file: link,
//                         });
//                     }

//                     if (node.children) {
//                         node.children.forEach((child) => {
//                             findLinks(child);
//                         });
//                     }
//                 };

//                 findLinks(ast);

//                 resolve(links);
//             })
//             .catch((error) => {
//                 reject(error);
//             });
//     });
// };

// getLinks('C:/Users/Esperanza/proyecto/DEV004-md-links/Directory/README.md')
//     .then((links) => {
//         console.log('Los enlaces MD son:', links);
//     })
//     .catch((error) => {
//         console.error(error);
//     });

// funcion para validar los links
export const validateLink = (arrayAllLinks) => {
    
    let arrayPromises = [];
    
    arrayPromises = arrayAllLinks.map((link) => fetch(link.href)
        .then((result) => {
                if (result) {
                return {
                    link,
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
// prueba de desarrollo
// getLinks('C:/Users/Esperanza/proyecto/DEV004-md-links/Directory/README.md').then(((res) => (validateLink(res).then(((resolve) => console.log(resolve))))));
