# REST API for a Clothing Store
This is the project of a REST API that will be used in a clothing store website

## Getting started
First you will need to have node installed on your computer.

* Clone this repo using `git clone https://github.com/ErickScur/API-clothing-store`
* Select the directory using `cd API-clothing-store`
* Install the dependecies using `npm install`
* Run the server using `npm start`

<br></br>

## API Endpoints

### GET /products
Returns all the products of the store
### Parameters:
* None
#### Responses:
##### Ok! 200
Your request was successfully accepted!
#### Response Example:
    {
    "products": [
        {
        "id": 30,
        "name": "ADIDAS T-SHIRT",
        "price": 4.41,
        "sizes": "P,M",
        "inventory": 4,
        "colors": "red,blue",
        "slug": "ADIDAS-T-SHIRT",
        "createdAt": "2021-10-18T21:47:05.000Z",
        "updatedAt": "2021-10-18T21:47:05.000Z",
        "categoryId": 1,
        "brandId": 1
        },
        {
        "id": 31,
        "name": "NIKE T-SHIRT",
        "price": 4.41,
        "sizes": "P,M",
        "inventory": 4,
        "colors": "red,blue",
        "slug": "NIKE-T-SHIRT",
        "createdAt": "2021-10-18T21:47:08.000Z",
        "updatedAt": "2021-10-18T21:47:08.000Z",
        "categoryId": 1,
        "brandId": 1
        }
    ],
    "_links": [
        {
        "href": "http://localhost:8080/product",
        "method": "POST",
        "rel": "create_new_product"
        }
    ]
    }  


### GET /product
Returns the product with the requested id
### Parameters:
* Id: The id of the Product
#### Responses
##### Ok! 200
Your request was successfully accepted.
##### Unprocessable Entity! 422
One ore more parameters are missing.
##### Not Found! 404
The API did not find a product with the requested id.
### POST /product
Stores a product into the database.
#### Parameters:
* Name: The name of the Product.
* Price: The price of the Product.
* Sizes (string)
* Inventory (number)
* Colors (string)
* CategoryID (number)
* BrandID (number)

#### Responses:
* Ok! 200
    * your request was successfully accepted!
* Forbidden! 403
    * a product with the same name already exists!
* Unprocessable Entity! 422
    * one ore more parameters are missing!
