import { ICache, KeyValuePair } from "./icache"
import { promisify } from "util"
import { Promise as BBPromise } from 'bluebird';
import redis from 'redis';

class RedisCache<Value> implements ICache<Value> {

    _client: redis.RedisClient;

    readonly redisExists: (arg: string) => Promise<boolean>
    readonly redisGet: (arg: string) => Promise<string>;
    readonly redisSet: (arg1: string, arg2: string) => Promise<boolean>;
    readonly redisMset: (arg: any) => Promise<boolean>; // Complex Signature
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

    async has(key: string): Promise<boolean> {
        return await this.redisExists(key);
    }

    async get(key: string): Promise<Value> {
        return JSON.parse(await this.redisGet(key));
    }

    async set(key: string, value: Value): Promise<void> {
        if (await this.redisSet(key, JSON.stringify(value))) {
            console.error("AWDA");
        }
    }

    async mset(keyValuePairs: KeyValuePair<Value>[]): Promise<void> {
        const result = await BBPromise.reduce(keyValuePairs, async (res, current) => {
            return [...res, current.key, JSON.stringify(current.val)];
        }, []);

        if (! await this.redisMset(result)) {
            console.error("Error setting to cache");
        }
    }

    async values(): Promise<IterableIterator<Value>> {
        const keys = await this.keys();

        return await this.redisMget(Array.from(keys));
    }

    async keys(): Promise<IterableIterator<string>> {
        const keysArr = await this.redisKeys("*");

        return keysArr.values();
    }

    async delete(key: string): Promise<void> {
        if (await this.redisDelete(key)) {
            console.error("Error deleting from cache");
        }
    }

}