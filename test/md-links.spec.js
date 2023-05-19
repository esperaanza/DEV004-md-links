import { mdLinks } from '../index';



describe('mdLinks', () => {
  it('El directorio válido resuelve la promesa con "directorio ok', () => {
    const path = 'C:/Users/Esperanza/proyecto/DEV004-md-links/Directory';
    return mdLinks(path).then(result => {
      expect(result).toBe('ok directory');
    });
  });
  it('El archivo MD válido resuelve la promesa con "archivo ok"', () => {
    const path = 'C:/Users/Esperanza/proyecto/DEV004-md-links/Directory/README.md';
    return mdLinks(path).then(result => {
      expect(result).toBe('ok file');
    });
  });

  it('ruta no válida rechaza la promesa con errorse con "archivo ok"', () => {
    const path = 'path/to/invalid/path';
    return mdLinks(path).catch(error => {
      expect(error).toEqual(new Error('dont exist path'));
    });
  });

  // it('debe rechazar la promesa para una ruta no existente', async () => {
  //   const ruta = 'C:\\Ruta\\No\\Existente';
  //   try {
  //     return await mdLinks(ruta);
  //   } catch (error) {
  //     expect(error).toBe('La ruta no existe');
  //   }
  // });
});