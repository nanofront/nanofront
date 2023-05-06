import { addCodeSupport } from "../../src/build/add-code-support";
import fs from 'fs';
import mock from 'mock-fs';

describe('addCodeSupport', () => {
  beforeEach(() => {
    // Configurar un sistema de archivos simulado antes de cada prueba
    mock({
      '/test-directory': {
        'test-file.ts': 'console.log("test");',
      },
    });
  });

  afterEach(() => {
    // Restablecer el sistema de archivos real después de cada prueba
    mock.restore();
  });

  test('crea archivos de puntos de entrada en el directorio "client" para archivos en el directorio proporcionado', async () => {
    const directory = '/test-directory';

    const entryPoints = await addCodeSupport(directory);

    // Comprueba si se ha creado el directorio "client"
    expect(fs.existsSync('/test-directory/client')).toBeTruthy();

    // Comprueba si se ha creado el archivo de punto de entrada en el directorio "client"
    expect(fs.existsSync('/test-directory/client/test-file.ts')).toBeTruthy();

    // Comprueba si el array devuelto contiene la ruta correcta del archivo de punto de entrada
    expect(entryPoints).toEqual(['/test-directory/client/test-file.ts']);
  });
});