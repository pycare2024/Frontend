// src/components/Corporates/DemographicInsights.js

import React, { useState, useRef } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useReactToPrint } from "react-to-print";
import { FaPrint } from "react-icons/fa";

const COLORS = ["#4285F4", "#FBBC05", "#34A853", "#EA4335", "#A142F4", "#F4B400"];

const DemographicInsights = () => {
  const [companyCode, setCompanyCode] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const componentRef = useRef();

  const fetchData = async (e) => {
    e.preventDefault();
    if (!companyCode.trim()) return;

    setLoading(true);
    try {
      const response = await axios.get(`https://backend-xhl4.onrender.com/CorporateRoute/demographic-insights/${companyCode}`);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to fetch demographic data.");
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Demographic Insights Report",
  });

  const ageGroupData = data?.ageGroups
    ? Object.entries(data.ageGroups).map(([key, value]) => ({ name: key, value }))
    : [];

  const genderData = data?.genderSplit
    ? Object.entries(data.genderSplit).map(([key, value]) => ({ name: key, value }))
    : [];

  const locationData = data?.locationParticipation
    ? Object.entries(data.locationParticipation).map(([key, value]) => ({ name: key, value }))
    : [];

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <form onSubmit={fetchData} className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
        <input
          type="text"
          value={companyCode}
          onChange={(e) => setCompanyCode(e.target.value)}
          placeholder="Enter Company Code"
          className="border border-gray-400 px-4 py-2 rounded-lg w-72"
          required
        />
        <button type="submit" className="bg-[#4285F4] text-white px-6 py-2 rounded-lg hover:bg-blue-600">
          {loading ? "Loading..." : "Generate Report"}
        </button>
        {data && (
          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-2 bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600"
          >
            <FaPrint /> Print Report
          </button>
        )}
      </form>

      {data && (
        <div ref={componentRef} className="bg-white p-6 rounded-xl shadow-lg space-y-10">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-[#4285F4]">Demographic Insights Report</h1>
            <p className="text-gray-600 mt-2">Company Code: <span className="font-semibold">{data.companyCode}</span></p>
            <p className="text-gray-600">Total Patients: <span className="font-bold">{data.totalPatients}</span></p>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Gender Split */}
            <div className="bg-gray-50 rounded-lg p-4 shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-center text-[#34A853]">Gender Split</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={genderData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {genderData.map((_, index) => (
                      <Cell key={`cell-gender-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Age Groups */}
            <div className="bg-gray-50 rounded-lg p-4 shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-center text-[#FBBC05]">Age Group Distribution</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={ageGroupData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#4285F4" radius={[10, 10, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

          </div>

          {/* Location Participation */}
          <div className="bg-gray-50 rounded-lg p-4 shadow-md mt-6">
            <h2 className="text-xl font-semibold mb-4 text-center text-[#EA4335]">Location Participation</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={locationData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  label
                >
                  {locationData.map((_, index) => (
                    <Cell key={`cell-location-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default DemographicInsights;