import moment from 'moment'
import { Colors } from "../../styleApp/color";
/**
 * @description Get total day of a month in the calendar
 * @param {int} month The month number, 0 based
 * @param {int} year The year, not zero based, required to account for leap years
 * @return {Date[]} List with date objects for each day of the month
 */
const getDates = (month, year) => {
    const MONDAY_INDEX = 1 // Sunday = 0, Monday = 1, Tueday = 2,....
    const NUMBER_OF_DATE = 42 // Number of date on the Calendar
    const startOfMonth = moment()
        .month(month - 1)
        .year(year)
        .startOf("month")
    const endOfMonth = moment()
        .month(month - 1)
        .year(year)
        .endOf("month")

    const finalsOfPrevMonth = []
    const currentMonth = []
    const startsOfNextMonth = []
    let iteratedDate = null

    iteratedDate = startOfMonth.clone()
    while (iteratedDate.day() !== MONDAY_INDEX) {
        iteratedDate.subtract(1, "day")
        finalsOfPrevMonth.push({ date: iteratedDate.format("l"), index: -1, completeStatus: -1 })
    }

    iteratedDate = startOfMonth.clone()
    while (iteratedDate.month() === month - 1) {
        currentMonth.push({ date: iteratedDate.format("l"), index: 0, completeStatus: -1 })
        iteratedDate.add(1, "day")
    }

    iteratedDate = endOfMonth.clone()
    while (finalsOfPrevMonth.length + currentMonth.length + startsOfNextMonth.length < NUMBER_OF_DATE) {
        iteratedDate.add(1, "day")
        startsOfNextMonth.push({ date: iteratedDate.format("l"), index: 1, completeStatus: -1 })
    }

    return [...finalsOfPrevMonth.reverse(), ...currentMonth, ...startsOfNextMonth]
}


export const DateHelper = {
    getDates
}