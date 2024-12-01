import { isBefore, isToday, startOfDay } from "date-fns";

export const determineBackgroundColor = (company) => {
    const currentDate = new Date();
    const normalizedToday = startOfDay(currentDate);

    const nextCommunicationDate = new Date(company.nextCommunication?.date)

    if (company.lastFiveCommunications.length === 5) {
        return "#ACE1AF";
    }

    if (nextCommunicationDate) {
        if (isBefore(nextCommunicationDate, normalizedToday)) {
            return "#FFCDD2";
        }
        if (isToday(nextCommunicationDate)) {
            return "#FFF59D";
        }
    }

    return "white";
};