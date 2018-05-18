import axios from 'axios'

const authenticationToken = Math.random().toString(36).substr(-8)

const instance = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 100,
  headers: {
    'Authorization': authenticationToken,
    'Accept': 'application/json'
  }
})

export const fetchAllCategories = () => instance.get('/categories')

export const getAllPosts = () => instance.get('/posts')



