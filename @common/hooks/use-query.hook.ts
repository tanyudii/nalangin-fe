import { useQuery } from '@apollo/client';
import { OperationVariables } from '@apollo/client/core';
import {
    QueryHookOptions,
    QueryResult,
} from '@apollo/client/react/types/types';
import { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { DocumentNode } from 'graphql';
import { Session } from 'next-auth';

export function useQueryAuth<TData = any, TVariables = OperationVariables>(
    session: Session | null,
    query: DocumentNode | TypedDocumentNode<TData, TVariables>,
    options?: QueryHookOptions<TData, TVariables>,
): QueryResult<TData, TVariables> {
    const headers = session
        ? { Authorization: `Bearer ${session?.user?.token?.accessToken}` }
        : {};

    return useQuery(query, {
        ...options,
        context: { headers },
    });
}
