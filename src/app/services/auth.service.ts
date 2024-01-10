import axios from "axios";
import Cookies from "js-cookie";
export interface LoginResponse{
    jwt:string
}

class AuthService{
    baseUrl = import.meta.env.VITE_BASE_URL;
    Login(email:string, password:string) {
        return axios.post(this.baseUrl + "admin/login", { email, password },{withCredentials:true}
        )
            /*.then((response) => {
                console.log(response.data)
                /!*if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }
                return response.data;*!/
            });*/
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
    
    BringAdmins(){
        return new Promise((res,rej)=>{
            axios.get(`${this.baseUrl}admin`,{withCredentials:true}).then(response=>res(response.data)).catch(err=>rej(err))
        })
    }

    InjectCookie(name:string,value:object){
        Cookies.set(name, value);
    }
    GetCookie(name:string){
        return Cookies.get(name) as string;
    }
    DeleteCookie(name:string){
        Cookies.remove(name)
    }
    isAuth(){
        const user = Cookies.get("_connected_user");
        if(user)
        {
            return true;
        }else{
            return false;
        } 
    }
    
    Logout(){
        return axios.get(`${this.baseUrl}admin/logout`,{
            withCredentials:true
        })
    }

    }
    

    
    /*logout: () => {
        localStorage.removeItem("user");
    },
    register: (username, email, password) => {
        return axios.post(API_URL + "signup", { username, email, password });
    },
    getCurrentUser: () => {
        return JSON.parse(localStorage.getItem("user"));
    },
    getCurrentUserToken: () => {
        const user = JSON.parse(localStorage.getItem("user"));
        return user.accessToken;
    }*/

export default new AuthService();