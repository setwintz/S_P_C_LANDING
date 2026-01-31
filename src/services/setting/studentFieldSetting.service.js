
import api from "../axiosInstance";
const create = async (data) => {
    try {
        const authToken = localStorage.getItem("SAAS_ERP1_CLIENT_TACCESS_TOKEN");
        const response = await api.post(`${import.meta.env.VITE_API_URL}/api/v1/client/academic/setting/student/create/default/fields`, { ...data },
            {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            }
        );
        return response;
    } catch (error) {
        if (error.response) {
            return Promise.reject(error.response.data.message);
        } else if (error.request) {
            return Promise.reject("Network error. Please try again.");
        } else {
            return Promise.reject("An error occurred. Please try again later.");
        }
    }
}

const create2 = async (data) => {
    try {
        const authToken = localStorage.getItem("SAAS_ERP1_CLIENT_TACCESS_TOKEN");
        const response = await api.post(`${import.meta.env.VITE_API_URL}/api/v1/client/academic/welcome/create/default/fields`, { ...data },
            {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            }
        );
        return response;
    } catch (error) {
        if (error.response) {
            return Promise.reject(error.response.data.message);
        } else if (error.request) {
            return Promise.reject("Network error. Please try again.");
        } else {
            return Promise.reject("An error occurred. Please try again later.");
        }
    }
}



const getFields = async (enterpriseId, tenantId) => {
    try {
        const authToken = localStorage.getItem("SAAS_ERP1_CLIENT_TACCESS_TOKEN");
        const response = await api.get(`/api/v1/client/academic/setting/student/get/default/fields/${enterpriseId}/${tenantId}`, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });
        return response;
    } catch (error) {
        if (error.response) {
            // The request was made, but the server responded with a status code
            return Promise.reject(error.response.data.message);
        } else if (error.request) {
            // The request was made but no response was received
            return Promise.reject("Network error. Please try again.");
        } else {
            // Something happened in setting up the request that triggered an Error
            return Promise.reject("An error occurred. Please try again later.");
        }
    }
};


const createField = async (data) => {
    try {
        const authToken = localStorage.getItem("SAAS_ERP1_CLIENT_TACCESS_TOKEN");
        const response = await api.post(`${import.meta.env.VITE_API_URL}/api/v1/client/academic/setting/student/create/field`, { ...data },
            {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            }
        );
        return response;
    } catch (error) {
        if (error.response) {
            return Promise.reject(error.response.data.message);
        } else if (error.request) {
            return Promise.reject("Network error. Please try again.");
        } else {
            return Promise.reject("An error occurred. Please try again later.");
        }
    }
}





const get = async () => {
    try {
        const authToken = localStorage.getItem("SAAS_ERP1_CLIENT_TACCESS_TOKEN");
        const response = await api.get('/api/v1/client/academic/welcome/me', {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });
        return response;
    } catch (error) {
        if (error.response) {
            // The request was made, but the server responded with a status code
            return Promise.reject(error.response.data.message);
        } else if (error.request) {
            // The request was made but no response was received
            return Promise.reject("Network error. Please try again.");
        } else {
            // Something happened in setting up the request that triggered an Error
            return Promise.reject("An error occurred. Please try again later.");
        }
    }
};

const updateFieldOrder = async (data) => {
    try {
        const authToken = localStorage.getItem("SAAS_ERP1_CLIENT_TACCESS_TOKEN");
        const response = await api.post(`${import.meta.env.VITE_API_URL}/api/v1/client/academic/setting/student/fields/order`, { ...data },
            {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            }
        );
        return response;
    } catch (error) {
        if (error.response) {
            return Promise.reject(error.response.data.message);
        } else if (error.request) {
            return Promise.reject("Network error. Please try again.");
        } else {
            return Promise.reject("An error occurred. Please try again later.");
        }
    }
}


export default {
    create,
    create2,
    getFields,
    get,
    createField,
    updateFieldOrder
}