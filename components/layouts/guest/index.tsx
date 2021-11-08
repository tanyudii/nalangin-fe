import { NextPage } from 'next';
import Head from 'next/head';

export interface IGuestLayout {
    title: string;
}

const GuestLayout: NextPage<IGuestLayout> = (props) => {
    const { children, title } = props;
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>

            {children}
        </>
    );
};

export default GuestLayout;
