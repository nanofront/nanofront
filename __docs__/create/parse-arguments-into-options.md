La función `parseArgumentsIntoOptions` se encarga de procesar y convertir los argumentos brutos (`rawArgs`) recibidos por la línea de comandos en un objeto de opciones (`CreateOptions`). Realiza lo siguiente:

1. Define un objeto `options` que establece una correspondencia entre los argumentos de la línea de comandos y sus respectivos tipos de datos.
   - Las opciones incluyen `--project-name`, `--git`, `--yes`, `--install`, y sus respectivos alias `-pn`, `-g`, `-y`, `-i`.
2. Utiliza la librería `arg` para analizar los argumentos brutos y generar un objeto `args` procesado.
3. Retorna un objeto con las siguientes propiedades:
   - `projectName`: El nombre del proyecto, proviene del argumento `--project-name`.
   - `git`: Un valor booleano que indica si se debe inicializar un repositorio de git, proviene del argumento `--git`.
   - `install`: Un valor booleano que indica si se deben instalar las dependencias automáticamente, proviene del argumento `--install`.
   - `skipPrompts`: Un valor booleano que indica si se deben omitir las indicaciones al usuario, proviene del argumento `--yes`.
   - `template`: El nombre de la plantilla a utilizar, proviene del primer argumento posicional.

Al utilizar esta función, se obtiene un objeto de opciones que puede ser utilizado por otras funciones para realizar acciones basadas en las opciones proporcionadas por el usuario a través de la línea de comandos.
