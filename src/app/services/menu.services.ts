import axios from "axios";

class MenuService{
    baseUrl = import.meta.env.VITE_BASE_URL;
    async getAllDishes(){    
        const response = await axios.get(`${this.baseUrl}dishe`, { withCredentials: true });
        return response.data;
        
    }
    async getDish(id:number){
        const response = await axios.get(`${this.baseUrl}dishe/${id}`,{
            withCredentials:true,
        });
        return response.data;
    }
    async deleteDish(id:number){
        const response = await axios.delete(`${this.baseUrl}dishe?id=${id}`, { withCredentials: true });
        return response.data;
    }
    async postDish(form:FormData){
        const response = await axios.post(`${this.baseUrl}dishe`,form,{
            withCredentials:true,
            headers:{
                "Content-Type" : 'multipart/form-data'
            }
        });
        return response.data;
    }
    async putDish(id:number,form:FormData){
        const response = await axios.put(`${this.baseUrl}dishe?id=${id}`,form,{
            withCredentials:true,
            headers:{
                "Content-Type" : 'multipart/form-data'
            }
        });
        return response.data;
    }
}
export default new MenuService();