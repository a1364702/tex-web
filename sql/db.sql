CREATE DATABASE IF NOT EXISTS db_stat;

USE db_stat;

CREATE TABLE IF NOT EXISTS `t_all`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `time` datetime(0) NOT NULL,
  `statymd` char(16) NOT NULL,
  `zoneid` int(10) UNSIGNED NOT NULL,
  `accountnum` int(10) NOT NULL,
  `rolenum` int(10) UNSIGNED NOT NULL,
  `newadd` int(10) UNSIGNED NOT NULL,
  `active` int(10) UNSIGNED NOT NULL,
  `recharge_num` int(10) UNSIGNED NOT NULL,
  `recharge_money` int(10) UNSIGNED NOT NULL,
  `week_active` int(10) UNSIGNED NOT NULL,
  `double_week_active` int(10) UNSIGNED NOT NULL,
  `month_active` int(10) UNSIGNED NOT NULL,
  `country` char(2) NOT NULL,
  `ostype` int(1) NOT NULL,
  `login_times` int(10) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
);

CREATE TABLE IF NOT EXISTS `t_income_all`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `time` datetime(0) NOT NULL,
  `statymd` char(16) NOT NULL,
  `zoneid` int(10) UNSIGNED NOT NULL,
  `active` int(10) UNSIGNED NOT NULL,
  `recharge_num` int(10) UNSIGNED NOT NULL,
  `recharge_money` int(10) UNSIGNED NOT NULL,
  `recharge_new` int(10) UNSIGNED NOT NULL,
  `country` char(2) NULL DEFAULT NULL,
  `ostype` int(1) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
);

CREATE TABLE IF NOT EXISTS `t_income_money`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `time` datetime(0) NOT NULL,
  `statymd` char(16) NOT NULL,
  `zoneid` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `newadd` int(10) UNSIGNED NOT NULL,
  `day_1` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_2` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_3` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_4` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_5` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_6` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_7` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_8` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_9` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_10` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_11` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_12` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_13` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_14` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_15` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_16` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_17` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_18` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_19` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_20` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_21` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_22` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_23` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_24` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_25` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_26` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_27` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_28` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_29` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_30` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_31` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_32` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_33` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_34` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_35` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_36` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_37` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_38` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_39` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_40` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_41` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_42` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_43` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_44` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_45` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_46` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_47` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_48` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_49` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_50` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_51` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_52` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_53` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_54` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_55` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_56` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_57` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_58` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_59` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_60` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_61` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_62` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_63` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_64` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_65` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_66` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_67` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_68` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_69` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_70` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_71` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_72` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_73` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_74` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_75` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_76` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_77` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_78` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_79` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_80` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_81` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_82` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_83` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_84` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_85` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_86` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_87` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_88` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_89` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_90` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `country` char(2) NULL DEFAULT NULL,
  `ostype` int(1) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
);

CREATE TABLE IF NOT EXISTS `t_log`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` varchar(30) NOT NULL,
  `time` datetime(0) NOT NULL,
  `action` varchar(30) NOT NULL,
  `desc` text NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
);

CREATE TABLE IF NOT EXISTS `t_lose`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `time` datetime(0) NOT NULL,
  `statymd` char(16) NOT NULL,
  `zoneid` int(10) UNSIGNED NOT NULL,
  `week_active_1` int(10) UNSIGNED NOT NULL,
  `week_active_2` int(10) UNSIGNED NOT NULL,
  `dweek_active_1` int(10) UNSIGNED NOT NULL,
  `dweek_active_2` int(10) UNSIGNED NOT NULL,
  `month_active_1` int(10) UNSIGNED NOT NULL,
  `month_active_2` int(10) UNSIGNED NOT NULL,
  `pay_week_active_1` int(10) UNSIGNED NOT NULL,
  `pay_week_active_2` int(10) UNSIGNED NOT NULL,
  `pay_dweek_active_1` int(10) UNSIGNED NOT NULL,
  `pay_dweek_active_2` int(10) UNSIGNED NOT NULL,
  `pay_month_active_1` int(10) UNSIGNED NOT NULL,
  `pay_month_active_2` int(10) UNSIGNED NOT NULL,
  `country` char(2) NULL DEFAULT NULL,
  `ostype` int(1) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
);

CREATE TABLE IF NOT EXISTS `t_newadd`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `time` datetime(0) NOT NULL,
  `statymd` char(15) NOT NULL,
  `zoneid` int(10) UNSIGNED NOT NULL,
  `accountnum` int(10) UNSIGNED NOT NULL,
  `rolenum_new` int(10) UNSIGNED NOT NULL,
  `rolenum_old` int(10) UNSIGNED NULL DEFAULT NULL,
  `total_accountnum` int(10) NOT NULL,
  `total_rolenum` int(10) NOT NULL,
  `country` char(2) NOT NULL,
  `ostype` int(1) NOT NULL,
  `rolenum_startgame` int(10) NOT NULL,
  `rolenum_create2` int(10) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
);

CREATE TABLE IF NOT EXISTS `t_recharge`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `time` datetime(0) NOT NULL,
  `statymd` char(16) NOT NULL,
  `zoneid` int(11) NOT NULL,
  `roleid` bigint(20) UNSIGNED NOT NULL,
  `rolecreatetimeymd` char(16) NOT NULL,
  `money` int(10) UNSIGNED NOT NULL,
  `country` char(2) NULL DEFAULT NULL,
  `ostype` int(1) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `zoneid`(`zoneid`) USING BTREE,
  INDEX `statymd`(`statymd`) USING BTREE,
  INDEX `country`(`country`) USING BTREE,
  INDEX `ostype`(`ostype`) USING BTREE
);

CREATE TABLE IF NOT EXISTS `t_remain`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `time` datetime(0) NOT NULL,
  `datatype` tinyint(3) UNSIGNED NOT NULL DEFAULT 1,
  `statymd` date NOT NULL,
  `zoneid` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_1` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_2` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_3` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_4` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_5` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_6` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_7` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_8` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_9` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_10` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_11` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_12` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_13` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_14` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_15` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_16` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_17` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_18` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_19` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_20` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_21` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_22` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_23` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_24` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_25` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_26` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_27` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_28` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_29` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_30` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_31` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_32` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_33` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_34` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_35` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_36` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_37` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_38` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_39` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_40` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_41` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_42` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_43` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_44` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_45` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_46` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_47` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_48` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_49` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_50` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_51` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_52` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_53` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_54` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_55` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_56` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_57` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_58` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_59` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_60` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_61` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_62` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_63` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_64` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_65` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_66` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_67` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_68` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_69` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_70` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_71` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_72` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_73` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_74` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_75` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_76` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_77` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_78` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_79` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_80` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_81` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_82` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_83` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_84` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_85` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_86` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_87` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_88` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_89` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `day_90` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `country` char(2) NULL DEFAULT NULL,
  `ostype` int(1) NULL DEFAULT NULL,
  PRIMARY KEY (`id`, `day_79`) USING BTREE
);
