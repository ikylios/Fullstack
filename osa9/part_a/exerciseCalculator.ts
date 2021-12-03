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
        case dailyAverage / target >= 0.95 && dailyAverage / target <= 1.05:
            return 2
        default:
            return 1
    }
}

const add = (acc: number, a: number): number => {
    return acc + a
}


const calculateExercises = (target: number, data: number[]): Result => {

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

const dataAsNumber: number[] = []
process.argv.forEach(p => {
   dataAsNumber.push(parseInt(p)) 
}); 
console.log(calculateExercises(2, [3,0,2,4.5,0,3,1]))
//console.log(calculateExercises(dataAsNumber))