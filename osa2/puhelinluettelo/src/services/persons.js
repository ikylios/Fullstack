import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newPerson => {
    const request = axios.post(baseUrl, newPerson)
    console.log('eka logi', request.then(response => response.data))
    return request.then(response => response.data)
}

const deletePerson = deleteId => {
    axios.delete(`${baseUrl}/${deleteId}`)
    return getAll()
}

export default { getAll, create, deletePerson }