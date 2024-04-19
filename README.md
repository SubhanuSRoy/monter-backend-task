# monter-backend-task
 monter backend task done by Subhanu Sankar Roy, for Backend Engineer Intern

## hosted API link
https://monter-backend-task-cjj5.onrender.com

## Postman collection link
https://www.postman.com/postman-resources/workspace/monter/collection/22489786-b7a8a8a3-9f30-45c4-b24a-2cf193b4f667?action=share&creator=22489786


## how to run server
- nodemon app.js
- add in .env 
> JWT_SECRET=QJx7E2z8jA3RbT9yP5sWvU1zC6yF4gH2
> MONGODB_URI=mongodb://localhost:27017/monter
> email and app-specific password
- mongo is set up locally

# Tasks completed
- Created basic node and express application
- connected to mongodb locally
- made user schema
- made route to register with email and password
- made email sender service using nodemailer
- implement OTP generation to verify email
- implement addition of info after verification
- add JWT token for login
- get user details from token in header
- testing
- documentation


## api/register
![/register working](images/register.png)

## unverified user added to mongo, hashed password
![unverified user added to mongo](images/unverified-mongo.png)

## OTP sent to email
![otp sent to email](images/otp-email.png)

## api/verify
![user verify route](images/user-verify-route.png)

## User verified on mongo
![user verified](images/user-verified-mongo.png)

## profile/addInfo
![add info](images/add-info-route.png)

## details added to mongo
![details added to mongo](images/add-info-mongo.png)

## jwt token generated on login
![jwt token generated on login](images/login-route.png)

## /user details with jwt token in header
![/user details with jwt token in header](images/get-user-details.png)