import { useState } from "react";
import { submitContact } from "../api/content";

const initialState = {
  name: "",
  email: "",
  message: ""
};

const inputClass =
  "rounded-lg border border-white/15 bg-[#04101fdd] px-3 py-2 text-[#f8f3e5] placeholder:text-slate-400 focus:border-[#ffc955] focus:outline-none";

export default function ContactForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState({ loading: false, text: "" });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ loading: true, text: "" });

    try {
      await submitContact(form);
      setForm(initialState);
      setStatus({ loading: false, text: "Message sent successfully." });
    } catch (_error) {
      setStatus({ loading: false, text: "Unable to send message right now." });
    }
  };

  return (
    <form
      className="mx-auto mb-4 grid w-[92vw] max-w-3xl gap-3 rounded-2xl bg-gradient-to-br from-[#0f243f] to-[#08182d] p-4"
      onSubmit={handleSubmit}
    >
      <h3 className="font-display text-lg">Contact Us</h3>
      <input
        className={inputClass}
        type="text"
        placeholder="Your Name"
        required
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        className={inputClass}
        type="email"
        placeholder="Your Email"
        required
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <textarea
        className={inputClass}
        rows="4"
        placeholder="Your Question"
        required
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
      />
      <button
        className="w-fit rounded-lg bg-[#ffc955] px-4 py-2 font-bold text-[#1a1a1a] transition hover:bg-[#ffd77c] disabled:cursor-not-allowed disabled:opacity-70"
        type="submit"
        disabled={status.loading}
      >
        {status.loading ? "Sending..." : "Send"}
      </button>
      {status.text ? <p className="font-semibold text-[#ffc955]">{status.text}</p> : null}
    </form>
  );
}