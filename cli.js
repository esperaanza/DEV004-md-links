
// traemos funciones y creamos constantes para usar los colores de chalk y figlet
import { mdLinks,stats, statsValidate } from './index.js';
import chalk from 'chalk';
import figlet from 'figlet';

// Accede a las exportaciones de 'figlet' utilizando la notación de puntos
const textSync = figlet.textSync;

// Accede a las exportaciones de 'chalk' utilizando la notación de puntos
const bold = chalk.bold;

// para solo escribir log en vez de console.log
const { log } = console;
const red = bold.bgRed;
const green = bold.bgGreenBright;
const greenB = bold.greenBright;
const blue = bold.bgBlueBright;
const blueC = bold.bgCyanBright;
const yellow = bold.bgYellowBright;
const pink = bold.magenta;
const pinkB = bold.bgMagentaBright;

// letras grandes con figlet - mensaje bienvenida
const msn = (msn) => {
    log(pink(textSync(msn, {
        font: 'ANSI Shadow',
        horizontalLayout: 'default',
        verticalLayout: 'default'
    })));
}
// mensaje de ayuda con figlet
const msn1 = (msn1) => {
    log(greenB(textSync(msn1, {
        font: 'ANSI Shadow',
        horizontalLayout: 'default',
        verticalLayout: 'default'
    })));
}

const instructions = () => {
    msn('MDlinks');
    log(pinkB('Please follow the instructions in the terminal to start: \n'));
    log(pink('1. Type the command "mdlinks", then submit a valid path (for example: /Users/Esperanza/proyecto/DEV004-md-links/Directory ). \n'));
    log(pink('2. To view how many links there are and how many of them are unique, type "--stats" or "--s" after the path. \n'));
    log(pink('3. To view how many valid links exist, type "--validate" or "--v" after the path.\n'));
    log(pink('4. To view how many links are broken in your .md file, type "--stats --validate" or "--v --s" after the path.\n'));
    log(pinkB('5. If you need help to remember the commands, type "mdlinks --help" or "--h" \n'));
}

const msnHelp = () => {
    msn1('Help Zone')
    log(green('We are here to help you remember the commands:\n'));
    log(greenB('"--validate" or "--v"               -->  displays an array with links and status \n'));
    log(greenB('"--stats" or "--s"                  -->  displays total and unique links \n '));
    log(greenB('"--stats --validate" or "--v --s"   -->  displays total,unique, and broken links \n'));
    log(greenB('"--help" or "--h"                   -->  displays this text \n'));
    log(yellow('Remember commands are written in lower case! \n'));
}

// process.argv se utiliza para pasar los argumentos al proceso node.js cuando se ejecuta en la línea de comandos.
const option = process.argv.slice(2);
// posicion 2 para agarrar el path
const path = process.argv[2];

// funcion de cli que llama a mdLinks y funciones de opciones
const cli = (path, option) => {
    // opciones para que el usuario introduzca
    const optValidate = option.includes('--validate') || option.includes('--v');
    const optStats = option.includes('--stats') || option.includes('--s');
    const opHelp = option.includes('--help') || option.includes('--h')
    // Mensaje de error
    const msnError = (error) => { log(red(`${error}`)); }
    // si el path es indefinido muestro las instrucciones
    if (path == undefined) {
        log(instructions());
        // si el usuario pone la opcion de help mostramos los comandos
    } if (opHelp) {
        log(msnHelp())
        // si el usuario pone la opcion --s --v mostramos los resultados del total de links, unicos y rotos
    } if (optStats && optValidate) {
        mdLinks(path, { validate: true })
            .then((results) => {
                const opstatsValidate = statsValidate(results)
                log(blueC(`          Total: ${opstatsValidate.total}             \n          Unique: ${opstatsValidate.unique}            \n          Broken: ${opstatsValidate.broken}            `))
            })
            .catch((error) => {
                log(msnError, error)
            })
        return
        // si el usuario pone la opcion --s mostramos los resultados del total de links y unicos
    } if (optStats) {
        mdLinks(path, { validate: false })
            .then((results) => {
                const onlyStats = stats(results)
                log(blueC(`                    Total: ${onlyStats.total}   &   Unique: ${onlyStats.unique}                     `))
            })
            .catch((error) => {
                log(msnError, error)
            })
        return
        // si el usuario pone la opcion --v mostramos el array de links con file, href, mensaje, status y texto
    } if (optValidate) {
        mdLinks(path, { validate: true })
            .then((results) => {
                results.forEach(elem => {
                    log(blue((`\nFile: ${elem.file} `) + `\nHref: ${elem.href} ` + `\nMessage: ${elem.message} ` + `\nStatus: ${elem.status} ` + `\nText: ${elem.text} `))
                })
            })
            .catch((error) => {
                log(msnError, error)
            })
        return
        // si a el path no se le pone opcion se muestra el array de los links con file, href y mensaje
    } else {
        mdLinks(path, { validate: false })
            .then((results) => {
                results.forEach(elem => {
                    log(blue((`\nFile: ${elem.file} `) + `\nHref: ${elem.href} ` + `\nText: ${elem.text.slice(0, 50)}`))
                });
            })
            .catch((error) => {
                log(msnError, error)
            })
        return
    }
}
// llamamos a la funcion
cli(path, option)





// import { green, red } from 'chalk';
// import { getNumberOfLinks, getUniqueLinks, getNumberOfBrokenLinks } from '';
// const ok = green;
// const fail = red;

// import { mdLinks } from './index';

// const path = process.argv[2];

// const options = {
//     validate: process.argv.includes('--validate') || process.argv.includes('--v'),
//     stats: process.argv.includes('--stats') || process.argv.includes('--s'),
//     help: process.argv.includes('--help'),
// };



// if (options.help) {
//     console.log(`
//   Usage: md-links <path-to-file> [options]
//   +____________________+_________________________________________________________+
//   |      Comands       |                         Output                          |
//   +____________________+_________________________________________________________+
//   | --stats            | Print total and unique links.                           |
//   +____________________+_________________________________________________________+
//   | --validate         | Print href, text, file, message(ok or fail) and status. |
//   +____________________+_________________________________________________________+
//   | --validate --stats | Print total, unique and broken links.                   |
//   +____________________+_________________________________________________________+
//   | --stats --validate | Print total, unique and broken links.                   |
//   +____________________+_________________________________________________________+
//   | --help             | Print comands list.                                     |
//   +____________________+_________________________________________________________+
//   `);
// } else if (options.validate && !(options.stats)) {
//     mdLinks(path, options)
//         .then((links) => {
//             links.forEach((link) => {
//                 console.log(`
//         href: ${link.href} 
//         text: ${link.text}
//         file: ${link.file}
//         status: ${link.status}
//         message: ${link.message === 'ok' ? ok(link.message) : fail(link.message)}
//         `);
//             });
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// } else if (options.stats && !(options.validate)) {
//     mdLinks(path, options)
//         .then((links) => {
//             console.log(`
//       Total: ${getNumberOfLinks(links)}
//       Unique: ${getUniqueLinks(links)}
//       `);
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// } else if ((options.stats) && (options.validate)) {
//     mdLinks(path, options)
//         .then((links) => {
//             console.log(`
//       Total: ${getNumberOfLinks(links)}
//       Unique: ${getUniqueLinks(links)}
//       Broken: ${getNumberOfBrokenLinks(links)}
//       `);
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// } else {
//     console.log('⚠ Invalid comand. If you need help, please type  md-links --help');
// }