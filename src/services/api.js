/**
 * Mock API helper — simulates network delay
 * @param {any} data - The mock data to return
 * @param {number} [delay] - Delay in ms (800–1200 random if omitted)
 * @returns {Promise<any>}
 */
export const mockFetch = (data, delay) => {
    const ms = delay ?? 800 + Math.random() * 400;
    return new Promise((resolve) => setTimeout(() => resolve(data), ms));
};
