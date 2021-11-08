import { ReactElement } from 'react';

import GuestLayout from '../../components/layouts/guest';

function ForgotPasswordPage() {
    return <div>Forgot Password Page</div>;
}

ForgotPasswordPage.getLayout = function getLayout(page: ReactElement) {
    return <GuestLayout title={'Forgot Password'}>{page}</GuestLayout>;
};

export default ForgotPasswordPage;
