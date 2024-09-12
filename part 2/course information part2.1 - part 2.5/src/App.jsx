const Header = ({course}) => {
  return (
    <h2>{course}</h2>
  )
}

const Part = ({part}) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

const Content = ({course}) => {
  return(
    <div>
      {course.map((part)=> <Part key={part.id} part={part}/>)}
    </div>
  )
}

const Total = ({parts}) => {
  let total = parts.reduce((total, part) => total + part.exercises, 0);
  return (
    <h4>Number of exercises {total}</h4>
  )
}

const Course = ({courses}) => {
  return(
    <div>
      {
        courses.map((course) => {
          return (<div key={course.id}>
            <Header course={course.name} /> 
            <Content course={course.parts} />
            <Total parts={course.parts} />
          </div>)
        })
      }
      
    </div>
  )
}


const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]


  return (
    <div>
      <h1>Web development curriculum</h1>
      <Course courses={courses} />
    </div>
  )
}

export default App