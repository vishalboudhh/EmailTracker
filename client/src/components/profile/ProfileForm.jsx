import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getProfileApi, updateProfileApi } from "../../api/profile.api";

export default function Profile() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    portfolio: "",
    location: "",
  });

  const [loading, setLoading] = useState(false);

  // fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfileApi();
        setForm(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProfileApi(form);
      toast.success("Profile updated successfully! ✅");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Profile update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 dark:text-gray-100">My Profile</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 dark:text-gray-100 shadow rounded-lg p-6 space-y-4"
      >
        <Input label="Name" name="name" value={form.name} onChange={handleChange} />

        <Input
          label="Email"
          name="email"
          value={form.email}
          disabled
        />

        <Input
          label="Phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
        />

        <Input
          label="Location"
          name="location"
          value={form.location}
          onChange={handleChange}
        />

        <Input
          label="Portfolio"
          name="portfolio"
          value={form.portfolio}
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className="w-full bg-indigo-600 dark:bg-indigo-500 text-white py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1 dark:text-gray-300">{label}</label>
      <input
        {...props}
        className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 dark:text-white px-3 py-2 rounded focus:outline-none focus:ring focus:ring-indigo-300"
      />
    </div>
  );
}
