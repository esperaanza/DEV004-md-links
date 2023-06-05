import { existsPath, absolutePath, isFile, getMdFiles, getLinks } from '../api'; // Importa las funciones que deseas probar

describe('existsPath', () => {
  it('should return true for an existing path', () => {
    return Promise.resolve(existsPath('C:/Users/Esperanza/proyecto/DEV004-md-links/Directory'))
      .then(result => {
        expect(result).toBe(true);
      });
  });

  it('should return false for a non-existing path', () => {
    return Promise.resolve(existsPath('/path/to/non-existing/file'))
      .then(result => {
        expect(result).toBe(false);
      });
  });
});

describe('absolutePath', () => {
  it('should return an absolute path', () => {
  return Promise.resolve(absolutePath('Directory'))
    .then(result => {
      expect(result.replace(/\\/g, '/')).toBe('C:/Users/Esperanza/proyecto/DEV004-md-links/Directory');
    });
});
});

describe('isFile', () => {
  it('should return true for a file path', () => {
    return Promise.resolve(isFile('C:/Users/Esperanza/proyecto/DEV004-md-links/Directory/README.md'))
      .then(result => {
        expect(result).toBe(true);
      });
  });

  it('should return false for a directory path', () => {
    return Promise.resolve(isFile('C:/Users/Esperanza/proyecto/DEV004-md-links/Directory'))
      .then(result => {
        expect(result).toBe(false);
      });
  });
});

describe('getMdFiles', () => {
it('should return an array of Markdown files', () => {
  const expected = [
    'C:\\Users\\Esperanza\\proyecto\\DEV004-md-links\\Directory\\archivo.md',
    'C:\\Users\\Esperanza\\proyecto\\DEV004-md-links\\Directory\\README.md'
  ];
  return Promise.resolve(getMdFiles('C:/Users/Esperanza/proyecto/DEV004-md-links/Directory'))
    .then(result => {
      const normalizedExpected = expected.map(path => path.replace(/\\/g, '/'));
      const normalizedResult = result.map(path => path.replace(/\\/g, '/'));
      expect(normalizedResult).toEqual(normalizedExpected);
    });
});
});
describe('getLinks', () => {
  it('should return an array of links from a file', () => {
    return Promise.resolve( getLinks('C:/Users/Esperanza/proyecto/DEV004-md-links/Directory/README.md'))
      .then(result => {
        expect(result).toEqual([
          {
          file: "C:/Users/Esperanza/proyecto/DEV004-md-links/Directory/README.md",
          href: "https://es.wikipedia.org/wiki/Markdown",
          text: "Markdown",
            },
          {
          file: "C:/Users/Esperanza/proyecto/DEV004-md-links/Directory/README.md",
          href: "https://nodejs.org/",
          text: "Node.js",
          },
          {
          file: "C:/Users/Esperanza/proyecto/DEV004-md-links/Directory/README.md",
          href: "https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg",
          text: "md-links",
          },
          {
          file: "C:/Users/Esperanza/proyecto/DEV004-md-links/Directory/README.md",
          href: "https://nodejs.org/es/",
          text: "Node.js",
          },
          {
          file: "C:/Users/Esperanza/proyecto/DEV004-md-links/Directory/README.md",
          href: "https://developers.google.com/v8/",
          text: "motor de JavaScript V8 de Chrome",
          },
          {
          file: "C:/Users/Esperanza/proyecto/DEV004-md-links/Directory/README.md",
          href: "https://curriculum.laboratoria.la/es/topics/javascript/04-arrays",
          text: "Arreglos",
          },
          {
          file: "C:/Users/Esperanza/proyecto/DEV004-md-links/Directory/README.md",
          href: "https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/",
          text: "Array - MDN",
          },
          {
          file: "C:/Users/Esperanza/proyecto/DEV004-md-links/Directory/README.md",
          href: "https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/sort",
          text: "Array.prototype.sort() - MDN",
          },
          {
          file: "C:/Users/Esperanza/proyecto/DEV004-md-links/Directory/README.md",
          href: "https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach",
          text: "Array.prototype.forEach() - MDN",
          },
          {
          file: "C:/Users/Esperanza/proyecto/DEV004-md-links/Directory/README.md",
          href: "https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/map",
          text: "Array.prototype.map() - MDN",
          },
          {
          file: "C:/Users/Esperanza/proyecto/DEV004-md-links/Directory/README.md",
          href: "https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/filter",
          text: "Array.prototype.filter() - MDN",
          },
          {
          file: "C:/Users/Esperanza/proyecto/DEV004-md-links/Directory/README.md",
          href: "https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce",
          text: "Array.prototype.reduce() - MDN",
          },
          {
          file: "C:/Users/Esperanza/proyecto/DEV004-md-links/Directory/README.md",
          href: "https://curriculum.laboratoria.la/es/topics/javascript/05-objects/01-objects",       
          text: "Objetos en JavaScript",
          },
        ]);
      });
    })
  });