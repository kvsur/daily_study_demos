export function add(...args) {
    if (!args.length) return NaN;

    return args.reduce((pre, current) => pre + current, 0)
}