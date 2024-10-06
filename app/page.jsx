'use client'
import HeroWelcome from './components/heroWelcome'

import { useUser } from '@auth0/nextjs-auth0/client';

const HomePage = () => {
  return (
    <>
      <HeroWelcome />
    </>
  );
};

export default HomePage;
