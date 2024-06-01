const fs = require ("fs");

const downloadAttachments = async (req, res) => {
    const {fileName} = req.params;
    console.log(`Requested File ${fileName}.............`);
    const filePath = `./attachments/${fileName}`;
    console.log(`Requested File path ${filePath}................`);
    await res.download(
        filePath,
        fileName,
        (err) => {
            if (err){
                res.status(404).send({
                    error: err,
                    msg: "Problem encountered getting the file"
                });
            }
        }
    )
}


module.exports = {
    downloadAttachments
};