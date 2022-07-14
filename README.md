# Work-Exchange-Taiwan

An interactive host-search website enable travellers to filter hosts and share work-exchange experience.

Link : https://work-exchange-taiwan.vercel.app/ ( Provide Google/ Facebook Login )

## Background

In Taiwan, work-exchange is a popular activities among collenge students and young adults. However, information about work-exchange in Taiwan is scattered on different platform on the Internet. Generally, hosts in Taiwan tend to post their work-exchage opportunities on Facebook Groups like 打工換宿瘋台灣(用專長改變台灣) and 台灣，以工換宿. Meanwhile, travellers need to check more information on other Facebook Groups like 【打工換宿．背包環島】小幫手背包客專區（經驗分享＆情報交流） or other social media platform like DCARD, PTT or other personal websites to find other travellers' experience in order to check whether it is a great opportunity.

To further arrange host information and travellers' experience, 窩踐 (Work-Exchange-Taiwan) is borned.

## Features

- Hosts can provide work-exchage opportunity detailed with host name, contact information, work-exchange description and images to attract travellers.

- Travellers can browse througe work-exchage opportunities in different locations in Taiwan and filter hosts by setting their own condition.

- Members can add to favorite before choosing which host to apply for, and share their work-exchange experience to help others to decide which hosts to choose.

## System Architecture
![System Architecture](https://user-images.githubusercontent.com/84711996/178910764-90b82e0c-f5ce-494a-8252-37853a1bedb7.png)

## Tech Stack

- Back-end: Node.js, Express.js, RESTful API, MVC

- Front-end: React.js, Next.js, ChakraUI, SweetAlert2

- Datebase: MySQL

- Cloud Service: AWS Elastic Compute Cloud (EC2), Amazon Relational Database Service (RDS) 

- Deploy: NGINX, Zero SSL

- 3rd Party API: Google Login/ Facebook Login/ Goole Maps API

## ToDo

- Front-end: RWD, host management page, user avatar upload

- Back-end: host management api, socket.io

- Cloud Service: change images storage location to AWS S3
