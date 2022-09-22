export const capitaliseCharacter = (str: string, at: number): string => {
  return str ? str.charAt(at).toUpperCase() + str.slice(at + 1) : '';
};
