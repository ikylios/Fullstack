import { Header } from './Header'
import { Content } from './Content'
import { Total } from './Total'
import { CourseParts } from './types'

const courseName: string = "Half Stack application development";

const courseParts: CourseParts = [
  {
    name: "Fundamentals",
    exerciseCount: 10
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14
  }
];


const App = () => {

  return (
    <div>
      <Header courseName={courseName}/>
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;