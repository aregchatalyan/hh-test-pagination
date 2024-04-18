export const calculatePages = (current: number, total: number): number[] => {
  let start = current - 5;

  if (start < 1) {
    start = 1;
  } else if (start + 9 > total) {
    start = total - 9;
  }

  return Array.from({ length: 10 }, (_, index) => start + index)
    .filter(number => number > 0 && number < total)
}
