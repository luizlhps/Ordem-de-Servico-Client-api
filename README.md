# Record your services Orders

![services Orders Demo](https://storage.googleapis.com/loustech-site.appspot.com/OrderDemo.gif)

Record your services order, manage  your team, manage transactions, and more.



## Features

- Easily search for customers, orders, transactions, and work employee details.
- Create and manage customer profiles, service orders, transactions, and employee details.
- Visualize business data through informative charts.
- Generate and print service order documents.
- Efficiently manage financial transactions.

## Getting Started

To run the application locally and take a closer look, follow these steps:

Create a .env file and add 

PORT=8000
BUCKET = "your bucket firebase"
TOKEN_SECRET = anything token string
DISK = "firebase"  // firebase or localhost 

FIREBASE_CLIENT_EMAIL = "firebase-adminsd"
FIREBASE_PRIVATE_KEY = "-----BEGIN PRIVATE KEY----------END PRIVATE KEY-----\n

DATABASE = "mongodb+srv://"    

FIREBASE_PROJECT_ID = "project_id"


```bash
# Clone the repository
git clone https://github.com/luizlhps/Ordem-de-Servico-Client-api

# Install dependencies
npm install

# Start the development server with hot reload
npm run start:dev
