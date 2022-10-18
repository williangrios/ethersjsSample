// SPDX-License-Identifier: MIT

pragma solidity 0.8.7;

contract EthersJsConnection{
    string public name;

    function setName(string memory newName) public{
        name = newName;
    }
}

