import { api } from "../utils/api";

export const groupsUser = async (token) => {
    
    const res = await api.get('/group', {
        headers: {
            'authorization' : `Bearer ${token}`
        }
    });

    return res.data;
};

export const messages = async (id, token) => {
    const res = await api.get(`/messages/${id}`, {
        headers: {
            'authorization' : `Bearer ${token}`
        }
    });

    return res.data;
};

export const createMessage = async (msg, token)=>{

    const res = await api.post(`/messages/${msg.GroupId}`, msg, {
        headers: {
            'authorization' : `Bearer ${token}`
        }
    });

    return res.data;
}
