import Header from './Header'
import Content from './Content'

const Course = ({course}) => {
  return (
    <div>
      <Header course_name={course.name} />
      <Content content={course.parts} />
    </div>
  )
}

export default Course