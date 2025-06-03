// import { instance } from "@/api/instance";
// const[products, setProducts] = useState([]);
// export const productServer = {
//     get: async () => {
//         const response = await instance("/products")
//         return response;
//     },
//     post: async () => {
//         const response = await instance.post("/products", data);
//         return response;
//     },
// };

import axios from "axios";
export const productServer = axios.create({
    baseURL: "https://api.escuelajs.co/api/v1/products",
    timeout: 3000,
});


export const getSingleProduct = async (slug) => {
    try {
        const response = await productServer.get(`/slug/${slug}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching single product:", error);
        throw error;
    }
}