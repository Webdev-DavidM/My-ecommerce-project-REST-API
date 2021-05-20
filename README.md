# Fitness e-commerce store

This e-commerce project provides the full functionality of a e-commerce website. I have created it as a personal project using the MERN tech stack, MongoDB, Express, Node and React.

## Images

![](/read-me-images/My-e-commerce-store.png )

![](/read-me-images/My-e-commerce-store-product-page.png ) ![](/read-me-images/My-e-commerce-store-shopping-basket.png )
 
## Video preview



## Features

### Front-end

- Four product filters connected to redux to allow the user to filter products based on various criteria.
- JWT tokens used to connect to the back-end and authenticate users.
- A user can refresh the shopping cart screen and their product remains due to user information stored in local storage.
- Reviews stored on the product in the mongoDB database give the product a rating, this can be expanded by clicking on the review section of the product page and it will show all the reviews.
- If a user is signed in they can complete an order which will be sent to the database and they can see this on their account screen.
- They can write a review for a product they have purchased and it will be visible on the product and alter its overall rating. If they have reviewed the product already the database will not allow this and an error message will be displayed.
- The product page displays the amount of items in stock for that product including their size, and it stops the user from selecting products out of stock or more than available.
- The window object calculates when the navbar has scrolled out of view and fades in a up arrow which takes them to the top of the page if clicked. This arrow fades out if they scroll up and the navbar is in view.
- The user can make adjustments to their shopping basket including changing the amount or deleting an item. If they try and increase the amount beyond what is it stock they get an error.
- NPM package CSS-Transition group has been used to fade in the menus and also reviews.
- The user can use the search bar to search items in the site.
- As administrator you can create, edit or delete items from the database

### Backend

- Authenticate the user with JWT tokens.
- Hashes the user password using Bcrypt.
- Various routes such as User, Orders and Products which provide user data.
- Administrator routes protected by checking on the server if the user has adminstrator rights.

## Technologies

### front-end

- React class based components
- State management using Redux  
- React transition group.   
- CSS modules used to separate the CSS.
- Developed from Sketch prototypes.
- Mobile first approach.
- Various NPM packages used- Bcrypt/ JWT tokens / Axios
- Front end hosted on github pages


### back-end

- Node server
- Express
- Mongo DB database
- Mongoose ORM used to communicate with the database
- Back end hosted on Heroku

## Live site

Please site can be found at the link below, logging as an administrator gives access to an admin screen where you can create, edit or delete products on the database and also access customer orders. For a full user experience please log in with the user details below or create an account which will saved to the server.

https://webdev-davidm.github.io/E-commerce-front-end/

Customer: username: footballblubber@googlemail.com, password: Technics1

Administrator: username: admin@company123.com, password: admin123

## Still to do

- Add stripe and paypal APIs to the checkout screen.




