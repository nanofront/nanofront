1. Lee todos los archivos en el directorio.
2. Para cada archivo:
    * Si es un archivo regular (no un directorio):
        * Crea un directorio llamado client dentro del directorio proporcionado si no existe.
        * Genera un nuevo nombre de archivo con la ruta completa en el directorio client y el mismo nombre base que el archivo original.
        * Crea un fragmento de nombre quitando la extensión del archivo y reemplazando guiones y caracteres en mayúsculas con guiones bajos y caracteres en mayúsculas, respectivamente.
        * Escribe en el nuevo archivo un bloque de código que importa el archivo original, verifica si se está ejecutando en un entorno del navegador y, en ese caso, hidrata un componente de React usando las propiedades proporcionadas. También exporta una función SSR que toma propiedades y devuelve el resultado de renderizar el componente a una cadena.
3. Si el archivo es un directorio, imprime un error en la consola que indica que los directorios no están soportados.
Filtra los archivos que no son válidos y devuelve un array de nombres de archivos de puntos de entrada.