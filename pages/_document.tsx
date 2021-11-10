/* eslint-disable @next/next/no-page-custom-font */

/* eslint-disable @next/next/no-document-import-in-page */
import { Head as HeadComponent, Html, Main, NextScript } from "next/document";

export default function MyDocument() {
  return (
    <Html>
      <HeadComponent>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </HeadComponent>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
