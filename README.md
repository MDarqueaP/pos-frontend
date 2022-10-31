# POS Frontend

## Features

- Client entrypoint.

## Prerequisites

You need the following installations in your local machine to build and run the project:

| Dependency | URL |
| ------ | ------ |
|Nodejs >=17.6.0|https://nodejs.org/en/download/|
| Git | https://git-scm.com/downloads |

Also is necessary that the **authentication** and **backend** microservices are already running.

https://github.com/MDarqueaP/pos-backend

https://github.com/MDarqueaP/pos-authentication

To check if your installation is ok, use the following commands:
### Nodejs
```sh
node -v
```
### Git
```sh
git --version
```

## Build

To build the project use the following steps:

1) Clone the repository.
2) Enter to the cloned project directory using the command prompt.
3) Install all the project dependencies with:
    ```sh
    npm install
    ```
4) Build the project using the following command:
    ```sh
    npm run build
    ```
5) Inside the prohect directory go with your command prompt to the server folder, once inside install the server dependencies with:
    ```sh
    npm install
    ```
6) Once the server compilation has finished, run the project on your local machine with:
    ```sh
    npm run start
    ```
## Check if the project is running
To frontend project should be running in the following url:
**http://localhost:8083**

## Test users
SUPERADMIN (Has all routes access)

user: admin@mail.com

password: 12345

USER_ADMIN (Has access to manage all the users)

user: user.admin@mail.com

password: 12345

STORE_MANAGER (Has access to the products creation view and orders history)

user: store.manager@mail.com

password: 12345