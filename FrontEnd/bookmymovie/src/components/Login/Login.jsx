import styles from "./Login.module.scss";
import { login,phone } from "../../config/SectionConfig";
import { useSelector, useDispatch } from "react-redux";
import { updatePayloadFields, getContactDetails } from "../../Redux/movieSlice";

//pvrCinemaClone

export default function Login() {
  return (
    <div className={styles["login-backdrop"]}>
      <div className={styles["login-form"]}>
         <img
              src="../images/cross-button.svg"
              alt="cross-icon"
              style={{
                width: "32px",
                height: "32px",
                margin: 0,
                position: "relative",
                padding: 0,
                top: "10px",
                right: 0,
                cursor: "pointer",
              }} />
        <img src={login} alt="login-form" className={styles["login-image"]} />
        <h2 className={styles.heading}>Verify Phone Number</h2>
        <p className={styles.para}>Enter your phone number to proceed</p>
        <span className={styles.userDetails}>
          <label className={styles.mobileLabel}>Mobile Number</label>
          <input className={styles.mobileNo} />
          <img className={styles.phone} src={phone} alt="phone" />
        </span>
      </div>
    </div>
  );
}
