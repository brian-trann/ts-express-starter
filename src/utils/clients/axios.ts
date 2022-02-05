import axios from 'axios';
const createAxiosClient = () => {
    const client = axios.create();
    return client;
};
export { createAxiosClient };
