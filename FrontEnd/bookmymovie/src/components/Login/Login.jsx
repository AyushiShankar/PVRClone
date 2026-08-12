import styles from "./Login.module.scss";
import { login, phone } from "../../config/SectionConfig";
import { useSelector, useDispatch } from "react-redux";
import { updatePayloadFields, getContactDetails } from "../../Redux/movieSlice";
import ReCAPTCHA from "react-google-recaptcha";
import { useState } from "react";
import { API_BASE_URL, RECAPTCHA_SITE_KEY } from "../../config/environment";
import { GoogleLogin } from "@react-oauth/google";
import * as yup from "yup";
import { REGEX } from "../../config/regex";

const getLoginFormSchema = (mobile) =>
  yup.object().shape({
    mobile: yup
      .string()
      .required("Enter mobile Number")
      .matches(REGEX.MOBILE_NUMBER, "Please enter valid mobile number")
  });

export default function Login({ onClose }) {
  const [captchaToken, setCaptchaToken] = useState(null);

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

      const responseText = await response.text();
    } catch (error) {
      console.error("5. FETCH ERROR:", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className={styles["login-backdrop"]}>
      <div className={styles["login-form"]}>
        <img
          src="../images/cross-button.svg"
          alt="cross-icon"
          className={styles.cross}
          onClick={onClose}
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
            />
            <img className={styles.phone} src={phone} alt="phone" />
          </span>
          <div className={styles["google-captcha"]}>
            <ReCAPTCHA
              sitekey={RECAPTCHA_SITE_KEY}
              onChange={(token) => setCaptchaToken(token)}
            />
          </div>
          <button
            className={`${styles["login-btn"]} ${
              !captchaToken ? styles.disabled : ""
            }`}
            disabled={!captchaToken}
          >
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
        {/* <button
          type="button"
          className={styles["google-btn"]}
          onClick={handleGoogleLogin}
        >
          Continue with Google
        </button> */}
      </div>
    </div>
  );
}
