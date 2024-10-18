// src/utils/logger.ts

import { logger, consoleTransport, configLoggerType } from "react-native-logs";

// Definimos la configuración por defecto con los tipos adecuados
const defaultConfig : configLoggerType  = {
  levels: {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
  },
  severity: "debug",
  transport: consoleTransport,
  transportOptions: {
    colors: {
      info: "blueBright",
      warn: "yellowBright",
      error: "redBright",
    },
  },
  async: true,
  dateFormat: "time",
  printLevel: true,
  printDate: true,
  fixedExtLvlLength: false,
  enabled: true,
};

// Crear el logger
const log = logger.createLogger(defaultConfig);

// Exportar el logger
export default log;
