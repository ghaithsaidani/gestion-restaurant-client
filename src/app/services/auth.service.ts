import axios from "axios";
import {User} from "../public/shared/user.model";

export interface LoginResponse {
    jwt: string
}

class AuthService {
    Config=axios.create({
        baseURL: import.meta.env.VITE_BASE_URL,
        headers: {
            "Content-type": "application/json",
        }
    });
    baseUrl = import.meta.env.VITE_BASE_URL;
    Login = (email: string, password: string) => {
        return this.Config.post(this.baseUrl + "admin/login", {email, password})
    }
    Register = (user: User) => {
        return this.Config.post(this.baseUrl + "admin/register", user);
    }

    ResetPassword(email:string)
    {
        return new Promise((res,rej)=>{
            axios.post(`${this.baseUrl}admin/sendPassRecoveryLink`,{email}).then(response =>res(response.data)).catch(err=>rej(err))
        })
    }

    ChangePassword(password:string)
    {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get("id")
        return new Promise((res,rej)=>{
            axios.put(`${this.baseUrl}admin/changePassword?id=${id}`,{password}).then(response =>res(response.data)).catch(err=>rej(err))
        })
    }
          
    
    }
    

    /*logout: () => {
        localStorage.removeItem("user");
    },

    getCurrentUser: () => {
        return JSON.parse(localStorage.getItem("user"));
    },
    getCurrentUserToken: () => {
        const user = JSON.parse(localStorage.getItem("user"));
        return user.accessToken;
    }*/

export default new AuthService();