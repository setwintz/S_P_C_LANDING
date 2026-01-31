


import api from "../axiosInstance";





const getOne = async (id) => {
    try {
        const authToken = localStorage.getItem("SAAS_ERP1_CLIENT_TACCESS_TOKEN");
        const response = await api.get(
            `${import.meta.env.VITE_API_URL}/api/v1/client/campus/institute/get/institute/${id}`,
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
};



const updateEnterprise = async (data) => {
    try {
        const authToken = localStorage.getItem("SAAS_ERP1_CLIENT_TACCESS_TOKEN");
        const response = await api.put(`${import.meta.env.VITE_API_URL}/api/v1/client/campus/institute/update/institute`, data,
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


const createUnit = async (data) => {
    try {
        const authToken = localStorage.getItem("SAAS_ERP1_CLIENT_TACCESS_TOKEN");
        const response = await api.post(`${import.meta.env.VITE_API_URL}/api/v1/client/campus/institute/create/unit`, data,
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

const updateUnit = async (data) => {
    try {
        const authToken = localStorage.getItem("SAAS_ERP1_CLIENT_TACCESS_TOKEN");
        const response = await api.put(`${import.meta.env.VITE_API_URL}/api/v1/client/campus/institute/update/unit`, data,
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

const updateUnitByUnithead = async (data) => {
    try {
        const authToken = localStorage.getItem("SAAS_ERP1_CLIENT_TACCESS_TOKEN");
        const response = await api.put(`${import.meta.env.VITE_API_URL}/api/v1/client/campus/institute/update/unit/by/unithead`, data,
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



const listUnits = async (currentPage, rowsPerPage, text, enterpriseId) => {
    try {
        const authToken = localStorage.getItem("SAAS_ERP1_CLIENT_TACCESS_TOKEN");
        const response = await api.get(
            `${import.meta.env.VITE_API_URL}/api/v1/client/campus/institute/list/unit?keyword=${text}&page=${currentPage}&perPage=${rowsPerPage}&enterpriseId=${enterpriseId}`,
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
};


const allUnassignedUnits = async (enterpriseId) => {
    try {
        const authToken = localStorage.getItem("SAAS_ERP1_CLIENT_TACCESS_TOKEN");
        const response = await api.get(
            `${import.meta.env.VITE_API_URL}/api/v1/client/campus/institute/all/unassigned/unit?enterpriseId=${enterpriseId}`,
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
};



const activeInactiveUnit = async (data) => {
    try {
        const authToken = localStorage.getItem("SAAS_ERP1_CLIENT_TACCESS_TOKEN");

        const response = await api.post(`${import.meta.env.VITE_API_URL}/api/v1/client/campus/institute/status/unit`, { ...data },
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




const createAdmin = async (data) => {
    try {
        const authToken = localStorage.getItem("SAAS_ERP1_CLIENT_TACCESS_TOKEN");
        const response = await api.post(`${import.meta.env.VITE_API_URL}/api/v1/client/campus/institute/create/admin`, data,
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



const updateAdmin = async (data) => {
    try {
        const authToken = localStorage.getItem("SAAS_ERP1_CLIENT_TACCESS_TOKEN");
        const response = await api.put(`${import.meta.env.VITE_API_URL}/api/v1/client/campus/institute/update/admin`, data,
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



const listAdmin = async (currentPage, rowsPerPage, text, enterpriseId) => {
    try {
        const authToken = localStorage.getItem("SAAS_ERP1_CLIENT_TACCESS_TOKEN");
        const response = await api.get(
            `${import.meta.env.VITE_API_URL}/api/v1/client/campus/institute/list/admin?keyword=${text}&page=${currentPage}&perPage=${rowsPerPage}&enterpriseId=${enterpriseId}`,
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
};


const allUnassignedAdmin = async (enterpriseId) => {
    try {
        const authToken = localStorage.getItem("SAAS_ERP1_CLIENT_TACCESS_TOKEN");
        const response = await api.get(
            `${import.meta.env.VITE_API_URL}/api/v1/client/campus/institute/all/unassigned/admin?enterpriseId=${enterpriseId}`,
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
};



const activeInactiveAdmin= async (data) => {
    try {
        const authToken = localStorage.getItem("SAAS_ERP1_CLIENT_TACCESS_TOKEN");

        const response = await api.post(`${import.meta.env.VITE_API_URL}/api/v1/client/campus/institute/status/admin`, { ...data },
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


const assignAdminToUnit = async (data) => {
    try {
        const authToken = localStorage.getItem("SAAS_ERP1_CLIENT_TACCESS_TOKEN");
        const response = await api.post(`${import.meta.env.VITE_API_URL}/api/v1/client/campus/institute/assign/admin`, data,
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



const allAssignedUnits = async ( enterpriseId) => {
    try {
        const authToken = localStorage.getItem("SAAS_ERP1_CLIENT_TACCESS_TOKEN");
        const response = await api.get(
            `${import.meta.env.VITE_API_URL}/api/v1/client/campus/institute/units/assigned?enterpriseId=${enterpriseId}`,
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
};





const listAllUnits = async (enterpriseId) => {
    try {
        const authToken = localStorage.getItem("SAAS_ERP1_CLIENT_TACCESS_TOKEN");
        const response = await api.get(
            `${import.meta.env.VITE_API_URL}/api/v1/client/campus/institute/list/all/unit?enterpriseId=${enterpriseId}`,
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
};



const switchToBranch = async (data) => {
    try {
        const authToken = localStorage.getItem("SAAS_ERP1_CLIENT_TACCESS_TOKEN");
        const response = await api.post(`${import.meta.env.VITE_API_URL}/api/v1/client/campus/institute/switch/branch`, data,
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


const switchToOrganization = async (data) => {
    try {
        const authToken = localStorage.getItem("SAAS_ERP1_CLIENT_TACCESS_TOKEN");
        const response = await api.post(`${import.meta.env.VITE_API_URL}/api/v1/client/campus/institute/switch/to/organization`, data,
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
    updateEnterprise,
    createUnit,
    updateUnit,
    updateUnitByUnithead,
    listUnits,
    allUnassignedUnits,
    activeInactiveUnit,
    getOne,
    createAdmin,
    updateAdmin,
    listAdmin,
    allUnassignedAdmin,
    activeInactiveAdmin,
    assignAdminToUnit,
    allAssignedUnits,
    listAllUnits,
    switchToBranch,
    switchToOrganization
}