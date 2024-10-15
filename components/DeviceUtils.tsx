export class DeviceManager {
  
    private static readonly spreadsheetId = "14Yu18XuKcnKui1i87jyPgpIyIfTeNHb1zYjjRM-uVvs";
    private static readonly sheetDevicesHistory = "Sheet1";
  
    public static generateBlePin(input: string): string {
      let digits = '';
  
      for (const c of input) {
        if (/\d/.test(c)) { // Check if character is a digit
          digits += c;
          if (digits.length >= 4) {
            break;
          }
        }
      }
  
      return digits.padStart(4, '0'); // Pad to the left with '0'
    }
  
    public static generateDeviceId(input: string): string {
      let digits = '';
  
      for (let i = input.length - 1; i >= 0; i--) {
        const c = input[i];
        if (/\d/.test(c)) { // Check if character is a digit
          digits = c + digits; // Prepend digit
          if (digits.length >= 4) {
            break;
          }
        }
      }
  
      return digits.padStart(4, '0'); // Pad to the left with '0'
    }
  
    public static generateAccessKey(input: string): string {
      const firstSixChars = input.length > 4 ? input.substring(0, 4) : input;
      return firstSixChars.toUpperCase(); // Convert to uppercase
    }
  }
  