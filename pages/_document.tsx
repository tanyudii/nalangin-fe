/* eslint-disable @next/next/no-page-custom-font */

/* eslint-disable @next/next/no-document-import-in-page */
import { Head as HeadComponent, Html, Main, NextScript } from 'next/document';

export default function MyDocument() {
    return (
        <Html>
            <HeadComponent>
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="description" content="Description" />
                <meta name="keywords" content="Keywords" />
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
                <link rel="manifest" href="/manifest.json" />
                <link
                    href="/favicon-16x16.png"
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                />
                <link
                    href="/favicon-32x32.png"
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                />
                <link rel="apple-touch-icon" href="/apple-icon.png" />
                <meta name="theme-color" content="#317EFB" />
            </HeadComponent>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
