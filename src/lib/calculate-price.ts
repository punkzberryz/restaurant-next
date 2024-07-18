export function calculateTotalPrice(price: number, quantity: number) {
  const total = Math.ceil(price * quantity * 100) / 100;
  return total;
}
