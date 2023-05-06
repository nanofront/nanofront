La función `createProject` es responsable de configurar y crear un nuevo proyecto. Recibe un array de argumentos `optionsArg` y sigue los siguientes pasos:

1. Convierte los argumentos en opciones utilizando la función `parseArgumentsIntoOptions`.
2. Comprueba si hay opciones faltantes y, de ser necesario, solicita al usuario completarlas con la función `promptForMissingOptions`.
3. Establece el directorio de destino del proyecto.
4. Obtiene la ubicación del directorio de plantillas del proyecto.
5. Crea una instancia de `Listr` que contiene varias tareas para ejecutar:
   - Copiar los archivos de plantilla del proyecto al directorio de destino utilizando la función `copyTemplateFiles`.
   - Inicializar un repositorio de Git en el directorio del proyecto con la función `initGitRepo`. Esta tarea solo se ejecuta si la opción `git` está habilitada.
   - _(Opcional)_ Instalar dependencias del proyecto. Esta tarea está comentada en el código proporcionado y, si estuviera activa, se ejecutaría utilizando la función `installPackages` solo si la opción `install` está presente.
6. Ejecuta las tareas en la instancia de `Listr`.
7. Si todo se completa correctamente, muestra un mensaje de éxito. Si ocurre algún error, muestra un mensaje de error.

Al ejecutar esta función, se crea un nuevo proyecto con la estructura y los archivos necesarios, según la plantilla seleccionada y las opciones proporcionadas por el usuario.
