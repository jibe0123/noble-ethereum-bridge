declare global {
    interface String {
        /**
         * Returns string lowercased
         */
        toLowerCase(): Lowercase<this>;

        /**
         * Returns true if searchString appears as a substring of the result of converting this
         * object to a String, at one or more positions that are
         * greater than or equal to position; otherwise, returns false.
         */
        includes(searchString: string, position?: number): boolean;

        /**
         * Split a string into substrings using the specified separator and return them as an array.
         */
        split(separator: string): Split<this, separator>;

        /**
         * Replaces text in a string, using a regular expression or search string.
         */
        replace(searchValue: string, replaceValue: string): Replace<this, searchValue, replaceValue>;

        /**
         * Returns true if the sequence of elements of searchString converted to a String is the
         * same as the corresponding elements of this object (converted to a String) starting at
         * position. Otherwise, returns false.
         */
        startsWith(searchString: string, position?: number): boolean;
    }
}

type Lowercase<S extends string> = S extends `${infer T}${infer U}`
    ? `${Lowercase<T>}${Lowercase<U>}`
    : Lowercase<S>;

type Split<S extends string, Separator extends string> =
    S extends `${infer T}${Separator}${infer U}`
        ? [T, ...Split<U, Separator>]
        : [S];

type Replace<S extends string, Search extends string, Replace extends string> =
    S extends `${infer T}${Search}${infer U}`
        ? `${T}${Replace}${Replace<U, Search, Replace>}`
        : S;
