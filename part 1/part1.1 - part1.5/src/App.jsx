const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part[0]} {props.part[1]}
    </p>
  )
}

const Content = (props) => {
  return(
    <>
      <Part part={props.parts[0]} />
      <Part part={props.parts[1]} />
      <Part part={props.parts[2]} />
    </>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.parts[0][1] + props.parts[1][1] + props.parts[2][1]}</p>
  )
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={[[course.parts[0].name, course.parts[0].exercises], [course.parts[1].name, course.parts[1].exercises], [course.parts[2].name, course.parts[2].exercises]]} />
      <Total parts={[[course.parts[0].name, course.parts[0].exercises], [course.parts[1].name, course.parts[1].exercises], [course.parts[2].name, course.parts[2].exercises]]} />
    </div>
  )
}

export default App