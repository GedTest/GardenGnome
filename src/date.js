export function toReadableDate(dateString) {
    let newDate = dateString;
    if (typeof dateString === "string") {
        newDate = new Date(dateString);
    }
    return `${toTwoDigit(newDate.getDate())}. ${toTwoDigit(newDate.getMonth()+1)}. ${newDate.getFullYear()}`;
}

export function toJSDate(dateString) {
    return dateString.split('. ').reverse().map(part => toTwoDigit(parseInt(part))).join('-');
}

function toTwoDigit(n) { return (n < 10) ? '0' + n : n; }