import React from 'react';
import styles from '../assets/events.module.css';

const Event = (props: any) => {
  const data = props?.events?.event;
  const id = props?.events?.id;
  console.log('++++++++++++++++++++', data);
  const splitDateOnly = (date: any) => {
    const dateOnly = date?.split('T')[0];
    return dateOnly;
  };
  const splitTimeOnly = (date: any) => {
    const timeOnly = date?.split('T')[1];
    return timeOnly;
  };
  return (
    <a href={`/post/${id}`} className={styles.link} target="_blank">
      {props?.fromALL ? <div className={styles.typeHeading}>Event</div> : ''}
      <div className={styles.parentContainer}>
        <div className={styles.imgAndContentContainer}>
          <img
            src="https://chinchincelebration.com/wp-content/uploads/2019/08/product-launch-events-min.png"
            alt="eventImg"
          />
          <div className={styles.content}>
            <div className={styles.eventHeading}>{data?.title}</div>
            <div className={styles.timeContainer}>
              <div className={styles.eventTime}>
                {splitDateOnly(data?.eventDate) + ' ' + splitTimeOnly(data?.eventDate)}
              </div>
            </div>
            <div className={styles.eventDescription}>{data?.description}</div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default Event;
