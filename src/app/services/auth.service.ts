import axios from "axios";

export interface LoginResponse{
    jwt:string
}

class AuthService{
    baseUrl = import.meta.env.VITE_BASE_URL;
    Login(email:string, password:string) {
        return axios.post(this.baseUrl + "Admin/login", { email, password })
            /*.then((response) => {
                console.log(response.data)
                /!*if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }
                return response.data;*!/
            });*/
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
}

export default new AuthService();