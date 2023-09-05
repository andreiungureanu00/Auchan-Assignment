import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Components/Pages/Home/Home";
import Login from "./Components/Pages/Login/Login";
import Register from "./Components/Pages/Register/Register";
import Weather from "./Components/Pages/Weather/Weather";
import { getRequest } from "./Services/request.service";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAuthStatus,
  setAuthStatus,
  setUserID,
} from "./Redux/slices/auth-slice";
import { useCookies } from "react-cookie";

const App = () => {
  const authStatus = useSelector(getAuthStatus);
  const dispatch = useDispatch();
  const [cookies] = useCookies(["token"]);

  const validateToken = async (token) => {
    try {
      const res = await getRequest(`users/check/${token}`, token);
      dispatch(setAuthStatus(true));
      dispatch(setUserID(res.user.id));
    } catch (error) {
      console.error(error);
      alert("Invalid token");
      dispatch(setAuthStatus(false));
    }
  };

  useEffect(() => {
    async function checkToken() {
      const token = cookies.token;
      if (token) {
        await validateToken(token);
      } else {
        dispatch(setAuthStatus(false));
      }
    }
    checkToken();
  });

  return (
    <Routes>
      <Route path="/" element={authStatus ? <Home /> : <Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/weather" element={<Weather />} />
    </Routes>
  );
};

export default App;
