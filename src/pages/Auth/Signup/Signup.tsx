import { Input } from "@src/components";
import AuthLayout from "../AuthLayout";
import { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@src/store/store";
import { APIRequestState } from "@src/store/utils";
import { signup } from "@src/store/slices/auth.slice";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [creds, setCreds] = useState({
    agency_name: "",
    contact_person: "",
    contact_number: 0,
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
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

  const handlePasswordMatch = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    if (creds.password !== e.target.value) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }
  }

  const handleSignup = () => {
    if (passwordError.length === 0) {
      dispatch(signup(creds));
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <AuthLayout title="Signup-SmartFares">
      <div className="w-full flex flex-col">
        <Input
          value={creds.agency_name}
          onChange={(e) => setCreds({ ...creds, agency_name: e.target.value })}
          label="Agency Name"
          type="string"
        />
        <Input
          value={creds.contact_person}
          onChange={(e) =>
            setCreds({ ...creds, contact_person: e.target.value })
          }
          label="Contact Person"
          type="string"
        />
        <Input
          value={creds.contact_number}
          onChange={(e) =>
            setCreds({ ...creds, contact_number: parseInt(e.target.value) })
          }
          label="Contact Number"
          type="number"
        />
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
        <Input
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => handlePasswordMatch(e)}
        />
        {passwordError && <p className="text-red-600 mt-1">{passwordError}</p>}
      </div>
      <button
        onClick={handleSignup}
        disabled={
          !creds.email ||
          !creds.password ||
          creds.password.length < 4 ||
          !creds.agency_name ||
          !creds.contact_number ||
          !creds.contact_person ||
          !confirmPassword ||
          status === APIRequestState.LOADING
        }
        className="btn btn-primary w-full"
      >
        {status === APIRequestState.LOADING ? (
          <span className="loading loading-spinner"></span>
        ) : (
          "Sign Up"
        )}
      </button>
      {error && <p className="text-red-600 mt-1">{error}</p>}
      <div>
        <button className="text-sm hover:text-primary" onClick={handleLogin}>
          Already a user? Login here
        </button>
      </div>
    </AuthLayout>
  );
};

export default Signup;
