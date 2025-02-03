import dayjs from "dayjs";

export function lastModified(r: Record<string, any>): Date {
    const timestamp = r.lastModified;

    // happens when file not committed yet -- aka only during local testing
    if (timestamp == null) {
        return new Date();
    }
    return dayjs(r.lastModified).toDate();
}

