import { ApolloProvider } from '@apollo/client';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import HeadComponent from 'next/head';

import client from '../@graphql/apollo-client';
import LayoutDefault from '../components/layouts/default';
import '../styles/globals.css';

export default function MyApp({
    Component,
    pageProps: { session, ...pageProps },
}: AppProps) {
    return (
        <ApolloProvider client={client}>
            <SessionProvider session={session} refetchInterval={5 * 60}>
                <HeadComponent>
                    <meta
                        name="viewport"
                        content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
                    />
                </HeadComponent>
                <LayoutDefault>
                    <Component {...pageProps} />
                </LayoutDefault>
            </SessionProvider>
        </ApolloProvider>
    );
}
