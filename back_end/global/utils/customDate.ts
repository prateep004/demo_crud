import moment from "moment";

export function getDates(startDate: Date, stopDate: Date): Array<Date> {
    var dateArray = new Array();
    var currentDate: Date = startDate;
    while (currentDate <= stopDate) {
        dateArray.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return dateArray;
}

export function validStartEndDate(req) {
    let start = (req?.query?.start ?? '') !== '' ? moment(req?.query?.start) : null;
    let end = (req?.query?.end ?? '') !== '' ? moment(req?.query?.end) : null;
    if (start !== null && !start?.isValid()) {
        throw new Error(`not valid date start=${req?.query?.start}, the last day of the month=${moment(req?.query?.start, "YYYY-MM").daysInMonth()}?`)
    }

    if (end !== null && !end?.isValid()) {
        throw new Error(`not valid date end=${req?.query?.end}, the last day of the month=${moment(req?.query?.end, "YYYY-MM").daysInMonth()}?`)
    }
}