import { useEffect, useState } from "react";
import { fetchDepartments } from "../api/content";
import { iconMap } from "../components/icons";
import { ErrorState, LoadingState } from "../components/PageState";
import Seo from "../components/Seo";

const panelClass =
  "animate-fadeInUp rounded-2xl border border-white/10 bg-gradient-to-br from-[#112945e6] to-[#09182ad1] p-4";

export default function DepartmentsPage() {
  const [state, setState] = useState({ loading: true, error: "", items: [] });

  useEffect(() => {
    const load = async () => {
      try {
        const items = await fetchDepartments();
        setState({ loading: false, error: "", items });
      } catch (_error) {
        setState({ loading: false, error: "Failed to load departments.", items: [] });
      }
    };

    load();
  }, []);

  if (state.loading) return <LoadingState />;
  if (state.error) return <ErrorState message={state.error} />;

  return (
    <div className="cursor-target grid gap-4">
      <Seo
        title="Departments"
        description="Explore the engineering departments that design, build, and race with NIAMT Racing."
        path="/departments"
      />

      <section className={panelClass}>
        <h3 className="mb-3 font-display text-xl">Our Departments</h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {state.items.map((item) => {
            const Icon = iconMap[item.icon] || iconMap.faCogs;
            return (
              <article key={item._id} className="rounded-xl border-l-4 border-[#ffc95599] bg-[#020a14a0] p-4">
                <Icon className="text-2xl text-[#ffc955]" />
                <h4 className="mt-2 text-lg font-semibold">{item.name}</h4>
                <p className="mt-2 text-slate-300">{item.description}</p>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
