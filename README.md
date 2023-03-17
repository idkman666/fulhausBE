## FulhausBE
#Fulhaus back end assignment

#To Run the application
- Clone the repo
- Open project folder in VS Code.
- While in VS code -> open terminal and run: npm start
- The server will start on http://localhost:5000
- Use postman to call api endpoints

#Endpoints

[POST]
http://localhost:5000/api/v1/acronym
- Endpoint to add acronym to database.
- Takes json data as payload.

[PATCH]
http://localhost:5000/api/v1/acronym/:acronymID
- Endpoint to modify data based on acronymID.

[DELETE]
http://localhost:5000/api/v1/acronym/:acronymID
- Endpoint to delete data based on acronymID.

[GET]
http://localhost:5000/api/v1/acronym?page=1&limit=10&search=:search
- Endpoint to retrieve all acronym data based on search parameters.
- Fuzzy search will try to match the search parameter with both acronym and definition.
- The response will be paginated with array of documents found in database that satisfies the condition. 



![image](https://user-images.githubusercontent.com/46905186/226065550-60821056-bfc7-42d4-8616-12172fbfcbef.png)
