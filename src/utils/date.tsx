import dayjs from "dayjs";

export const quickDateFormat = (date: string) => dayjs(new Date(date)).format('YYYY-MM-DD');

export const DD_MM_YY = (date_: string) => dayjs(new Date(date_)).format("DD MMM,YYYY")

export const HH_MM = (date_: string) => dayjs(new Date(date_)).format("HH:mm:a")
