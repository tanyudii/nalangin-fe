import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { AUTH_CREATE_TOKEN } from '../../../@graphql/mutations/auth';

const client = new ApolloClient({
    uri: process.env.GRAPHQL_ENDPOINT,
    cache: new InMemoryCache(),
});

const MY_PROFILE_QUERY = gql`
    query {
        myProfile {
            name
            phoneNumber
        }
    }
`;

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            authorize: async (credentials, req) => {
                const { username, password } = credentials;

                const {
                    data: { createToken: token },
                } = await client
                    .mutate({
                        mutation: AUTH_CREATE_TOKEN,
                        variables: {
                            createTokenInput: {
                                username,
                                password,
                                isOtp: true,
                            },
                        },
                    })
                    .then((resp) => resp)
                    .catch();

                if (!token.accessToken) {
                    return null;
                }

                const {
                    data: { myProfile: user },
                } = await client
                    .query({
                        query: MY_PROFILE_QUERY,
                        context: {
                            headers: {
                                Authorization: `Bearer ${token.accessToken}`,
                            },
                        },
                    })
                    .then((resp) => resp)
                    .catch();

                return { ...user, email: user.phoneNumber, token };
            },
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            token && (session.user = token.user);
            return Promise.resolve(session);
        },
        async jwt({ token, user }) {
            user && (token.user = user);
            return Promise.resolve(token);
        },
    },
    session: {
        jwt: true,
        maxAge: 8 * 60 * 60, // 8 hours
    },
    jwt: {
        signingKey: process.env.NEXTAUTH_JWT_SECRET,
    },
});
