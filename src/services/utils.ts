export default class UtilsService {
    static getRoleLevel(roles: string[]) {
        return 10;
    }

    /**
     * Generates a random hexadecimal string.
     * @param length - The length of the hex string to generate.
     * @returns A random hex string of the specified length.
     */
    static generateRandomHex(length: number): string {
        if (length <= 0) {
            throw new Error("Length must be a positive integer");
        }

        const bytes = new Uint8Array(Math.ceil(length / 2));
        crypto.getRandomValues(bytes);

        let hex = Array.from(bytes, (b) =>
            b.toString(16).padStart(2, "0"),
        ).join("");
        return hex.slice(0, length);
    }
}
