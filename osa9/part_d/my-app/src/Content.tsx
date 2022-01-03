import { Course } from './types'
import { Part } from './Part'

export const Content = ({ courseParts }: { courseParts: Course[] }) => {

    return (
      <div>
        {courseParts.map(part => 
            <Part course={part} />
        )}
      </div>
    )
}
  
  