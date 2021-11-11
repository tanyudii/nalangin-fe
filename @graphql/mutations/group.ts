import { gql } from '@apollo/client';

export const CREATE_GROUP = gql`
    mutation createGroup($createGroupInput: CreateGroupInput!) {
        createGroup(createGroupInput: $createGroupInput) {
            name
        }
    }
`;
