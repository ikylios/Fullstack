interface Result {
    periodLength: number
    trainingDays: number
    success: boolean 
    rating: number
    ratingDescription: string 
    target: number
    average: number
}

interface ErrorResult {
    error: string
}


const ratingToDescription = (rating: number): string => {
    switch (rating) {
        case 2:
            return 'eh';
        case 3:
            return 'good';
        default:
            return 'bad. ew';
    }
};

const dataToRating = (target: number, data: number[]): number => {
    const dailyAverage = data.reduce(add, 0) / data.length;

    switch (true) {
        case dailyAverage / target >= 0.97 && dailyAverage / target <= 1.03:
            return 3;
        case dailyAverage / target >= 0.8 && dailyAverage / target <= 1.2:
            return 2;
        default:
            return 1;
    }
};

const add = (acc: number, a: number): number => {
    return acc + a;
};


const calculateExercises = (data: number[]): Result => {

    const target: number = data[0];
    const slicedData = data.slice(1);

    const rating = dataToRating(target, slicedData);

    const result = {
        periodLength: slicedData.length,
        trainingDays: slicedData.filter(d => d != 0).length,  
        success: rating === 3 ? true : false,
        rating: rating,
        ratingDescription: ratingToDescription(rating),
        target: target,
        average: slicedData.reduce(add, 0)/slicedData.length 
    };

    return result;
};

const parseInputArguments = (target: string, input: string[]) => {
    if (!target || input.length < 1) {
        throw new Error('parameters missing');
    }

    const data: number[] = [];
    
    if (!isNaN(Number(target))) {
            data.push(Number(target));
        } else {  
            throw new Error('malformatted parameters');
        }


    for (let i = 0; i < input.length; i++) {
        if (!isNaN(Number(input[i]))) {
            data.push(Number(input[i]));
        } else {
            throw new Error('malformatted parameters');
        }
    }

    return data;
};

export const executeExercise = (target: string, input: string[]): Result | ErrorResult => {
    let result: Result | ErrorResult = {error: 'something weird went down'};
    try {
        const parsedData = parseInputArguments(target, input);
        result = calculateExercises(parsedData);
        return result;
    } catch (error: unknown) {
        if (error instanceof Error) {
            result = {error: error.message};
        }    
    }

    return result;
};
