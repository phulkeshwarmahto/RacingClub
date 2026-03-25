export default function AlumniPage() {
  return (
    <div className="grid gap-4">
      <section className="animate-fadeInUp rounded-2xl border border-white/10 bg-gradient-to-br from-[#112945e6] to-[#09182ad1] p-4">
        <h3 className="mb-3 font-display text-xl">Our Alumni Network</h3>
        <p className="text-slate-300">
          Team Thrusters alumni continue to contribute across motorsport, automotive engineering, product design, and
          advanced manufacturing. This section is ready for a future alumni directory API.
        </p>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <article className="rounded-xl border-l-4 border-[#ffc95599] bg-[#020a14a0] p-4">
            <h4 className="text-lg font-semibold">Mentorship</h4>
            <p className="mt-2 text-slate-300">Alumni mentor current members on design reviews, race prep, and technical interviews.</p>
          </article>
          <article className="rounded-xl border-l-4 border-[#ffc95599] bg-[#020a14a0] p-4">
            <h4 className="text-lg font-semibold">Industry Connect</h4>
            <p className="mt-2 text-slate-300">Graduates working in automotive and manufacturing connect students with real-world opportunities.</p>
          </article>
          <article className="rounded-xl border-l-4 border-[#ffc95599] bg-[#020a14a0] p-4">
            <h4 className="text-lg font-semibold">Legacy</h4>
            <p className="mt-2 text-slate-300">Each batch hands over tested practices, project docs, and competition learnings to the next team.</p>
          </article>
        </div>
      </section>
    </div>
  );
}