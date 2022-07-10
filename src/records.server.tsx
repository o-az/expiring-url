import { getAllEntries } from '@/database';

export function Test() {
  const entries = getAllEntries.all();
  return (
    <section className="mb-8">
      <code>{JSON.stringify(entries)}</code>
    </section>
  );
}
