# REST API for a Clothing Store
This is the project of a REST API that will be used in a clothing store website.

## Getting started
First you will need to have node installed on your computer.

* Clone this repo using `git clone https://github.com/ErickScur/API-clothing-store`;
* Select the directory using `cd API-clothing-store`;
* Install the dependecies using `npm install`;
* Run the server using `npm start`;

<br></br>

## API Endpoints

### GET /products/page?
Returns the store's products with a pagination of 10 items
#### Parameters:
* Page (optional)
#### Responses:
##### Ok! 200
Your request was successfully accepted.
#### Not Found! 404
The API did not find any product on this page.

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
            "href": "http://localhost:8080/products/2",
            "method": "GET",
            "rel": "next_page"
        },
        {
            "href": "http://localhost:8080/product",
            "method": "POST",
            "rel": "create_new_product"
        }
    ]
    }  


### GET /product/slug
Returns the product with the requested slug.
#### Parameters:
* Slug: The slug of the Product.

#### Responses
##### Ok! 200
Your request was successfully accepted.
##### Unprocessable Entity! 422
One ore more parameters are missing.
##### Not Found! 404
The API did not find a product with the requested slug.
#### Response Example
    {
    "product": {
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
    "_links": [
        {
            "href": "http://localhost:8080/product/30",
            "method": "DELETE",
            "rel": "delete_product"
        },
        {
            "href": "http://localhost:8080/product",
            "method": "POST",
            "rel": "create_new_product"
        },
        {
            "href": "http://localhost:8080/product/30",
            "method": "PUT",
            "rel": "update_product"
        },
        {
            "href": "http://localhost:8080/product/ADIDAS-T-SHIRT",
            "method": "GET",
            "rel": "get_product"
        },
        {
            "href": "http://localhost:8080/products",
            "method": "GET",
            "rel": "get_all_products"
        }
    ]
    }





### POST /product
Stores a product into the database.
#### Parameters:
* Name: The name of the Product.
* Price: The price of the Product.
* Sizes: A string with the avaliable sizes, separated with comma.
* Inventory: The quantity available in stock of the product.
* Colors: A string with the avaliable colors, separated with comma.
* CategoryID: The id of the Category.
* BrandID: The id of the Brand.
* Images: The API can handle multiple image files using a middleware.

#### Request Example:
    {
        "name":"Air Force 1",
        "price":4.41,
        "sizes": "P,M",
        "inventory":4,
        "colors" : "red,blue",
        "categoryId":1,
        "brandId":1
    }
#### Responses:
##### Ok! 200
Your request was successfully accepted.
##### Unprocessable Entity! 422
One ore more parameters are missing.
##### Forbidden! 403
A product with the same name already exists!
#### Response Example:
    {
    "product": {
        "id": 33,
        "name": "AIR FORCE 1",
        "price": 4.41,
        "sizes": "P,M",
        "inventory": 4,
        "colors": "red,blue",
        "categoryId": 1,
        "brandId": 1,
        "slug": "AIR-FORCE-1",
        "updatedAt": "2021-10-18T21:50:11.054Z",
        "createdAt": "2021-10-18T21:50:11.054Z"
    },
    "_links": [
        {
        "href": "http://localhost:8080/product/33",
        "method": "DELETE",
        "rel": "delete_product"
        },
        {
        "href": "http://localhost:8080/product",
        "method": "POST",
        "rel": "create_new_product"
        },
        {
        "href": "http://localhost:8080/product/33",
        "method": "PUT",
        "rel": "update_product"
        },
        {
        "href": "http://localhost:8080/product/AIR-FORCE-1",
        "method": "GET",
        "rel": "get_product"
        },
        {
        "href": "http://localhost:8080/products",
        "method": "GET",
        "rel": "get_all_products"
        }
    ]
    }
