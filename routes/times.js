var express = require('express');
var router = express.Router();
var pool = require('../config/dbpool');
var moment = require('moment-timezone');

router.post('/', function(req, res, next) {
	var year = parseInt(req.body.year);
	var month = parseInt(req.body.month) - 1;
	var day = parseInt(req.body.day);
	var hour = parseInt(req.body.hour);
	var minute = parseInt(req.body.minute);
	var second = parseInt(req.body.second);
	var timezone = req.body.timezone;

	var m = moment({"year": year, "month": month, "day": day,
								  "hour": hour, "minute": minute, "second": second}).tz(timezone);

	var tzTime = m.format("YYYY-MM-DD HH:mm:ss");
	var utcTime = m.utc().format("YYYY-MM-DD HH:mm:ss");
	pool.getConnection(function(err, connection) {
		if (err) {
			next(err);
		} else {
			var sql = "INSERT INTO t_schedules(exec_time_utc) " +
				        "VALUES(?)";
			connection.query(sql, [utcTime], function(err, result) {
				connection.release();
				if (err) {
					next(err);
				} else {
					res.json({
						"tzTime": tzTime,
						"utc": utcTime
					});
				}
			});
		}
	});
});

router.get('/now', function(req, res, next) {

  pool.getConnection(function(err, connection) {
    if (err) {
      next(err);
    } else {
      var sql = "SELECT date_format(now(), '%Y-%m-%d %H:%i:%s') AS 'UTC', " +
                "       date_format(convert_tz(now(),'+00:00','+9:00'), '%Y-%m-%d %H:%i:%s') as 'GMT+9'";
      connection.query(sql, function(err, results) {
	      connection.release();
	      if (err) {
		      next(err);
	      } else {
		      res.json({
			      "utc": "AWS RDS 기준시각(UTC+0): " + results[0]['UTC'],
			      "gmt+9": "대한민국 표준시각(GMT+9): " + results[0]['GMT+9']
		      });
	      }
      });
    }
  });
});

module.exports = router;
