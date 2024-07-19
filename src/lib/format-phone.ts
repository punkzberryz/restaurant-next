export const formatPhoneNumber = (
  phoneNumber: string,
  {
    conceal,
  }: {
    // options
    conceal?: boolean;
  } = { conceal: false },
): string => {
  const cleanedString = phoneNumber.replaceAll(" ", "");

  if (cleanedString.length === 0) {
    return ""; // Return an empty string for empty input
  }

  const formattedString = [
    cleanedString.slice(0, 3),
    cleanedString.length > 3 ? "-" : " ",
    cleanedString.slice(3, 6),
    cleanedString.length > 6 ? "-" : " ",
    cleanedString.slice(6),
  ]
    .join("")
    .trim(); // Trim excess spaces
  if (conceal && formattedString.length > 8) {
    return formattedString.slice(0, 8) + "xxxx";
  }

  return formattedString;
};
