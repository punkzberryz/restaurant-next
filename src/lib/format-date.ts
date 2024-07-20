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
    excludeDay?: boolean;
    onlyYear?: boolean;
  } = {},
) => {
  const convertedDate = convertYearToBuddhist(date);
  if (options?.onlyYear) {
    return format(convertedDate, "yyyy", {
      locale: th,
    });
  }

  let formatString = options?.excludeDay ? "LLLL" : "dd LLLL";
  if (options?.shortDate) {
    formatString = options?.excludeDay ? "LLL" : "dd LLL";
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
