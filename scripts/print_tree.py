import os
import fnmatch

def print_tree(startpath, exclude_patterns, prefix=''):
    """
    Imprime los directorios y archivos en forma de árbol.
    
    :param startpath: Ruta inicial desde donde empezar a imprimir.
    :param exclude_patterns: Lista de patrones de archivos y directorios a excluir.
    :param prefix: Prefijo para la representación visual del árbol.
    """
    # Listar todos los elementos en el directorio actual
    items = os.listdir(startpath)

    # Separar los directorios y los archivos
    dirs = [item for item in items if os.path.isdir(os.path.join(startpath, item))]
    files = [item for item in items if os.path.isfile(os.path.join(startpath, item))]

    # Filtrar los directorios excluidos
    dirs = [d for d in dirs if not any(fnmatch.fnmatch(d, pattern) for pattern in exclude_patterns)]
    # Filtrar los archivos excluidos
    files = [f for f in files if not any(fnmatch.fnmatch(f, pattern) for pattern in exclude_patterns)]

    # Imprimir los directorios y sus archivos
    total_items = len(dirs) + len(files)
    for index, dir in enumerate(dirs):
        connector = '├── ' if index < len(dirs) - 1 else '└── '
        print(f"{prefix}{connector}{dir}/")
        # Llamar recursivamente para el subdirectorio
        print_tree(os.path.join(startpath, dir), exclude_patterns, prefix + ("│   " if index < len(dirs) - 1 else "    "))

    for index, file in enumerate(files):
        connector = '├── ' if index < len(files) - 1 else '└── '
        print(f"{prefix}{connector}{file}")

if __name__ == "__main__":
    # Ruta desde donde quieres empezar a imprimir
    startpath = os.getcwd()  # Usa la ruta donde se ejecuta el script
    # Lista de archivos y directorios a excluir
    exclude_patterns = [
        'node_modules', 
        'scrips', 
        'assets', 
        '.*', 
        '*/sub_dir_to_exclude/*', 
        'components',  
        'metro.config.js',
        'README.md',
        'gluestack-ui.config.json',
        '.gitignore',
        'tailwind.config.js',
        'expo-env.d.ts',
        'package-lock.json',
        'app.json',
        '.npmrc',
        'nativewind-env.d.ts',
        'babel.config.js',
        'tsconfig.json',
        'global.css',
        'package.json',
        '.eslintrc.js']

    print_tree(startpath, exclude_patterns)
