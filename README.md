# SkillStreet_Backend_Assessment


## Prerequisites

Before running the application, make sure you have the following installed:

- Node
  
## To run this application in your local machine

 1) Clone this repository into yyour system
 2) Open the project in any IDE
 3) In the root folder create a file ".env"
 4) In the .env file write the followig information
     PORT= your desired port to run this application
     MONGO_URL="your mongodb uri"
     CODE="Your jwt secret"
 5) Open the terminal in the root folder of your project
 6) Type the command "npm install" to install all the dependencies
 7) To run the application run command "npm start"

 ## API Documentation 

   USER AUTH API's

1) REGISTER USER
   POST    "/api/user/register"  
   **request format** : {"username":"your user name","email":"your emal","password":"your password"}    
   **response format**: If any error in the request returns Http status code 400 with the error message.  
                    If Success returns Http status code 201 and the created User.


2) LOGIN USER
   POST    "/api/user/login"  
   **request format** : {"email":"your emal","password":"your password"}    
   **response format**: If any error in the request returns Http status code 400 with the error message.  
                    If Success returns Http status code 200 and the jwt token and the expiry time.



   NOTES API's

   Remember to pass the token obtained in the login in as the Authorisation token in all the below requests


3) ADD NOTE
   POST    "/api/notes/add-notes"  
  **request format** : {"title":"title of you note","content":"content of your note"}    
   **response format**: If any error in the request returns Http status code 400 with the error message.  
                    If Success returns Http status code 201 and the created Note.   

4) GET NOTE
   GET    "/api/notes/get-notes"  
   **response format**: If any error in the request returns Http status code 404 with the error message.  
                    If Success returns Http status code 200 and all the Notes of th user.     

5) GET NOTE BY ID
   GET     "/api/notes/get-notes/id of your note"   
   **response format**: If any error in the request returns Http status code 404 with the error message.  
                    If Success returns Http status code 200 and the Note.     

6) UPDATE  NOTE
   PUT    "/api/notes/add-notes/id of the note you want to update"  
   **request format** : {"title":"updated title of you note","content":"updated content of your note"}    
   **response format**: If any error in the request returns Http status code 404 with the error message.  
                    If Success returns Http status code 201 and the updated Note.  

7) DELETE NOTE
   DELETE    "/api/notes/get-notes/id of the note you want to delete"    
   **response format**: If any error in the request returns Http status code 404 with the error message.    
                    If Success returns Http status code 200 and the success message.


## Error Handling

The application handles errors and returns appropriate HTTP status codes in case of invalid requests or other errors.

 ## Author 
Manoj A N
