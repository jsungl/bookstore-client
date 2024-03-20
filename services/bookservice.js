import axios from "axios";

const axiosClient = axios.create();

axiosClient.defaults.baseURL = "http://127.0.0.1:8081";

export async function getRequest(URL) {
    const response = await axiosClient.get(URL)
    .then(response=>response)
    .catch(err=>console.log(err))

    return response.data;
}

