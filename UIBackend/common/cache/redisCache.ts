import { promisify } from "util"
import redis from 'redis';

export class RedisCache<Value> {

    _client: redis.RedisClient;

    readonly redisExists: (arg: string) => Promise<boolean>
    readonly redisGet: (arg: string) => Promise<string>;
    readonly redisSet: (arg1: string, arg2: string) => Promise<boolean>;
    readonly redisMset: (arg: redis.OverloadedCommand<string, boolean, Value>) => Promise<boolean>; // Complex Signature
    readonly redisKeys: (arg: string) => Promise<any>; // Complex Signature
    readonly redisMget: (keys: string[]) => Promise<any>; // Complex Signature
    readonly redisDelete: (keys: string) => Promise<boolean>;

    constructor() {
        this._client = redis.createClient();

        this.redisGet = promisify(this._client.get).bind(this._client);
        this.redisExists = promisify(this._client.exists).bind(this._client);
        this.redisSet = promisify(this._client.set).bind(this._client);
        this.redisMset = promisify(this._client.mset).bind(this._client);
        this.redisKeys = promisify(this._client.keys).bind(this._client);
        this.redisMget = promisify(this._client.mget).bind(this._client);
        this.redisDelete = promisify(this._client.del).bind(this._client);

        this._client.on("error", (error) => {
            console.error(error);
        });
    }

    /**
     * Check if a key exists in the cache
     * @async
     * @param {string} key - Key to check existence for
     * @returns {Promise} Promise representing whether `key` exists of not
     */
    async has(key: string): Promise<boolean> {
        return await this.redisExists(key);
    }

    /**
     * Get the value of a key
     * @async
     * @param {string} key - Key of value to get
     * @returns {Promise} Promise of the value representing `key`
     */
    async get(key: string): Promise<Value> {
        return JSON.parse(await this.redisGet(key));
    }

    /**
     * Set a key and value in the cache
     * @async
     * @param {string} key - Key to set
     * @param value - Value to set
     */
    async set(key: string, value: Value): Promise<void> {
        if (await this.redisSet(key, JSON.stringify(value))) {
            console.error("Error setting to cache");
        }
    }

    /**
     * Set multiple keys in the cache
     * @async
     * @param {redis.OverloadedCommand<string, boolean, Value>} arg - Key Value pairs to set in the cache
     */
    async mset(arg: redis.OverloadedCommand<string, boolean, Value>): Promise<void> {
        if (! await this.redisMset(arg)) {
            console.error("Error setting to cache");
        }
    }

    /**
     * Get all values from cache
     * @async
     * @returns {Promise} Promise representing iterator of values
     */
    async values(): Promise<IterableIterator<Value>> {
        const keys = await this.keys();

        return await this.redisMget(Array.from(keys));
    }

    /**
     * Get all keys from cache
     * @async
     * @returns {Promise} Promise representing iterator of keys
     */
    async keys(): Promise<IterableIterator<string>> {
        const keysArr = await this.redisKeys("*");

        return keysArr.values();
    }

    /**
     * Delete `key` from cache
     * @async
     * @param {string} key - Key to delete from cache
     */
    async delete(key: string): Promise<void> {
        if (await this.redisDelete(key)) {
            console.error("Error deleting from cache");
        }
    }

}