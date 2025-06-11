"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useState } from "react";

const EditProfilePage = () => {
  const [form, setForm] = useState({
    name: "Naufal Gerald",
    email: "naufalger@gmail.com",
    phone: "081234567890",
    dob: "",
    country: "Jakarta, Indonesia",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Changes saved!");
  };

  return (
    <>
    <Header />
      <div className="bg-light">
        <div className="max-w-xl mx-auto px-4 py-10 mt-20">
          
          {/* Profile Pic */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                className="w-24 h-24 rounded-full object-cover"
                alt="Profile"
              />
              <button className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow">
                <span className="text-primary text-sm">✎</span>
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="mt-1 w-full border px-4 py-2 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Email Address</label>
              <div className="flex items-center gap-2">
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  readOnly
                  className="mt-1 w-full border px-4 py-2 rounded-md bg-gray-100"
                />
                <span className="text-xs bg-primary text-white px-2 py-1 rounded-full">
                  VERIFIED
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="mt-1 w-full border px-4 py-2 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={form.dob}
                onChange={handleChange}
                className="mt-1 w-full border px-4 py-2 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Country</label>
              <select
                name="country"
                value={form.country}
                onChange={handleChange}
                className="mt-1 w-full border px-4 py-2 rounded-md"
              >
                <option>Jakarta, Indonesia</option>
                <option>Mumbai, India</option>
                <option>New York, USA</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white py-2 rounded-md hover:bg-secondary transition"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EditProfilePage;
