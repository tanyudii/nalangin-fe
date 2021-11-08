import { NextPage } from 'next';
import { ReactElement, useEffect } from 'react';

import GuestLayout from '../../components/layouts/guest';

function LoginPage(props: NextPage) {
    useEffect(() => {
        console.log(props);
    }, [props]);

    return <div>Login Page</div>;
}

LoginPage.getLayout = function getLayout(page: ReactElement) {
    return <GuestLayout title={'Login'}>{page}</GuestLayout>;
};

export default LoginPage;

export async function getStaticProps() {
    return {
        props: {},
    };
}
