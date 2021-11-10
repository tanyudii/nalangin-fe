import { gql } from '@apollo/client';
import { getSession, useSession } from 'next-auth/react';
import Head from 'next/head';
import { useCallback, useEffect } from 'react';

import { useMutationAuth } from '../@common/use-mutation.hook';
import { useQueryAuth } from '../@common/use-query.hook';
import { CREATE_GROUP } from '../@graphql/mutations/user-group';

const GROUPS_QUERY = gql`
    query groups {
        groups {
            name
        }
    }
`;

function HomePage() {
    const { data: session } = useSession();

    const {
        refetch: groupRefetch,
        loading: groupLoading,
        data: groupData,
    } = useQueryAuth(session, GROUPS_QUERY);

    const headers = session
        ? { authorization: `Bearer ${session?.user?.token?.accessToken}` }
        : {};

    const [createGroupRequest, { loading }] = useMutationAuth(
        session,
        CREATE_GROUP,
    );

    useEffect(() => {
        console.info(session);
    }, [session]);

    const onCreateGroup = useCallback(async () => {
        await createGroupRequest({
            variables: {
                createGroupInput: { name: 'asd' },
            },
        }).catch((e) => {
            console.log(e);
        });
    }, [createGroupRequest]);

    return (
        <>
            <Head>
                <title>Beranda</title>
            </Head>

            <div>
                {loading && <>Loading...</>}
                <button type={'button'} onClick={onCreateGroup}>
                    Create
                </button>
            </div>
        </>
    );
}

export async function getServerSideProps(ctx: any) {
    const session = await getSession(ctx);
    if (!session) {
        return { redirect: { destination: '/login', permanent: false } };
    }

    return { props: { session } };
}

export default HomePage;
