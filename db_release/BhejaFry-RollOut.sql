CREATE TABLE interviewer (
	empid INT NOT NULL,
	name VARCHAR( 30 ) NOT NULL,
	CONSTRAINT pk_interviewer PRIMARY KEY (empid)
);
CREATE TABLE recruiter (
	empid INT NOT NULL,
	name VARCHAR( 30 ) NOT NULL,
	CONSTRAINT pk_recruiter PRIMARY KEY (empid)
);
CREATE TABLE users (
	empid INT NOT NULL,
	firstname VARCHAR( 20 ) NOT NULL,
	lastname VARCHAR( 20 ) NOT NULL,
	password VARCHAR( 20 ) NOT NULL,	
	CONSTRAINT pk_users PRIMARY KEY (empid)
);
CREATE TABLE status (
	id INT NOT NULL AUTO_INCREMENT,
	status_text VARCHAR( 30 ) NOT NULL,
	CONSTRAINT pk_status PRIMARY KEY (id)
);
CREATE TABLE roundOfInterview (
	id INT NOT NULL AUTO_INCREMENT,
	round_text VARCHAR( 30 ) NOT NULL,
	CONSTRAINT pk_round PRIMARY KEY (id)
);
CREATE TABLE modeOfInterview (
	id INT NOT NULL AUTO_INCREMENT,
	mode_text VARCHAR( 30 ) NOT NULL,
	CONSTRAINT pk_mode PRIMARY KEY (id)
);

CREATE TABLE interviewResponse (
	id INT NOT NULL,
	interviewer_1_id INT NOT NULL,
	interviewer_2_id INT NULL,
	recruiter_id INT NOT NULL,
	status_id INT NOT NULL,
	roundOfInterview_id INT NOT NULL,
	modeOfInterview_id INT NOT NULL,	
	interviewResponse_text VARCHAR( 100 ) NOT NULL,
	CONSTRAINT pk_interviewResponse PRIMARY KEY (id)
);

ALTER TABLE interviewResponse ADD CONSTRAINT fk_IR_interviewer_1 FOREIGN KEY (interviewer_1_id) REFERENCES interviewer( empid ) ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE interviewResponse ADD CONSTRAINT fk_IR_interviewer_2 FOREIGN KEY (interviewer_2_id) REFERENCES interviewer( empid ) ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE interviewResponse ADD CONSTRAINT fk_IR_recruiter FOREIGN KEY (recruiter_id) REFERENCES recruiter( empid ) ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE interviewResponse ADD CONSTRAINT fk_IR_status FOREIGN KEY (status_id) REFERENCES status( id ) ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE interviewResponse ADD CONSTRAINT fk_IR_round FOREIGN KEY (roundOfInterview_id) REFERENCES roundOfInterview( id ) ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE interviewResponse ADD CONSTRAINT fk_IR_mode FOREIGN KEY (modeOfInterview_id) REFERENCES modeOfInterview( id ) ON DELETE NO ACTION ON UPDATE NO ACTION;
 
INSERT INTO `interviewer`(`empid`, `name`) VALUES (7601,'Saju Sasidharan');
INSERT INTO `interviewer`(`empid`, `name`) VALUES (7559,'Ajay Pawar');
INSERT INTO `interviewer`(`empid`, `name`) VALUES (9484,'Ashish Kumar Thawait');
INSERT INTO `interviewer`(`empid`, `name`) VALUES (4593,'Bhushan Joshi'); 
INSERT INTO `interviewer`(`empid`, `name`) VALUES (7988,'Gandharva Jadhav');
INSERT INTO `interviewer`(`empid`, `name`) VALUES (9761,'Hardik Joshi');
INSERT INTO `interviewer`(`empid`, `name`) VALUES (6536,'Jatin Patel');
INSERT INTO `interviewer`(`empid`, `name`) VALUES (6672,'Jaydeep Tank'); 
INSERT INTO `interviewer`(`empid`, `name`) VALUES (6865,'Mahesh Sapkal');
INSERT INTO `interviewer`(`empid`, `name`) VALUES (8679,'Manasi Bhagwat');
INSERT INTO `interviewer`(`empid`, `name`) VALUES (7736,'Mayur Thakor');
INSERT INTO `interviewer`(`empid`, `name`) VALUES (8119,'Navneet Shrivastava'); 
INSERT INTO `interviewer`(`empid`, `name`) VALUES (4996,'Nishant Joshi');
INSERT INTO `interviewer`(`empid`, `name`) VALUES (6587,'Omkar Kulkarni');
INSERT INTO `interviewer`(`empid`, `name`) VALUES (7087,'Pravin Sonawane');
INSERT INTO `interviewer`(`empid`, `name`) VALUES (8101,'Shashank Lakhotia'); 
INSERT INTO `interviewer`(`empid`, `name`) VALUES (8972,'Snehal Bhapkar');
INSERT INTO `interviewer`(`empid`, `name`) VALUES (10353,'Sonam Diwate');
INSERT INTO `interviewer`(`empid`, `name`) VALUES (9554,'Swapna Purohit');
INSERT INTO `interviewer`(`empid`, `name`) VALUES (6895,'Basavraj Keshatti');
INSERT INTO `interviewer`(`empid`, `name`) VALUES (6735,'Ram Joshi');
INSERT INTO `interviewer`(`empid`, `name`) VALUES (5995,'Satvashil Jagtap');
INSERT INTO `interviewer`(`empid`, `name`) VALUES (11509,'Shravan Khare');
INSERT INTO `interviewer`(`empid`, `name`) VALUES (3279,'Abhijit Sagade');
INSERT INTO `interviewer`(`empid`, `name`) VALUES (5421,'Ajay Sajwan');
INSERT INTO `interviewer`(`empid`, `name`) VALUES (5042,'Amarendra Samal');
INSERT INTO `interviewer`(`empid`, `name`) VALUES (2762,'Ashish Chandugade');
INSERT INTO `interviewer`(`empid`, `name`) VALUES (3508,'Awesh Shrivastava');
INSERT INTO `interviewer`(`empid`, `name`) VALUES (5470,'Dhritee Rathore');
INSERT INTO `interviewer`(`empid`, `name`) VALUES (1967,'Kamlesh Gaikwad');
INSERT INTO `interviewer`(`empid`, `name`) VALUES (5689,'Kumar Kundan');
INSERT INTO `interviewer`(`empid`, `name`) VALUES (3937,'Prachi Bhruguwar');
INSERT INTO `interviewer`(`empid`, `name`) VALUES (4573,'Rakesh Thakor');
INSERT INTO `interviewer`(`empid`, `name`) VALUES (3667,'Sachin Shinde');
INSERT INTO `interviewer`(`empid`, `name`) VALUES (6815,'Shruti Kshatriya');
INSERT INTO `interviewer`(`empid`, `name`) VALUES (6817,'Sudhir Nair');
INSERT INTO `interviewer`(`empid`, `name`) VALUES (2435,'Vishal Chauhan');
INSERT INTO `interviewer`(`empid`, `name`) VALUES (4003,'Yogesh Gaikwad');
INSERT INTO `interviewer`(`empid`, `name`) VALUES (5426,'Yogesh Kodarkar');

