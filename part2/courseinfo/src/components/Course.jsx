const Header = ({course_name}) => {
  //console.log(course_name)
  return (
  <h2>{course_name}</h2>
  )
}

const Part = (part) => {
  //console.log(part)
  return (
    <p>{part.name} {part.exercises}</p>
  )
}

const Total = ({content}) => {
  // console.log(content)
  return(
  content.reduce((sum, part) => sum + part.exercises, 0))
}

const Content = ({content}) => {
  // console.log(content)
  return (
    <div>
      {content.map(part =>
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      )}
      <h4>total of <Total content={content} /> exercises </h4>
    </div>
  ) 
}

const Course = ({course}) => {
  return (
    <div>
      <Header course_name={course.name} />
      <Content content={course.parts} />
    </div>
  )
}

export default Course