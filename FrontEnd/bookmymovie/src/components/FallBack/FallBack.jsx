import styles from "./FallBack.module.scss";

export default function Fallback(){

    return (
        <div className={styles.container}>
            <img src='./images/work-in-progress.png' alt="work Mode On" className={styles.fallbackImage}/>
        </div>
    )
}