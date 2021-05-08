
let filename = "./server/log/123.txt"

var fs = require('fs');

const initializeLog = () => {
    var currentdate = new Date();
    filename = './server/log/' + currentdate.getFullYear() + '-'
                + (currentdate.getMonth()+1) + "-"  
                + currentdate.getDate() + "-"
                + currentdate.getHours() + "-"  
                + currentdate.getMinutes() + ".log";
    fs.writeFile(filename, '', function (err) {
        if (err)
            console.log(err);
    });
}

const saveLog = (msg) => {
    var currentdate = new Date();
    var datetime = currentdate.getFullYear() + '-'
                + (currentdate.getMonth()+1) + "-"  
                + currentdate.getDate() + "-"
                + currentdate.getHours() + "-"  
                + currentdate.getMinutes() + "-"
                + currentdate.getSeconds();
    if (msg.includes('end-game')) {
        var msg1 = msg.replace('end-game', '')
        fs.appendFile(filename, msg1 + ' ' + datetime + '\n' + 'end-game\n', function (err) {
            if (err)
                console.log(err);
        });
        return
    }
    fs.appendFile(filename, msg + ' ' + datetime + '\n', function (err) {
        if (err)
            console.log(err);
    });
}

export {initializeLog, saveLog}