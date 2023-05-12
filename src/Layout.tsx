import React from 'react';
import Head from 'next/head';
import {
  Placeholder,
  VisitorIdentification,
  getPublicUrl,
  LayoutServiceData,
} from '@sitecore-jss/sitecore-jss-nextjs';

// Prefix public assets with a public URL to enable compatibility with Sitecore editors.
// If you're not supporting Sitecore editors, you can remove this.
const publicUrl = getPublicUrl();

interface LayoutProps {
  layoutData: LayoutServiceData;
}

const Layout = ({ layoutData }: LayoutProps): JSX.Element => {
  const { route } = layoutData.sitecore;

  return (
    <>
      <Head>
        <title>{route?.fields?.pageTitle?.value || 'Page'}</title>
        <link rel="icon" href={`${publicUrl}/favicon.ico`} />
        <script src="https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js"></script>

        <script src="https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js"></script>

        <script src="https://cdn.jsdelivr.net/npm/react-bootstrap@next/dist/react-bootstrap.min.js"></script>

        <script>var Alert = ReactBootstrap.Alert;</script>
      </Head>

      {/*
        VisitorIdentification is necessary for Sitecore Analytics to determine if the visitor is a robot.
        If Sitecore XP (with xConnect/xDB) is used, this is required or else analytics will not be collected for the JSS app.
        For XM (CMS-only) apps, this should be removed.

        VI detection only runs once for a given analytics ID, so this is not a recurring operation once cookies are established.
      */}
      <VisitorIdentification />
      {/* root placeholder for the app, which we add components to using route data */}
      <div>{route && <Placeholder name="jss-header" rendering={route} />}</div>
      <div>{route && <Placeholder name="jss-main" rendering={route} />}</div>
      <div>{route && <Placeholder name="jss-footer" rendering={route} />}</div>
    </>
  );
};

export default Layout;
