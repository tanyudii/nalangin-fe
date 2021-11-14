import { NextPage } from 'next';

import Sidebar from './Sidebar';

export interface IAuthorizedLayout {}

const AuthorizedLayout: NextPage<IAuthorizedLayout> = ({ children }) => {
    return (
        <>
            <Sidebar />

            {children}
        </>
    );
};

export default AuthorizedLayout;
