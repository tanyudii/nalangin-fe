import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { createUploadLink } from 'apollo-upload-client';

const client = new ApolloClient({
    link: createUploadLink({
        uri: '/api/graphql',
    }),
    cache: new InMemoryCache(),
});

export default client;
