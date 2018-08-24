import axios from 'axios';
import env from '../services/envConstant';

// For API requests
export const sendRequest = (parameters) => {
    let url = parameters.url,
        method = parameters.method,
        token = parameters.token,
        server = parameters.server,
        ajax = parameters.ajax,
        data, header;

        url = env.main +  url;

    if (parameters.data) {
        data = parameters.data;
    }

    header = {
        headers: {
            "Accept": "application/json"
        }
    };

    if (method === 'get') {
        return axios.get(url, header);
    } else if (method === 'post') {
        return axios.post(url, data, header);
    }
}