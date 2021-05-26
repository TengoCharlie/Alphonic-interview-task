# Alphonic-interview-task

### You have to create a Node ExpressJS API and test it using the Postman tool.

#### This app will have MongoDB connect and all the products will be saved in the "myDb" database.

1. `[POST] /api/v1/addProduct`  
    Fields:

   1. Name
   2. Price
   3. Description

2. `[GET] /api/v1/getProduct?id=<id of product>`

3. `[GET] /api/v1/getProducts`  
   this is will return all products

4. `[POST] /api/v1/updateProduct`  
   Fields:
   1. Name
   2. Price
   3. Description
   4. `\_id`

You need to create the POSTMAN collection so that it can be published for the front-end developers

# Solution

- `[POST] /api/v1/addProduct` = For adding data to collection.
- `[GET] /api/v1/getProduct?id=<id of product>` = For getting data for a particular id by using id as a query in URL.
- `[GET] /api/v1/getProducts` = For Getting all the data in the collection.
- `[POST] /api/v1/updateProduct/:id` = For updating data in collection , you have to pass `ObjectId` as a parameter.

## For run it on Development server

- Run `npm install` - to install all the dependencies
- Then Run `npm run dev`

### it will run on PORT 3000

### it uses local MongoDB server for Database

## For run it on Production server

- Run `npm install` - to install all the dependencies
- Then Run `npm start`

#### you have to change `MONGO_URL` and `PORT` in _.env_ file
