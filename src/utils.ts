export function ifDefined<T, R>(value: T, mapper: (v: T) => R, def = undefined) {
    return value !== undefined ? mapper(value) : def;
}

export function ifNotDefined<T, R>(value: T, mapper: (v: T) => R, def = undefined) {
    return value === undefined ? mapper(value) : def;
}

export function doNothing() { }