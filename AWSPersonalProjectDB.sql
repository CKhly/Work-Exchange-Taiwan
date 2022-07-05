CREATE DATABASE workexchange;
USE workexchange;

DROP TABLE IF EXISTS `host_table`;
CREATE TABLE `host_table` (
	`host_id` bigint unsigned NOT NULL AUTO_INCREMENT,
	`host_name` varchar(127) NOT NULL,
	`host_contacts` varchar(255) NOT NULL,
	`host_mainImage` varchar(255) DEFAULT NULL,
	`host_category` bigint unsigned NOT NULL,
	`host_location` bigint unsigned NOT NULL,
	`host_lng` float8 NOT NULL,
    `host_lat` float8 NOT NULL,
 	`host_gender_needs` bigint unsigned NOT NULL,
	`short_period` int unsigned NOT NULL,
	`host_description` varchar(255) NOT NULL,
	`host_needs` varchar(127) NOT NULL,
	`host_benefits` varchar(255) NOT NULL,
	`host_creator_id` bigint,
	`host_create_date` DATETIME NOT NULL,
	`host_last_update_date` bigint unsigned,  
	`host_likes` bigint unsigned,
	`host_others` varchar(511) NOT NULL,
	PRIMARY KEY (`host_id`)
);
INSERT INTO `host_table` (`host_id`, `host_name`, `host_contacts`, `host_mainImage`, `host_category`, `host_location`, `host_lng`,`host_lat`, `host_gender_needs`, `short_period`, `host_description`, `host_needs`, `host_benefits`, `host_creator_id`, `host_create_date`, `host_last_update_date`, `host_likes`, `host_others`)
VALUES
	-- ('my_first_host', 'my_first_host_contacts', 'main.jpg', 2,  1, 121.5644, 25.0336, 2, 1, 'my_first_host_description','my_first_host_needs', 'my_first_host_benefits', 1, '20220613', '20220613', 1 , 'host_others'),
	(2,'御來光民宿', 'judykuo1209@gmail.com', 'main.jpg', 1, 1, 121.12997382802784, 22.92686044181617, 1, 1, '我們的民宿就在鹿野高台上 豐富的生態、夏天的銀河星空，搭配最經典的熱氣球 今年就來體驗一個充滿著歡樂的熱氣球夏日吧！',' 不超過6小時/天 A:6：00-12：00 B:10：00- 16:00 （現場狀況調整）協助早餐準備、客房及民宿環境清潔整理、接待客人', '1、供食宿(依工作時段提供早或中餐，住宿提供園區小屋有冷氣，可使用洗衣機，2-4人一室套房）2、需自備機車。3、滿三週福利：保險、來回火車票、鸞山森林博物館行程體驗、一次桶仔雞餐、紅烏龍茶&澳洲茶樹精油伴手禮；晚餐代金100元/每日。', 1, '20220613', '20220613', 3 , '我們會有一星期彼此的試應，不適任者我們會提前讓您離開。園區生態豐富，壁虎蜘蛛實屬日常，若恐懼請勿試。聯絡方式:請將自傳履歷表寄到judykuo1209@gmail.com履歷內容請包含以下的內容姓名：出生年月日：電話：學歷：居住地：欲選擇梯次：專長(或嗜好)：自傳：為什麼想來這裡打工渡假？(請附上幾張生活照)'),
	(3,'綠島月光城堡民宿', 'mooncastle615@gmail.com', 'main.jpg', 1,5, 121.4756386949595, 22.65655390594571, 3, 0,'host_description', '【工作時間】每日不超過6小時，每周排休1天 【工作內容】主要工作：整理客房、洗曬折床單、早餐、倒垃圾 次要工作：維護清潔、協助櫃台', '1.住宿：宿舍在溫泉聚落，冷氣房有床墊四~六人同住、宿舍大廳有WIFI 2.上班日供午餐(便當或餐費80元)3.回程船票：工作滿1個月4.零用金：1個月4000元5.休假：每周排休1天，主要由我們安排，但可以協調6.電動機車或機車：須具備駕照，兩人一部輪流使用，也可將自己的機車帶進來綠島7.滿一個月送「體驗潛水一次」8.幫忙兩個月可換取PADI OW或AOW水肺潛水執照(無零用金)9.小幫手享有優惠價格考取各級PADI潛水員課程(現場洽詢)10.如果你有潛水執照，享優惠價格潛水', 1, '20220613', '20220613', 1 , '第一個星期為適應期看彼此適不適合唷【投履歷前的小建議】綠島不如都市那邊熱鬧先進，大家要有來鄉下住的心理準備。早上的時間請盡自己的責任完成工作，工作後的時間也請盡情的享受綠島時光。另外宿舍這一區沒有ADSL跟第四台，但還是有4G手機訊號以上幾點沒問題的話，請投履歷到我的信箱mooncastle615@gmail.com履歷眾多我們盡可能回覆，入取者我們會在您寄出信件後的3天左右回信給您。信件中向我們介紹一下自己：姓名、電話、 學歷、居住地、出生年月日、身高、可停留多久&月份、專長(或嗜好):、簡略自傳、備註(附上兩張生活照)如果朋友會有興趣的話也歡迎幫忙分享轉貼喔'),
	(4,'綠海城堡', 'chiazhen0710@gmail.com', 'main.jpg', 1, 5, 121.47301258940097, 22.67327238206725, 1, 0, 'host_description', '(1)整理客房及民宿環境(2)洗/曬/折床單棉被(3)早餐、倒垃圾(輪流', '(1)團體宿舍 (有冷氣，男女分開)、保險。(2)早餐自理，可使用民宿廚房之食材；午餐由民宿準備；晚餐給予餐費100元。(3)來回船票補助：需工作兩星期以上。(4)零用金：1週1000元。(5)機車：輪流使用，需配合調度。(可自行寄車過來較為方便；寄車$200/台，需自行負擔費用）(6)工作滿1個月，送體驗潛水一次。(7)浮潛一次、秘境藍洞或潮間帶一次。', 1, '20220620', '20220613', 1 , ' 年滿18歲，需通過家人同意* 具備機車駕照者為佳* 打工換宿時間最少1個月* 能接受團體生活、住宿環境及貓狗等寵物* 無固定排休時間，只要沒工作或工作做完都可以休息及遊玩！* 旅遊旺季工作較繁忙，邀請不怕辛苦、不怕累的你前來！Ps 千萬不要怕曬太陽喔！☀️「第一個星期為適用期看彼此適不適合！」'),
    (5,'嚮海ocean seeker', 'daisy10131999@gmail.com', 'main.jpg', 1, 5, 121.47520825871146, 22.647255311886376, 1, 0,'host_description', '-協助早餐製作&收拾-整理房務、洗曬棉被-維護公共環境整潔-協助完成臨時交託的小任務(ex:澆花、倒垃圾)每日工作約5～6小時，提早結束工作並檢查完畢後即為自由時間', '-冷氣套房(與工作夥伴同住)-機車(兩人一台輪流使用，油資自付，如遇連假需要用車會先收回)-早午餐(晚餐如在廚房開伙需協助收拾乾淨)-滿一個月來回船票+零用金1000/週-滿兩個月來回船票+零用金1000/週或PADI初級潛水員考證-不定期浮潛、夜遊、聚餐-表現良好會有額外福利', 1, '20220601', '20220613', 0 , '🏝注意事項：-第一個禮拜為互相適應期，若經溝通後還是覺得不合適，我們保有終止換宿權利-宿舍這區無ADSL跟第四台，但有4G手機訊號-基於個人衛生問題，需自備盥洗用品-需為自身安全負責，嚴禁獨自下水-如有事臨時不能來請最晚提前15天通知🏝應徵方式：上述事項確認無誤，請Mail至：daisy10131999@gmail.com標題需清楚註明：「我是xxx，我要應徵x月的小幫手」內容需包含：1.確切換宿日期2.基本自我介紹、生活照2張3.聯絡方式(手機號碼/line)4.過往工作經驗或換宿經驗5.專長、興趣、才藝皆可註明*寄出mail後請留意錄取通知⚠️因應疫情尚未趨緩，若疫情升溫將提早告知取消換宿')
