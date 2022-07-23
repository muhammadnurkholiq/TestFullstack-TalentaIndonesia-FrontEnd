// react
import { useContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

// API
import { API, setAuthToken } from "./config/API";

// context
import { AuthContext } from "./context/AuthContext";

// pages
import Auth from "./pages/Auth";
import Friends from "./pages/Friends";
import Report from "./pages/Report";

export default function App() {
  // context
  const [state, dispatch] = useContext(AuthContext);
  // navigate
  let navigate = useNavigate();

  // set token
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    if (state.isLogin === false) {
      navigate("/");
    } else {
      navigate("/friend");
    }
  }, [state]);

  // check user
  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");

      // check token valid
      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      // Get user data
      let payload = response.data.data;

      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // call function check user
  useEffect(() => {
    checkUser();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/friend" element={<Friends />} />
      <Route path="/report" element={<Report />} />
    </Routes>
  );
}
