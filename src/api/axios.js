import axios from 'axios'

const axiosFetch = axios.create({
    baseURL: `${window.location.origin}/api/`,
    timeout: 5000,
    withCredentials: true,
})

export default axiosFetch

 // axios('/user').then((response) => {
//     response.data;
// })