import NodeCache from 'node-cache';
import { ICache, ValueSetItem } from './icache';

export = class NCache<Value> implements ICache<Value>{
    _cache: NodeCache;

    constructor() {
        this._cache = new NodeCache();
    }

    async has(key: string): Promise<boolean> {
        return this._cache.has(key);
    }

    async get(key: string): Promise<Value> {
        return this._cache.get(key);
    }

    async set(key: string, value: Value): Promise<void> {
        this._cache.set(key, value);
    }

    async mset(keyValuePairs: ValueSetItem<Value>[]): Promise<void> {
        this._cache.mset(keyValuePairs);
    }

    async values(): Promise<IterableIterator<Value>> {
        const valueArray = [];
        for (const key of await this.keys()) {
            valueArray.push(await this.get(key));
        }

        return valueArray.values();
    }

    async keys(): Promise<IterableIterator<string>> {
        return this._cache.keys().values();
    }
};