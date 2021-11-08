import { CREATE_OTP, REGISTER } from "../../@graphql/mutations/auth";
import GuestLayout from "../../components/layouts/guest";
import { useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { NextPage } from "next";
import Image from "next/image";
import { ReactElement, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

interface IRegisterFormData {
  phoneNumber: string;
  name: string;
  otp: string;
}

const RegisterFormDataValidation = yup.object({
  name: yup.string().required("The name field is required"),
  phoneNumber: yup.string().required("The phone number field is required"),
  otp: yup.string(),
});

function RegisterPage(props: NextPage) {
  const [
    createOtp,
    { data: createOtpData, error: createOtpError, loading: createOtpLoading },
  ] = useMutation(CREATE_OTP);

  const [countdownOtp, setCountdownOtp] = useState<number>(0);

  useEffect(() => {
    console.log(createOtpData);
  }, [createOtpData]);

  useEffect(() => {
    console.log(createOtpError);
  }, [createOtpError]);

  const [
    registerAccount,
    {
      data: registerAccountData,
      error: registerAccountError,
      loading: registerAccountLoading,
    },
  ] = useMutation(REGISTER);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<IRegisterFormData>({
    defaultValues: { name: "", phoneNumber: "", otp: "" },
    resolver: yupResolver(RegisterFormDataValidation),
  });

  const onSubmit = useCallback((formData: IRegisterFormData) => {
    console.log(formData);
  }, []);

  const onRequestOtp = useCallback(async () => {
    await createOtp({
      variables: {
        createOtpInput: {
          subjectId: getValues("phoneNumber"),
          subjectType: "create_token",
          phoneNumber: getValues("phoneNumber"),
        },
      },
    })
      .then((response) => {
        setCountdownOtp(response.data.createOtp.increment);
      })
      .catch((e) => {
        console.log(e.response);
      });
  }, [getValues, createOtp]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (countdownOtp > 0) {
        setCountdownOtp(countdownOtp - 1);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [countdownOtp]);

  return (
    <div className="theme-swiss relative bg-skin-fill h-screen grid place-items-center">
      <div className="absolute inset-0 bg-gradient-to-br from-skin-hue via-skin-hue to-transparent background opacity-90"></div>
      <div className="relative sm:max-w-sm w-full">
        <div className="card bg-green-400 shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6"></div>
        <div className="card bg-green-600 shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6"></div>
        <div className="w-full relative mx-auto text-left ">
          <form
            className="bg-white w-full rounded-3xl px-8 pt-6 pb-8 mb-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className="text-skin font-bold mb-8">Daftar Baru</h1>
            <div className="mb-4">
              <label htmlFor="name" className="text-skin-muted">
                Nama
              </label>
              <input
                className="border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...register("name")}
                type="text"
                id="name"
                placeholder="Name"
              />
              <small className="font-small text-red-300">
                {errors.name?.message}
              </small>
            </div>
            <div className="mb-6">
              <label htmlFor="phoneNumber" className="text-skin-muted">
                Nomor Telepon
              </label>
              <input
                className="border-b w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="tel"
                placeholder="+62"
                id="phoneNumber"
                {...register("phoneNumber")}
              />
              <small className="font-small text-red-300">
                {errors.phoneNumber?.message}
              </small>
            </div>
            <div className="mb-6">
              <label htmlFor="otp" className="text-skin-muted">
                OTP
              </label>
              <input
                className="border-b w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="tel"
                id="otp"
                {...register("otp")}
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                className="text-skin-inverted bg-skin-button-accent hover:bg-skin-button-accent-hover  w-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Next
              </button>
              <button
                hidden
                className="text-skin-inverted bg-skin-button-accent hover:bg-skin-button-accent-hover  w-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => onRequestOtp()}
                disabled={countdownOtp > 0}
                type="submit"
              >
                Request OTP {countdownOtp > 0 && <small>{countdownOtp}</small>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

RegisterPage.getLayout = function getLayout(page: ReactElement) {
  return <GuestLayout title={"Register"}>{page}</GuestLayout>;
};

export default RegisterPage;

export async function getStaticProps() {
  return {
    props: {},
  };
}
