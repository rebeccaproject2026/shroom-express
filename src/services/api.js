import axios from 'axios';

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api/v1`,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Adding common auth header if token exists
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const authApi = {
    login: (userName, password) => api.post('/authentication/administrator/login', { userName, password }),
    getMe: () => api.get('/authentication/administrator/me'),
};

export const superAdminApi = {
    // Store Management
    createStore: (data) => api.post('/stores', data),
    uploadStoreMedia: (formData) => api.post('/stores/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }),
    getStores: () => api.get('/stores'),
    getStoreDetails: (id) => api.get(`/stores/${id}`),
    
    // Admin/Owner Management
    createAdmin: (data) => api.post('/customer/admin', data),
};

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
