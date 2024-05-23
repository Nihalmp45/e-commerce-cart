# E-Commerce Cart


### This is a mobile e-commerce application,The app allows users to browse products, view details, and add items to the cart.

## Techstack =>  React Native,Firebase(authentication) Apollo Client(GraphQL),combination of Tailwind CSS(native wind) and reactnative stylesheet,React-native-pager-view,react-native-toast-message

# Installation:
## 1) Clone the repository

 git clone https://github.com/Nihalmp45/e-commerce-cart.git

## 2) Navigate to the project directory

cd e-commerce-cart

## 3) Install dependencies

npm install

## 4)Start the development server

npm expo start or npm start

## 5) Start the App: Run the app on your emulator or physical device

npm run android 


# Project Details and Features =>

### App contain an Home page where user can signup or sign in with mail and password.The entire system is build using firbease.In the Home Page on the top there is Header Component with a logo and contact button. Then there is a banner which is swipable to see other banners.Then fetched different product collection using Appolo client to render them both horizontally and Vertically.On click of each product it navigate to the products Details page where user can see different variants by swiping right and left.Add to cart will give a toast message back to the user indicating the variant is added to cart.

Product Browsing: Users can explore a list of products with images and prices.

Product Details: Detailed view of each product with multiple variants and images.

Add to Cart: Easily add products to the shopping cart with a single tap which will display a toast message with product variant is added to cart.

Pagination: Smooth image swiping for product variants using react-native-pager-view.

GraphQL Integration: Fetch product data using Apollo Client and GraphQL from a mock API.

