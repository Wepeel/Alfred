import { RedisClient } from 'redis';
import redis from 'redis';
import { onError } from "./redis/redisClientFunctions"

export = class Cache<CacheType> {

    private _client: RedisClient;

    constructor(sizeOfCache: number) {
        this._client = new RedisClient({
            port: 6379,
            host: '127.0.0.1'
        })

        this._client.on('error', onError);
    }

    public async has(value: CacheType): Promise<boolean> {
        return true;
    }
}