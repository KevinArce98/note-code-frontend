import { useEffect, useState } from 'react';
import { useParams } from 'wouter';
import EditorMonaco from '@monaco-editor/react';
import toast, { Toaster } from 'react-hot-toast';
import { useLoadingContext } from '../hooks';
import { Dropdown } from './Dropdown';
import { CreateCodeDto, LanguagesEnum, ThemeEnum } from '../types';
import { createCode, getCode } from '../services';

export const Editor = () => {
  const { codeId } = useParams();
  const [value, setValue] = useState(`<html>
  <head>
    <title>HTML Sample</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <style type="text/css">
      h1 {
        color: #CCA3A3;
      }
    </style>
    <script type="text/javascript">
      alert("I am a sample... visit devChallengs.io for more projects");
    </script>
  </head>
  <body>
    <h1>Heading No.1</h1>
    <input disabled type="button" value="Click me" />
  </body>
</html>`);
  const [language, setLanguage] = useState(LanguagesEnum.Html);
  const [theme, setTheme] = useState(ThemeEnum.Light);
  const [oldData, setOldData] = useState({ value: '', id: '', language: '', theme: '', created_at: '' });
  const { loading, setLoading } = useLoadingContext();

  useEffect(() => {
    if (codeId && codeId !== oldData.id) {
      setLoading(true);
      getCode(codeId).then((response) => {
        if (response) {
          setOldData(response);
          setValue(response.code);
          setLanguage(response.language as LanguagesEnum);
          setTheme(response.theme as ThemeEnum);
        }
        setLoading(false);
      });
    }
  }, [codeId, oldData.id, setLoading]);

  const handleEditorChange = (value?: string) => {
    setValue(value || '');
  };

  const handleShare = async () => {
    setLoading(true);
    const data: CreateCodeDto = {
      code: value,
      language,
      theme,
    };
    const response = await createCode(data);
    if (response && response.id) {
      window.history.pushState({}, '', `/${response.id}`);
      navigator.clipboard.writeText(window.location.href);
      setOldData(response);
      toast.success('Code shared successfully and link copied to clipboard.');
    } else {
      toast.error('We can not share this code right now. Please try again later.');
    }
    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard', { icon: '📋' });
  };

  const disableShareButton = () => {
    const newData = {
      id: codeId,
      code: value,
      theme,
      language,
      created_at: oldData.created_at,
    };
    return (!!codeId && JSON.stringify(newData) === JSON.stringify(oldData)) || loading;
  };

  return (
    <section className="flex justify-center md:px-0 px-4">
      <Toaster
        toastOptions={{
          position: 'top-right',
        }}
      />

      <div
        className={`rounded-xl border py-5 shadow-lg shadow-dark/50 md:w-4/5 w-full ${theme === ThemeEnum.Light ? 'border-gray bg-white' : 'border-dark bg-black'}`}
      >
        <EditorMonaco
          height="500px"
          className="rounded-xl"
          wrapperProps={{ className: 'rounded-xl ' }}
          language={language}
          value={value}
          theme={theme}
          onChange={handleEditorChange}
        />
        <div className="flex flex-col items-center justify-between gap-4 px-5 pt-2 md:flex-row">
          <div className="flex gap-4">
            <Dropdown
              value={language}
              onChange={(value) => setLanguage(value as LanguagesEnum)}
              options={Object.values(LanguagesEnum)}
            />
            <Dropdown
              value={theme}
              onChange={(value) => setTheme(value as ThemeEnum)}
              options={Object.values(ThemeEnum)}
            />
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            {codeId && (
              <button className="flex items-center gap-2 text-charcoal hover:opacity-90" onClick={handleCopy}>
                <img src="/images/link.svg" alt="link icon" />
                .../{codeId}
              </button>
            )}
            <button
              className={`flex items-center gap-2 rounded-3xl transition-all hover:scale-105 disabled:hover:scale-100 ${theme === ThemeEnum.Light ? 'bg-blue disabled:bg-gray' : 'bg-charcoal disabled:bg-charcoal/50'} px-5 py-2 text-white`}
              onClick={handleShare}
              disabled={disableShareButton()}
            >
              <img src="/images/Share.svg" alt="share icon" />
              Share
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
