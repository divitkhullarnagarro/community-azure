import { Field, ImageField, NextImage, RichTextField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import Link from 'next/link';
import ArticlesListCss from '../assets/ArticlesList.module.css';
import sourceImage from '../assets/images/source.svg';
import calendarImage from '../assets/images/calendar.svg';
import bookmarkImage from '../assets/images/bookmark.svg';
import activeBookmarkImage from '../assets/images/BookmarActive.svg';
import shareImage from '../assets/images/share.svg';
import linkedin from '../assets/images/linkedin.png';
import twitter from '../assets/images/twitter.png';
import whatsapp from '../assets/images/whatsapp.png';
import bookmark from '../../src/API/bookmarks';
import { useContext, useState } from 'react';
import WebContext from 'src/Context/WebContext';
// import { useRouter } from 'next/router';

type ArticlesListProps = ComponentProps & {
  fields: {
    data: {
      datasource: DataSource;
    };
  };
};

type Item = {
  id: string;
  url: {
    url: string;
  };
  title: {
    jsonValue: Field<string>;
  };
  description: {
    jsonValue: RichTextField;
  };
  image: {
    jsonValue: ImageField;
  };
  date: {
    jsonValue: Field<string>;
  };
  author: {
    jsonValue: Field<string>;
  };
  tags: {
    targetItems: [
      {
        name: Field<string>;
      }
    ];
  };
  contentType: {
    targetItems: [
      {
        name: Field<string>;
      }
    ];
  };
};
type DataSource = {
  articlesList: {
    targetItems: Item[];
  };
};

const getFormatedDate = (stringDate: string) => {
  const date = new Date(stringDate);

  // Get month abbreviation
  const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);

  // Get day with leading zero if necessary
  const day = String(date.getDate()).padStart(2, '0');

  // Get full year
  const year = date.getFullYear();

  // Combine into formatted string
  const formattedDate = `${month} ${day} ${year}`;

  return formattedDate;
};


  

