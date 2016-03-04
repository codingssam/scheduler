var express = require('express');
var router = express.Router();
var pool = require('../config/dbpool');
var moment = require('moment-timezone');
var nodeschedule = require('node-schedule');
var uuid = require('uuid');

router.post('/datejob', function(req, res, next) {
	var year = parseInt(req.body.year);
	var month = parseInt(req.body.month) - 1;
	var day = parseInt(req.body.day);
	var hour = parseInt(req.body.hour);
	var minute = parseInt(req.body.minute);
	var second = parseInt(req.body.second);

	var m = moment({"year": year, "month": month, "day": day,
								  "hour": hour, "minute": minute, "second": second}).tz('Asia/Seoul');

	var date = m.toDate();
	var job = nodeschedule.scheduleJob("datejob-" + uuid.v4(), date, function(mm) {
		console.log(mm.format("YYYY-MM-DD HH:mm:ss") + "에 실행됨...");
		console.log(mm.utc().format("YYYY-MM-DD HH:mm:ss") + "에 실행됨...");
	}.bind(null, m));

	res.json({
		"message": m.format("YYYY-MM-DD HH:mm:ss") + "에 실행될 작업을 요청하였음..."
	});

});

router.post('/cronjob', function(req, res, next) {
	var cronstyle = req.body.cronstyle;

	var job = nodeschedule.scheduleJob("cronjob-" + uuid.v4(), cronstyle, function() {
		console.log(moment().format("YYYY-MM-DD HH:mm:ss") + "에 주기작업이 실행됨...");
		console.log(moment().utc().format("YYYY-MM-DD HH:mm:ss") + "에 주기작업이 실행됨...");
	});

	res.json({
		"message": "주기적으로 실행될 작업을 요청하였음...",
		"job": job
	});

});

router.get('/', function(req, res, next) {
	res.json(nodeschedule.scheduledJobs);
});

router.delete('/:jobname', function(req, res, next) {
	var jobName = req.params.jobname;
	var job = nodeschedule.scheduledJobs[jobName];
	job.cancel();
	delete nodeschedule.scheduledJobs[jobName];
	res.json({
		"message": jobName + "이(가) 취소되었습니다..."
	});
});

module.exports = router;
