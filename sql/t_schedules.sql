CREATE TABLE t_schedules (
  id int(11) NOT NULL AUTO_INCREMENT,
  exec_time_utc datetime DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;