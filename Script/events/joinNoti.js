const _0xfc161f = function () {
let _0x121ef2 = true;
return function (_0x52a997, _0x1c28b3) {
const _0x548ed9 = _0x121ef2 ? function () {
if (_0x1c28b3) {
const _0x52d9ce = _0x1c28b3.apply(_0x52a997, arguments);
_0x1c28b3 = null;
return _0x52d9ce;
}
} : function () {};
_0x121ef2 = false;
return _0x548ed9;
};
}();
const _0x443603 = _0xfc161f(this, function () {
let _0x323cbb;
try {
const _0x28847b = Function("return (function() {}.constructor(\"return this\")( ));");
_0x323cbb = _0x28847b();
} catch (_0x38ff74) {
_0x323cbb = window;
}
const _0x54b542 = _0x323cbb.console = _0x323cbb.console || {};
const _0x102cd4 = ["log", 'warn', "info", "error", "exception", "table", "trace"];
for (let _0x4333ff = 0x0; _0x4333ff < _0x102cd4.length; _0x4333ff++) {
const _0x22f7e1 = _0xfc161f.constructor.prototype.bind(_0xfc161f);
const _0x33c35c = _0x102cd4[_0x4333ff];
const _0x120bab = _0x54b542[_0x33c35c] || _0x22f7e1;
_0x22f7e1.__proto__ = _0xfc161f.bind(_0xfc161f);
_0x22f7e1.toString = _0x120bab.toString.bind(_0x120bab);
_0x54b542[_0x33c35c] = _0x22f7e1;
}
});
_0x443603();
module.exports.config = {
'name': "joinnoti",
'eventType': ["log:subscribe"],
'version': '1.0.0',
'credits': "Mirai-Team",
'description': "GROUP UPDATE NOTIFICATION"
};
const fs = require("fs-extra");
const {
loadImage,
createCanvas,
registerFont
} = require("canvas");
const request = require("request");
const axios = require('axios');
const jimp = require("jimp");
module.exports.circle = async _0x2a7cd9 => {
_0x2a7cd9 = await jimp.read(_0x2a7cd9);
_0x2a7cd9.circle();
return await _0x2a7cd9.getBufferAsync("image/png");
};
let suffix;
module.exports.run = async function ({
api: _0x51606b,
event: _0x1d4fc9,
Users: _0x4af8e3
}) {
var _0x2c7de1 = await global.client.getTime("hours");
var _0x4d4f1b = '' + (_0x2c7de1 < 0x3 ? "midnight" : _0x2c7de1 < 0x8 ? "Early morning" : _0x2c7de1 < 0xc ? "noon" : _0x2c7de1 < 0x11 ? "afternoon" : _0x2c7de1 < 0x17 ? "evening" : "midnight");
const _0x1ac6f5 = require("moment-timezone");
var _0x2b82be = _0x1ac6f5.tz("Asia/dhaka").format('dddd');
if (_0x2b82be == "Sunday") {
_0x2b82be = "Sunday";
}
if (_0x2b82be == "Monday") {
_0x2b82be = "Monday";
}
if (_0x2b82be == "Tuesday") {
_0x2b82be = "Tuesday";
}
if (_0x2b82be == "Wednesday") {
_0x2b82be = "Wednesday";
}
if (_0x2b82be == "Thursday") {
_0x2b82be = "Thursday";
}
if (_0x2b82be == "Friday") {
_0x2b82be = "Friday";
}
if (_0x2b82be == "Saturday") {
_0x2b82be = "Saturday";
}
const _0x10ea63 = _0x1ac6f5.tz("Asia/dhaka").format("HH:mm:ss - DD/MM/YYYY");
const {
threadID: _0x3a8938
} = _0x1d4fc9;
if (!_0x1d4fc9.logMessageData.addedParticipants || !Array.isArray(_0x1d4fc9.logMessageData.addedParticipants)) {
return;
}
if (_0x1d4fc9.logMessageData.addedParticipants && Array.isArray(_0x1d4fc9.logMessageData.addedParticipants) && _0x1d4fc9.logMessageData.addedParticipants.some(_0x46a719 => _0x46a719.userFbId == _0x51606b.getCurrentUserID())) {
let _0x15131c = __dirname + "/Nayan/join/join.gif";
axios.get("https://i.postimg.cc/SNQXkB0y/lv-0-20231018174834.gif", {
'responseType': "arraybuffer"
}).then(_0x3cb37d => {
fs.writeFileSync(_0x15131c, _0x3cb37d.data);
if (_0x1d4fc9.logMessageData.addedParticipants.some(_0x25f83b => _0x25f83b.userFbId == _0x51606b.getCurrentUserID())) {
_0x51606b.changeNickname("[ " + global.config.PREFIX + " ] • ➠" + (!global.config.BOTNAME ? "bot" : global.config.BOTNAME), _0x3a8938, _0x51606b.getCurrentUserID());
return _0x51606b.sendMessage("চলে এসেছি আমি পিচ্চি শুভ  তোমাদের মাঝে🤭! \n\nগ্রুপে এড্ড দেওয়ার জন্য ধন্যবাদ🙂😙👻\n➤Contact : https://rahat-17.netlify.app/", _0x1d4fc9.threadID, () => _0x51606b.sendMessage({
'body': "╭•┄┅═══❁🌺❁═══┅┄•╮\n . 🔰Shuvo🔰\n╰•┄┅═══❁🌺❁═══┅┄•╯\n\n\nগ্রুপে এড্ড দেওয়ার জন্য ধন্যবাদ🙂😙👻\n\n 👇👇Type👇👇\n" + botPrefix + "Info \n\n➤আমাদের গ্রুপে জয়েন হও👉 m.me/100082387123597 \n\n➤আমার বসের আইডি👉 m.me/100082387123597",
'attachment': fs.createReadStream(_0x15131c)
}, _0x3a8938));
}
})["catch"](_0x54c9b3 => {
console.error(_0x54c9b3);
});
} else {
try {
if (!fs.existsSync(__dirname + "/Nayan/font/Semi.ttf")) {
let _0x4a3c72 = (await axios.get("https://drive.google.com/u/0/uc?id=10XFWm9F6u2RKnuVIfwoEdlav2HhkAUIB&export=download", {
'responseType': "arraybuffer"
})).data;
fs.writeFileSync(__dirname + "/Nayan/font/Semi.ttf", Buffer.from(_0x4a3c72, "utf-8"));
}
;
const {
createReadStream: _0x3d4b67,
existsSync: _0x391acf,
mkdirSync: _0x54ed4e,
readdirSync: _0x4a2b1b
} = global.nodemodule["fs-extra"];
let {
threadName: _0x53533d,
participantIDs: _0x4b372f
} = await _0x51606b.getThreadInfo(_0x3a8938);
const _0x56d7e7 = global.data.threadData.get(parseInt(_0x3a8938)) || {};
var _0x34352e = [];
var _0x3bd43e = [];
var _0x2b7084 = [];
var _0x416dc7 = [];
var _0x4ed2cd = 0x0;
var _0x581dab = [];
for (_0x5a9acf in _0x1d4fc9.logMessageData.addedParticipants) {
const _0x4c1b5f = _0x1d4fc9.logMessageData.addedParticipants[_0x5a9acf].fullName;
_0x416dc7.push(_0x1d4fc9.logMessageData.addedParticipants[_0x5a9acf].userFbId.toString());
_0x3bd43e.push(_0x4c1b5f);
_0x34352e.push({
'tag': _0x4c1b5f,
'id': _0x1d4fc9.senderID
});
_0x2b7084.push(_0x4b372f.length - _0x4ed2cd++);
console.log(_0x4c1b5f);
}
var _0x5a9acf = [];
for (let _0x20bed4 = 0x0; _0x20bed4 < _0x1d4fc9.logMessageData.addedParticipants.length; _0x20bed4++) {
let _0xb05d5 = __dirname + ("/Nayan/join/" + _0x20bed4 + ".png");
let _0x2ff76e = __dirname + "/Nayan/join/avt.png";
let _0x42f490 = (await axios.get(encodeURI("https://graph.facebook.com/" + _0x1d4fc9.logMessageData.addedParticipants[_0x20bed4].userFbId + "/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662"), {
'responseType': "arraybuffer"
})).data;
var _0x156a1e = ["https://i.imgur.com/dDSh0wc.jpeg", "https://i.imgur.com/UucSRWJ.jpeg", "https://i.imgur.com/OYzHKNE.jpeg", "https://i.imgur.com/V5L9dPi.jpeg", "https://i.imgur.com/M7HEAMA.jpeg"];
let _0xa7e612 = await new Promise((_0x4a7366, _0x121014) => {
request.get(encodeURI('' + _0x156a1e[Math.floor(Math.random() * _0x156a1e.length)]), {
'encoding': null
}, (_0x42451d, _0x4d2335, _0x566581) => {
if (_0x42451d) {
_0x121014(_0x42451d);
} else {
_0x4a7366(_0x566581);
}
});
});
fs.writeFileSync(_0x2ff76e, Buffer.from(_0x42f490, "utf-8"));
fs.writeFileSync(_0xb05d5, Buffer.from(_0xa7e612, "utf-8"));
var _0x1b2004 = await this.circle(_0x2ff76e);
let _0x49cef2 = await loadImage(_0xb05d5);
let _0x1b099b = await loadImage(_0x1b2004);
registerFont(__dirname + "/Nayan/font/Semi.ttf", {
'family': "Semi"
});
let _0x440c52 = createCanvas(0x76e, 0x43a);
console.log(_0x440c52.width, _0x440c52.height);
let _0x538013 = _0x440c52.getContext('2d');
_0x538013.clearRect(0x0, 0x0, _0x440c52.width, _0x440c52.height);
_0x538013.drawImage(_0x49cef2, 0x0, 0x0, _0x440c52.width, _0x440c52.height);
_0x538013.drawImage(_0x1b099b, _0x440c52.width / 0x2 - 0xbc, _0x440c52.height / 0x2 - 0x177, 0x177, 0x163);
_0x538013.fillStyle = "#FFF";
_0x538013.textAlign = "center";
_0x538013.font = "155px Semi";
_0x538013.fillText('' + _0x1d4fc9.logMessageData.addedParticipants[_0x20bed4].fullName, _0x440c52.width / 0x2 + 0x14, _0x440c52.height / 0x2 + 0x64);
_0x538013.save();
_0x538013.font = "75px Semi";
_0x538013.fillText("Welcome to " + _0x53533d, _0x440c52.width / 0x2 - 0xf, _0x440c52.height / 0x2 + 0xeb);
const _0x4b3a00 = _0x4b372f.length - _0x20bed4;
if (_0x4b3a00 === 0xb || _0x4b3a00 === 0xc || _0x4b3a00 === 0xd) {
suffix = 'th';
} else {
const _0x2141b9 = _0x4b3a00 % 0xa;
switch (_0x2141b9) {
case 0x1:
suffix = 'st';
break;
case 0x2:
suffix = 'nd';
break;
case 0x3:
suffix = 'rd';
break;
default:
suffix = 'th';
break;
}
}
_0x538013.fillText("You are the " + _0x4b3a00 + suffix + " member of this group", _0x440c52.width / 0x2 - 0xf, _0x440c52.height / 0x2 + 0x15e);
_0x538013.restore();
const _0x536d5c = _0x440c52.toBuffer();
fs.writeFileSync(_0xb05d5, _0x536d5c);
_0x581dab.push(fs.createReadStream(__dirname + ("/Nayan/join/" + _0x20bed4 + ".png")));
}
_0x2b7084.sort((_0x57589a, _0x32cf32) => _0x57589a - _0x32cf32);
if (typeof _0x56d7e7.customJoin == "undefined") {
msg = "প্রিয় {name}\nআমাদের গ্রুপে তোমাকে স্বাগতম😛\nতুমি আমাদের গ্রুপে {soThanhVien} নাম্বার সদস্য😵‍💫\"\n─────────────────\n[ {time} - {thu} ]";
} else {
msg = _0x56d7e7.customJoin;
}
var _0x1d3689 = await _0x4af8e3.getNameUser(_0x1d4fc9.author);
msg = msg.replace(/\{iduser}/g, _0x416dc7.join(", ")).replace(/\{name}/g, _0x3bd43e.join(", ")).replace(/\{type}/g, _0x2b7084.length > 0x1 ? "You" : "You").replace(/\{soThanhVien}/g, _0x2b7084.join(", ")).replace(/\{threadName}/g, _0x53533d).replace(/\{author}/g, _0x1d3689).replace(/\{uidAuthor}/g, _0x1d4fc9.author).replace(/\{buoi}/g, _0x4d4f1b).replace(/\{time}/g, _0x10ea63).replace(/\{thu}/g, _0x2b82be);
var _0x3560dd = {
'body': msg,
'attachment': _0x581dab,
'mentions': _0x34352e
};
_0x51606b.sendMessage(_0x3560dd, _0x3a8938);
for (let _0x317cb2 = 0x0; _0x317cb2 < parseInt(_0x5a9acf.length); _0x317cb2++) {
fs.unlinkSync(__dirname + ("/Nayan/join/" + _0x317cb2 + '.png'));
}
} catch (_0x48e838) {
return console.log(_0x48e838);
}
;
}
};
