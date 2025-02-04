import crypto from 'crypto';

// Function to generate a random secret key with specified length, including uppercase letters and special characters
export function generateRandomSecretKey(length = 64) {
  // Define character sets for better randomness
    const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const specialCharacters = '!@#$%^&*()-_=+[]{}|;:,.<>?';
    const allCharacters = uppercaseLetters + lowercaseLetters + numbers + specialCharacters;

let secretKey = '';

 // Generate a random byte array
const randomBytes = crypto.randomBytes(length);

for (let i = 0; i < length; i++) {
    //const randomIndex = Math.floor(Math.random() * allCharacters.length);
    const randomIndex = randomBytes[i] % allCharacters.length; 
    secretKey += allCharacters[randomIndex];
}

return secretKey;
}

// **Important:**
// 1. **Store this generated key securely.** 
//    - **Do NOT** hardcode it directly in your application. 
//    - Use environment variables: `export JWT_SECRET="${generatedKey}"`
//    - Consider using a secrets management service like Hashicorp Vault. 
// 2. **Rotate this key regularly** (e.g., every few months) to enhance security.