const moment = require("moment");

const dateFormat1 = (date) =>{
    let fDate = moment(date).format('YYYY-MM-DD');
    return (fDate);
}

module.exports = {
    dateFormat1
}