import { ReactElement } from 'react';

import GuestLayout from '../../components/layouts/guest';

function ResetPasswordPage() {
    return (
        <GuestLayout title={'Reset Password'}>
            <div>Reset Password Page</div>
        </GuestLayout>
    );
}

ResetPasswordPage.getLayout = function getLayout(page: ReactElement) {
    return <GuestLayout title={'Reset Password'}>{page}</GuestLayout>;
};

export default ResetPasswordPage;
