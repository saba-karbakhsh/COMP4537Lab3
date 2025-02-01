const { FILE } = require('dns');
let http = require('http');
let url = require('url');
let messages = require('./lang/en/en.js');

http.createServer(function (req, res) {
    let q = url.parse(req.url, true);
    let path = q.pathname;
    if (path === '/COMP4537/labs/3/getDate'){
    res.writeHead(200, {'Content-Type': 'text/html'});
    let dateModule = require('./modules/utils.js');
    let date = dateModule.getDate();
    let name = q.query.name;
    let result = `<p style='color:blue'>`+ messages.userMessages.greetingString+ date + `</p>`;
    res.write(result.replace('%1', name));
    }
    else if(path === '/COMP4537/labs/3/writeFile'){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    let text = q.query.text;
    res.write(text);
    const fs = require('fs');
    fs.appendFile('file.txt', text, function (err) {
        if (err) {
            console.log('Error opening file');
            return;
        }
    });
}
else if(path === '/COMP4537/labs/3/readFile'){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    const fs = require('fs');
    let fileName = q.query;
    fs.readFile(fileName, 'utf8', function(err, data) {
        if (err) {
            console.log('Error opening file');
            return;
        }
        res.write(data);
        res.end();
    });
}
else{
    res.writeHead(404, {'Content-Type': 'text/html'});
    res.write('404 Not Found');
}
}).listen(8889);
