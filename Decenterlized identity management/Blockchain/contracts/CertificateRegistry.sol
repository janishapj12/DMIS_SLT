// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CertificateRegistry {

    struct Certificate {
        string title;
        string ipfsHash; // assuming certificates are stored on IPFS
        uint256 timestamp;
        address uploadedBy;
        bool exists;
    }

    // Mapping from user email => Certificate array
    mapping(string => Certificate[]) private certificates;

    // Events
    event CertificateUploaded(string indexed email, string title, string ipfsHash, address indexed uploadedBy);
    event CertificateDeleted(string indexed email, string title, address indexed deletedBy);

    // Upload a new certificate
    function uploadCertificate(
        string memory _email,
        string memory _title,
        string memory _ipfsHash
    ) public {
        certificates[_email].push(Certificate({
            title: _title,
            ipfsHash: _ipfsHash,
            timestamp: block.timestamp,
            uploadedBy: msg.sender,
            exists: true
        }));

        emit CertificateUploaded(_email, _title, _ipfsHash, msg.sender);
    }

    // Get all certificates for a user
    function getCertificates(string memory _email) public view returns (Certificate[] memory) {
        return certificates[_email];
    }

    // Delete a certificate by index (only uploader can delete)
    function deleteCertificate(string memory _email, uint _index) public {
        require(_index < certificates[_email].length, "Invalid index");
        Certificate memory cert = certificates[_email][_index];
        require(cert.uploadedBy == msg.sender, "Not authorized to delete");

        // Move last element into the place of the deleted element
        certificates[_email][_index] = certificates[_email][certificates[_email].length - 1];
        certificates[_email].pop();

        emit CertificateDeleted(_email, cert.title, msg.sender);
    }

    // Get count of certificates for a user
    function getCertificateCount(string memory _email) public view returns (uint) {
        return certificates[_email].length;
    }
}
