var http = require("http");
var url = require("url");
var path = require("path");
var fs = require("fs");
var express = require("express");
var updateObject = require("./updateObject");

var app = express();
app.use(express.static(path.join(__dirname, 'public')));


app.get("/", function(req, res) {
	updateNewTime();
    res.sendFile("index.html");
});

app.get("/admin", function(req, res) {
    res.sendFile(__dirname+"/public/admin.html");
});

app.get("/refresh", function(req, res) {
	updateNewTime();
    res.send(updateObject);
});

app.get("/update", function(req, res) {
	var checkPoint = req.query.checkPoint;
	console.log(checkPoint)
	if (checkPoint != null) {
		updateObject.itemList[checkPoint].actualTime = new Date().getTime();
	}
    res.send("updated checkPoint " + checkPoint + " on " + updateObject.itemList[checkPoint].actualTime);
});

function updateNewTime() {

    for (var i = 0; i <= 10; i++) {
        if (i == 0) continue;
        var actualTime = updateObject.itemList[i-1].actualTime;
        var tempNewTime;
        if (actualTime != null) {
            tempNewTime = updateObject.itemList[i - 1].actualTime + updateObject.itemList[i].duration;
        } else {
        	tempNewTime = updateObject.itemList[i-1].newTime + updateObject.itemList[i].duration;
        }
        updateObject.itemList[i].newTime = tempNewTime;
    }
}
//create server on port 3000
app.server = http.createServer(app);
app.server.listen(8000);
console.log("Starting Server at Localhost:8000");