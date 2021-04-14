export type KeyValuePair<T> = {
    key: string;
    val: T;
    ttl?: number;
};

export interface ICache<Value> {
    /**
     * Check if a key exists in the cache
     * @async
     * @param {string} key - Key to check existence for
     * @returns {Promise} Promise representing whether `key` exists of not
     */
    has: (key: string) => Promise<boolean>;
    /**
     * Get the value of a key
     * @async
     * @param {string} key - Key of value to get
     * @returns {Promise} Promise of the value representing `key`
     */
    get: (key: string) => Promise<Value>;
    /**
     * Set a key and value in the cache
     * @async
     * @param {string} key - Key to set
     * @param value - Value to set
     */
    set: (key: string, value: Value) => Promise<void>;
    /**
     * Set multiple keys in the cache
     * @async
     * @param {KeyValuePair<Value>[]} keyValuePairs - Key Value pairs to set in the cache
     * @param {string} keyValuePairs[].key - The key of the object
     * @param {Value} keyValuePairs[].value - The value of the object
     * @param {number} [keyValuePairs[].ttl] - The key of the object
     */
    mset: (keyValuePairs: KeyValuePair<Value>[]) => Promise<void>;
    /**
     * Get all values from cache
     * @async
     * @returns {Promise} Promise representing iterator of values
     */
    values: () => Promise<IterableIterator<Value>>;
    /**
     * Get all keys from cache
     * @async
     * @returns {Promise} Promise representing iterator of keys
     */
    keys: () => Promise<IterableIterator<string>>;
    /**
     * Delete `key` from cache
     * @async
     * @param {string} key - Key to delete from cache
     */
    delete: (key: string) => Promise<void>;
}