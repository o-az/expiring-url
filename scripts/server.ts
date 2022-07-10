const CSS = /*css*/ `@import url(https://fonts.googleapis.com/css2?family=Inter:wght@900&display=swap);body,main{display:flex}button,h1{font-weight:900}::selection{background-color:rgba(231,189,243,.913);color:#240310;font-family:Inter,sans-serif}body{max-width:100vw;max-height:100vh;justify-content:center;align-items:center;flex-direction:column;font-family:Inter,sans-serif;background-color:#000}main{height:80vh;width:80vw;flex-direction:column;justify-content:center;align-items:center}h1{font-size:4em;will-change:transform;background:linear-gradient(-45deg,#91aadb,#ffdcd0,#a99ede);background-size:400% 400%;animation:15s infinite gradient;background-clip:text;-webkit-background-clip:text;-webkit-text-fill-color:transparent}h1::selection{background-color:linear-gradient(-45deg,#2b00ff,#fd4c11,#eaff00);-webkit-text-fill-color:initial}button{font-size:3em;padding:.5em;border:none;border-radius:.15em;cursor:pointer;background:#20272f;color:#fff}button:hover{background-color:#d8d;color:#070707}button:active{transform:translateY(.1em)}@keyframes gradient{0%{background-position:90% 50%}50%{background-position:150% 50%}100%{background-position:0 50%}}`;

async function fetch(request: Request) {
  return new Response(
    /*html*/ `
      <html>
        <head>
          ${CSS}
        </head>
        <body>
          <main>
            <h1>Hello World</h1>
            <button onclick="confetti()">Confetti</button>
            <script type="module">
              import confetti from 'https://cdn.skypack.dev/canvas-confetti';
import { ChildProcess } from 'node:child_process';
import { stdout, write } from 'bun';
              confetti();
              const coconfetti = (event) => confetti();
              const button = document.querySelector('button');
              button.addEventListener('click', coconfetti);
              button.addEventListener('mouseup', coconfetti);
              button.addEventListener('mouseout', coconfetti);
              button.addEventListener('mousemove', coconfetti);
              button.addEventListener('mouseover', coconfetti);
              button.addEventListener('mouseenter', coconfetti);
            </script>
          </main>
        </body>
      </html>`,
    { headers: { 'Content-Type': 'text/html' } }
  );
}

export default {
  port: Number(process.env.PORT ?? 3000),
  fetch: (request: Request) => {
    return new Response(
      /*html*/ `
      <html>
        <head>
          <style>${CSS}</style>
        </head>
        <body>
          <main>
            <h1>Hello World</h1>
            <button onclick="confetti()">Confetti</button>
            <script type="module">
              import confetti from 'https://cdn.skypack.dev/canvas-confetti';
              confetti();
              const coconfetti = (event) => confetti();
              const button = document.querySelector('button');
              button.addEventListener('click', coconfetti);
              button.addEventListener('mouseup', coconfetti);
              button.addEventListener('mouseout', coconfetti);
              button.addEventListener('mousemove', coconfetti);
              button.addEventListener('mouseover', coconfetti);
              button.addEventListener('mouseenter', coconfetti);
            </script>
          </main>
        </body>
      </html>`,
      { headers: { 'Content-Type': 'text/html' } }
    );
  },
};
