// const Persons = ({ persons, filterString, deletePerson  }) => {
const Person = ({ person, deletePerson }) => {
    return (
        <div>
            {person.name} {person.number}
            <button onClick={deletePerson}>delete</button>
        </div>
    )


}

export default Person
