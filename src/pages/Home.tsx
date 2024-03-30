import { Editor } from '../components';

export const Home = () => {
  return (
    <div
      className="flex min-h-screen w-screen items-center justify-center bg-white bg-cover bg-bottom bg-no-repeat"
      style={{
        backgroundImage: 'url(/images/waves.svg)',
      }}
    >
      <main className="min-h-screen w-full md:max-w-7xl">
        <header className="p-5 text-center">
        <img src="/images/logo.webp" alt="Note Code Logo" className="inline-block md:w-24 w-16" />
          <h3 className="md:text-[2rem] text-xl">Create & Share</h3>
          <h1 className="md:text-[2.5rem] text-3xl">Your Code easily</h1>
        </header>

        <Editor />
      </main>
    </div>
  );
};
