import { Input } from "@src/components";

import AuthLayout from "../AuthLayout";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@src/store/store";
import { APIRequestState } from "@src/store/utils";
import { resetPassword } from "@src/store/slices/auth.slice";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const dispath = useAppDispatch();
  const navigate = useNavigate();
  const { token } = useParams();
  const [creds, setCreds] = useState({ password: "", confirmPassword: "" });
  const {
    agency_details,
    error,
    status,
    token: authToken,
  } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (agency_details) {
      localStorage.setItem("user", JSON.stringify(agency_details));
    }
    if (authToken) {
      localStorage.setItem("token", authToken);
      navigate("/");
    }
  }, [token, agency_details]);

  const handleResetPassword = () => {
    const newCreds = {
      password: creds.password,
      confirmPassword: creds.confirmPassword,
      token: token ?? "",
    };

    dispath(resetPassword(newCreds));
  };

  return (
    <AuthLayout title="Reset Password">
      <div className="w-full flex flex-col">
        <Input
          label="New Password"
          type="password"
          value={creds.password}
          onChange={(e) => setCreds({ ...creds, password: e.target.value })}
        />
        <Input
          label="Confirm Password"
          type="password"
          value={creds.confirmPassword}
          onChange={(e) =>
            setCreds({ ...creds, confirmPassword: e.target.value })
          }
        />
      </div>
      <button
        onClick={handleResetPassword}
        disabled={
          !creds.password ||
          !creds.confirmPassword ||
          status === APIRequestState.LOADING
        }
        className="btn btn-primary w-full"
      >
        {status === APIRequestState.LOADING ? (
          <span className="loading loading-spinner"></span>
        ) : (
          "Reset Password"
        )}
      </button>
      {error && <p className="text-red-600 mt-1">{error}</p>}
    </AuthLayout>
  );
};

export default ResetPassword;
