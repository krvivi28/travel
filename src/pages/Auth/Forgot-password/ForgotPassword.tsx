import { Input } from "@src/components";
import AuthLayout from "../AuthLayout";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@src/store/store";
import { APIRequestState } from "@src/store/utils";
import { forgotPassword } from "@src/store/slices/auth.slice";

const ForgotPassword = () => {
  const dispatch = useAppDispatch();
  const [disableButton, setDisableButton] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [creds, setCreds] = useState({ email: "" });
  const { message, error, status } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (countdown > 0) {
      timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else {
      setDisableButton(false);
    }

    return () => clearTimeout(timer);
  }, [countdown]);

  useEffect(() => {
    if (status === APIRequestState.SUCCESS) {
      setCountdown(60);
      setDisableButton(true);
    }
  }, [status]);

  const handleForgetPassword = () => {
    if (!disableButton && creds.email) {
      dispatch(forgotPassword(creds));
    }
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

      {message && status === APIRequestState.SUCCESS && (
        <p className="text-green-600 mt-1">{message}</p>
      )}
      {error && <p className="text-red-600 mt-1">{error}</p>}

      <button
        onClick={handleForgetPassword}
        disabled={!creds.email || disableButton}
        className="btn btn-primary w-full"
      >
        {status === APIRequestState.LOADING ? (
          <span className="loading loading-spinner"></span>
        ) : countdown > 0 ? (
          `Resend link in ${countdown}s`
        ) : (
          "Send link"
        )}
      </button>
    </AuthLayout>
  );
};

export default ForgotPassword;
