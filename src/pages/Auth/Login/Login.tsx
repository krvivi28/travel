import { Input } from "@src/components";

import AuthLayout from "../AuthLayout";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@src/store/store";
import { APIRequestState } from "@src/store/utils";
import { login } from "@src/store/slices/auth.slice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispath = useAppDispatch();
  const navigate = useNavigate();
  const [creds, setCreds] = useState({ email: "", password: "" });
  const { agency_details, error, status, token } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (agency_details) {
      localStorage.setItem("user", JSON.stringify(agency_details));
    }
    if (token) {
      localStorage.setItem("token", token);
      navigate("/");
    }
  }, [token, agency_details]);
  const handleLogin = () => {
    dispath(login(creds));
  };

  const handleSignUp = () => {
    navigate('/signup');
  }

  return (
    <AuthLayout title="Login-SmartFares">
      <div className="w-full flex flex-col">
        <Input
          value={creds.email}
          onChange={(e) => setCreds({ ...creds, email: e.target.value })}
          label="Email"
          type="email"
        />
        <Input
          label="Password"
          type="password"
          value={creds.password}
          onChange={(e) => setCreds({ ...creds, password: e.target.value })}
        />
      </div>
      <button
        onClick={handleLogin}
        disabled={
          !creds.email || !creds.password || status === APIRequestState.LOADING
        }
        className="btn btn-primary w-full"
      >
        {status === APIRequestState.LOADING ? (
          <span className="loading loading-spinner"></span>
        ) : (
          "Login"
        )}
      </button>
      {error && <p className="text-red-600 mt-1">{error}</p>}
      <div>
        <button className="text-sm hover:text-primary" onClick={handleSignUp}>
          Sign Up 
        </button>
      </div>
    </AuthLayout>
  );
};

export default Login;
