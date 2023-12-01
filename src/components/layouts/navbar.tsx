import React from 'react';

export default function Navbar(props: any) {
  return (
    <>
      <nav className="font-sans flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-7 px-6 w-full">
        <div className="mb-2 sm:mb-0 text-lg font-bold sm:text-4xl">
          Receitas Nutricionais
        </div>
        <div>
          <a href="/" className="text-lg no-underline hover:text-amber-300 ml-2">
            Home
          </a>
          <a href="/receitas" className="text-lg no-underline hover:text-amber-300 ml-2">
            Receitas
          </a>
        </div>
      </nav>
    </>
  );
}
