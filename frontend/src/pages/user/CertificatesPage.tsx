import DashboardLayout from "@/components/DashboardLayout";
import { Globe, User, FileText } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";

interface Certificate {
  _id?: string;          // MongoDB ID
  title: string;
  ipfsHash: string;
  timestamp: string;
  uploadedBy: string;
}

const CertificatesPage = () => {
  const { user, token } = useAuth();
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const menuItems = [
    { label: "Dashboard", href: "/user/dashboard", icon: FileText },
    { label: "Profile", href: "/user/profile", icon: User },
    { label: "Certificates", href: "/user/certificates", icon: Globe },
  ];

  // Fetch all certificates
  const fetchCertificates = async () => {
    if (!user?.email || !token) return;
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`http://localhost:5000/api/certificates/${user.email}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) setCertificates(res.data.database || []);
    } catch (err: any) {
      setError(err.response?.data?.message || "Error fetching certificates.");
    } finally {
      setLoading(false);
    }
  };

  // Handle file upload to backend + IPFS + blockchain
  const handleUpload = async () => {
    if (!title || !file) return alert("Please provide title and select a file");
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", title);
      formData.append("email", user.email);
      formData.append("walletAddress", user.walletAddress);

      const res = await axios.post(
        "http://localhost:5000/api/certificates/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        alert("Certificate uploaded successfully!");
        setTitle("");
        setFile(null);
        fetchCertificates();
      }
    } catch (err: any) {
      alert(err.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  // Handle delete (blockchain + MongoDB)
  const handleDelete = async (cert: Certificate, index: number) => {
    if (!window.confirm("Are you sure you want to delete this certificate?")) return;
    try {
      setLoading(true);
      await axios.delete("http://localhost:5000/api/certificates", {
        headers: { Authorization: `Bearer ${token}` },
        data: { walletAddress: user.walletAddress, email: user.email, index, mongoId: cert._id },
      });
      fetchCertificates();
    } catch (err: any) {
      alert(err.response?.data?.message || "Delete failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCertificates(); }, [user, token]);

  return (
    <DashboardLayout menuItems={menuItems} title="Certificates">
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Manage Certificates</h2>

        {/* Upload Form */}
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200 space-y-3">
          <h3 className="font-semibold mb-2">Upload New Certificate</h3>
          <input
            type="text"
            placeholder="Certificate Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <input
            type="file"
            onChange={(e: ChangeEvent<HTMLInputElement>) => setFile(e.target.files ? e.target.files[0] : null)}
            className="border p-2 rounded w-full"
          />
          <button
            onClick={handleUpload}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            Upload Certificate
          </button>
        </div>

        {/* Certificate List */}
        <div className="space-y-2">
          <h3 className="font-semibold mb-2">Your Certificates</h3>
          {loading && <p>Loading...</p>}
          {!loading && error && <p className="text-red-500">{error}</p>}
          {!loading && certificates.length === 0 && <p>No certificates found.</p>}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certificates.map((cert, index) => (
              <div key={cert._id} className="bg-white p-4 rounded-lg shadow border border-gray-200">
                <p><strong>Title:</strong> {cert.title}</p>
                <p>
                  <strong>IPFS:</strong>{" "}
                  <a
                    href={`https://gateway.pinata.cloud/ipfs/${cert.ipfsHash}`}
                    target="_blank"
                    className="text-blue-600 hover:underline"
                  >
                    {cert.ipfsHash}
                  </a>
                </p>
                <p><strong>Uploaded By:</strong> {cert.uploadedBy}</p>
                <p><strong>Timestamp:</strong> {new Date(cert.timestamp).toLocaleString()}</p>
                <button
                  onClick={() => handleDelete(cert, index)}
                  disabled={loading}
                  className="mt-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 disabled:opacity-50"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CertificatesPage;
