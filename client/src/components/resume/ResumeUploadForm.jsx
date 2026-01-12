import { useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../utils/axiosInstance";

export default function ResumeUploadForm({ onClose, onSuccess }) {
  const [form, setForm] = useState({
    title: "",
    driveLink: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axiosInstance.post("/resume", form);
      toast.success("Resume uploaded successfully! 🚀");
      onSuccess();
      onClose();
    } catch (err) {
        console.log(err);
        toast.error(err.response?.data?.message || "Resume upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 dark:text-gray-100 w-full max-w-md rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-bold mb-4 dark:text-gray-100">Upload Resume</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Resume Title"
            name="title"
            onChange={handleChange}
            placeholder="MERN Stack Resume"
          />

          <Input
            label="Resume Drive Link"
            name="driveLink"
            onChange={handleChange}
            placeholder="https://drive.google.com/..."
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded dark:border-gray-700"
            >
              Cancel
            </button>

            <button
              disabled={loading}
              className="px-4 py-2 bg-indigo-600 dark:bg-indigo-500 text-white rounded"
            >
              {loading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="text-sm font-medium dark:text-gray-300">{label}</label>
      <input
        {...props}
        required
        className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 dark:text-white rounded px-3 py-2 mt-1"
      />
    </div>
  );
}
