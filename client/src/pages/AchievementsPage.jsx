import { useEffect, useState } from "react";
import { fetchAchievements } from "../api/content";
import { ErrorState, LoadingState } from "../components/PageState";
import Seo from "../components/Seo";
import { buildCloudinarySrcSet, getCloudinaryImageUrl } from "../utils/cloudinary";

const panelClass =
  "animate-fadeInUp rounded-2xl border border-white/10 bg-gradient-to-br from-[#112945e6] to-[#09182ad1] p-4";

export default function AchievementsPage() {
  const [state, setState] = useState({ loading: true, error: "", items: [] });

  useEffect(() => {
    const load = async () => {
      try {
        const items = await fetchAchievements();
        setState({ loading: false, error: "", items });
      } catch (_error) {
        setState({ loading: false, error: "Failed to load achievements.", items: [] });
      }
    };

    load();
  }, []);

  if (state.loading) return <LoadingState />;
  if (state.error) return <ErrorState message={state.error} />;

  return (
    <div className="cursor-target grid gap-4">
      <Seo
        title="Achievements"
        description="Competition results, milestones, and podium finishes achieved by NIAMT Racing."
        path="/achievements"
      />

      <section className={panelClass}>
        <h3 className="mb-3 font-display text-xl">Our Achievements</h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {state.items.map((item) => (
            <article key={item._id} className="rounded-xl border-l-4 border-[#ffc95599] bg-[#020a14a0] p-4">
              <img
                src={getCloudinaryImageUrl(item.image, { width: 640 })}
                srcSet={buildCloudinarySrcSet(item.image, [320, 640, 960])}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                alt={item.title}
                className="mb-3 h-36 w-full rounded-lg object-cover"
                loading="lazy"
              />
              <h4 className="text-lg font-semibold">{item.title}</h4>
              <p className="text-slate-300">{item.rank}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
