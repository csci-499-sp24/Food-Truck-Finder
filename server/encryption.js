import { jwtVerify } from 'jose';


const secretKey = "secret"; 
const key = new TextEncoder().encode(secretKey);


export async function decrypt(input) {
    try {
        const { payload } = await jwtVerify(input, key, {
            algorithms: ["HS256"],
        });
        return payload;
    } catch (error) {
        console.error("Error decrypting:", error);
        throw new Error("Decryption failed");
    }
}