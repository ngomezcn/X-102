# Ejecuta el comando usbipd list y almacena el resultado en una variable
$usbipdList = usbipd list

# Definir los nombres de los dispositivos que queremos encontrar
$deviceNames = @(
    "Galaxy A34 5G",
    "SAMSUNG Mobile USB Modem",
    "SAMSUNG Android"
)

# Inicializar una variable para almacenar el busid encontrado
$busId = $null

# Recorrer cada línea del listado y buscar los dispositivos especificados
foreach ($line in $usbipdList) {
    foreach ($deviceName in $deviceNames) {
        if ($line -like "*$deviceName*") {
            # Si encontramos el dispositivo, extraemos el busid (primera palabra de la línea)
            $busId = $line -split "\s+" | Select-Object -First 1
            break
        }
    }
    
    # Si ya encontramos un busid, salimos del bucle
    if ($busId) { break }
}

# Verificar si se encontró un busid
if ($busId) {
    Write-Host "Dispositivo encontrado con BUSID: $busId"

    # Ejecutar los comandos unbind y bind
    adb kill-server    
    adb devices
    usbipd unbind --busid 2-3
    usbipd bind --busid --force 2-3
    usbipd attach --wsl --busid 2-3
    
} else {
    Write-Host "No se encontró el dispositivo especificado."
}
