# 

<a id="readme-top"></a>

---

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/your-username/landregistry-dapp">
    <img src="docs/images/logo.png" alt="Logo" width="80" height="80">
  </a>
  <h3 align="center">LandRegistry dApp</h3>
  <p align="center">
    The LandRegistry decentralized application (dApp) documentation.
  </p>
</div>

## About

<p>
    LandRegistry is a decentralized application (dApp) powered by <a href="https://docs.cartesi.io/cartesi-rollups/1.3/">Cartesi</a> Rollups technology.
</p>
<p> 
    This dApp provides a secure and decentralized platform for registering, managing, and transferring land ownership, leveraging the benefits of blockchain technology such as ownership assurance, tamper-proof records, and a decentralized network.
</p>

## Getting Started

Below you'll find instructions on how to set up this dApp locally.

### Prerequisites

Ensure the following packages are installed on your PC:

- [Node.js](https://nodejs.org/en), [npm](https://docs.npmjs.com/cli/v10/configuring-npm/install), [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable)
- [Docker](https://docs.docker.com/get-docker/)
- [Cartesi CLI](https://docs.cartesi.io/cartesi-rollups/1.3/development/migration/#install-cartesi-cli)
    
    ```
    npm install -g @cartesi/cli
    ```
    

### Installation

1. Clone this repo
    
    ```
    git clone https://github.com/chiemezie1/landregistry-dapp.git
    ```
    
2. Install NPM packages
    
    ```
    yarn install
    ```
    
3. Build and run the dApp via `cartesi-cli`and
    
    ```
    cartesi build
    ```
    
    ```
    cartesi run
    ```
    

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Usage

Here are examples of interacting with the dApp and consuming its resources.

### Advanced Handlers

- Register Land
    
    ```
      description — Register a new land with the specified details.
      param data — {location: string, price: number, details: object}
    ```
    
    data sample
    
    ```json
      {
          "action":"registerLand",
          "data":{
              "location":"123 Blockchain Lane",
              "price":1000,
              "details":{"area": "500 sq ft"}
          }
      }
    ```
    
    hex sample
    
    ```
    0x7b22616374696f6e223a2272656769737465724c616e64222c202264617461223a7b226c6f636174696f6e223a2231323320426c6f636b636861696e204c616e65222c20227072696365223a313030302c202264657461696c73223a7b2261726561223a22353030207371206674227d7d7d
    ```
    
    interact
    
    - *via `cartesi cli`*, in a terminal window:
    
    ```
    cartesi send generic \
        --dapp=0xab7528bb862fb57e8a2bcd567a2e929a0be56a5e \
        --chain-id=31337 \
        --rpc-url=http://127.0.0.1:8545 \
        --mnemonic-passphrase='test test test test test test test test test test test junk' \
        --input=0x7b22616374696f6e223a2272656769737465724c616e64222c202264617461223a7b226c6f636174696f6e223a2231323320426c6f636b636861696e204c616e65222c20227072696365223a313030302c202264657461696c73223a7b2261726561223a22353030207371206674227d7d7d
    
    ```
    
    - *via `cast`*, in a terminal window:
    
    ```
    cast send 0x59b22D57D4f067708AB0c00552767405926dc768 "addInput(address,bytes)" 0xab7528bb862fb57e8a2bcd567a2e929a0be56a5e 0x7b22616374696f6e223a2272656769737465724c616e64222c202264617461223a7b226c6f636174696f6e223a2231323320426c6f636b636861696e204c616e65222c20227072696365223a313030302c202264657461696c73223a7b2261726561223a22353030207371206674227d7d7d --mnemonic 'test test test test test test test test test test test junk'
    ```
    
- Sale Land
    
    ```
      description — Transfer ownership of land to a new owner.
      param data — {id: string, newOwner: address}
    ```
    
    data sample
    
    ```json
      {
          "action":"saleLand",
          "data":{
              "id":"d8c04a7b-e207-4dfb-a1d2-c64e9d09c9e5",
              "newOwner":"0xNewOwnerAddress"
          }
      }
    ```
    
    hex sample
    
    ```
    0x7b22616374696f6e223a2273616c654c616e64222c202264617461223a7b226964223a2264386330346137622d653230372d346466622d613164322d633634653964303963396535222c20226e65774f776e6572223a2230784e65774f776e657241646472657373227d7d
    ```
    
    interact
    
    - *via `cartesi cli`*, in a terminal window:
    
    ```
    cartesi send generic \
        --dapp=0xab7528bb862fb57e8a2bcd567a2e929a0be56a5e \
        --chain-id=31337 \
        --rpc-url=http://127.0.0.1:8545 \
        --mnemonic-passphrase='test test test test test test test test test test test junk' \
        --input=0x7b22616374696f6e223a2273616c654c616e64222c202264617461223a7b226964223a2264386330346137622d653230372d346466622d613164322d633634653964303963396535222c20226e65774f776e6572223a2230784e65774f776e657241646472657373227d7d
    ```
    
    - *via `cast`*, in a terminal window:
    
    ```
    cast send 0x59b22D57D4f067708AB0c00552767405926dc768 "addInput(address,bytes)" 0xab7528bb862fb57e8a2bcd567a2e929a0be56a5e 0x7b22616374696f6e223a2273616c654c616e64222c202264617461223a7b226964223a2264386330346137622d653230372d346466622d613164322d633634653964303963396535222c20226e65774f776e6572223a2230784e65774f776e657241646472657373227d7d --mnemonic 'test test test test test test test test test test test junk'
    ```
    

### Inspect Handlers

- getAllLands
    
    ```
      description — Get details of all registered lands.
    ```
    
    returned hex sample
    
    ```json
      {
          "status": "Accepted",
          "exception_payload": null,
          "reports": [
              {
                  "payload": "0x..."
              }
          ],
          "processed_input_count": 2
      }
    ```
    
    converted payload sample
    
    ```json
      [
          {
              "id":"d8c04a7b-e207-4dfb-a1d2-c64e9d09c9e5",
              "location":"123 Blockchain Lane",
              "price":1000,
              "onSale": false,
              "details": {"area": "500 sq ft"}
          }
      ]
    ```
    
    interact
    
    - access the Cartesi inspect endpoint in your browser
    
    ```
    http://localhost:8080/inspect/getAllLands
    ```
    
- getLandById
    
    ```
      description — Get details of a specific land by its ID.
      param data — land ID (UUID)
    ```
    
    returned hex sample
    
    ```json
      {
          "status": "Accepted",
          "exception_payload": null,
          "reports": [
    						{
                    "payload": "0x..."
                }
            ],
            "processed_input_count": 2
       }
    ```
    

converted payload sample

```json
 {
      "data": {
          "id": "d8c04a7b-e207-4dfb-a1d2-c64e9d09c9e5",
          "location": "123 Blockchain Lane",
          "price": 1000,
          "onSale": false,
          "details": {"area": "500 sq ft"}
      }
  }
```

    interact
    - access the Cartesi inspect endpoint in your browser

    ```
    http://localhost:8080/inspect/getLandById/$landId
    ```

    <p align="right">(<a href="#readme-top">back to top</a>)</p>

    ## Contributing

    We welcome contributions from the community! If you'd like to contribute to LandRegistry, please follow these steps:

    - Fork the repository.
    - Create a new branch for your feature or bug fix.
    - Make your changes and commit them with descriptive commit messages.
    - Push your changes to your forked repository.
    - Submit a pull request to the main repository.
    - Please ensure that your code adheres to the project's coding standards and includes appropriate tests.

    ## License

    LandRegistry is released under the MIT License.

    ## Acknowledgments

    LandRegistry is built on top of the Cartesi platform and utilizes various open-source libraries and tools. We would like to express our gratitude to the developers and contributors of these projects.

    <p align="right">(<a href="#readme-top">back to top</a>)</p>
    ```