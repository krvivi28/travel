import { useState, useMemo, useCallback } from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../../components/Loader/Loader";

const inputClass =
  "border border-solid border-[#D0D7DE] rounded-md px-3 py-2 w-full text-base font-normal";

const Login = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState<boolean | null>(null);
  const [isLoginWindow, setIsLoginWindow] = useState(true);
  const [authCreds, setAuthCreds] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setAuthCreds((prev) => ({ ...prev, [name]: value }));
  };

  const validateInputs = useCallback(() => {
    const { email, password, confirmPassword } = authCreds;
    if (!email || !password) {
      window.alert("Email and password are required.");
      return false;
    }
    if (!isLoginWindow && password !== confirmPassword) {
      window.alert("Passwords do not match.");
      return false;
    }
    return true;
  }, [authCreds, isLoginWindow]);

  const handleLogin = async () => {
    if (!validateInputs()) return;
    if (authCreds.email === "user" && authCreds.password === "1234") {
      localStorage.setItem("token", "1234567890");
      navigate("/");
    } else {
      window.alert("Invalid Credentials!");
    }

    // const endpoint = isLoginWindow ? "/login" : "/signup";
    // const url = `${baseUrl}${endpoint}`;
    // const postData = {
    //   email: authCreds.email,
    //   password: authCreds.password,
    // };

    // try {
    //   setLoader(true);
    //   const { data, status } = await axios.post(url, postData);
    //   if (!isLoginWindow && status === 201) {
    //     toast.success("Signup successful.");
    //     setIsLoginWindow(true);
    //   } else {
    //     localStorage.setItem("token", data.token);
    //     navigate("/");
    //   }
    //   setLoader(false);
    // } catch (error) {
    //   console.error("Authentication error", error);
    //   window.alert("Authentication failed. Please try again.");
    //   setLoader(false);
    // }
  };

  const isAuthBtnDisabled = useMemo(() => {
    const { email, password, confirmPassword } = authCreds;
    return !email || !password || (!isLoginWindow && !confirmPassword);
  }, [authCreds, isLoginWindow]);

  return (
    <div className="h-screen flex items-center justify-center">
      {loader && <Loader />}
      <div className="flex w-[400px] p-8 flex-col gap-6 rounded-md items-center justify-center">
        <img
          style={{ width: "200px" }}
          src="https://thailand.k1travels.com/admin/images/logo.jpeg"
          alt=""
        />
        {/* <h1 className="font-medium text-2xl">
          Sky<span className="text-[#0052CC]">Login</span>
        </h1> */}
        <input
          className={inputClass}
          type="text"
          name="email"
          placeholder="Enter your email"
          onChange={handleChange}
          value={authCreds.email}
        />
        <input
          className={inputClass}
          type="password"
          name="password"
          placeholder="Enter your password"
          onChange={handleChange}
          value={authCreds.password}
        />
        {!isLoginWindow && (
          <input
            className={inputClass}
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            onChange={handleChange}
            value={authCreds.confirmPassword}
          />
        )}
        <button
          className={`py-2.5 px-3.5 w-full rounded-md border border-solid border-[#1570EF] shadow-md ${
            isAuthBtnDisabled ? "bg-[#4c81cb]" : "bg-[#1570EF]"
          }`}
          onClick={handleLogin}
          disabled={isAuthBtnDisabled}
        >
          <p className="text-white font-semibold text-sm">
            {isLoginWindow ? "Login" : "Signup"}
          </p>
        </button>

        <div className="flex items-center justify-center gap-1 text-sm font-normal">
          <p className="text-[#4A5568]">
            {isLoginWindow
              ? "Don’t have an account?"
              : "Already have an account?"}
          </p>
          <p
            onClick={() => setIsLoginWindow(!isLoginWindow)}
            className="text-[#0052CC] cursor-pointer"
          >
            {isLoginWindow ? "Create one" : "Log In"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
