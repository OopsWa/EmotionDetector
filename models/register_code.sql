/*
Navicat MySQL Data Transfer

Source Server         : wt
Source Server Version : 50151
Source Host           : localhost:3306
Source Database       : emotiondetector

Target Server Type    : MYSQL
Target Server Version : 50151
File Encoding         : 65001

Date: 2016-11-04 23:46:48
*/

SET FOREIGN_KEY_CHECKS=0;
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
