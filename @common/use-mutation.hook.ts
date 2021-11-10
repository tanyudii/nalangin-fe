import {
    ApolloCache,
    DefaultContext,
    MutationHookOptions,
    MutationTuple,
    useMutation,
} from '@apollo/client';
import { OperationVariables } from '@apollo/client/core';
import { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { DocumentNode } from 'graphql';
import { Session } from 'next-auth';

export function useMutationAuth<
    TData = any,
    TVariables = OperationVariables,
    TContext = DefaultContext,
    TCache extends ApolloCache<any> = ApolloCache<any>,
>(
    session: Session | null,
    mutation: DocumentNode | TypedDocumentNode<TData, TVariables>,
    options?: MutationHookOptions<TData, TVariables, TContext>,
): MutationTuple<TData, TVariables, TContext, TCache> {
    const headers = session
        ? { authorization: `Bearer ${session?.user?.token?.accessToken}` }
        : {};

    return useMutation(mutation, {
        ...(options as any),
        context: {
            headers,
        },
    });
}
