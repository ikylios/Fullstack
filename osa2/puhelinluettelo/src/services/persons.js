import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    console.log(request.then(response => response.data))
    return request.then(response => response.data)
}

const create = newPerson => {
    const request = axios.post(baseUrl, newPerson)
    console.log('eka logi', request.then(response => response.data))
    return request.then(response => response.data)
}

const update = (id, changedPerson) => {
    const request = axios.put(`${baseUrl}/${id}`, changedPerson)
    .then(response => response.data)
    console.log('eka logi', request.then(response => response.data))
//    return request.then(response => response.data)
    return getAll()
}

const deletePerson = id => {
    axios.delete(`${baseUrl}/${id}`)
    return getAll()
}

export default { getAll, create, deletePerson, update }