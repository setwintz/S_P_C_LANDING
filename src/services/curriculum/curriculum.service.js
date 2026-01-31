


import api from "../axiosInstance";
const create = async (data) => {
    try {
        const authToken = localStorage.getItem("SAAS_ERP1_CLIENT_TACCESS_TOKEN");
        const response = await api.post(`${import.meta.env.VITE_API_URL}/api/v1/client/academic/setting/curriculum/create/curriculum`, { ...data },
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

const update = async (data) => {
    try {
        const authToken = localStorage.getItem("SAAS_ERP1_CLIENT_TACCESS_TOKEN");
        const response = await api.post(`${import.meta.env.VITE_API_URL}/api/v1/client/academic/setting/curriculum/update/curriculum`, { ...data },
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



const getList = async (currentPage, rowsPerPage, text, tenantId, enterpriseId, selectedStatus, selectedUnitId) => {
    try {
        const authToken = localStorage.getItem("SAAS_ERP1_CLIENT_TACCESS_TOKEN");

        // const response = await api.get(
        //     `${import.meta.env.VITE_API_URL}/api/v1/client/academic/setting/curriculum/list/curriculum?keyword=${text}&page=${currentPage}&perPage=${rowsPerPage}&tenantId=${tenantId}&enterpriseId=${enterpriseId}`,
        //     {
        //         headers: {
        //             Authorization: `Bearer ${authToken}`,
        //         },
        //     }
        // );
        const response = await api.get('/api/v1/client/academic/setting/curriculum/list/curriculum', {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
            params: {
                keyword: text || undefined,      // Axios automatically skips undefined/null
                page: currentPage,
                perPage: rowsPerPage,
                tenantId,
                enterpriseId,
                selectedStatus,
                selectedUnitId
            }
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



const listAll = async (unit_id) => {
    try {
        const authToken = localStorage.getItem("SAAS_ERP1_CLIENT_TACCESS_TOKEN");
        const response = await api.get('/api/v1/client/academic/setting/curriculum/list/all/curriculum', {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
            params: {
                tenantId: unit_id,
            }
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



const getLinkedData = async (unit_id) => {
    try {
        const authToken = localStorage.getItem("SAAS_ERP1_CLIENT_TACCESS_TOKEN");
        const response = await api.get('/api/v1/client/academic/setting/curriculum/list/all/linked/data/curriculum', {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
            params: {
                tenantId: unit_id,
            }
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





const activeInactive = async (data) => {
    try {
        const authToken = localStorage.getItem("SAAS_ERP1_CLIENT_TACCESS_TOKEN");

        const response = await api.post(`${import.meta.env.VITE_API_URL}/api/v1/client/academic/setting/curriculum/status/curriculum`, { ...data },
            {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            }
        );
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
}




export default {
    create,
    update,
    getList,
    listAll,
    activeInactive,
    getLinkedData
}