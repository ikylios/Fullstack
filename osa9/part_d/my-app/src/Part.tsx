import { Course } from './types'

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    )
}

export const Part = ({ course }: { course: Course }) => {

    switch (course.type) {
        case "normal":
            return (
                <div>
                    <br></br>
                    <b>{course.name} {course.exerciseCount}</b>
                    <br></br>
                    <i>{course.description}</i>
                    <br></br>
                </div>
            )
        case "groupProject":
            return (
                <div>
                    <br></br>
                    <b>{course.name} {course.exerciseCount}</b>
                    <br></br>
                    project exercises {course.groupProjectCount}
                    <br></br>
                </div>
            )
        case "submission":
            return (
                <div>
                    <br></br>
                    <b>{course.name} {course.exerciseCount}</b>
                    <br></br>
                    {course.description}
                    <br></br>
                    submit to {course.exerciseSubmissionLink}
                    <br></br>
                </div>
            )
        case "special":
            return (
                <div>
                    <br></br>
                    <b>{course.name} {course.exerciseCount}</b>
                    <br></br>
                    {course.description}
                    <br></br>
                    required skills: {course.requirements.map(r => <b>{r}, </b>)}
                    <br></br>
                </div>
            )
    
        default:
            return assertNever(course);
    }

}