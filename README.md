# Land Registry Dapp

<div align="center">
  <a href="https://github.com/chiemezie1/landregistry.git">
    <img src="docs/images/logo.png" alt="Logo" width="80" height="80">
  </a>
  <h3 align="center">Land Registry Dapp</h3>
  <p align="center">
    A decentralized application for managing land registry powered by Cartesi rollups technology.
  </p>
</div>

## About

The Land Registry Dapp is a decentralized application (dapp) powered by [Cartesi](https://docs.cartesi.io/cartesi-rollups/1.3/) rollups technology. It allows users to register land, put land on sale, update land details, and manage land ownership on the blockchain. The dapp ensures ownership assurance, secure and reliable transactions, and leverages a decentralized network for data integrity.

## Use Cases

### For Agencies and Offices in Charge of Land

- **Land Ownership Verification**: Agencies can use this dapp to help individuals identify genuine land owners and detect fake owners.
- **Land History Tracking**: Offices can access the entire history of a piece of land, including past transactions and ownership changes.
- **Secure Land Transactions**: Facilitate secure and transparent land transactions, reducing the risk of fraud.
- **Public Access**: Provide a platform for the public to verify land ownership and details before purchasing or engaging in any transaction.
- **Public Access**: Provide a platform for the public to verify land ownership and details before purchasing or engaging in any transaction.

## Getting Started

Follow these instructions to set up and run the Land Registry Dapp locally.

### Prerequisites

Ensure you have the following software installed on your system:

- [Node.js](https://nodejs.org/en)
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable) or [npm](https://docs.npmjs.com/cli/v10/configuring-npm/install)
- [Docker](https://docs.docker.com/get-docker/)
- [Cartesi CLI](https://docs.cartesi.io/cartesi-rollups/1.3/development/migration/#install-cartesi-cli)

Install Cartesi CLI globally:

```
npm install -g @cartesi/cli
```

### Installation

1. Clone the repository:
    
    ```
    git clone https://github.com/chiemezie1/land-registry-dapp.git
    cd land-registry-dapp
    ```
    
2. Install the dependencies:
    
    ```
    yarn install
    ```
    
    or
    
    ```
    npm install
    ```
    
3. Build the project:
    
    ```
    yarn build
    ```
    
    or
    
    ```
    npm run build    
    ```
    

## Usage

### Running the Application

1. Build the Cartesi backend:
    
    ```
    cartesi build    
    ```
    
2. Run the Cartesi backend node:
    
    ```
    cartesi run    
    ```
    

### Sending Requests

Open a new terminal window to send requests to the Cartesi rollup server.

- **Create Land**
    
    ```
    cartesi send generic --input='{"method": "createLand", "data": {"location": "New York", "price": 1000, "details": {"size": "100 acres"}}}'    
    ```
    
- **Sale Land**
    
    ```
    cartesi send generic --input='{"method": "saleLand", "data": {"id": "land-id", "newOwner": "0xNewOwnerAddress"}}'    
    ```
    
- **Put Land on Sale**
    
    ```
    cartesi send generic --input='{"method": "putLandOnSale", "data": {"landId": "land-id", "price": 2000}}'    
    ```
    
- **Remove Land from Sale**
    
    ```
    cartesi send generic --input='{"method": "removeLandFromSale", "data": {"landId": "land-id"}}'    
    ```
    
- **Update Land Details**
    
    ```
    cartesi send generic --input='{"method": "updateLandDetails", "data": {"landId": "land-id", "newDetails": {"size": "120 acres"}}}'    
    ```
    
- **Get Land Details**
    
    ```
    cartesi send generic --input='{"method": "getLandDetails", "data": {"landId": "land-id"}}'    
    ```
    
- **Get All Land**
    
    ```
    cartesi send generic --input='{"method": "getAllLand"}'    
    ```
    

## Project Structure

Here's an overview of the project structure:

```
 src
    ├── controller
    │   ├── index.js
    │   ├── land.js
    ├── model
    │   ├── land.js
    ├── shared
    │   ├── config.js
    │   ├── rollup-state-handler.js
    ├── storage
    │   ├── land.js
    ├── index.js
    └── README.md

```

## Files

- **controller/index.js**: Entry point for the controller, handling different actions.
- **controller/land.js**: Controller logic for land-related actions.
- **model/land.js**: Land model representing the land entity.
- **shared/config.js**: Configuration file for shared constants.
- **shared/rollup-state-handler.js**: Handler for Rollup state actions.
- **storage/land.js**: Storage class for managing land data.
- **index.js**: Main entry point for the application.

## Contributing

We welcome contributions from the community! If you'd like to contribute to the Land Registry Dapp, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them with descriptive commit messages.
4. Push your changes to your forked repository.
5. Submit a pull request to the main repository.

Please ensure that your code adheres to the project's coding standards and includes appropriate tests.

## License

This project is released under the MIT License.

## Acknowledgments

The Land Registry Dapp is built on top of the Cartesi platform and utilizes various open-source libraries and tools. We would like to express our gratitude to the developers and contributors of these projects.

---

<p align="right">(<a href="#readme-top">back to top</a>)</p>