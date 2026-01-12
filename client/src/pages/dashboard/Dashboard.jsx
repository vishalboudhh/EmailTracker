import { useEffect, useState } from "react";
import {
  Briefcase,
  FileText,
  Mail,
  TrendingUp,
} from "lucide-react";
import {
  getApplicationStats,
  getApplicationsApi,
} from "../../api/application.api";
import axiosInstance from "../../utils/axiosInstance";

const initialStats = [
  {
    title: "Total Applications",
    value: "—",
    icon: Briefcase,
    color: "bg-blue-500",
  },
  {
    title: "Resumes Uploaded",
    value: "—",
    icon: FileText,
    color: "bg-green-500",
  },
  {
    title: "Emails Sent",
    value: "—",
    icon: Mail,
    color: "bg-purple-500",
  },
  {
    title: "Success Rate",
    value: "—",
    icon: TrendingUp,
    color: "bg-orange-500",
  },
];

const fallbackRecent = [
  {
    company: "—",
    role: "—",
    status: "—",
    date: "—",
    hrEmail: "—",
  },
];

export default function Dashboard() {
  const [stats, setStats] = useState(initialStats);
  const [recentApplications, setRecentApplications] =
    useState(fallbackRecent);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        // Stats
        const s = await getApplicationStats();

        // Resumes
        let resumesCount = 0;
        try {
          const r = await axiosInstance.get("/resume");
          resumesCount = Array.isArray(r.data) ? r.data.length : 0;
        } catch (resumeErr) {
          console.error("Failed to fetch resumes:", resumeErr);
          // Continue with resumesCount = 0
        }

        // Applications
        const appsRes = await getApplicationsApi();
        const apps = Array.isArray(appsRes.data) ? appsRes.data : [];

        const recent = apps.slice(0, 5).map((a) => ({
          company: a.companyName,
          role: a.jobProfile,
          status: a.status,
          date: new Date(a.appliedAt).toLocaleDateString(),
          hrEmail: a.hrEmail || "—",
        }));

        const total = s.total || 0;
        const success =
          (s.interview || 0) + (s.offer || 0);
        const successRate =
          total > 0 ? Math.round((success / total) * 100) : 0;

        setStats([
          {
            title: "Total Applications",
            value: total.toString(),
            icon: Briefcase,
            color: "bg-blue-500",
          },
          {
            title: "Resumes Uploaded",
            value: resumesCount.toString(),
            icon: FileText,
            color: "bg-green-500",
          },
          {
            title: "Emails Sent",
            value: total.toString(),
            icon: Mail,
            color: "bg-purple-500",
          },
          {
            title: "Success Rate",
            value: `${successRate}%`,
            icon: TrendingUp,
            color: "bg-orange-500",
          },
        ]);

        setRecentApplications(
          recent.length ? recent : fallbackRecent
        );
      } catch (err) {
        console.error("Dashboard error:", err);
        // Set default values on error
        setStats(initialStats);
        setRecentApplications(fallbackRecent);
      }
    };

    loadDashboard();
  }, []);

  return (
    <div className="p-6 space-y-8 min-h-[calc(100vh-4rem)] overflow-x-hidden">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          Dashboard 
        </h1>
        <p className="text-gray-500 dark:text-gray-300 mt-1">
          Track your job applications and activity
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 dark:text-gray-100 rounded-xl shadow p-4 flex items-center gap-4 hover:shadow-lg transition"
          >
            <div
              className={`p-3 rounded-lg text-white ${stat.color}`}
            >
              <stat.icon size={20} />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-500 dark:text-gray-300 truncate">
                {stat.title}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Applications */}
      <div className="bg-white dark:bg-gray-800 dark:text-gray-100 rounded-xl shadow">
        <div className="p-5 border-b">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            Recent Applications
          </h2>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden p-4 space-y-3">
          {recentApplications.map((app, i) => (
            <div
              key={i}
              className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
            >
              <h3 className="font-medium truncate">
                {app.company}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                {app.role}
              </p>
              {app.hrEmail && app.hrEmail !== "—" && (
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-1">
                  📧 {app.hrEmail}
                </p>
              )}
              <div className="flex items-center justify-between mt-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    app.status === "Interview"
                      ? "bg-green-100 text-green-700"
                      : app.status === "Rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {app.status}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-300">
                  {app.date}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block px-4 pb-4">
          <div className="max-h-[320px] overflow-y-auto overflow-x-hidden">
            <table className="w-full text-sm table-fixed">
              <thead className="bg-gray-50 dark:bg-gray-700 sticky top-0 z-10">
                <tr>
                  <th className="p-4 text-left">Company</th>
                  <th className="p-4 text-left">Role</th>
                  <th className="p-4 text-left">HR Email</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-left">Date</th>
                </tr>
              </thead>

              <tbody>
                {recentApplications.map((app, index) => (
                  <tr
                    key={index}
                    className="border-t border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="p-4 font-medium truncate">
                      {app.company}
                    </td>
                    <td className="p-4 truncate">
                      {app.role}
                    </td>
                    <td className="p-4 text-gray-600 dark:text-gray-400 truncate">
                      {app.hrEmail && app.hrEmail !== "—" ? (
                        <a
                          href={`mailto:${app.hrEmail}`}
                          className="text-indigo-600 dark:text-indigo-400 hover:underline truncate block"
                          title={app.hrEmail}
                        >
                          {app.hrEmail}
                        </a>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
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
                      {app.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
