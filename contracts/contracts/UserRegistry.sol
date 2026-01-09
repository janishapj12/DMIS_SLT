// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserRegistry {
    struct User {
        string username;
        string email;
        string fullName;
        address walletAddress;
        string role;
        bool exists;
    }

    mapping(address => User) public users;

    event UserRegistered(address indexed wallet, string username, string email, string role);
    event UserUpdated(address indexed wallet, string username, string email, string role);

    // WalletAddress + Email auto-assigned (sender msg.sender + backend)
    function registerUser(
        string memory _username,
        string memory _email,
        string memory _fullName,
        string memory _role
    ) public {
        require(!users[msg.sender].exists, "User already registered");

        users[msg.sender] = User({
            username: _username,
            email: _email,
            fullName: _fullName,
            walletAddress: msg.sender,
            role: _role,
            exists: true
        });

        emit UserRegistered(msg.sender, _username, _email, _role);
    }

    function updateUser(
        string memory _username,
        string memory _email,
        string memory _fullName,
        string memory _role
    ) public {
        require(users[msg.sender].exists, "User not found");

        users[msg.sender].username = _username;
        users[msg.sender].email = _email;
        users[msg.sender].fullName = _fullName;
        users[msg.sender].role = _role;

        emit UserUpdated(msg.sender, _username, _email, _role);
    }

    function getUser(address _wallet) public view returns (
        string memory, string memory, string memory, string memory, bool
    ) {
        User memory u = users[_wallet];
        return (u.username, u.email, u.fullName, u.role, u.exists);
    }
}
