export const formatDate = date => {
    //date must be a string
    let inputDate = new Date(date);
    let dd = inputDate.getDate();
    let mm = inputDate.getMonth() + 1; //January is 0!

    let yyyy = inputDate.getFullYear();
    if (dd < 10) {
        dd = "0" + dd;
    }
    if (mm < 10) {
        mm = "0" + mm;
    }
    return `${dd}-${mm}-${yyyy}`;
};