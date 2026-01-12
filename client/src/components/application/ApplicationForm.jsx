import { useState } from "react";
import toast from "react-hot-toast";
import {
  createApplicationApi,
  updateApplicationApi,
} from "../../api/application.api";

export default function ApplicationForm({
  editData,
  onClose,
  onSuccess,
}) {
  const [form, setForm] = useState({
    companyName: editData?.companyName || "",
    jobProfile: editData?.jobProfile || "",
    location: editData?.location || "",
    status: editData?.status || "Applied",
    appliedAt: editData
      ? new Date(editData.appliedAt).toISOString().slice(0, 10)
      : "",
    notes: editData?.notes || "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editData) {
        await updateApplicationApi(editData._id, form);
        toast.success("Application updated successfully! ✅");
      } else {
        await createApplicationApi(form);
        toast.success("Application added successfully! ✅");
      }
      onClose();
      onSuccess();
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Failed to save application");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 dark:text-gray-100 w-full max-w-md rounded-xl shadow-lg max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4 dark:text-gray-100">
            {editData ? "Edit Application" : "Add Application"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Company" name="companyName" value={form.companyName} onChange={handleChange} />
            <Input label="Role" name="jobProfile" value={form.jobProfile} onChange={handleChange} />
            <Input label="Location" name="location" value={form.location} onChange={handleChange} />

            <div>
              <label className="text-sm font-medium dark:text-gray-300">Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 dark:text-white rounded px-3 py-2 mt-1"
              >
                <option>Applied</option>
                <option>Interview</option>
                <option>Rejected</option>
                <option>Offer</option>
              </select>
            </div>

            <Input
              label="Apply Date"
              type="date"
              name="appliedAt"
              value={form.appliedAt}
              onChange={handleChange}
            />

            <div className="flex justify-end gap-3 pt-2">
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
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
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
