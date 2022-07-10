export default function App() {
  return (
    <>
      <header></header>
      <main className="w-full max-w-90 sm:max-w-100 mx-auto mt-20 sm:mt-28 text-center">
        <p className="uppercase text-5xl font-sans font-extrabold">Limit vists</p>
        <section className="button button-secondary mt-8">
          <Form />
        </section>
      </main>
    </>
  );
}

export function Form() {
  return (
    <form
      id="new-entry-form"
      method="POST"
      action="/new-entry"
      // onSubmit={event => console.log(event)}
      className="text-black flex flex-col w-full space-y-4 text-lg sm:text-xl font-mono"
    >
      <input
        required
        autoFocus
        type="url"
        name="redirect_url"
        autoComplete="off"
        placeholder="Your link here"
        className="px-2 py-1 placeholder:text-dark-400 ring-0 outline-none text-center rounded-md"
        pattern="[Hh][Tt][Tt][Pp][Ss]?:\/\/(?:(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)(?:\.(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)*(?:\.(?:[a-zA-Z\u00a1-\uffff]{2,}))(?::\d{2,5})?(?:\/[^\s]*)?"
      />
      <input
        min={1}
        required
        type="text"
        inputMode="numeric"
        name="visitor_count"
        placeholder="visitors count"
        className="px-2 py-1 placeholder:text-dark-400 ring-0 outline-none text-center rounded-md"
      />
      <button
        type="submit"
        value="submit"
        form="new-entry-form"
        className="text-white border border-gray-400 p-3 w-[64] rounded-md bg-dark-900 hover:bg-dark-500 hover:text-light-300 hover:cursor-pointer hover:border-white
        hover:rounded-md"
      >
        generate
      </button>
    </form>
  );
}
