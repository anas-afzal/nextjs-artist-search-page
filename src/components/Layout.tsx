import { FC, ReactNode } from 'react';
import { Inter } from 'next/font/google';
import Link from 'next/link';

interface IProps {
  children: ReactNode;
}

const inter = Inter({ subsets: ['latin'] });

export const Layout: FC<IProps> = ({ children }) => {
  return (
    <div className={`min-h-screen flex flex-col ${inter.className}`}>
      <header className='flex justify-center py-10'>
        <Link href='/'>
          <h1 className='text-4xl uppercase font-bold tracking-widest'>Artist Explorer</h1>
        </Link>
      </header>
      <main className='w-full max-w-7xl flex flex-col mx-auto items-center px-12 pt-8'>
        {children}
      </main>
      <footer className='flex mt-auto justify-center pt-8 pb-4'>
        <p>
          Created with love by{' '}
          <a
            href='https://www.linkedin.com/in/muhammadanasafzal/'
            target='_blank'
            rel='noopener noreferrer'
          >
            @Muhammad Anas
          </a>
        </p>
      </footer>
    </div>
  );
};
