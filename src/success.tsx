import { GeneratedLink } from '@/components/generated-link';

export function Success({ link }: { link: string }) {
  return (
    <main className="mt-18 sm:mt-42 w-full flex justify-center">
      <GeneratedLink text={link} />
    </main>
  );
}
