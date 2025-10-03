const Header = (props) => {
  console.log(props)
  return (
  <h1>{props.course_name}</h1>
  )
}

const Part = (props) => {
  console.log(props)
  return (
    <p>{props.part.name} {props.part.exercises}</p>
  )
}

const Content = (props) => {
  console.log(props)
  return (
    <div>
      <Part part={props.content[0]} />
      <Part part={props.content[1]} />
      <Part part={props.content[2]} />
    </div>
  ) 
}

const Total = (props) => {
  console.log(props)
  return (
    <p>Number of exercises {
      props.content[0].exercises + 
      props.content[1].exercises + 
      props.content[2].exercises
      }
    </p>
  )
}

const App = () => {
  // const-definitions
  const course = {
    name: 'Half Stack application development',
    parts: [
      { name: 'Fundamentals of React', exercises: 10 },
      { name: 'Using props to pass data', exercises: 7 },
      { name: 'State of a component', exercises: 14 }
    ]
  }

  return (
    <div>
      <Header course_name={course.name} />
      <Content content={course.parts} />
      <Total content={course.parts} />
    </div>
  )
}

export default App