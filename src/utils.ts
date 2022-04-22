export function ifDefined<T, R>(value: T, mapper: (v: T) => R) {
    return value !== undefined ? mapper(value) : undefined;
}

export function ifNotDefined<T, R>(value: T, mapper: (v: T) => R) {
    return value === undefined ? mapper(value) : undefined;
}

