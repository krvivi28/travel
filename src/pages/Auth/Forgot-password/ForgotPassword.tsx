import { Input } from "@src/components";

import AuthLayout from "../AuthLayout";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@src/store/store";
import { APIRequestState } from "@src/store/utils";
import { forgotPassword } from "@src/store/slices/auth.slice";

const ForgotPassword = () => {
  const dispath = useAppDispatch();
  const [disableButton, setDisableButton] = useState(false);
  const [creds, setCreds] = useState({ email: "" });
  const { message, error, status } = useSelector(
    (state: RootState) => state.auth
  );

  let timer: NodeJS.Timeout;
  const handleForgetPassword = () => {
    if (!disableButton) {
      dispath(forgotPassword(creds));
    }
    clearTimeout(timer);
    setDisableButton(true);
    timer = setTimeout(() => {
      setDisableButton(false);
    }, 60 * 1000);
  };

  return (
    <AuthLayout title="Forgot Password">
      <div className="w-full flex flex-col">
        <Input
          value={creds.email}
          onChange={(e) => setCreds({ ...creds, email: e.target.value })}
          label="Email"
          type="email"
        />
      </div>

      {message && <p className="text-green-600 mt-1">{message}</p>}

      <button
        onClick={handleForgetPassword}
        disabled={
          !creds.email || status === APIRequestState.LOADING || disableButton
        }
        className="btn btn-primary w-full"
      >
        {status === APIRequestState.LOADING ? (
          <span className="loading loading-spinner"></span>
        ) : (
          "Send link"
        )}
      </button>
      {error && <p className="text-red-600 mt-1">{error}</p>}
    </AuthLayout>
  );
};

export default ForgotPassword;
