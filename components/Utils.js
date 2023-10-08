import { format, parseISO } from "date-fns";

export const timeString = (dateString) => {
    const dateObject = parseISO(dateString);
    return format(dateObject, "h:mm a");
}


export const getISOTime = () => {
    const now = new Date();
    return now.toISOString();
}
