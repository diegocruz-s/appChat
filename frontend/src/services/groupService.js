import { api } from "../utils/api";

export const groupsUser = async (token) => {
    
    const res = await api.get('/group', {
        headers: {
            'authorization' : `Bearer ${token}`
        }
    });

    return res.data;
}
