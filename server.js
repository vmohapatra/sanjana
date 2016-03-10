var config = require('./config');

process.argv.forEach(processCommandLine);

function processCommandLine (val, index) {
    //Check if User inputted a port number
    if(index == 2) {
        console.log("User wants to run the app at port="+val);
    }
}