export const cropText = ({ value, length }: { value: string; length: number }): string => {
  if (!value) {
    return value;
  }
  return value.length > length ? value.substring(0, length) + "..." : value;
};

export const toPureText = (html: string): string => {
  return html.replace(/<\/?[^>]+(>|$)/g, "").replace(/\r?\n|\r/g, "");
};
