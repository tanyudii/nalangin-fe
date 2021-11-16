import { useSession } from 'next-auth/react';
import React from 'react';

import Preloader from '../preloader';
import AuthorizedLayout from './authorized';
import GuestLayout from './guest';

export interface IDefaultLayout {}

const DefaultLayout: React.FC<IDefaultLayout> = ({ children }) => {
    const { status } = useSession();

    if (status === 'loading') {
        return <Preloader />;
    }

    return (
        <div className={'max-w-screen-sm min-h-full mx-auto'}>
            {status === 'unauthenticated' ? (
                <GuestLayout>{children}</GuestLayout>
            ) : (
                <AuthorizedLayout>{children}</AuthorizedLayout>
            )}
        </div>
    );
};

export default DefaultLayout;
