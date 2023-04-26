const Person = ({ person, handleDeletePerson }) => (
    <p>{person.name} {person.number} <button onClick={() => handleDeletePerson(person)}>delete</button></p>
)

export default Person