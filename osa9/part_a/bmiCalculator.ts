const calculateBmi = (height: number, weight: number): string => {

    const ratio = weight / ((height/100)*(height/100));
    
    switch (true) {
        case ratio >= 30:
            return 'Obese';
        case ratio < 30 && ratio >= 25:
            return 'Overweight';
        case ratio < 25 && ratio >= 18.5:
            return 'Normal';
        case ratio < 18.4:
            return 'Underweight';
        default:
            return 'uhhh';
    }
};

const parseArguments = (input: string[]) => {

    if (!isNaN(Number(input[0]) && Number(input[1]))) {
        return {
            h: Number(input[0]),
            w: Number(input[1])
        };
    } else {
        throw new Error('Input value was not a number');
    }

};

export const execute = (input: string[]): string => {
    let result = '';
    try {
        const { h, w } = parseArguments(input);
        result = calculateBmi(h, w);
        return result;
    } catch (error: unknown) {
        if (error instanceof Error) {
            result = error.message;
        }    
    }
    return result;
};


