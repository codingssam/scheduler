CREATE TABLE t_schedules (
  id int(11) NOT NULL AUTO_INCREMENT,
  exec_time_utc datetime DEFAULT NULL,
  exec_status varchar(10) DEFAULT NULL,
  exec_result_log varchar(255) DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;