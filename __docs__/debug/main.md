La función `debugProject` es responsable de iniciar el modo de depuración del proyecto, lo que incluye volver a construir y ejecutar el proyecto cuando se detecten cambios en los archivos. Recibe un array de argumentos `optionsArg` y sigue los siguientes pasos:

1. Convierte los argumentos en opciones utilizando la función `parseArgumentsIntoOptions`.
2. Comprueba si hay opciones faltantes y, de ser necesario, solicita al usuario completarlas con la función `promptForMissingOptions`.
3. Establece el directorio de destino del proyecto.
4. Construye el proyecto utilizando la función `buildProject`.
5. Ejecuta el proyecto utilizando la función `runProject` y guarda la función `defineStuff` que devuelve.
6. Crea un observador de archivos (`fs.watch`) que monitorea el directorio de destino de forma recursiva.
   - Cuando se detecta un cambio en un archivo `.jsx`, realiza lo siguiente:
     1. Muestra un mensaje indicando qué archivo ha cambiado.
     2. Cierra el servidor.
     3. Vuelve a construir el proyecto utilizando la función `buildProject`.
     4. Ejecuta el proyecto llamando a la función `defineStuff`.

Al ejecutar esta función, el proyecto entrará en modo de depuración y se reconstruirá y volverá a ejecutar automáticamente cada vez que se detecten cambios en los archivos `.jsx`.
