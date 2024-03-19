import axios from "axios";

const axiosClient = axios.create();

export async function getRequest(URL) {
    const response = await axiosClient.get(URL)
    .then(response=>response)
    .catch(err=>console.log(err))

    return response.data;
}

