export type ValueSetItem<T> = {
    key: string;
    val: T;
    ttl?: number;
};

export interface ICache<Value> {
    has: (key: string) => Promise<boolean>;
    get: (key: string) => Promise<Value>;
    set: (key: string, value: Value) => Promise<void>;
    mset: (keyValuePairs: ValueSetItem<Value>[]) => Promise<void>;
    values: () => Promise<IterableIterator<Value>>;
    keys: () => Promise<IterableIterator<string>>;
}