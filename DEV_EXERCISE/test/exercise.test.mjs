import { findTwoSumIndices } from '../exercise.mjs';

function test(description, callback) {
    try {
        callback();
        console.log(`✔️  ${description}`);
    } catch (error) {
        console.error(`❌  ${description}`);
        console.error(error.message);
    }
}

function verify_test(result, expected) {
    if (JSON.stringify(result) !== JSON.stringify(expected)) {
        throw new Error(`Esperado ${JSON.stringify(expected)}, pero se obtuvo ${JSON.stringify(result)}`);
    }
}

// Pruebas unitarias
test('Debe devolver los índices correctos para una lista con solución', () => {
    const numbers = [2, 7, 11, 15];
    const target = 9;
    const result = findTwoSumIndices(numbers, target);
    const expected = [[0, 1]];
    verify_test(result, expected);
});

test('Debe devolver null si no hay solución', () => {
    const numbers = [1, 2, 3];
    const target = 10;
    const result = findTwoSumIndices(numbers, target);
    const expected = null;
    verify_test(result, expected);
});

test('Debe manejar números negativos correctamente', () => {
    const numbers = [-3, 4, 3, 90];
    const target = 0;
    const result = findTwoSumIndices(numbers, target);
    const expected = [[0, 2]]
    verify_test(result, expected);
});

test('Debe manejar una lista con un solo elemento (sin solución)', () => {
    const numbers = [5];
    const target = 5;
    const result = findTwoSumIndices(numbers, target);
    const expected = null;
    verify_test(result, expected);
});

test('Debe manejar una lista vacía (sin solución)', () => {
    const numbers = [];
    const target = 5;
    const result = findTwoSumIndices(numbers, target);
    const expected = null;
    verify_test(result, expected);
});

process.exit(0);
