import { ICache } from './icache'

export = class MapCache<Key, Value> implements ICache<Key, Value> {

    _cache: Map<Key, Value>;
    readonly _size: number;

    public constructor(sizeOfCache: number) {
        this._cache = new Map<Key, Value>();
        this._size = sizeOfCache;
    }

    public async has(key: Key): Promise<boolean> {
        return this._cache.has(key);
    }

    public async get(key: Key): Promise<Value> {
        return this._cache.get(key);
    }

    public async set(key: Key, value: Value): Promise<void> {
        if (this._cache.size < this._size) {
            this._cache.set(key, value);
            return;
        }

        if (this._cache.has(key)) {
            return;
        }

        let b: Key;

        for (const i of this._cache.keys()) {
            b = i;
            break;
        }

        this._cache.delete(b);
        this._cache.set(key, value);
    }
}