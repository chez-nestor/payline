var Promise = require("bluebird");
var readFile = Promise.promisify(require('fs').readFile)
var path = require('path');
module.exports = {
    doRefund: function () {
        return (readFile(path.join(__dirname, 'RefundSuccess.xml')))
    },
    doCapture: function () {
        return (readFile(path.join(__dirname, 'CaptureSuccess.xml')))
    },
    //    doCredit
}
