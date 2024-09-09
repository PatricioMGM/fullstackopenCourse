const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  return(
    <>
      <p>
        {props.parts[0][0]} {props.parts[0][1]}
      </p>
      <p>
        {props.parts[1][0]} {props.parts[1][1]}
      </p>
      <p>
        {props.parts[2][0]} {props.parts[2][1]}
      </p>
    </>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.parts[0][1] + props.parts[1][1] + props.parts[2][1]}</p>
  )
}


const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    [ 'Fundamentals of React', 10 ],
    [ 'Using props to pass data', 7 ],
    [ 'State of a component', 14 ]
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default App