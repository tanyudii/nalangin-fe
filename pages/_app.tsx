import { ApolloProvider } from '@apollo/client';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';

import client from '../@graphql/apollo-client';
import { wrapper } from '../store';
import '../styles/globals.css';

type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => page);
    return (
        <ApolloProvider client={client}>
            {getLayout(<Component {...pageProps} />)}
        </ApolloProvider>
    );
}

export default wrapper.withRedux(MyApp);
