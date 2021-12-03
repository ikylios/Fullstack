const calculateBmi = (height: number, weight: number): string => {

    const ratio = weight / ((height/100)*(height/100))
    console.log(ratio)
    
    switch (true) {
        case ratio >= 30:
            return 'Obese'
        case ratio < 30 && ratio >= 25:
            return 'Overweight'
        case ratio < 25 && ratio >= 18.5:
            return 'Normal'
        case ratio < 18.4:
            return 'Underweight'
        default:
            return 'uhhh'
    }
}

const parseArguments = (input: string[]) => {

    if (!isNaN(Number(input[2]) && Number(input[3]))) {
        return {
            h: Number(input[2]),
            w: Number(input[3])
        }
    } else {
        throw new Error('Input values were not numbers')
    }

}


try {
    const { h, w } = parseArguments(process.argv)
    console.log(calculateBmi(h, w))
} catch (error: unknown) {
    console.log('Something went wrong:')
    if (error instanceof Error) {
        console.log(error.message)
    }    
}
