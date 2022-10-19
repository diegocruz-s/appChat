import { api } from "../utils/api";

export const registerUser = async (user)=>{
    
    const res = await api.post('/auth', user)
        .then(resp => resp.data) // obj dos dados
        .catch(resp => resp.response.data);  // obj do erro

    if(res.token){
        localStorage.setItem('user', JSON.stringify(res));
    }

    return res;
    
}

export const loginUser = async (user) => {

    const res = await api.post('/auth/login', user)
        .then(resp => resp.data)
        .catch(resp => resp.response.data);

    console.log('res', res);

    if(res.token){
        localStorage.setItem('user', JSON.stringify(res));
    }

    return res;

}