INSERT INTO `recruiter`(`empid`, `name`) VALUES (9846,'Abhinav Dingre');
INSERT INTO `recruiter`(`empid`, `name`) VALUES (9758,'Amit Jain');
INSERT INTO `recruiter`(`empid`, `name`) VALUES (9989,'Amruta Devale');
INSERT INTO `recruiter`(`empid`, `name`) VALUES (8063,'Amruta Joshi');
INSERT INTO `recruiter`(`empid`, `name`) VALUES (9637,'Deepika Gupta');
INSERT INTO `recruiter`(`empid`, `name`) VALUES (9495,'Jitin Naidu');
INSERT INTO `recruiter`(`empid`, `name`) VALUES (10344,'Ketaki Hebalkar');
INSERT INTO `recruiter`(`empid`, `name`) VALUES (7461,'Ketan Simant');
INSERT INTO `recruiter`(`empid`, `name`) VALUES (10772,'Kina Pandya');
INSERT INTO `recruiter`(`empid`, `name`) VALUES (6523,'Kirti Namjoshi');
INSERT INTO `recruiter`(`empid`, `name`) VALUES (10035,'Mavish Ajaney');
INSERT INTO `recruiter`(`empid`, `name`) VALUES (11337,'Parul Shrivastav');
INSERT INTO `recruiter`(`empid`, `name`) VALUES (4118,'Pooja Walia Garde');
INSERT INTO `recruiter`(`empid`, `name`) VALUES (6201,'Prakash Vachhani');
INSERT INTO `recruiter`(`empid`, `name`) VALUES (10859,'Raj Pillai');
INSERT INTO `recruiter`(`empid`, `name`) VALUES (2635,'Shwetambari Salgar');
INSERT INTO `recruiter`(`empid`, `name`) VALUES (3915,'Vikram Chopra');


INSERT INTO `users`(`empid`, `firstname`,`lastname`,`password`) VALUES (7601,'Saju', 'Sasidharan','sajus');
INSERT INTO `users`(`empid`, `firstname`,`lastname`,`password`) VALUES (7602,'Ashwin', 'Hegde','ashwinh');

INSERT INTO `status`(`status_text`) VALUES ('Rejected');
INSERT INTO `status`(`status_text`) VALUES ('Call for F2F round');
INSERT INTO `status`(`status_text`) VALUES ('OnHold');
INSERT INTO `status`(`status_text`) VALUES ('Selected');

INSERT INTO `roundOfInterview`(`round_text`) VALUES ('1');
INSERT INTO `roundOfInterview`(`round_text`) VALUES ('2');
INSERT INTO `roundOfInterview`(`round_text`) VALUES ('3');
INSERT INTO `roundOfInterview`(`round_text`) VALUES ('Final');

INSERT INTO `modeOfInterview`(`mode_text`) VALUES ('Telephonic');
INSERT INTO `modeOfInterview`(`mode_text`) VALUES ('VC/Skype');
INSERT INTO `modeOfInterview`(`mode_text`) VALUES ('Personal');




 


