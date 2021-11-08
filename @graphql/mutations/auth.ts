import { gql } from '@apollo/client';

export const CREATE_OTP = gql`
    mutation createOtp($createOtpInput: CreateOtpInput!) {
        createOtp(createOtpInput: $createOtpInput) {
            message
            increment
            availableNextAt
        }
    }
`;

export const REGISTER = gql`
    mutation register($registerInput: RegisterInput!) {
        register(registerInput: $registerInput) {
            message
        }
    }
`
