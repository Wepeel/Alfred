export interface ICache<Key, Value> {
    has: (key: Key) => Promise<boolean>;
    get: (key: Key) => Promise<Value>;
    set: (key: Key, value: Value) => Promise<void>;
    setArray: (keys: Key[], values: Value[]) => Promise<void>;
    values: () => Promise<IterableIterator<Value>>;
    keys: () => Promise<IterableIterator<Key>>;
}