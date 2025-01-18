export function getLatestYearInBangla(): string {
  const currentYear = new Date().getFullYear();

  // Convert each digit of the year to its Bangla equivalent
  const banglaDigitsMap: any = {
    "0": "০",
    "1": "১",
    "2": "২",
    "3": "৩",
    "4": "৪",
    "5": "৫",
    "6": "৬",
    "7": "৭",
    "8": "৮",
    "9": "৯",
  };

  return currentYear
    .toString()
    .split("")
    .map((digit) => banglaDigitsMap[digit])
    .join("");
}