;

DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
);
INSERT INTO `category` (`id`, `name`, `photo`)
VALUES
	(1, '民宿', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'),
	(2, '餐廳', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmVzdGF1cmFudHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'),
    (3, '商店', 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c3RvcmV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'),
   	(4, '潛水店', 'https://images.unsplash.com/photo-1526139506140-315ac793b9cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzN8fHNjdWJhfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'),
	(5, '衝浪店', 'https://images.unsplash.com/photo-1621951289270-b942dc5f4320?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHN1cmZpbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'),
    (6, '其他', 'https://images.unsplash.com/photo-1576697655732-470037f97d9d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDR8fG90aGVyc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60')
;

DROP TABLE IF EXISTS `location`;
CREATE TABLE `location` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `path_name` varchar(50) DEFAULT NULL,
	`lng` float8 NOT NULL,
    `lat` float8 NOT NULL,
    `zoom` bigint unsigned,
  `photo` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
);
INSERT INTO `location` (`id`, `name`, `path_name`, `lng`, `lat`, `zoom`, `photo`)
VALUES
	(1,'臺灣', 'Taiwan', 121.064693, 23.89932, 7,'https://images.unsplash.com/photo-1470004914212-05527e49370b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dGFpd2FufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'),
	(5,'綠島', 'GreenIsland', 121.5644, 25.0336, 10,'https://tour.taitung.gov.tw/image/23980/1024x768'),
	(6,'蘭嶼', 'LanYu', 121.54509, 22.03136,10,'https://images.unsplash.com/photo-1593072241457-12139de9074d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGxhbnl1fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'),
    (7,'小琉球', 'XiaoLiuQiu', 120.37169, 22.34233,12,'https://www.taiwan.net.tw/att/1/big_scenic_spots/pic_2344_15.jpg'),
	(8,'澎湖', 'PenHu', 119.57111, 23.57705,11,'https://media.istockphoto.com/photos/twinhearts-stone-weir-in-penghu-beach-taiwan-picture-id1003608524?k=20&m=1003608524&s=612x612&w=0&h=NIlMhI-NYEf1nEOQdyZPMq_sx6--LE4D3Y2BbzwOTKo='),
	(9,'金門', 'KinMen', 118.37337, 24.45375,11,'https://kinmen.travel/attractions/20858/1024x768_attractions-image-sdnlufaa10aus_22uyzoia.jpg'),
    (10,'馬祖', 'MaTsu', 119.93443, 26.15741,13,'https://www.matsu-nsa.gov.tw/FileArtPic.ashx?id=3008&w=640&h=680')
;

DROP TABLE IF EXISTS `gender`;
CREATE TABLE `gender` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
);
INSERT INTO `gender` (`id`, `name`)
VALUES
	(1,'限女'),
	(2,'限男'),
    (3,'不限性別')
;

DROP TABLE IF EXISTS `host_vacants`;
CREATE TABLE `host_vacants` (
  `vacant_id` int unsigned NOT NULL AUTO_INCREMENT,
  `host_id` bigint unsigned NOT NULL,
  `vacant_start_date` varchar(100) DEFAULT NULL,
  `vacant_end_date` varchar(100) DEFAULT NULL,
  `vacant_count` int unsigned NOT NULL,
  PRIMARY KEY (`vacant_id`)
);
INSERT INTO `host_vacants` (`host_id`, `vacant_start_date`, `vacant_end_date`, `vacant_count`)
VALUES
	 (1, '20220701', '20220731', 2),
	 (1, '20220801', '20220831', 3)
;
    
DROP TABLE IF EXISTS `host_images`;
CREATE TABLE `host_images` (
  `image_id` int unsigned NOT NULL AUTO_INCREMENT,
  `host_id` bigint unsigned NOT NULL,
  `host_image` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`image_id`)
);
INSERT INTO `host_images` (`host_id`, `host_image`)
VALUES
	(1, 'path/image/my first host');

DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
  `comment_id` int unsigned NOT NULL AUTO_INCREMENT,
  `host_id` bigint unsigned NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  `content` varchar(255) DEFAULT NULL,
  `create_time` DATETIME  NOT NULL,
  PRIMARY KEY (`comment_id`)
);
INSERT INTO `comments` (`host_id`, `user_id`, `content`, `create_time`)
VALUES
    (1,1, 'my first comment to my first host','2022-06-22 00:00:00'),
    (1,1, 'my second comment to my first host','2022-06-22 00:00:00'),
    (1,1, 'my third comment to my first host','2022-06-22 00:00:00'),
    (2,1, 'my first comment to my second host','2022-06-22 00:00:00')
    ;

DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
);
INSERT INTO `role` (`id`, `name`)
VALUES
	(1,'admin'),
	(2,'host'),
    (3,'user');
    
DROP TABLE IF EXISTS `user_table`;
CREATE TABLE `user_table` (
  `user_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `role_id` int unsigned DEFAULT NULL,
  `provider` varchar(15) NOT NULL,
  `email` varchar(63) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `name` varchar(127) NOT NULL,
  `picture` varchar(511) DEFAULT NULL,
  `introduction` varchar(511) DEFAULT NULL,
  `access_token` varchar(511) NOT NULL DEFAULT '',
  `access_expired` bigint unsigned NOT NULL,
  `login_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  KEY `user_table` (`provider`,`email`,`password`),
  KEY `access_token` (`access_token`),
  KEY `role_id` (`role_id`),
  FOREIGN KEY (`role_id`) REFERENCES `role` (`id`)
);
INSERT INTO `user_table` (`role_id`, `provider`, `email`, `password`, `name`, `picture`, `introduction`, `access_token`, `access_expired`, `login_at`)
VALUES 
	( 1, 'native', 'admin@gmail.com', '123456', 'WorkExchangeTaiwanAdmin', 'picture', 'my_first_user_introduction', 'access_token', 2592000, '2022-06-13 00:00:00');

  DROP TABLE IF EXISTS `user_detail`;  
DROP TABLE IF EXISTS `likes`;
CREATE TABLE `likes` (
  `user_id` bigint unsigned NOT NULL,
  `host_id` bigint unsigned NOT NULL
);
INSERT INTO `likes` (`user_id`, `host_id`)
VALUES 
	(1, 2),
    (1, 3),
    (2, 2),
    (2, 3);
    
