const http = require('http');
const fs = require('fs');
const formidable = require('formidable');
const util = require('util');


const server = http.createServer(function (req, res) {
    if(req.method.toLowerCase() === 'get'){
    	displayForm(res);
    } else if(req.method.toLowerCase() === 'post'){
    	//	processAllFieldsOfTheForm(req, res);
    	processFormFieldsIndividual(req, res);
    }
    
});

function displayForm(res) {
    fs.readFile('form.html', function (err, data) {
        res.writeHead(200, {
            'Content-Type': 'text/html',
                'Content-Length': data.length
        });
        res.write(data);
        res.end();
    });
}

function processAllFieldsOfTheForm(req, res){
	var form = new formidable.IncomingForm();

	form.parse(req, function(req, fields, files) {
		//Store the data from the fields in your data store.
		//The data store could be a file or database or any other store base
		//on your application
		res.writeHead(200, {
			'content-type': 'text/plain'
		});
		res.write('receive the data:\n\n');
		res.end(util.inspect({
			fields: fields,
			files: files
		}));
	});
}

function processFormFieldsIndividual(req, res){
	var fields = [];
	var form = new formidable.IncomingForm();
	form.on('field', function(field, value) {
		console.log(field);
		console.log(value);
		fields[field] = value;
	});

	form.on('end', function(){
		res.writeHead(200, {
			'content-type': 'text/plain'
		});
		res.write('receive the data:\n\n');
		res.end(util.inspect({
			fields: fields
		}));
	});
	form.parse(req);
}

server.listen(1185);
console.log("server listening on 1185");