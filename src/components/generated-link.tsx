import * as React from 'react';
import { copyToClipboard } from '../../utilities';

const buttonStyle =
  'uppercase font-bold bg-dark-600 h-10 text-light-900 border border-gray-400 border border-gray-400 px-3 py-1.5 rounded-md bg-neutral-900 hover:bg-dark-500 hover:text-light-300 hover:cursor-pointer hover:border-white hover:rounded-md w-full flex align-middle justify-between space-x-2 text-xl mt-3 active:bg-dark-100 active:text-gray-500';

const CopyButton = ({ text }: { text: string }) =>
  React.createElement('div', {
    dangerouslySetInnerHTML: {
      __html: /*html*/ `
      <button
        id="copy-button"
        onclick="navigator.clipboard.writeText('${text}')"
        class="${buttonStyle}"
      >copy my limited link
        <svg xmlns="http://www.w3.org/2000/svg" class="mx-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      </button>`,
    },
  });

export function GeneratedLink({ text }: { text: string }) {
  return (
    <>
      <div className="flex flex-col font-mono h-full max-w-86">
        <code
          id="command"
          className="px-3 py-1.5 text-lg text-blue-300 rounded-md cursor-pointer bg-neutral-800 hover:bg-neutral-700 transition-all duration-300 mb-2"
        >
          {text}
        </code>
        <CopyButton text={text} />
      </div>
    </>
  );
}

export { GeneratedLink as default };
