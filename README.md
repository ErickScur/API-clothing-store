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
Return all the products of the store
### Parameters:
* None
#### Responses:
* Ok! 200
    * your request was successfully accepted!


### POST /product
Store a product into the database
#### Parameters:
* Name (string)
* Price (number)
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
* Unprocessable Entity
    * one ore more parameters are missing!
