# College Pathfinder

This is a README file for the project. It provides an overview of the project, installation instructions, and explanations of the project modules.

## Table of Contents

- [Installation](#installation)
- [Modules](#modules)
    - [Routes](#routes)
    - [Controllers](#UserControllers)

### Installation

To install and run this project, follow these steps:

1. Clone the repository: `git clone https://github.com/SmartCheese22/backend.git`
2. Change to the project directory: `cd project`
3. Install dependencies: `npm install`
4. Start the application: `npm start`

### UserControllers


The user controllers module handles the registration, login, and logout functionality for college going users. It includes the following controllers:

## `registerCollegeGoing`

This controller is responsible for registering a college going user. It expects the following fields in the request body:

- `name` (string): The name of the user.
- `username` (string): The username of the user.
- `password` (string): The password of the user.
- `email` (string): The email of the user.
- `college` (string): The name of the college the user is attending.
- `major` (string): The major of the user.
- `graduationYear` (number): The graduation year of the user.
- `opinion` (string): The user's opinion.

If any of the required fields are missing or empty, it will throw a `400 Bad Request` error. If the provided college name does not exist in the database, it will throw a `400 Bad Request` error. If the username or email already exists in the database, it will throw a `400 Bad Request` error. If the user is successfully registered, it will return a `201 Created` response with the registered user details (excluding the password) in the response body.

## `loginCollegeGoing`

This controller is responsible for logging in a college going user. It expects the following fields in the request body:

- `username` (string): The username of the user.
- `email` (string): The email of the user.
- `password` (string): The password of the user.

Either the `username` or `email` field is required, along with the `password` field. If both `username` and `password` are missing, it will throw a `400 Bad Request` error. If the user is not found in the database, it will throw a `404 Not Found` error. If the provided password is incorrect, it will throw a `401 Unauthorized` error. If the user is successfully logged in, it will return a `200 OK` response with the logged-in user details (excluding the password) and an access token in the response body. The access token is also set as an HTTP-only secure cookie named "accessToken".

## `logoutCollegeGoing`

This controller is responsible for logging out a college going user. It does not require any request body. It will clear the "accessToken" cookie and return a `200 OK` response with an empty response body.

Please refer to the controller code for more details on the implementation.



### Routes

The routes module handles the routing logic for the application. It defines the different endpoints and their corresponding handlers. Here are the routes defined in the `user.routes.js` file:

- `/registerCollegeGoing` - POST request to register a college going user
- `/registerCollegeSearching` - POST request to register a college searching user
- `/loginCollegeGoing` - POST request to login a college going user
- `/loginCollegeSearching` - POST request to login a college searching user
- `/loginAdmin` - POST request to login an admin user
- `/logoutAdmin` - POST request to logout an admin user
- `/logoutCollegeGoing` - POST request to logout a college going user (requires authentication)
- `/logoutCollegeSearching` - POST request to logout a college searching user (requires authentication)

Please refer to the `user.routes.js` file for more details on the implementation of these routes.


