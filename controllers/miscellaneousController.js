const test = (req, res) => {
    console.log("> test initiated");
    console.log("> test ended");
    res.status(200).json({msg : "Test is working"});
}

module.exports = {
    test
};