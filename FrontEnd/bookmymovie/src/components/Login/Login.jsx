import styles from "./Login.module.scss";
import { login, phone } from "../../config/SectionConfig";
import { useSelector, useDispatch } from "react-redux";
import {
  updatePayloadFields,
  getContactDetails,
  setContactDetails,
  setIsAuthenticated,
} from "../../Redux/movieSlice";
import ReCAPTCHA from "react-google-recaptcha";
import { useState } from "react";
import { API_BASE_URL, RECAPTCHA_SITE_KEY } from "../../config/environment";
import { GoogleLogin } from "@react-oauth/google";
import { REGEX } from "../../config/regex";

export default function Login({ onClose }) {
  const [captchaToken, setCaptchaToken] = useState(null);
  const [mobile, setMobile] = useState("");
  const [submit, setSubmit] = useState(false);
  const dispatch = useDispatch();

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const url = `${API_BASE_URL}/api/auth/google`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          credential: credentialResponse?.credential,
        }),
      });
      if (response.ok) {
        dispatch(setIsAuthenticated(true));
      }
    } catch (error) {
      console.error("5. FETCH ERROR:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmit(true);
    const result = mobile.match(REGEX.MOBILE_NUMBER);
    if (captchaToken && result) {
      console.log("loggedin");
      dispatch(
        setContactDetails({
          mobileNo: mobile,
          email: "",
        })
      );
      onClose?.();
    }
  };

  return (
    <div className={styles["login-backdrop"]}>
      <div className={styles["login-form"]}>
        <img
          src="../images/cross-button.svg"
          alt="cross-icon"
          className={styles.cross}
          onClick={() => {
            onClose?.();
            setSubmit(false);
          }}
        />
        <img src={login} alt="login-form" className={styles["login-image"]} />
        <h2 className={styles.heading}>Verify Phone Number</h2>
        <p className={styles.para}>Enter your phone number to proceed</p>
        <form onSubmit={handleSubmit}>
          <span className={styles.userDetails}>
            <label className={styles.mobileLabel}>Mobile Number</label>
            <input
              className={styles.mobileNo}
              styles={{ border: "none", outline: "none" }}
              onChange={(e) => setMobile(e.target.value)}
              value={mobile}
              maxLength={10}
            />
            <img className={styles.phone} src={phone} alt="phone" />
          </span>
          {!mobile.match(REGEX.MOBILE_NUMBER) && mobile ? (
            <p className={styles.error}>Please enter valid mobile number</p>
          ) : (
            !mobile &&
            submit && <p className={styles.error}>Mobile Number is mandatory</p>
          )}
          <br />
          <div className={styles["google-captcha"]}>
            <ReCAPTCHA
              sitekey={RECAPTCHA_SITE_KEY}
              onChange={(token) => setCaptchaToken(token)}
            />
            {!captchaToken && submit && (
              <p className={styles.error}>Please verify CAPTCHA</p>
            )}
          </div>

          <button className={styles["login-btn"]} type="submit">
            Proceed
          </button>
        </form>
        <div className={styles.separator}>
          <div className={styles["side-line"]} />
          <h2
            style={{
              fontSize: "14px",
              color: " #908e8e",
              padding: "6px",
              margin: 0,
            }}
          >
            OR
          </h2>
          <div className={styles["side-line"]} />
        </div>
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => {
            console.log("Google Login Failed");
          }}
        />
      </div>
    </div>
  );
};

