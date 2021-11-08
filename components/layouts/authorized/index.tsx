import { NextPage } from "next";
import Head from "next/head";

export interface IAuthorizedLayout {
  title: string;
}

const AuthorizedLayout: NextPage<IAuthorizedLayout> = (props) => {
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

export default AuthorizedLayout;
