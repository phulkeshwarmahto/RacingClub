import ContactForm from "../components/ContactForm";
import { iconMap } from "../components/icons";
import Seo from "../components/Seo";

const { FaPhone, FaEnvelope, FaLocationDot } = iconMap;

export default function ContactPage({ homeContent }) {
  return (
    <div className="cursor-target grid gap-4">
      <Seo
        title="Contact"
        description="Get in touch with NIAMT Racing for partnerships, queries, and collaboration opportunities."
        path="/contact"
      />

      <section className="animate-fadeInUp rounded-2xl border border-white/10 bg-gradient-to-br from-[#112945e6] to-[#09182ad1] p-4">
        <h3 className="mb-2 font-display text-xl">Contact Us</h3>
        <p className="text-slate-300">Reach our team directly or submit your question using the form below.</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <article className="rounded-xl border border-white/10 bg-[#020a14a0] p-3">
            <p className="flex items-center gap-2 font-semibold text-[#ffc955]">
              <FaPhone /> Phone
            </p>
            <p className="mt-1 text-slate-300">{homeContent?.contactPhone || "N/A"}</p>
          </article>
          <article className="rounded-xl border border-white/10 bg-[#020a14a0] p-3">
            <p className="flex items-center gap-2 font-semibold text-[#ffc955]">
              <FaEnvelope /> Email
            </p>
            <p className="mt-1 text-slate-300">{homeContent?.contactEmail || "N/A"}</p>
          </article>
          <article className="rounded-xl border border-white/10 bg-[#020a14a0] p-3">
            <p className="flex items-center gap-2 font-semibold text-[#ffc955]">
              <FaLocationDot /> Location
            </p>
            <p className="mt-1 text-slate-300">{homeContent?.contactLocation || "N/A"}</p>
          </article>
        </div>
      </section>

      <ContactForm />
    </div>
  );
}
