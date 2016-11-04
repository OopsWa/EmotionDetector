/*
Navicat MySQL Data Transfer

Source Server         : wt
Source Server Version : 50151
Source Host           : localhost:3306
Source Database       : emotiondetector

Target Server Type    : MYSQL
Target Server Version : 50151
File Encoding         : 65001

Date: 2016-11-04 23:46:27
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for `account`
-- ----------------------------
DROP TABLE IF EXISTS `account`;
CREATE TABLE `account` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `phone` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `name` varchar(200) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `birth` int(11) NOT NULL,
  `time` int(11) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of account
-- ----------------------------
INSERT INTO `account` VALUES ('1', '18382365931', 'e10adc3949ba59abbe56e057f20f883e', '123', '123', '123', '1478268073');

-- ----------------------------
-- Table structure for `register_code`
-- ----------------------------
DROP TABLE IF EXISTS `register_code`;
CREATE TABLE `register_code` (
  `code` varchar(20) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `time` int(11) NOT NULL,
  `accept` int(10) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`phone`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of register_code
-- ----------------------------
INSERT INTO `register_code` VALUES ('765705', '18382365931', '1478267044', '0');
