// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LandRegistry {
    struct Land {
        uint256 id;
        string location;
        address owner;
        address[] previousOwners;
    }

    uint256 public landCounter;
    mapping(uint256 => Land) public lands;
    address public registrar;

    modifier onlyRegistrar() {
        require(msg.sender == registrar, "Only registrar can perform this action");
        _;
    }

    event LandRegistered(uint256 id, address owner);
    event LandTransferred(uint256 id, address from, address to);

    constructor() {
        registrar = msg.sender; // Set the contract deployer as the registrar
    }

    // Register new land with ID and location
    function registerLand(uint256 id, string memory location) public onlyRegistrar {
        require(lands[id].id == 0, "Land with this ID already exists");

        Land storage newLand = lands[id];
        newLand.id = id;
        newLand.location = location;
        newLand.owner = msg.sender;
        newLand.previousOwners.push(msg.sender);

        emit LandRegistered(id, msg.sender);
    }

    // Transfer ownership of a land
    function transferLand(uint256 id, address newOwner) public {
        Land storage land = lands[id];
        require(land.owner == msg.sender, "Only the owner can transfer the land");

        land.previousOwners.push(land.owner);
        land.owner = newOwner;

        emit LandTransferred(id, msg.sender, newOwner);
    }

    // Get land details
    function getLand(uint256 id) public view returns (string memory location, address owner, address[] memory previousOwners) {
        Land storage land = lands[id];
        return (land.location, land.owner, land.previousOwners);
    }

    // Set a new registrar
    function setRegistrar(address newRegistrar) public onlyRegistrar {
        registrar = newRegistrar;
    }
}
