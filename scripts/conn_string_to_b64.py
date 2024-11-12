# crypto_manager.py

import sys
import base64

class CryptoManager:
    @staticmethod
    def encode(text: str) -> str:
        """Codifica el texto utilizando Base64."""
        encoded_bytes = base64.b64encode(text.encode('utf-8'))
        return encoded_bytes.decode('utf-8')

    @staticmethod
    def decode(encoded_text: str) -> str:
        """Decodifica el texto utilizando Base64."""
        decoded_bytes = base64.b64decode(encoded_text.encode('utf-8'))
        return decoded_bytes.decode('utf-8')

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Uso: python crypto_manager.py 'texto_a_codificar'")
        sys.exit(1)

    input_text = sys.argv[1]
    
    # Codificar el texto
    encoded_text = CryptoManager.encode(input_text)
    print(f"Texto codificado: {encoded_text}")

    # Decodificar el texto
    decoded_text = CryptoManager.decode(encoded_text)
    print(f"Texto decodificado: {decoded_text}")
