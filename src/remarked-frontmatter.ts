import dayjs from "dayjs";

export function lastModified(r: Record<string, any>): Date {
    return dayjs(r.lastModified).toDate();
}

