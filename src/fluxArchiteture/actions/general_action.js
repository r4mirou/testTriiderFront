export function handleShowModal(status) {
    return { type: 'SHOW_MODAL', status: status };
}

export function handleCalendarWeek(status) {
    return { type: 'CALENDAR_WEEK', status: status };
}

export function handleSelectedWeekDay(status) {
    return { type: 'SELECTED_WEEK_DAY', status: status };
}

export function handleSelectedMonth(status) {
    return { type: 'SELECTED_MONTH', status: status };
}

export function handleSelectedMonthDay(status) {
    return { type: 'SELECTED_MONTH_DAY', status: status };
}