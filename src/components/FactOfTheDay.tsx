import { useContext, useEffect, useState } from 'react';
import { Field, ImageField, NextImage } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import factOfTheDayCss from '../assets/factOfTheDay.module.css';
import darkModeCss from '../assets/darkTheme.module.css';
import WebContext from 'src/Context/WebContext';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

type FactOfTheDayProps = ComponentProps & {
  fields: {
    data: {
      datasource: DataSource;
    };
  };
};
type DataSource = {
  children: {
    results: Array<FactOfTheDay>;
  };
  params?: {
    automatic?: {
      jsonValue: Boolean;
    };
  };
};

type FactOfTheDay = {
  automatic: {
    jsonValue: Field<boolean>;
  };
  description: {
    jsonValue: Field<string>;
  };
  title: {
    jsonValue: Field<string>;
  };
  image: {
    jsonValue: ImageField;
  };
};

const FactOfTheDay = (props: FactOfTheDayProps): JSX.Element => {
  const targetItems = props?.fields?.data?.datasource?.children?.results;
  var data: any;

  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const { darkMode } = { ...useContext(WebContext) };
  useEffect(() => {
    const Interval = setTimeout(() => {
      setIsDataLoaded(true);
    }, 2000);
    return () => clearInterval(Interval);
  }, []);

  if (props['params'] !== undefined) {
    targetItems?.forEach((element) => {
      if (element?.automatic?.jsonValue?.value === true) {
        data = element;
      }
    });
  } else {
    targetItems?.forEach((element) => {
      if (element?.automatic?.jsonValue?.value === false) {
        data = element;
      }
    });
  }

  const FactOfTheDaySkeleton = () => {
    return (
      <>
        <div className={factOfTheDayCss.cardContainer}>
          <div className={`${factOfTheDayCss.cardbody} ${darkMode ? darkModeCss.grey_3 : ''}`}>
            <Skeleton height={180} />
            <div className={factOfTheDayCss.cardText}>
              <Skeleton height={20} />
              <Skeleton height={35} />
            </div>
          </div>
        </div>
      </>
    );
  };
  const FactOfTheDay = () => {
    return (
      <>
        <div className={factOfTheDayCss.cardContainer}>
          <div className={`${factOfTheDayCss.cardbody} ${darkMode ? darkModeCss.grey_3 : ''}`}>
            <NextImage objectFit="cover" field={data?.image?.jsonValue?.value} />
            <div className={factOfTheDayCss.cardText}>
              <div
                className={`${factOfTheDayCss.cardTitle} ${darkMode ? darkModeCss.text_green : ''}`}
              >
                {data?.title?.jsonValue?.value}
              </div>
              <div
                className={`${factOfTheDayCss.cardDescription} ${
                  darkMode ? darkModeCss.text_light : ''
                }`}
              >
                {data?.description?.jsonValue?.value}
              </div>
              {data?.description?.jsonValue?.value.length > 250 && (
                <div className={factOfTheDayCss.tooltip}>{data?.description?.jsonValue?.value}</div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  };
  return <>{isDataLoaded ? <FactOfTheDay /> : <FactOfTheDaySkeleton />}</>;
};

// export default withDatasourceCheck()<FactOfTheDayProps>(FactOfTheDay);

export default FactOfTheDay;
