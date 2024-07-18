export const formatPrice = (
  price: number | string,
  options: {
    currency?: "USD" | "THB";
    notation?: Intl.NumberFormatOptions["notation"];
    maximumFractionDigits?: number;
    style?: Intl.NumberFormatOptions["style"];
  } = { notation: "standard", style: "decimal", maximumFractionDigits: 2 },
) => {
  const { currency, maximumFractionDigits, notation, style } = options;
  return new Intl.NumberFormat("th-TH", {
    style,
    currency,
    maximumFractionDigits,
    notation,
  }).format(Number(price));
};
