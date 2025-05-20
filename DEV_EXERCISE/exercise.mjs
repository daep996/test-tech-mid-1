import { createInterface } from 'readline';

export const findTwoSumIndices = (numbers, target) => {
    const numMap = new Map();
    let results = [];
    let result_index = 0;

    for (let i = 0; i < numbers.length; i++) {
        const complement = target - numbers[i];
        if (numMap.has(complement)) {
            results[result_index] = [numMap.get(complement), i];
            result_index++;
        }
        numMap.set(numbers[i], i);
    }
    if(results.length > 0) {
        return results;
    } else {
        return null;
    }
}

const rl = createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Introduce una lista de enteros separados por coma: ', (numbersInput) => {
    rl.question('Introduce el entero de destino: ', (targetInput) => {
        const numbers = numbersInput.split(',').map(Number);
        const target = parseInt(targetInput, 10);
        const result = findTwoSumIndices(numbers, target);
        if (result) {
            result.forEach(ind => console.log(`Los números que suman ${target} son = Indice: ${ind[0]} e indice ${ind[1]}.`))
        } else {
            console.log('No se encontraron dos números que sumen el entero de destino.');
        }
        rl.close();
    });
});