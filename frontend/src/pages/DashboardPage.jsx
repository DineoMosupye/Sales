import { useEffect, useState } from "react";
import { getRequests, updateRequest } from "../api/client";
import BackButton from "../components/BackButton";

function DashboardPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadRequests = async () => {
    setLoading(true);
    try {
      const { data } = await getRequests();
      setRequests(data);
      setError("");
    } catch (apiError) {
      setError(apiError.response?.data?.message || "Could not load requests.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const onAction = async (id, action) => {
    try {
      await updateRequest(id, { action });
      await loadRequests();
    } catch (apiError) {
      setError(apiError.response?.data?.message || "Action failed.");
    }
  };

  return (
    <main className="page-shell internal-page-shell">
      <section className="card">
        <BackButton />
        <h1>View Requests</h1>
        {error ? <p className="error-banner">{error}</p> : null}
        {loading ? (
          <p>Loading requests...</p>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Rep Name</th>
                  <th>Request Type</th>
                  <th>Submitted To</th>
                  <th>Date &amp; Time</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((request) => (
                  <tr key={request._id}>
                    <td>{request.repName}</td>
                    <td>{request.requestType}</td>
                    <td>{request.submittedRole}</td>
                    <td>{new Date(request.createdAt).toLocaleString()}</td>
                    <td>{request.status}</td>
                    <td className="table-actions">
                      <button type="button" onClick={() => onAction(request._id, "followup")}>
                        Follow Up
                      </button>
                      <button type="button" onClick={() => onAction(request._id, "complete")}>
                        Mark Complete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}

export default DashboardPage;
