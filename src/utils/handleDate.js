const calcWeek = (date) => {
    const dayWeek = date.getUTCDay();
    const dayMonth = date.getUTCDate();
    let initDate = new Date(date);
    let finDate = new Date(date);
    let contDate = new Date(date);

    initDate.setUTCDate(dayMonth - dayWeek)
    finDate.setUTCDate(dayMonth + (6 - dayWeek))

    let arr = []
    for(let i = 0; i< 7; i++){
        contDate.setUTCDate((dayMonth - dayWeek)+i);
        arr.push(contDate.getUTCDate());
    }

    return {
        month: castMonth(finDate.getUTCMonth()),
        days: arr,
        range: [
            `${initDate.getUTCFullYear()}-${initDate.getUTCMonth() + 1}-${initDate.getUTCDate()}`,
            `${finDate.getUTCFullYear()}-${finDate.getUTCMonth() + 1}-${finDate.getUTCDate()}`,
        ],
    }
}

const castMonth = (intMonth) => {
    const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

    return monthNames[intMonth];
}

const castDayWeek = (intDay) => {
    const dayNames = ["Domingo","Segunda", "Terça", "Quarta", "Quinta","sexta","Sábado","Domingo"];

    return dayNames[intDay];
}

export { calcWeek, castDayWeek }