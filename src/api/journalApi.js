import axios from 'axios'

const journalApi = axios.create({
    baseURL: 'https://vue-demos-67b86-default-rtdb.firebaseio.com'
})


export default journalApi