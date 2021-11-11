import { LazyQueryHookOptions, QueryTuple, useLazyQuery } from '@apollo/client';
import { OperationVariables } from '@apollo/client/core';
import { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { DocumentNode } from 'graphql';
import { Session } from 'next-auth';

export function useLazyQueryAuth<TData = any, TVariables = OperationVariables>(
    session: Session | null,
    query: DocumentNode | TypedDocumentNode<TData, TVariables>,
    options?: LazyQueryHookOptions<TData, TVariables>,
): QueryTuple<TData, TVariables> {
    const headers = session
        ? { Authorization: `Bearer ${session?.user?.token?.accessToken}` }
        : {};

    return useLazyQuery(query, {
        ...options,
        context: { headers },
    });
}
