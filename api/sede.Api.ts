import axios from 'axios';

const sedeApi = axios.create({
    baseURL: '/api'
});


export default sedeApi;