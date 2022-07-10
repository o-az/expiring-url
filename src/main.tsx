import { join } from 'path';
import liveReload from 'bun-livereload';
import { renderToReadableStream } from 'react-dom/server';
import { db, type Row } from '@/database';
import { Page } from '@/components/page';

console.log(
  `\n\n-- bun running React SSR ${process.env.NODE_ENV === 'development' && `on http://0.0.0.0:`}${
    process.env.PORT ?? `3000`
  } --`
);

const pageResponse = async (children: React.ReactNode) =>
  new Response((await renderToReadableStream(<Page>{children}</Page>)) as unknown as any, {
    headers: { 'Content-Type': 'text/html' },
  });

async function fetch(request: Request) {
  if (request.method === 'OPTIONS') {
    return new Response('', {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      },
    });
  }
  const { pathname } = new URL(request.url);

  if (pathname.endsWith('.css')) {
    const filepath = join(`${import.meta.dir}/index.css`);
    return new Response(Bun.file(filepath), {
      headers: { 'Content-Type': 'text/css' },
    });
  }

  if (pathname.endsWith('new-entry')) {
    try {
      const formData = new URLSearchParams(await request.text());
      let fields!: { redirect_url: string; visitor_count: number | string };
      for (const [key, value] of formData) {
        if (!['redirect_url', 'visitor_count'].includes(key) || !value) {
          console.log('invalid form data');
          return Response.redirect('/');
        }
        fields = { ...fields, [`$${key}`]: value };
      }
      const randomID = crypto.randomUUID();
      db.run(
        `INSERT INTO urls (redirect_url, visitor_count, record_id)
          VALUES ($redirect_url, $visitor_count, $record_id)`,
        {
          ...fields,
          $record_id: randomID,
        }
      );
      const { Success } = await import('./success');
      const newURL = `${process.env.PUBLIC_URL}/${randomID}`;
      return pageResponse(<Success link={newURL} />);
    } catch (error) {
      console.trace(`Error while handling new-entry request: ${error}`);
      return Response.redirect('/');
    }
  }

  const row = db.query<string, Row>(`SELECT * FROM urls WHERE record_id = ?`);
  const [queryResult] = row.all(pathname.slice(1));

  if (queryResult) {
    const { redirect_url: targetURL } = queryResult;
    if (targetURL) return Response.redirect(targetURL, { status: 302 });
  }
  const { default: App } = await import('./app');
  return pageResponse(<App />);
}

Bun.serve({
  fetch: liveReload(fetch),
  port: 3000,
  hostname: '0.0.0.0',
  baseURI: process.env.PUBLIC_URL ?? 'http://0.0.0.0:3000',
  development: process.env.NODE_ENV === 'development' ?? false,
  error: (error: Error) => {
    console.error(error);
    return new Response('yikes\n' + error.toString(), { status: 500 });
  },
});
