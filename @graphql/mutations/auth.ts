import { gql } from '@apollo/client';

export const AUTH_CREATE_OTP = gql`
    mutation createOtp($createOtpInput: CreateOtpInput!) {
        createOtp(createOtpInput: $createOtpInput) {
            message
            increment
            availableNextAt
        }
    }
`;

export const AUTH_CREATE_TOKEN = gql`
    mutation createToken($createTokenInput: CreateTokenInput!) {
        createToken(createTokenInput: $createTokenInput) {
            accessToken
            refreshToken
            expiresAt
        }
    }
`;

export const AUTH_REGISTER = gql`
    mutation register($registerInput: RegisterInput!) {
        register(registerInput: $registerInput) {
            message
        }
    }
`;
