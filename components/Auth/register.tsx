import React from 'react';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import AuthLayout from '@/components/layout/AuthLayout';
import RegisterForm from '../../pages/auth/register';

const RegisterPage = () => {
  return (
    <AuthLayout title="Registrarse">
      <RegisterForm />
    </AuthLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default RegisterPage;
