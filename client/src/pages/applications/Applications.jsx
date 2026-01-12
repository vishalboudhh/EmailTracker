import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  getApplicationsApi,
  deleteApplicationApi,
} from "../../api/application.api";
import ApplicationForm from "../../components/application/ApplicationForm";
import ConfirmModal from "../../components/common/ConfirmModal";

export default function Applications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, id: null });

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const res = await getApplicationsApi();
      // Ensure we have an array
      const apps = Array.isArray(res.data) ? res.data : [];
      setApplications(apps);
    } catch (err) {
      console.error("Fetch applications error:", err);
      toast.error(err.response?.data?.message || "Failed to load applications");
      setApplications([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleDelete = async (id) => {
    setDeleteConfirm({ isOpen: true, id });
  };

  const confirmDelete = async () => {
    try {
      await deleteApplicationApi(deleteConfirm.id);
      toast.success("Application deleted successfully");
      fetchApplications();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-6 min-h-[calc(100vh-4rem)] overflow-x-hidden text-gray-900 dark:text-gray-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h1 className="text-2xl font-bold dark:text-gray-100">Applications</h1>

        <button
          onClick={() => setOpen(true)}
          className="bg-indigo-600 dark:bg-indigo-500 text-white px-4 py-2 rounded-lg w-full sm:w-auto"
        >
          + Add Application
        </button>
      </div>

      {/* Content */}
      <div className="bg-white dark:bg-gray-800 dark:text-gray-100 rounded-xl shadow">
        {loading ? (
          <p className="p-6 text-gray-500 dark:text-gray-300">Loading...</p>
        ) : applications.length === 0 ? (
          <p className="p-6 text-gray-500 dark:text-gray-300">No applications found.</p>
        ) : (
          <>
            {/* Mobile Cards */}
            <div className="md:hidden p-4 space-y-3">
              {applications.map((app) => (
                <div
                  key={app._id}
                  className="border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-700 rounded-lg p-4 shadow-sm"
                >
                  <h3 className="font-medium truncate">
                    {app.companyName}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                    {app.jobProfile}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-300 mt-1">
                    {new Date(app.appliedAt).toLocaleDateString()}
                  </p>

                  <div className="flex items-center justify-between mt-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium
                      ${
                        app.status === "Interview"
                          ? "bg-green-100 text-green-700"
                          : app.status === "Rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {app.status}
                    </span>

                    <div className="flex gap-3">
                      <button
                        onClick={() => setSelected(app)}
                        className="text-indigo-600 dark:text-indigo-400 text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(app._id)}
                        className="text-red-600 dark:text-red-400 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block">
              <div className="max-h-[420px] overflow-y-auto overflow-x-hidden">
                <table className="w-full text-sm table-fixed">
                  <thead className="bg-gray-50 dark:bg-gray-700 sticky top-0 z-10">
                    <tr>
                      <th className="p-4 text-left">Company</th>
                      <th className="p-4 text-left">Role</th>
                      <th className="p-4 text-left">Status</th>
                      <th className="p-4 text-left">Date</th>
                      <th className="p-4 text-left">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {applications.map((app) => (
                      <tr
                        key={app._id}
                        className="border-t border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <td className="p-4 truncate">
                          {app.companyName}
                        </td>
                        <td className="p-4 truncate">
                          {app.jobProfile}
                        </td>
                        <td className="p-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium
                            ${
                              app.status === "Interview"
                                ? "bg-green-100 text-green-700"
                                : app.status === "Rejected"
                                ? "bg-red-100 text-red-700"
                                : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            {app.status}
                          </span>
                        </td>
                        <td className="p-4 text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          {new Date(app.appliedAt).toLocaleDateString()}
                        </td>
                        <td className="p-4 flex gap-4">
                          <button
                            onClick={() => setSelected(app)}
                            className="text-indigo-600 dark:text-indigo-400"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(app._id)}
                            className="text-red-600 dark:text-red-400"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Add Modal */}
      {open && (
        <ApplicationForm
          onClose={() => setOpen(false)}
          onSuccess={fetchApplications}
        />
      )}

      {/* Edit Modal */}
      {selected && (
        <ApplicationForm
          editData={selected}
          onClose={() => setSelected(null)}
          onSuccess={fetchApplications}
        />
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, id: null })}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this application? This action cannot be undone."
        title="Delete Application"
      />
    </div>
  );
}
