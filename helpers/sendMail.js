const sendMail = async (transporter, mailOptions) => {
    console.log("> sendMail initiated");
    try {
        const result = await transporter.sendMail(mailOptions);
        console.log(result);
        console.log("> sendMail ended");
        return result;
    } catch (error) {
        console.log(error);
        console.log("> sendMail ended");
        return error;
    }
}

module.exports = {
    sendMail
};