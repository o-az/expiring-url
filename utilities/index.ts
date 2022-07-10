// copy to clipboard
export const copyToClipboard = async (text: string) =>
  await navigator.clipboard
    .writeText(text)
    .then(() => true)
    .catch(() => false);