const ArticlesList = (props: ArticlesListProps): JSX.Element => {
  const { userToken,setUserToken } = { ...useContext(WebContext)  };

  const setTokenFromLocalStorage = () => {
    if (userToken === undefined || userToken === '') {
      if (
        typeof localStorage !== 'undefined' &&
        localStorage.getItem('UserToken') != '' &&
        localStorage.getItem('UserToken') != null
      ) {
        let token = localStorage.getItem('UserToken');
        if (token != null && setUserToken != undefined) {
          setUserToken(token);
        }
      }
    }
  };

  // useEffect(()=>{
  //   console.log("aaaaaaaaaaa")
  //   window.localStorage.setItem("token",userToken!)
  // },[])
  const userIdTemp = 'a@gmail.com';

  // const router = useRouter();

  const { targetItems } = props?.fields?.data?.datasource.articlesList;

  const [selectedArticle, setSelectedArticle] = useState<any>([]);
  // Change the bookmark image with active bookmark image
  const handleSelectedArticle = (id: any) => {
    if (selectedArticle.includes(id)) {
    
    const index = selectedArticle.indexOf(id)
    
    if(index>-1){
    
    selectedArticle.splice(index,1)
    
    }
    
     } else {
    
    setSelectedArticle([...selectedArticle, id]);
    
    }
    
   };
  const [clicked, setClicked] = useState(false);
  // const handleClick = () => {
  //   if (clicked) {
  //     setField(bookmarkImage);
  //   } else {
  //     // update field to a new value when button is clicked for the first time
  //     setField(activeBookmarkImage);
  //   }
  //   // toggle the clicked state
  //   setClicked(!clicked);
  // };

  const [showPopup, setShowPopup] = useState(false);

  const handleShareClick = () => {
    if (clicked) {
      setShowPopup(false);
    } else {
      setShowPopup(true);
    }
    setClicked(!clicked);
  };

  const bookmarkApi = async (
    userIdTemp: string,
    contentId: string,
    title: string,
    comment: string | undefined,
    userToken: string | undefined
  ) => {
    let response = await bookmark(userIdTemp, contentId, title, comment, userToken);
    // url,
    console.log(response);
  };

  const submitBookmark = (
    userIdTemp: string,
    contentId: string,
    // url: string,
    title: string,
    comment: string | undefined
  ) => {
    setTokenFromLocalStorage();
    bookmarkApi(userIdTemp, contentId, title, comment, userToken);
    // , url:string
    // handleClick();
    handleSelectedArticle(contentId);
  };

  return (
    <div className={ArticlesListCss.mainwrapper}>
      {targetItems.map((l, i) => {
        return (
          <div key={i} className={ArticlesListCss.wrapper}>
            <div className={ArticlesListCss.leftSection}>
              <NextImage
                className={ArticlesListCss.leftSectionImage}
                field={l.image.jsonValue.value}
                editable={true}
              />
            </div>
            <div className={ArticlesListCss.rightSection}>
              <div className={ArticlesListCss.title}>{l.title.jsonValue.value}</div>
              <div className={ArticlesListCss.cardDescription}>
                <p>
                  {l.description.jsonValue.value}
                  {/* <Link href="/readMorePage">Read More </Link> */}
                </p>
              </div>
              <div className={ArticlesListCss.cardTags}>
                {l.tags.targetItems.map((m, j) => {
                  return (
                    <div key={j} className={ArticlesListCss.cardTag}>
                      <Link key={j} href={'/#'}>
                        {m.name}
                      </Link>
                    </div>
                  );
                })}
              </div>
              <div className={ArticlesListCss.infoWrapper}>
                <div className={ArticlesListCss.infoWrapperTag}>
                  <NextImage
                    className={ArticlesListCss.infowrapperImage}
                    field={sourceImage}
                    editable={true}
                  />
                  <div className={ArticlesListCss.infoWrapperTagData}>
                    {l.author.jsonValue.value}{' '}
                  </div>
                </div>
                <div className={ArticlesListCss.infoWrapperTag}>
                  <NextImage
                    className={ArticlesListCss.infowrapperImage}
                    field={calendarImage}
                    editable={true}
                  />
                  <div className={ArticlesListCss.infoWrapperTagData}>
                    {getFormatedDate(l.date.jsonValue.value)}
                  </div>
                </div>
              </div>

              <div className={ArticlesListCss.buttons}>
                <button
                  className={ArticlesListCss.button}
                  onClick={() =>
                    submitBookmark(
                      userIdTemp,
                      l.id,
                      // l.title?.jsonValue.value, //This is for URL or Image value
                      l.title?.jsonValue?.value,
                      l.description?.jsonValue?.value
                    )
                  }
                >
                  <NextImage
                    field={selectedArticle?.includes(l.id)?activeBookmarkImage:bookmarkImage}
                    id="bookamrksImage"
                    editable={true}
                    title="Add To My Collection"
                  />
                </button>
                <button className={ArticlesListCss.button} onClick={handleShareClick}>
                  <NextImage field={shareImage} editable={true} title="Share" />
                </button>
              </div>

              {showPopup && (
                <div className={ArticlesListCss.sharePopups}>
                  <div className={ArticlesListCss.sharePopup}>
                    <NextImage
                      className={ArticlesListCss.whatsappImage}
                      field={whatsapp}
                      editable={true}
                      width={25}
                      height={25}
                    />
                    <Link
                      href={
                        'https://wa.me/?text=Check%20out%20this%20article%20I%20found%3A%20' +
                        l.title?.jsonValue?.value
                      }
                    >
                      WhatsApp
                    </Link>
                  </div>

                  <div className={ArticlesListCss.sharePopup}>
                    <NextImage
                      className={ArticlesListCss.whatsappImage}
                      field={twitter}
                      editable={true}
                      width={25}
                      height={25}
                    />
                    <Link
                      href={
                        'https://twitter.com/intent/tweet?url=' +
                        l.url?.url +
                        '&text=' +
                        l.title?.jsonValue?.value
                      }
                    >
                      Twitter
                    </Link>
                  </div>

                  <div className={ArticlesListCss.sharePopup}>
                    <NextImage
                      className={ArticlesListCss.whatsappImage}
                      field={linkedin}
                      editable={true}
                      width={25}
                      height={25}
                    />
                    <Link
                      href={'https://www.linkedin.com/sharing/share-offsite/?url=' + l.url?.url}
                    >
                      LinkedIn
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ArticlesList;
