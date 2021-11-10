import { ApolloProvider } from '@apollo/client';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';

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
                <LayoutDefault>
                    <Component {...pageProps} />
                </LayoutDefault>
            </SessionProvider>
        </ApolloProvider>
    );
}
