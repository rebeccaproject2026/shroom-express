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

// Authentication
export const login = (data) => api.post('/authentication/administrator/login', data);
export const getMe = () => api.get('/authentication/administrator/me');

// Store Management
export const createStore = (data) => api.post('/stores', data);
export const uploadStoreMedia = (formData) => api.post('/stores/upload', formData, {
    headers: {
        'Content-Type': 'multipart/form-data',
    },
});
export const getStores = () => api.get('/stores');
export const getStoreDetails = (id) => api.get(`/stores/${id}`);
export const updateStore = (id, data) => api.patch(`/stores/${id}`, data);
export const deleteStore = (id) => api.delete(`/stores/${id}`);
export const suspendStore = (id, data) => api.patch(`/stores/suspend/${id}`, data);
export const unsuspendStore = (id) => api.patch(`/stores/un-suspend/${id}`);
export const approveStore = (id) => api.patch(`/stores/approve/${id}`);
export const declineStore = (id) => api.patch(`/stores/decline/${id}`);
export const toggleFeaturedStore = (id) => api.patch(`/stores/toggle-featured/${id}`);
export const extendStoreSuspension = (id, data) => api.patch(`/stores/extend-suspension/${id}`, data);

// Admin/Owner Management
export const createAdmin = (data) => api.post('/customer/admin', data);

export default api;
