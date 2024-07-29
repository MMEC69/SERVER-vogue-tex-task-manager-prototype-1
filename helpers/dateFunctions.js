const dayCounter = (startDate, endDate) => {
    let beginning = new Date(startDate);
    let end = new Date(endDate);

    // Calculating the time difference
    // of two dates
    const DifferenceInTime = end.getTime() - beginning.getTime();

    // Calculating the no. of days between
    // two dates
    const DifferenceInDays = Math.round(DifferenceInTime / (1000 * 3600 * 24));

    // To display the final no. of days (result)
    return DifferenceInDays;
}

module.exports = {
    dayCounter
};