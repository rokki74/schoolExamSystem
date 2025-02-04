// comparePasswords.mjs

import bcrypt from 'bcrypt';

const comparePasswords = async (password, hashedPassword) => {
try {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
} catch (error) {
    console.error('Error comparing passwords:', error);
    return false;
}
};

export default comparePasswords;