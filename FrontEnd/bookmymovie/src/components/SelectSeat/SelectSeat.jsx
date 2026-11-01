import date from "../../helpers/date";
import styles from "./SelectSeat.module.scss";
import screens from "../../config/Screens";
import { useState } from "react";

const tomorrow = new Date(Date.now() + 86400000).toLocaleDateString("en-US", {
  weekday: "short",
});

export default function SelectSeat() {
  const [activeDate, setActiveDate] = useState(date[0].day);

  return (
    <div className={styles.container}>
      <div className={styles.showDates}>
        {date.map((d) => (
          <div
            className={`${styles.dates} ${
              activeDate === d.day ? styles.present : ""
            }`}
            key={d.displayDate}
          >
            <span onClick={() => setActiveDate(d.day)}>
              {activeDate && (
                <p
                  style={{
                    margin: "10px",
                    fontSize: "14px",
                    fontWeight: 700,
                  }}
                >
                  {d.month}
                </p>
              )}
              <p style={{ margin: 0, fontSize: "18px", fontWeight: 700 }}>
                {d.displayDate}
              </p>
              <p style={{ fontSize: "14px", fontWeight: 500 }}>
                {d.day === date[0].day
                  ? "Today"
                  : d.day === tomorrow
                  ? "Tomorrow"
                  : d.day}
              </p>
            </span>
          </div>
        ))}
      </div>

      <div className={styles.seatingArrangement}>
        {screens.map((screen) => (
          <>
            <div className={styles.pvrName} key={screen.id}>
              <p style={{ fontSize: "16px", fontWeight: 700 }}>{screen.name}</p>
              <p style={{ fontSize: "14px", fontWeight: 500, color: "grey" }}>
                {screen.address}
              </p>
            </div>
            <span className={styles.separator} />
            {screen?.screens.map((shows) => (
              <>
                {shows?.format && (
                  <p style={{ fontWeight: 700, margin: "0 0 0 20px" }}>
                    {shows.format}
                  </p>
                )}
                <div className={styles.shows} key={shows.id}>
                  <p className={styles.language}>{shows.language}</p>
                  {shows?.showTimes.map((showTime) => (
                    <div
                      className={`${
                        new Date().getTime() >
                          new Date(showTime.time).getTime() &&
                        date[0].day === activeDate
                          ? styles.noShow
                          : styles.showTime
                      }`}
                      key={showTime.time}
                      
                    >
                      <p
                        style={{
                          margin: 0,
                          boxSizing: "border-box",
                        }}
                      >
                        {showTime.time}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            ))}
          </>
        ))}
      </div>
    </div>
  );
}
