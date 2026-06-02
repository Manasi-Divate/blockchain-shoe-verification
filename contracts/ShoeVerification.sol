// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract ShoeVerification {

    struct Shoe {
        uint256 productId;
        string name;
        string brand;
        string manufacturer;
        string distributor;
        string retailer;
        string status;
        string metadataURI;
        bool isVerified;
    }

    mapping(uint256 => Shoe) public shoes;

    function registerProduct(
        uint256 _productId,
        string memory _name,
        string memory _brand,
        string memory _manufacturer,
        string memory _metadataURI
    ) public {
        shoes[_productId] = Shoe(
            _productId,
            _name,
            _brand,
            _manufacturer,
            "",
            "",
            "Manufactured",
            _metadataURI,
            true
        );
    }

    function updateDistributor(
        uint256 _productId,
        string memory _distributor
    ) public {
        require(shoes[_productId].isVerified == true, "Product not registered");

        shoes[_productId].distributor = _distributor;
        shoes[_productId].status = "Shipped to Distributor";
    }

    function updateRetailer(
        uint256 _productId,
        string memory _retailer
    ) public {
        require(shoes[_productId].isVerified == true, "Product not registered");

        shoes[_productId].retailer = _retailer;
        shoes[_productId].status = "Available at Retailer";
    }

    function verifyProduct(
        uint256 _productId
    ) public view returns (
        uint256,
        string memory,
        string memory,
        string memory,
        string memory,
        string memory,
        string memory,
        string memory,
        bool
    ) {
        Shoe memory shoe = shoes[_productId];

        return (
            shoe.productId,
            shoe.name,
            shoe.brand,
            shoe.manufacturer,
            shoe.distributor,
            shoe.retailer,
            shoe.status,
            shoe.metadataURI,
            shoe.isVerified
        );
    }
}