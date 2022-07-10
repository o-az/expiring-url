import '@unocss/reset/tailwind.css';

export function Page<T>(PageProps: {
  children: React.ReactNode;
  rest?: { link: string; other: T };
}) {
  return (
    <html
      lang="en"
      spellCheck
      className="dark"
      // contentEditable={process.env.NODE_ENV !== 'production'}
      suppressContentEditableWarning={process.env.NODE_ENV !== 'production'}
    >
      <head>
        <BaseHeadElements />
        {PageProps.rest && PageProps.rest.link && (
          <script
            dangerouslySetInnerHTML={{
              __html: `console.log('${PageProps.rest.link}0000');`,
            }}
          />
        )}
        <title>limit visits</title>
      </head>
      <body className="bg-[rgb(23,23,28)] text-[#f7f7f7] w-full h-full">{PageProps.children}</body>
    </html>
  );
}

function BaseHeadElements() {
  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      <link
        href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🔗</text></svg>"
        rel="shortcut icon"
      />
      <link rel="stylesheet" href="https://unpkg.com/modern-css-reset/dist/reset.min.css" />
      <link rel="stylesheet" href="./index.css" />
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@unocss/reset/normalize.min.css" />
      <script src="https://cdn.jsdelivr.net/npm/@unocss/runtime"></script>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <script src="https://cdn.jsdelivr.net/npm/@unocss/runtime/mini.global.js"></script>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="annonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@100;400;700&family=Inter:wght@200;400;900&family=JetBrains+Mono:wght@200;400;800&display=swap"
        rel="stylesheet"
      />
    </>
  );
}
