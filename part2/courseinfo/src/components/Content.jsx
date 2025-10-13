import Part from './Part'

const Content = ({content}) => {
  return (
    <div>
      {content.map(part =>
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      )}
      <h4>total of {content.reduce((sum, part) =>
        sum + part.exercises, 0)
        } exercises
      </h4>
    </div>
  ) 
}

export default Content