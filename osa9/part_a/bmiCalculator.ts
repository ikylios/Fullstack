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


const h: number = Number(process.argv[2])
const w: number = Number(process.argv[3])

console.log(calculateBmi(h, w))