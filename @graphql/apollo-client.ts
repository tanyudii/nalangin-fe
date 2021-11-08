import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';

const client = new ApolloClient({
    link: createUploadLink({
        uri: '/api/graphql',
    }),
    cache: new InMemoryCache(),
});

export default client;
