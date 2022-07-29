export type MonthDay = {
	date: string;
	day: number;
	month: number;
	year: number;
	isMonth: boolean;
};

export type MonthCache = {
	[monthYear: string]: MonthDay[];
};
