import { Promise as BBPromise } from 'bluebird'

export = class MapCache<Value> {

    _cache: Map<string, Value>;
    readonly _size: number;

    public constructor(sizeOfCache: number) {
        this._cache = new Map<string, Value>();
        this._size = sizeOfCache;
    }

    public async has(key: string): Promise<boolean> {
        return this._cache.has(key);
    }

    public async get(key: string): Promise<Value> {
        return this._cache.get(key);
    }

    public async set(key: string, value: Value): Promise<void> {
        if (this._cache.size < this._size) {
            this._cache.set(key, value);
            return;
        }

        if (this._cache.has(key)) {
            return;
        }

        let b: string;

        for (const i of this._cache.keys()) {
            b = i;
            break;
        }

        this._cache.delete(b);
        this._cache.set(key, value);
    }

    public async mset(arg: { key: string, val: Value }[]): Promise<void> {
        await BBPromise.map(arg,
            async (keyValuePair) => {
                await this.set(keyValuePair.key, keyValuePair.val);
            }
        );
    }

    public async values(): Promise<IterableIterator<Value>> {
        return this._cache.values();
    }

    public async keys(): Promise<IterableIterator<string>> {
        return this._cache.keys();
    }

    public async delete(key: string): Promise<void> {
        this._cache.delete(key);
    }
};