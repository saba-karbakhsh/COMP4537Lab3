let http = require('http');
let url = require('url');
let messages = require('./lang/en/en.js');
const fs = require('fs');

http.createServer(function (req, res) {
    let q = url.parse(req.url, true);
    let path = q.pathname;
    
    if (path === '/COMP4537/labs/3/getDate/' && q.query.name) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    let dateModule = require('./modules/utils.js');
    let date = dateModule.getDate();
    let name = q.query.name;
    let result = `<p style='color:blue'>`+ messages.userMessages.greetingString+ date + `</p>`;
    res.write(result.replace('%1', name));
    res.end();
    }
    else if(path === '/COMP4537/labs/3/writeFile/' && q.query.text){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    let text = q.query.text;
    res.write(text);
    const fs = require('fs');
    fs.appendFile('file.txt', text + '\n', function (err) {
        if (err) {
            console.log('Error opening file');
            return;
        }
    });
    res.end();
}
else if(path === '/COMP4537/labs/3/readFile/file.txt'){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    const fs = require('fs');
    fs.readFile("file.txt", 'utf8', function(err, data) {
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
    res.write('40444 Not Found');
}
}).listen(process.env.PORT || 8888);
