export const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export const isLeapYear = (year: number) => year % 4 === 0;

export const formatDate = (year: number, month: number, day: number) =>
	`${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
