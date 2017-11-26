var updateObject = {};
var checkPoint = {};
var startTime = 1510898400000; //hkt 17 Nov 14:00
// var startTime = 1510452000000;
var hour = 1000 * 60 * 60;
var minute = 1000 * 60;

var durationList = [];
durationList.push(constructDurationTime(0, 0));
durationList.push(constructDurationTime(3, 30));
durationList.push(constructDurationTime(2, 15));
durationList.push(constructDurationTime(3, 15));
durationList.push(constructDurationTime(4, 30));
durationList.push(constructDurationTime(2, 30));

durationList.push(constructDurationTime(1, 30));
durationList.push(constructDurationTime(4, 0));
durationList.push(constructDurationTime(3, 0));
durationList.push(constructDurationTime(2, 30));
durationList.push(constructDurationTime(3, 0));



function constructDurationTime(mHour, mMinute) {
    return mHour * hour + mMinute * minute;
}

updateStartTime = startTime;
updateObject["itemList"] = [];
for (var i = 0; i <= 10; i++) {
    var item = {};
    item.id = i;
    item.duration = durationList[i];
    item.name = "check point " + i;
    item.newTime = startTime;
    if (i == 0) {
    	item.eta = startTime + durationList[i];
    } else {
    	item.eta = updateObject.itemList[i-1].eta + durationList[i];
    }
    updateObject["itemList"].push(item);
}

updateObject["ok"] = true;
updateObject["lastUpdateTime"] = new Date();
updateObject["lastUpdateMark"] = "-";
module.exports = updateObject;