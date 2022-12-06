# ![image](https://user-images.githubusercontent.com/68131808/197428685-6a21649f-c0a6-42b8-8b07-cb23fd29d72d.png)
# PhamBnb - a Phamily friendly clone of Airbnb.

Welcome to PhamBnb! This is a fully functional clone of the popular home-share website, AirBnb, developed by yours truly, Dion Pham. Please visit the [live](http://pham-bnb310.herokuapp.com/) link to this project here.

![image](https://user-images.githubusercontent.com/68131808/197274775-2e085b18-44da-456f-bf2b-7e69e464742c.png)

## Get Started
To run on a local host, clone the repository. In the root of the backend directory, create a .env file that is similar to the example .env file that is already present. In your terminal, run the following commands. 
``` js
npm install
cd backend/ 
npx dotenv sequelize db:migrate
npx dotenv sequelize-cli db:seed:all
npm start
```
Open up another terminal and run the following commands. 

``` js
cd ../frontend/
npm start
```

Please note that you must npm start in BOTH the backend and frontend directories - they must be running concurrently. 
PhamBnb should now launch in your default web browser. 

## Navigation
* Users are able to create an account or log in to an existing account. 

![image](https://user-images.githubusercontent.com/68131808/197426611-45acc985-8deb-4cf6-9dac-56155e54df7a.png)
![image](https://user-images.githubusercontent.com/68131808/197426627-747dfa30-3e9d-4f32-9604-96f74f5b6222.png)


* After successful signup or login, users are able to create a new listing by clicking the "Become a host" link in the upper right-hand corner. A page of all listings, as well as reviews, are shown on the account management page. 

![image](https://user-images.githubusercontent.com/68131808/197427605-197c9e79-7072-42f1-9d50-941dcdceb155.png)
![image](https://user-images.githubusercontent.com/68131808/197426530-029cd11f-46f7-46fb-966d-68cd4cbf4b06.png)

* Each listing has its own spot detail page. This page shows information about the listing including average rating, number of reviews, and pricing informaton. If a user does not own that spot, they are able to leave a review as well as delete the review. The average rating and number of reviews will update dynamically as the review is created/deleted. 

![image](https://user-images.githubusercontent.com/68131808/197428898-22da5e95-4bcc-49dc-a114-356dd70bc307.png)

* If a user owns that spot, they are able to edit its information by clicking on the edit button. 
![image](https://user-images.githubusercontent.com/68131808/197427054-1335bff3-bab6-4853-8094-972cf6d768d1.png)
![image](https://user-images.githubusercontent.com/68131808/197427088-a8afda42-bd70-457e-bb59-4f7918e52caf.png)


### [Backend API Routes ](https://github.com/dion-pham/airbnb-project/wiki/Backend-API-Routes---Database-Schema)
Click above to view the back RESTful endpoint documentation for server requests.

### [Database Schema](https://github.com/dion-pham/airbnb-project/wiki/Database-Schema)
Click above to view a visual diagram to the database schema.

### [Features List](https://github.com/dion-pham/airbnb-project/wiki/Features-List)
Click above for details of the features to be implemented in this clone.

### [Redux State Shape](https://github.com/dion-pham/airbnb-project/wiki/Redux-State-Shape)
Click above for redux state shape.

## Features to be implemented in the future
* CRUD (Create, Read, Update, Delete) feature for spot bookings. 

## Built with: 

Frameworks, platforms, and libaries

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)

Database:

![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

HOSTING:

![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)

## Contact Me: 
<div id="badges">
  <a href="https://www.linkedin.com/in/dinhan-dion-pham-9b4ab0152/">
    <img src="https://img.shields.io/badge/LinkedIn-blue?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn Badge"/>
  </a>
  <a href="https://github.com/dion-pham">
    <img src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white" alt="Github Badge"/>
  </a>
</div>
