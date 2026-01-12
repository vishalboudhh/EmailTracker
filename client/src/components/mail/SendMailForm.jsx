import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../utils/axiosInstance";
import { useAuth } from "../../context/AuthContext";

export default function SendMailForm() {
  const { user } = useAuth();
  const [resumes, setResumes] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    companyName: "",
    hrEmail: "",
    jobProfile: "",
    subject: "",
    resumeLink: "",
    notes: "",
  });

  // fetch resumes for dropdown
  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const res = await axiosInstance.get("/resume");
        setResumes(res.data);
      } catch (err) {
        console.error("Resume fetch error", err);
      }
    };

    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get("/profile");
        setProfile(res.data);
      } catch (err) {
        // profile is optional for the email, so just log
        console.error("Profile fetch error", err);
      }
    };

    fetchResumes();
    fetchProfile();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Map UI fields to the backend contract expected by `sendMail`
      await axiosInstance.post("/mail/send", {
        fromName: user?.name || "JobMail User",
        userEmail: user?.email,
        hrEmail: form.hrEmail,
        subject: form.subject,
        companyName: form.companyName,
        jobProfile: form.jobProfile,
        resumeLink: form.resumeLink,
        portfolioLink: profile?.portfolio || "",
        phone: profile?.phone || "Not provided",
        location: profile?.location || "Not provided",
        notes: form.notes || "N/A",
        // plain message fallback for non-template use
        message: `
          Company: ${form.companyName}
          Job Profile: ${form.jobProfile}
          Resume: ${form.resumeLink}
          Portfolio: ${profile?.portfolio || "Not provided"}
          Phone: ${profile?.phone || "Not provided"}
          Location: ${profile?.location || "Not provided"}
          Notes: ${form.notes || "N/A"}
        `,
      });
      toast.success("Mail sent successfully! 🚀");

      setForm({
        companyName: "",
        hrEmail: "",
        jobProfile: "",
        subject: "",
        resumeLink: "",
        notes: "",
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send email");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 dark:text-gray-100 shadow rounded-xl p-6 space-y-4"
    >
      <Input
        label="Company Name"
        name="companyName"
        value={form.companyName}
        onChange={handleChange}
      />

      <Input
        label="HR Email"
        name="hrEmail"
        type="email"
        value={form.hrEmail}
        onChange={handleChange}
      />

      <Input
        label="Job Profile"
        name="jobProfile"
        value={form.jobProfile}
        onChange={handleChange}
      />

      <Input
        label="Email Subject"
        name="subject"
        value={form.subject}
        onChange={handleChange}
      />

      {/* Resume Selector */}
      <div>
        <label className="text-sm font-medium dark:text-gray-300">Select Resume</label>
        <select
          name="resumeLink"
          value={form.resumeLink}
          onChange={handleChange}
          required
          className="w-full border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-700 dark:text-white px-3 py-2 mt-1"
        >
          <option value="">Select Resume</option>
          {resumes.map((r) => (
            <option key={r._id} value={r.driveLink}>
              {r.title}
            </option>
          ))}
        </select>
      </div>

      {/* Notes */}
      <div>
        <label className="text-sm font-medium dark:text-gray-300">Notes (optional)</label>
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          rows={4}
          className="w-full border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-700 dark:text-white px-3 py-2 mt-1"
          placeholder="Short intro or custom message"
        />
      </div>

      <button
        disabled={loading}
        className="w-full bg-indigo-600 dark:bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-700"
      >
        {loading ? "Sending..." : "Send Email"}
      </button>
    </form>
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
