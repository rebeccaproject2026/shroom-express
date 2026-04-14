import axios from 'axios';

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api/v1`,
    headers: {
        'Content-Type': 'application/json',
    },
});

// For public store app requests
export const storeAppApi = {
    getStores: () => api.get('/store-app/stores'),
    getStoreDetails: (id) => api.get(`/store-app/stores/${id}`),
    getProducts: (storeId, category = null) => {
        let url = `/store-app/products?store=${storeId}`;
        if (category) url += `&category=${category}`;
        return api.get(url);
    },
    getProductDetails: (id) => api.get(`/store-app/products/${id}`),
    search: (storeId, key) => api.post(`/store-app/search?store=${storeId}`, { key }),
    getCategories: () => api.get('/store-app/categories'),
};

export default api;
