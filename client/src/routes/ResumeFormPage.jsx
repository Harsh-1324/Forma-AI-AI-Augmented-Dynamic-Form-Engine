import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormSubmissionAPI } from "../services/api.js";

export default function ResumeFormPage() {
  const { submissionId } = useParams();
  const [submission, setSubmission] = useState(null);

  useEffect(() => {
    FormSubmissionAPI.get(submissionId).then(setSubmission).catch(() => setSubmission(null));
  }, [submissionId]);

  if (!submission) return <p>Loading submission...</p>;

  return (
    <div>
      <h1>Claim {submission.status === "submitted" ? "submitted" : "in progress"}</h1>
      <div className="card">
        <pre style={{ whiteSpace: "pre-wrap" }}>{JSON.stringify(submission.data, null, 2)}</pre>
      </div>
    </div>
  );
}
