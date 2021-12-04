interface Result {
    periodLength: number
    trainingDays: number
    success: boolean 
    rating: number
    ratingDescription: string 
    target: number
    average: number
}


const ratingToDescription = (rating: number): string => {
    switch (rating) {
        case 1:
            return 'bad. ew'
        case 2:
            return 'eh'
        case 3:
            return 'good'
    }
}

const dataToRating = (target: number, data: number[]): number => {
    const dailyAverage = data.reduce(add, 0) / data.length

    switch (true) {
        case dailyAverage / target >= 0.97 && dailyAverage / target <= 1.03:
            return 3
        case dailyAverage / target >= 0.8 && dailyAverage / target <= 1.2:
            return 2
        default:
            return 1
    }
}

const add = (acc: number, a: number): number => {
    return acc + a
}


const calculateExercises = (data: number[]): Result => {

    const target: number = data.shift()
    const rating = dataToRating(target, data)

    const result = {
        periodLength: data.length,
        trainingDays: data.filter(d => d != 0).length,  
        success: rating === 3 ? true : false,
        rating: rating,
        ratingDescription: ratingToDescription(rating),
        target: target,
        average: data.reduce(add, 0)/data.length 
    }

    return result
}

const parseInputArguments = (input: string[]) => {
    const data: number[] = []

    for (let i = 2; i < input.length; i++) {
        if (!isNaN(Number(input[i]))) {
            data.push(Number(input[i]))
        } else {
            throw new Error('Input was not a number')
        }
    }

    return data
}

try {
    const parsedData = parseInputArguments(process.argv)
    console.log(calculateExercises(parsedData))
} catch (error: unknown) {
    if (error instanceof Error) {
        console.log(error.message)
    }    
}
