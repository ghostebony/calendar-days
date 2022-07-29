import type * as Types from "./types";

const monthCache: Types.MonthCache = {};

const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const isLeapYear = (year: number) => year % 4 === 0;

export const formatDate = (year: number, month: number, day: number) =>
	`${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;

export const month = (month: number, year: number, useCache: boolean = false) => {
	if (useCache && `${month}-${year}` in monthCache) {
		return monthCache[`${month}-${year}`];
	}

	const days: Types.MonthDay[] = [];

	const firstDayOfMonth = new Date(year, month - 1, 1);
	const monthDate = new Date(year, month, 0);

	const firstDayOfMonthDayOfWeek = firstDayOfMonth.getDay();
	const daysInMonth = monthDate.getDate();

	const [pmMonth, pmYear] = month === 1 ? [12, year - 1] : [month - 1, year];
	const pmDay = pmMonth !== 2 ? monthDays[pmMonth - 1] : isLeapYear(pmYear) ? 29 : 28;

	for (let day = pmDay - firstDayOfMonthDayOfWeek + 1; day <= pmDay; day++) {
		days.push({
			date: formatDate(pmYear, pmMonth, day),
			day: day,
			month: pmMonth,
			year: pmYear,
			isMonth: false,
		});
	}

	for (let day = 1; day <= daysInMonth; day++) {
		days.push({
			date: formatDate(year, month, day),
			day,
			month,
			year,
			isMonth: true,
		});
	}

	if (days.length < 42) {
		const [nmMonth, nmYear] = month === 12 ? [1, year + 1] : [month + 1, year];

		const daysLeft = 42 - days.length + 1;

		for (let day = 1; day < daysLeft; day++) {
			days.push({
				date: formatDate(nmYear, nmMonth, day),
				day: day,
				month: nmMonth,
				year: nmYear,
				isMonth: false,
			});
		}
	}

	if (useCache) {
		monthCache[`${month}-${year}`] = days;
	}

	return days;
};

export default { month };
