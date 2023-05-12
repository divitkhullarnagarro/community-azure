import React from 'react';
import styles from '../assets/events.module.css';
import { modifyHtml } from 'assets/helpers/helperFunctions';
import parser from 'html-react-parser';

const ImageConatiner = (props: any) => {
  console.log('qqqqqqqqqqqqqqqqqqq', props?.events?.mediaInfoList[0]?.url);
  const id = props?.events?.id;

  return (
    <a  href={`/post/${id}`} className={styles.link} target="_blank">
      {props?.fromALL ? <div className={styles.typeHeading}>Post</div> : ''}
      <div className={styles.parentContainer}>
        <div className={styles.imgAndContentContainer}>
          <img src={props?.events?.mediaInfoList[0]?.url} alt="eventImg" />
          <div className={styles.content}>
            {parser(modifyHtml(props?.events?.description))}
            <div className={styles.eventDescription}></div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default ImageConatiner;
