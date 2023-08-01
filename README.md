

# E-commerce Store

This is an e-commerce store built with React, Next.js, MongoDB, and Razorpay. It also has Docker support.

## Technologies

- **React** is a JavaScript library for building user interfaces. It allows developers to create reusable UI components¹.
- **Next.js** is a React framework that enables developers to create full-stack web applications by extending the latest React features and integrating powerful JavaScript tooling for fast builds⁵.
- **MongoDB** is a distributed database that offers a flexible document data model along with support for ad-hoc queries, secondary indexing, and real-time aggregations to provide powerful ways to access and analyze data⁹.
- **Razorpay** is a payment solution in India that allows businesses to accept, process, and disburse payments with its product suite. It gives access to all payment modes including credit card, debit card, netbanking, UPI, and popular wallets¹².
- **Docker** is an open platform for developing, shipping, and running applications. It enables developers to separate their applications from their infrastructure so they can deliver software quickly¹⁶.

## Getting Started

To get started with this project, you'll need to have the following installed on your local machine:

- Node.js
- MongoDB
- Docker (optional)

Once you have these installed, you can clone this repository and navigate to the project directory. Then, run the following command to install the dependencies:

```
npm install
```

After the dependencies are installed, you can start the development server by running:

```
npm run dev
```

This will start the development server on `http://localhost:3000`.

## Deployment

To deploy this project, you can use Docker to build and run a container. First, build the Docker image by running:

```
docker build -t ecommerce-store .
```

Once the image is built, you can run a container using the following command:

```
docker run -p 3000:3000 ecommerce-store
```

This will start a container and map port 3000 of the container to port 3000 of your local machine. You can then access the application at `http://localhost:3000`.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, feel free to fork this repository and submit a pull request.

## License

This project is licensed under the MIT License.

I hope this helps! Let me know if you need anything else 😊

Source: Conversation with Bing, 1/8/2023
(1) React. https://react.dev/.
(2) Next.js by Vercel - The React Framework. https://nextjs.org/.
(3) MongoDB: The Developer Data Platform | MongoDB. https://www.mongodb.com/.
(4) Razorpay - Best Payment Solution for Online Payments India. https://razorpay.com/.
(5) Docker: Accelerated, Containerized Application Development. https://www.docker.com/.
(6) React Tutorial - W3Schools. https://www.w3schools.com/react/.
(7) Introduction to React - W3Schools. https://www.w3schools.com/react/react_intro.asp.
(8) What Is React? - Codecademy. https://www.codecademy.com/resources/blog/what-is-react/.
(9) Docs | Next.js. https://nextjs.org/docs.
(10) What Is Next.js? A Look at the Popular JavaScript Framework - Kinsta. https://kinsta.com/knowledgebase/next-js/.
(11) Next.js Introduction - GeeksforGeeks. https://www.geeksforgeeks.org/next-js-introduction/.
(12) Download MongoDB Community Server | MongoDB. https://www.mongodb.com/try/download/community.
(13) What Is MongoDB? | MongoDB. https://www.mongodb.com/what-is-mongodb.
(14) Razorpay Dashboard. https://dashboard.razorpay.com/.
(15) What is Razorpay? How does Razorpay Work? - The CEO Magazine India. https://www.theceo.in/best-software-for-your-business/what-is-razorpay-how-does-razorpay-work.
(16) Best Payment Gateway in India - Manage Online Payments - Razorpay. https://razorpay.com/payment-gateway/.
(17) Download Docker Desktop | Docker. https://www.docker.com/products/docker-desktop/.
(18) What is Docker? | IBM. https://www.ibm.com/topics/docker.
(19) Docker overview | Docker Documentation. https://docs.docker.com/get-started/overview/.
