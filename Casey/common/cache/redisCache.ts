import { ICache, KeyValuePair } from "./icache"
import { promisify } from "util"
import redis from 'redis';

class RedisCache<Value> implements ICache<Value> {

    _client: redis.RedisClient;

    readonly redisExists: (arg: string) => Promise<boolean>
    readonly redisGet: (arg: string) => Promise<string>;
    readonly redisSet: (arg1: string, arg2: string) => Promise<boolean>;

    constructor() {
        this._client = redis.createClient();

        this.redisGet = promisify(this._client.get).bind(this._client);
        this.redisExists = promisify(this._client.exists).bind(this._client);
        this.redisSet = promisify(this._client.set).bind(this._client);

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
    mset: (keyValuePairs: KeyValuePair<Value>[]) => Promise<void>;
    values: () => Promise<IterableIterator<Value>>;
    keys: () => Promise<IterableIterator<string>>;
    delete: (key: string) => Promise<void>;

}