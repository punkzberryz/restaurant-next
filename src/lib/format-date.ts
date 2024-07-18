import { format } from "date-fns";
import { th } from "date-fns/locale";

const convertYearToBuddhist = (date: string) => {
  // Making a copy with the Date() constructor
  const dateCopy = new Date(date);

  dateCopy.setFullYear(dateCopy.getFullYear() + 543);

  return dateCopy;
};

const formatDateToThaiDate = (
  date: string,
  options: {
    shortDate?: boolean;
    excludeYear?: boolean;
  } = {},
) => {
  const convertedDate = convertYearToBuddhist(date);
  let formatString = "dd LLLL";
  if (options?.shortDate) {
    formatString = "dd LLL";
  }
  if (!options?.excludeYear) {
    formatString = formatString + " yyyy";
  }

  return format(convertedDate, formatString, {
    locale: th,
  });
};

export { formatDateToThaiDate };

//to convert date to string for Event Date field
export function formatDateToString(date: Date) {
  return format(date, "yyyy-MM-dd");
}
