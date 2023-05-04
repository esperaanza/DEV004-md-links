import { mdLinks }from '../index';



describe('mdLinks', () => {
  it('debe resolver la ruta absoluta para una ruta válida', async () => {
    const ruta = 'C:\\Users\\Esperanza\\Documents\\National Instruments';
    const result = await mdLinks(ruta);
    expect(result).toBe('Ruta absoluta');
  });

  it('debe rechazar la promesa para una ruta no existente', async () => {
    const ruta = 'C:\\Ruta\\No\\Existente';
    try {
      return await mdLinks(ruta);
    } catch (error) {
      expect(error).toBe('La ruta no existe');
    }
  });
});