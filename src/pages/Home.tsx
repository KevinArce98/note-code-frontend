import { Editor } from '../components';

export const Home = () => {
  return (
    <div
      className="flex min-h-screen w-screen items-center justify-center bg-white bg-bottom bg-no-repeat bg-cover"
      style={{
        backgroundImage: 'url(/images/waves.svg)',
      }}
    >
      <main className="min-h-screen w-full md:max-w-7xl">
        <header className="p-10 text-center">
          <img src="/images/NoteCodeLogo.svg" alt="Note Code Logo" className="mb-8 inline-block" />
          <h3 className="text-[2rem]">Create & Share</h3>
          <h1 className="text-[2.5rem]">Your Code easily</h1>
        </header>

        <Editor />
      </main>
    </div>
  );
};
