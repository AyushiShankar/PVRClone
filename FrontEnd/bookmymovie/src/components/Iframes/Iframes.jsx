import styles from "./Iframe.module.scss";
export default function Iframes({ onClick, src, title ,style}) {
  return (
    <div className={styles["back-drop"]}>
      <div className={styles["trailer-modal"]}>
        <button className={styles["cross-Btn"]} onClick={onClick}>
          <img
            className={styles["cross-img"]}
            src="/images/cross-button.svg"
            alt="cross_Btn"
          />
        </button>
        <iframe
          className={styles["trailer-iFrame"]}
          src={src}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}
