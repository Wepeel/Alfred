export interface ICache<Key, Value> {
    has: (key: Key) => Promise<boolean>;
    get: (key: Key) => Promise<Value>;
    set: (key: Key, value: Value) => Promise<void>;
}