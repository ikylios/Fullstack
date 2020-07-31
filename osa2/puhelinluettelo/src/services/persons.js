import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios
        .get(baseUrl)
        .then(response => response.data)
}

const create = newPerson => {
    return axios
        .post(baseUrl, newPerson)
        .then(response => response.data)
}

const update = (id, changedPerson) => {
    axios
        .put(`${baseUrl}/${id}`, changedPerson)
        .then(response => {
            console.log(response.data)
            response.data
        })
    return getAll()
}

const deletePerson = id => {
    axios.delete(`${baseUrl}/${id}`)
    return getAll()
}

export default { getAll, create, deletePerson, update }