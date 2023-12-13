class TokenStorageService{
    saveToken(token:string){
        sessionStorage.setItem("accessToken",token)
    }
}

export default new TokenStorageService();