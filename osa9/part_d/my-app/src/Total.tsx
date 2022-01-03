import { Course } from './types'

export const Total = ({ courseParts }: { courseParts: Course[] }) => {

    return (
      <p>
        Number of exercises{" "}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    )
}