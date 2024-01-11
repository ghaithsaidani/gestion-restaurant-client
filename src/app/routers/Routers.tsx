import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {Dashboard, ForgotPassword, Login, Register,NotFound} from "../pages";
import ChangePassword from "../pages/auth/change-password/change-password";

const Routers = () => (
    <BrowserRouter>
        <Routes>
            <Route path="*" element={<NotFound />}/>
            <Route path="" element={<Navigate to={"/auth/login"} replace={true}/>}/>
            <Route path="auth" element={<Navigate to={"/auth/login"} replace={true}/>}/>
            <Route path="auth">
                <Route path="login" element={<Login/>}/>
                <Route path="register" element={<Register/>}/>
                <Route path="forgot-password" element={<ForgotPassword/>}/>
                <Route path="change-password" element={<ChangePassword/>}/>
            </Route>
            <Route path={"dashboard"} element={<Dashboard/>}/>
        </Routes>
    </BrowserRouter>
);
export  default Routers;