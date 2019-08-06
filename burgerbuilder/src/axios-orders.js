import axios from 'axios';

const instance = axios.create({
   baseURL: 'https://my-react-course-project-15ec1.firebaseio.com/'
});

export default instance;