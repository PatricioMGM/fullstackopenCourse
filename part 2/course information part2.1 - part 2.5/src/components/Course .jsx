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

export default Course