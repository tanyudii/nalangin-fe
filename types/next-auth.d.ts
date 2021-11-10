import { User } from 'next-auth';

declare module 'next-auth' {
    interface Token {
        accessToken: string;
        refreshToken: string;
        expiresAt: string;
    }

    interface User {
        token: Token;
    }

    interface Session {
        user: User;
    }
}
