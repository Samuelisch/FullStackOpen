import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getOne = async(id) => {
  const response = await axios.get(baseUrl, id)
  return response.data
}

const create = async(newObj) => {
  const response = await axios.post(baseUrl, newObj)
  return response.data
}

const blogService = {
  getAll,
  getOne,
  create
}

export default blogService