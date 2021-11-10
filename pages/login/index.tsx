import { useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { NextPage } from 'next';
import { signIn } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { AUTH_CREATE_OTP } from '../../@graphql/mutations/auth';

interface ILoginFormData {
    username: string;
    password: string;
}

export default function LoginPage(props: NextPage) {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<ILoginFormData>({
        defaultValues: { username: '', password: '' },
        resolver: yupResolver(
            yup.object({
                username: yup
                    .string()
                    .required('Nomor telepon tidak boleh kosong'),
                password: yup.string().required('OTP tidak boleh kosong'),
            }),
        ),
    });

    const [loading, setLoading] = useState<boolean>(false);
    const [messageSuccess, setMessageSuccess] = useState<string>('');
    const [messageError, setMessageError] = useState<string>('');

    const [durationSendOTP, setDurationSendOTP] = useState<number>(0);
    useEffect(() => {
        const intervalDuration = setInterval(() => {
            if (durationSendOTP > 0) {
                setDurationSendOTP(durationSendOTP - 1);
            }
        }, 1000);

        return () => {
            clearInterval(intervalDuration);
        };
    }, [durationSendOTP]);

    const username = watch('username');
    useEffect(() => {
        setMessageError('');
    }, [setMessageError, username]);

    const [createOtpRequest, { loading: loadingCreateOTP }] =
        useMutation(AUTH_CREATE_OTP);

    const onRequestOtp = useCallback(async () => {
        setMessageError('');
        setMessageSuccess('');

        await createOtpRequest({
            variables: {
                createOtpInput: {
                    subjectType: 'create_token',
                    subjectId: username,
                    phoneNumber: username,
                },
            },
        })
            .then(({ data: { createOtp } }) => {
                const { increment } = createOtp;
                setDurationSendOTP(increment);
                setMessageSuccess('OTP berhasil dikirim!');
            })
            .catch(({ graphQLErrors }) => {
                if (graphQLErrors) {
                    for (const error of graphQLErrors) {
                        setMessageError(error.message);
                    }
                }
            });
    }, [createOtpRequest, username]);

    const onSubmit = useCallback(
        async (formData: ILoginFormData) => {
            const { username, password } = formData;

            setLoading(true);

            await signIn('credentials', {
                redirect: false,
                username,
                password,
            })
                .then(() => {
                    setLoading(false);

                    router.replace('/').then();
                })
                .catch((e) => {
                    setLoading(false);

                    setMessageError('Nomor telepon tidak terdaftar');
                });
        },
        [router],
    );

    return (
        <>
            <Head>
                <title>Masuk</title>
            </Head>

            {messageError && <p>Error: {messageError}</p>}
            {messageSuccess && <p>Success: {messageSuccess}</p>}

            <div className={'w-screen h-screen'}>
                <div className={'h-full grid place-items-center'}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={'flex flex-col gap-3 w-96'}>
                            <div className={'flex flex-col w-sm-1'}>
                                <label htmlFor="username">Nomor Telepon</label>
                                <input
                                    type="tel"
                                    placeholder={'Nomor Telepon'}
                                    {...register('username')}
                                />
                            </div>

                            <div className={'flex flex-row items-center'}>
                                <div className={'flex flex-col w-sm-1'}>
                                    <label htmlFor="username">OTP</label>
                                    <input
                                        type="tel"
                                        placeholder={'OTP'}
                                        {...register('password')}
                                    />
                                </div>
                                <div className={'h-full'}>
                                    <button
                                        type={'button'}
                                        className={'px-4 py-2 bg-gray-100'}
                                        onClick={onRequestOtp}
                                        disabled={
                                            durationSendOTP > 0 ||
                                            loadingCreateOTP
                                        }>
                                        {durationSendOTP > 0
                                            ? `Please wait ${durationSendOTP}s`
                                            : 'SEND OTP'}
                                    </button>
                                </div>
                            </div>

                            <div className={'flex flex-col w-sm-1'}>
                                <button type={'submit'}>Masuk</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export async function getStaticProps() {
    return {
        props: {},
    };
}
