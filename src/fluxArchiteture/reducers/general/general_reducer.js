var INITIAL_STATE = {
    showModal: false,
    messageModal: '',
    calendarWeek: [],
    selectedWeekDay: 0,
    selectedMonth: '',
    selectedMonthDay: 0,
};
export default function theme(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'SHOW_MODAL':
            return { ...state, showModal: action.status }
        case 'CALENDAR_WEEK':
            return { ...state, calendarWeek: action.status }
        case 'SELECTED_WEEK_DAY':
            return { ...state, selectedWeekDay: action.status }
        case 'SELECTED_MONTH':
            return { ...state, selectedMonth: action.status }
        case 'SELECTED_MONTH_DAY':
            return { ...state, selectedMonthDay: action.status }
        default:
            return state;
    }
}