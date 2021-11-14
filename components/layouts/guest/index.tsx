import { NextPage } from 'next';

export interface IGuestLayout {}

const GuestLayout: NextPage<IGuestLayout> = ({ children }) => {
    return <>{children}</>;
};

export default GuestLayout;
