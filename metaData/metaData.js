const states = [
    {name: "active"},
    {name: "due"},
    {name: "completed"},
    {name: "inactive"},
    {name: "completed after due"},
    {name: "hold"},
    {name: "dismissed"}
];

const alertPeriod = {
    oneMonth: 30,
    twoWeeks: 14,
    oneWeek: 7,
    threeDays: 3,
    oneDay: 1,
    now: 0,
}

module.exports = {
    states,
    alertPeriod
}