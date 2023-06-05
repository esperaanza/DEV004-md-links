<p align="center">
<h1 style="color:pink;">Markdown Links</h1>
</p>
<p align="center">
  <img src="./thumb.png">
</p>

## Contenido

* [1. Preámbulo](#1-preámbulo)
* [2. Resumen del proyecto](#2-resumen-del-proyecto)
* [3. Objetivos de aprendizaje](#3-objetivos-de-aprendizaje)
* [4. Consideraciones generales](#4-consideraciones-generales)
* [5. Criterios de aceptación mínimos del proyecto](#5-criterios-de-aceptación-mínimos-del-proyecto)
* [6. Entregables](#6-entregables)
* [7. Hacker edition](#7-hacker-edition)
* [8. Pistas, tips y lecturas complementarias](#8-pistas-tips-y-lecturas-complementarias)
* [9. Checklist](#9-checklist)
* [10. Achicando el problema](#10-achicando-el-problema)

***

## 1. Preámbulo

 Markdown es un lenguaje de marcado ligero muy usado en plataformas de texto plano como GitHub, blogs y foros. Se propone crear una herramienta en Node.js para leer archivos Markdown, verificar los links que contienen y reportar estadísticas. Esto sería útil para detectar links rotos en proyectos o facturas digitales. La herramienta buscaría y validaría los links, generando informes sobre su validez. Así se mejoraría la calidad de la información compartida y se facilitaría la corrección de enlaces rotos.
## 2. Resumen del proyecto


## 3. Objetivos de aprendizaje

Reflexiona y luego marca los objetivos que has llegado a entender y aplicar en tu proyecto. Piensa en eso al decidir tu estrategia de trabajo.

### JavaScript

- ✔️ **Diferenciar entre tipos de datos primitivos y no primitivos**

- ✔️ **Arrays (arreglos)**

- ✔️ **Objetos (key, value)**

- ✔️ **Uso de condicionales (if-else, switch, operador ternario, lógica booleana)**
 
- ✔️ **Funciones (params, args, return)**

- ✔️ **Recursión o recursividad**

- ✔️ **Módulos de CommonJS**
 
- ✔️ **Diferenciar entre expresiones (expressions) y sentencias (statements)**

- ✔️ **Callbacks**

- ✔️ **Promesas**

- ✔️ **Pruebas unitarias (unit tests)**
  
- ✔️ **Pruebas asíncronas**

- ✔️ **Uso de mocks y espías**

- ✔️ **Pruebas de compatibilidad en múltiples entornos de ejecución**

- ✔️ **Uso de linter (ESLINT)**

- ✔️ **Uso de identificadores descriptivos (Nomenclatura y Semántica)**

### Node.js

- ✔️ **Instalar y usar módulos con npm**

- ✔️ **Configuración de package.json**

- ✔️ **Configuración de npm-scripts**

- ✔️ **process (env, argv, stdin-stdout-stderr, exit-code)**

- ✔️ **File system (fs, path)**


### Control de Versiones (Git y GitHub)

- ✔️ **Git: Instalación y configuración**

- ✔️ **Git: Control de versiones con git (init, clone, add, commit, status, push, pull, remote)**

- ✔️ **Git: Integración de cambios entre ramas (branch, checkout, fetch, merge, reset, rebase, tag)**

- ✔️ **GitHub: Creación de cuenta y repos, configuración de llaves SSH**

- ✔️ **GitHub: Colaboración en Github (branches | forks | pull requests | code review | tags)**

- ✔️ **GitHub: Organización en Github (projects | issues | labels | milestones | releases)**

### HTTP

- ✔️ **Consulta o petición (request) y respuesta (response).**

- ✔️ **Códigos de status de HTTP**

## 4. Consideraciones generales

Cree una herramienta usando Node.js, que lee y analiza archivos en formato Markdown, para verificar los links que contengan y reportar algunas estadísticas.
### Tecnologías usadas para la realización de este proyecto
<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" > <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" >
 <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" >
 <img src="https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white" >
 <img src = "https://camo.githubusercontent.com/fbc3df79ffe1a99e482b154b29262ecbb10d6ee4ed22faa82683aa653d72c4e1/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4769744875622d3130303030303f7374796c653d666f722d7468652d6261646765266c6f676f3d676974687562266c6f676f436f6c6f723d7768697465">
 <img src="https://camo.githubusercontent.com/55037e0ff8e2c9df84ad631c3d0443a7316776ede7459a5872ccb336d7df2781/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6e706d2d4342333833373f7374796c653d666f722d7468652d6261646765266c6f676f3d6e706d266c6f676f436f6c6f723d7768697465">
 <img src="https://camo.githubusercontent.com/42ada9cc774b9d2b4cf35691820a881d70657ae42c3a074f00c7e9add6352361/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f56697375616c5f53747564696f5f436f64652d3030373844343f7374796c653d666f722d7468652d6261646765266c6f676f3d76697375616c25323073747564696f253230636f6465266c6f676f436f6c6f723d7768697465">
 <img src="https://user-images.githubusercontent.com/113950323/216749349-af362b16-0109-482c-881d-af3103ad9cbe.png">


## 5. Criterios de aceptación mínimos del proyecto

Para comenzar este proyecto tendrás que hacer un **_fork_** y **_clonar_** este
repositorio.

Antes de comenzar a codear, es necesario crear un **plan de acción**. Esto debería
quedar detallado en el `README.md` de tu repo y en una serie de **_issues_**
y **_milestones_** para priorizar y organizar el trabajo, y para poder hacer
seguimiento de tu progreso.

Dentro de cada **_milestone_** se crearán y asignarán los **_issues_** que cada quien
considere necesarios.

### Archivos del proyecto

* `README.md` con descripción del módulo, instrucciones de instalación/uso,
  documentación del API y ejemplos. Todo lo relevante para que cualquier
  developer que quiera usar tu librería pueda hacerlo sin inconvenientes.
* `index.js`: Desde este archivo debes exportar **una** función (`mdLinks`).
* `package.json` con nombre, versión, descripción, autores, licencia,
  dependencias, scripts (pretest, test, ...), main, bin
* `.editorconfig` con configuración para editores de texto. Este archivo no se
  debe cambiar.
* `.eslintrc` con configuración para linter. Este archivo contiene una
  configuración básica para ESLint, si deseas agregar reglas adicionales
  como Airbnb deberás modificar este archivo.
* `.gitignore` para ignorar `node_modules` u otras carpetas que no deban
  incluirse en control de versiones (`git`).
* `test/md-links.spec.js` debe contener los tests unitarios para la función
  `mdLinks()`. Tu inplementación debe pasar estos tets.

## Este proyecto consta de DOS partes

### 1) JavaScript API

El módulo debe poder **importarse** en otros scripts de Node.js y debe ofrecer la
siguiente interfaz:

#### `mdLinks(path, options)`

##### Argumentos

* `path`: Ruta **absoluta** o **relativa** al **archivo** o **directorio**.
Si la ruta pasada es relativa, debe resolverse como relativa al directorio
desde donde se invoca node - _current working directory_).
* `options`: Un objeto con **únicamente** la siguiente propiedad:
  - `validate`: Booleano que determina si se desea validar los links
    encontrados.

##### Valor de retorno

La función debe **retornar una promesa** (`Promise`) que **resuelva a un arreglo**
(`Array`) de objetos (`Object`), donde cada objeto representa un link y contiene
las siguientes propiedades

Con `validate:false` :

* `href`: URL encontrada.
* `text`: Texto que aparecía dentro del link (`<a>`).
* `file`: Ruta del archivo donde se encontró el link.

Con `validate:true` :

* `href`: URL encontrada.
* `text`: Texto que aparecía dentro del link (`<a>`).
* `file`: Ruta del archivo donde se encontró el link.
* `status`: Código de respuesta HTTP.
* `ok`: Mensaje `fail` en caso de fallo u `ok` en caso de éxito.

#### Ejemplo (resultados como comentarios)

```js
const mdLinks = require("md-links");

mdLinks("./some/example.md")
  .then(links => {
    // => [{ href, text, file }, ...]
  })
  .catch(console.error);

mdLinks("./some/example.md", { validate: true })
  .then(links => {
    // => [{ href, text, file, status, ok }, ...]
  })
  .catch(console.error);

mdLinks("./some/dir")
  .then(links => {
    // => [{ href, text, file }, ...]
  })
  .catch(console.error);
```

### 2) CLI (Command Line Interface - Interfaz de Línea de Comando)

El ejecutable de nuestra aplicación debe poder ejecutarse de la siguiente
manera a través de la **terminal**:

`md-links <path-to-file> [options]`

Por ejemplo:

```sh
$ md-links ./some/example.md
./some/example.md http://algo.com/2/3/ Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html algún doc
./some/example.md http://google.com/ Google
```

El comportamiento por defecto no debe validar si las URLs responden ok o no,
solo debe identificar el archivo markdown (a partir de la ruta que recibe como
argumento), analizar el archivo Markdown e imprimir los links que vaya
encontrando, junto con la ruta del archivo donde aparece y el texto
que hay dentro del link (truncado a 50 caracteres).

#### Options

##### `--validate`

Si pasamos la opción `--validate`, el módulo debe hacer una petición HTTP para
averiguar si el link funciona o no. Si el link resulta en una redirección a una
URL que responde ok, entonces consideraremos el link como ok.

Por ejemplo:

```sh
$ md-links ./some/example.md --validate
./some/example.md http://algo.com/2/3/ ok 200 Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html fail 404 algún doc
./some/example.md http://google.com/ ok 301 Google
```

Vemos que el _output_ en este caso incluye la palabra `ok` o `fail` después de
la URL, así como el status de la respuesta recibida a la petición HTTP a dicha
URL.

##### `--stats`

Si pasamos la opción `--stats` el output (salida) será un texto con estadísticas
básicas sobre los links.

```sh
$ md-links ./some/example.md --stats
Total: 3
Unique: 3
```

También podemos combinar `--stats` y `--validate` para obtener estadísticas que
necesiten de los resultados de la validación.

```sh
$ md-links ./some/example.md --stats --validate
Total: 3
Unique: 3
Broken: 1
```


