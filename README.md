

# E-commerce Store

This is an e-commerce store built with React, Next.js, MongoDB, Razorpay, and Tailwind CSS. It also has Docker support.

## Technologies

- **React** is a JavaScript library for building user interfaces. It allows developers to create reusable UI components.
- **Next.js** is a React framework that enables developers to create full-stack web applications by extending the latest React features and integrating powerful JavaScript tooling for fast builds.
- **MongoDB** is a distributed database that offers a flexible document data model along with support for ad-hoc queries, secondary indexing, and real-time aggregations to provide powerful ways to access and analyze data.
- **Razorpay** is a payment solution in India that allows businesses to accept, process, and disburse payments with its product suite. It gives access to all payment modes including credit card, debit card, netbanking, UPI, and popular wallets.
- **Tailwind CSS** is a utility-first CSS framework that provides a set of pre-defined CSS classes for styling HTML elements. It allows developers to quickly build custom designs by composing these classes.
- **Docker** is an open platform for developing, shipping, and running applications. It enables developers to separate their applications from their infrastructure so they can deliver software quickly.

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

