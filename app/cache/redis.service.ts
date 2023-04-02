import client from "./connection";
export default class CacheService {

    async set(key: string, value: string): Promise<void> {
        await client.set(key, value);
    };

    async get(key: string): Promise<string | null> {
        return await client.get(key);
    };


 
}