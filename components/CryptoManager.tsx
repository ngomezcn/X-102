// src/utils/CryptoManager.ts

import { Base64 } from 'js-base64';

export class CryptoManager {
  // Método para codificar un texto
  static encode(text: string): string {
    return Base64.encode(text);
  }

  // Método para decodificar un texto
  static decode(encodedText: string): string {
    return Base64.decode(encodedText);
  }
}

export default CryptoManager;
