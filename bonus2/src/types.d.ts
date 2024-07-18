declare global {
    interface String {
        /**
         * Returns string lowercased
         */
        toLowerCase(): Lowercase<this>;
    }
}

type Lowercase<S extends string> = S extends `${infer T}${infer U}`
    ? `${Lowercase<T>}${Lowercase<U>}`
    : Lowercase<S>;