import styles from "./Flag.module.scss";

export default function TagFlag({text}){
    return <p className={styles["flag-tag"]}>{text}</p>

}