export const validateEmail = (email: string): boolean => {
  return (
    email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ) !== null
  );
};

export const shortenText = (text: string, n: number): string => {
  if (text.length > n) {
    const shortenedText = text.substring(0, n).concat("...");
    return shortenedText;
  }
  return text;
};

export const formatTotalStoreValue = (value: string): string => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
