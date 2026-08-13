import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { MessageSquare, X, Send } from "lucide-react";
import { useFormSchema } from "../hooks/useFormSchema.js";
import { useAIExtraction } from "../hooks/useAIExtraction.js";
import { useAutosave } from "../hooks/useAutosave.js";
import { useFormStore } from "../store/useFormStore.js";
import MagicInputBox from "../components/MagicInput/MagicInputBox.jsx";
import AIReviewBanner from "../components/MagicInput/AIReviewBanner.jsx";
import DynamicFormRenderer from "../components/DynamicForm/DynamicFormRenderer.jsx";
import { FormSubmissionAPI, AIAssistantAPI } from "../services/api.js";

export default function FormFillPage() {
  const { schemaId } = useParams();
  const navigate = useNavigate();
  const { schema, loading } = useFormSchema(schemaId);

  const [submissionId, setSubmissionId] = useState(null);
  const [formValues, setFormValues] = useState({});
  const lowConfidenceFields = useFormStore((s) => s.lowConfidenceFields);
  const setSchemaInStore = useFormStore((s) => s.setSchema);

  // Toggle state for sliding assistant panel
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: "assistant", text: "Hello! I am your AI assistant. Ask me anything about this form." },
  ]);
  const [chatInput, setChatInput] = useState("");

  useEffect(() => {
    if (schema) setSchemaInStore(schema);
  }, [schema, setSchemaInStore]);

  useEffect(() => {
    if (!schemaId) return;
    FormSubmissionAPI.create(schemaId, null).then((sub) => setSubmissionId(sub.id));
  }, [schemaId]);

  useAutosave({ submissionId, values: formValues });

  // A stable setValue-like function passed to useAIExtraction; since the
  // real RHF instance lives inside DynamicFormRenderer, extraction results
  // are applied via defaultValues + a re-render keyed on extractedValues.
  const [extractedValues, setExtractedValues] = useState({});
  const { extract } = useAIExtraction({
    formSchemaId: schemaId,
    setValue: (key, value) => setExtractedValues((prev) => ({ ...prev, [key]: value })),
  });

  const handleSubmit = async (data) => {
    if (!submissionId) return;
    await FormSubmissionAPI.saveProgress(submissionId, data);
    await FormSubmissionAPI.submit(submissionId);
    navigate(`/submissions/${submissionId}`);
  };

  // call the assistant API with user's question and current form answers
  const handleSendChat = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = { role: "user", text: chatInput };
    setChatMessages((prev) => [...prev, userMessage]);
    setChatInput("");

    // add a temporary waiting state
    const thinkingMessage = { role: "assistant", text: "Thinking..." };
    setChatMessages((prev) => [...prev, thinkingMessage]);

    try {
      const response = await AIAssistantAPI.ask(schemaId, chatInput, formValues);
      
      setChatMessages((prev) => {
        const next = [...prev];
        next[next.length - 1] = { role: "assistant", text: response.answer };
        return next;
      });
    } catch (err) {
      setChatMessages((prev) => {
        const next = [...prev];
        next[next.length - 1] = {
          role: "assistant",
          text: err.message || "I apologize, but I failed to fetch an answer.",
        };
        return next;
      });
    }
  };

  if (loading) return <p className="text-stone-400 text-center mt-12">Loading form...</p>;
  if (!schema) return <p className="text-red-400 text-center mt-12">Form not found.</p>;

  return (
    <div style={{ position: "relative" }}>
      <h1 className="page-title">{schema.name}</h1>
      <p className="page-subtitle">{schema.description}</p>

      <MagicInputBox onExtract={extract} />
      <AIReviewBanner lowConfidenceFields={lowConfidenceFields} />

      <DynamicFormRenderer
        schema={schema}
        defaultValues={extractedValues}
        onValuesChange={setFormValues}
        onSubmit={(data) => {
          setFormValues(data);
          handleSubmit(data);
        }}
      />

      {/* Floating help assistant button */}
      <button
        onClick={() => setIsChatOpen(true)}
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 40,
          background: "linear-gradient(135deg, #6366f1, #4f46e5)",
          border: "none",
          borderRadius: "50%",
          padding: 16,
          cursor: "pointer",
          boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.4)",
        }}
        aria-label="Ask assistant"
      >
        <MessageSquare className="size-6 text-white" />
      </button>

      {/* Sliding sidebar chat widget */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              width: "100%",
              maxWidth: 380,
              height: "100vh",
              zIndex: 50,
              background: "rgba(9, 9, 11, 0.95)",
              backdropFilter: "blur(16px)",
              borderLeft: "1px solid rgba(255, 255, 255, 0.08)",
              boxShadow: "-10px 0 30px rgba(0, 0, 0, 0.5)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Chat header */}
            <div
              style={{
                padding: "20px 16px",
                borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 700, color: "#fafaf9" }}>
                  AI Assistant
                </h3>
                <span style={{ fontSize: "0.75rem", color: "#a1a1aa" }}>Grounded in form fields</span>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: "#a1a1aa",
                }}
              >
                <X className="size-5 hover:text-white transition-colors" />
              </button>
            </div>

            {/* Chat messages area */}
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: 16,
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  style={{
                    alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                    maxWidth: "85%",
                    padding: "10px 14px",
                    borderRadius: 12,
                    fontSize: "0.875rem",
                    lineHeight: 1.4,
                    background:
                      msg.role === "user"
                        ? "linear-gradient(135deg, #6366f1, #4f46e5)"
                        : "rgba(255, 255, 255, 0.05)",
                    color: "#fafaf9",
                    border: msg.role === "user" ? "none" : "1px solid rgba(255, 255, 255, 0.08)",
                  }}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            {/* Chat input box */}
            <div
              style={{
                padding: 16,
                borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                background: "rgba(0, 0, 0, 0.2)",
              }}
            >
              <form
                onSubmit={handleSendChat}
                style={{ display: "flex", gap: 8 }}
              >
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask a question..."
                  style={{
                    flex: 1,
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: 8,
                    padding: "8px 12px",
                    color: "#fafaf9",
                    fontSize: "0.875rem",
                    outline: "none",
                  }}
                />
                <button
                  type="submit"
                  style={{
                    background: "rgba(99, 102, 241, 0.1)",
                    border: "1px solid rgba(99, 102, 241, 0.2)",
                    borderRadius: 8,
                    padding: 8,
                    cursor: "pointer",
                    color: "#818cf8",
                  }}
                >
                  <Send className="size-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
