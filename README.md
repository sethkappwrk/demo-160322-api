# demo-160322-api

## How to run this api server
  * Go to contants.js file in parent folder
  * Update MONGO_DB_URI with your own MongoDB server url and config
  * Open terminal in parent directory and run *yarn*
  * Once all the depedencies gets installed run *yarn dev*

### List of apis
  * *GET* http://localhost:5000/api/v1/contact/all
  * *POST* http://localhost:5000/api/v1/contact
  * *GET* http://localhost:5000/api/v1/contact/6231e01f252d2b86dce9bdab
  * *PUT* http://localhost:5000/api/v1/contact/6231e12301c8f07142e41b35
  * *DELETE* http://localhost:5000/api/v1/contact/6231e004252d2b86dce9bda9
  * *GET* http://localhost:5000/api/v1/contact/all?search=demo

  * POST and PUT payload
  {
    "name": "Test Contact Demo",
    "email": "testd@gmail.com",
    "country": "IN",
    "isActive": true
  }