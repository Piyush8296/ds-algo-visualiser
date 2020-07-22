export function random_int_between_range(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}