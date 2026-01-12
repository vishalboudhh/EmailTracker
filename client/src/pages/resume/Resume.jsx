import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../utils/axiosInstance";
import ResumeUploadForm from "../../components/resume/ResumeUploadForm";
import ResumeCard from "../../components/resume/ResumeCard";
import ConfirmModal from "../../components/common/ConfirmModal";

export default function Resume() {
  const [resumes, setResumes] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, id: null });

  const fetchResumes = async () => {
    try {
      const res = await axiosInstance.get("/resume");
      setResumes(res.data);
    } catch (err) {
      console.error("Fetch resume error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const handleDelete = async (id) => {
    setDeleteConfirm({ isOpen: true, id });
  };

  const confirmDelete = async () => {
    try {
      await axiosInstance.delete(`/resume/${deleteConfirm.id}`);
      setResumes((prev) => prev.filter((r) => r._id !== deleteConfirm.id));
      toast.success("Resume deleted successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete resume");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold dark:text-gray-100">Resumes</h1>

        <button
          onClick={() => setOpen(true)}
          className="bg-indigo-600 dark:bg-indigo-500 text-white px-4 py-2 rounded-lg"
        >
          + Upload Resume
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <p className="text-gray-500 dark:text-gray-300">Loading resumes...</p>
      ) : resumes.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 dark:text-gray-300 p-6 rounded-xl shadow">
          No resumes uploaded yet.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumes.map((resume) => (
            <ResumeCard
              key={resume._id}
              resume={resume}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Upload Modal */}
      {open && (
        <ResumeUploadForm
          onClose={() => setOpen(false)}
          onSuccess={fetchResumes}
        />
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, id: null })}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this resume? This action cannot be undone."
        title="Delete Resume"
      />
    </div>
  );
}
