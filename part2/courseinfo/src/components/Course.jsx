const Header = ({ course }) => <h2>{course}</h2>

const Content = ({ parts }) => (
  <div>
    {parts.map(part => <Part key={part.id} part={part} />)}
  </div>
)

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
)

const Total = (props) => <b> total of {props.total} exercises</b>

const Course = ({ course }) => {
  const total = course.parts.reduce((total, part) => total + part.exercises, 0)
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total total={total} />
    </div>
  )
}

export default Course