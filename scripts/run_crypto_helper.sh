#!/bin/bash

# Obtener el directorio del script actual
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Verificar si se pasó un argumento
if [ "$#" -ne 1 ]; then
    echo "Uso: $0 'tu mensaje aquí'"
    exit 1
fi

# Activar el entorno virtual
source "$SCRIPT_DIR/venv/bin/activate"

# Ejecutar el script de Python pasando el argumento
python "$SCRIPT_DIR/crypto_helper.py" "$1"

# Desactivar el entorno virtual
deactivate
