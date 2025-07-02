import axios from "axios";
import React, { useEffect, useState } from "react";

function PaginationTable() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchData();
  }, []);
  async function fetchData() {
    try {
      const response = await axios.get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      if (response.status === 200) {
        const result = response.data;
        setData(result);
      }
    } catch (err) {
      console.error("failed to fetch data", err.message || err);
    }
  }
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center" }}>Employee Data Table</h1>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f2f2f2" }}>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((idx) => (
              <tr key={idx}>
                <td>{idx.id}</td>
                <td>{idx.name}</td>
                <td>{idx.email}</td>
                <td>{idx.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
        <button onClick={handlePrevious}>Previous</button>
        <span style={{padding:'0 10px'}}>{page}</span>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
}

export default PaginationTable;
