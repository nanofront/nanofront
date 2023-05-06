La función `buildProject` es responsable de construir el proyecto. Recibe un array de argumentos `optionsArg` y sigue los siguientes pasos:

1. Convierte los argumentos en opciones utilizando la función `parseArgumentsIntoOptions`.
2. Comprueba si hay opciones faltantes y, de ser necesario, solicita al usuario completarlas con la función `promptForMissingOptions`.
3. Establece el directorio de destino del proyecto y un subdirectorio temporal `temp-build` dentro del directorio de destino.
4. Crea un directorio temporal en el subdirectorio `temp-build` utilizando la función `createTemp`.
5. Utiliza la función `addCodeSupport` para agregar soporte de código a los archivos de fragmentos y páginas dentro del directorio temporal. La función devuelve los puntos de entrada para cada fragmento y página.
6. Combina los puntos de entrada de fragmentos y páginas en un único array `entryPoints`.
7. Elimina el directorio `out` existente en el directorio de destino del proyecto, si existe, utilizando la función `removeDir`.
8. Construye el proyecto con los puntos de entrada proporcionados utilizando la función `build`.
9. Elimina el subdirectorio temporal `temp-build` utilizando la función `removeDir`.

Al ejecutar esta función, se construye el proyecto con los archivos de fragmentos y páginas y se genera la salida en el directorio `out`.
