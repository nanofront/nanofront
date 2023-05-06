1. Importa el módulo `esbuild` y el plugin `manifestPlugin` de `esbuild-plugin-manifest`.
2. La función `build` recibe un argumento `entryPoints`, que es un arreglo de puntos de entrada del proyecto.
3. Utiliza la función `build` de `esbuild` para construir el proyecto con las siguientes opciones:
   - Establece los puntos de entrada, nombres de entradas, nombres de fragmentos y nombres de activos.
   - Habilita el empaquetamiento, el uso de JSX automático y la división de código.
   - Establece el formato de salida como ESM (ECMAScript Modules).
   - No minimiza el código y genera un mapa de origen.
   - Configura el cargador para archivos PNG y SVG.
   - Establece la base de salida y el directorio de salida.
   - Utiliza el plugin `manifestPlugin`.
4. Retorna el resultado de la construcción.

La función `build` utiliza `esbuild` para construir el proyecto a partir de los puntos de entrada proporcionados, aplicando varias opciones y configuraciones en el proceso.
