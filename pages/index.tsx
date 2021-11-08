import { ReactElement } from 'react';

import AuthorizedLayout from '../components/layouts/authorized';

function HomePage() {
    return <div>Home Page</div>;
}

HomePage.getLayout = function getLayout(page: ReactElement) {
    return <AuthorizedLayout title={'Home'}>{page}</AuthorizedLayout>;
};

export default HomePage;
