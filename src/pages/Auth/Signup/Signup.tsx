import { Input } from "@src/components";
import AuthLayout from "../AuthLayout";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@src/store/store";
import { APIRequestState } from "@src/store/utils";
import { signup } from "@src/store/slices/auth.slice";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const dispath = useAppDispatch();
  const navigate = useNavigate();
  const [creds, setCreds] = useState({
    agency_name: "",
    contact_person: "",
    contact_number: +91,
    email: "",
    password: "",
    profileImg: "",
  });
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
  const handleSignup = () => {
    dispath(signup(creds));
  };

  const handleFileChange = () => {};

  const handleLogin = () => {
    navigate('/login');
  }

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
        <div className="form-control">
          <label className="label">
            <span className="label-text">Profile Image</span>
          </label>
          <input
            type="file"
            name="profileImg"
            onChange={handleFileChange}
            value={creds.profileImg}
            className="file-input file-input-bordered w-full"
          />
        </div>
      </div>
      <button
        onClick={handleSignup}
        disabled={
          !creds.email || !creds.password || status === APIRequestState.LOADING
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
        <button className="text-sm" onClick={handleLogin}>
        Already a user? Login here
        </button>
      </div>
    </AuthLayout>
  );
};

export default Signup;
