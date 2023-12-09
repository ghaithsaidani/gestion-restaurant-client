import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {ForgotPassword, Login, Register} from "../pages";

const Routers = () => (
    <BrowserRouter>
        <Routes>
            <Route path="*" element={<Navigate to={"/auth/login"} replace={true}/>}/>
            <Route path="auth" element={<Navigate to={"/auth/login"} replace={true}/>}/>
            <Route path="auth">
                <Route path="login" element={<Login/>}/>
                <Route path="register" element={<Register/>}/>
                <Route path="forgot-password" element={<ForgotPassword/>}/>
            </Route>
        </Routes>
    </BrowserRouter>
);
export  default Routers;