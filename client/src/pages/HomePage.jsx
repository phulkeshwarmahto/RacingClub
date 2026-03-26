import { useEffect, useState } from "react";
import { fetchHomeContent } from "../api/content";
import { iconMap } from "../components/icons";
import { ErrorState, LoadingState } from "../components/PageState";
import Seo from "../components/Seo";
import { buildCloudinarySrcSet, getCloudinaryImageUrl } from "../utils/cloudinary";

const panelClass =
  "animate-fadeInUp rounded-2xl border border-white/10 bg-gradient-to-br from-[#112945e6] to-[#09182ad1] p-4";
const headingClass = "mb-3 font-display text-xl";
const textClass = "text-base leading-6 text-slate-300";
const cardClass = "rounded-xl border-l-4 border-l-[#ffc95599] bg-[#020a14a0] p-4";

const accentMap = {
  orange: "border-l-orange-500",
  blue: "border-l-blue-500",
  red: "border-l-red-500",
  green: "border-l-emerald-500"
};

export default function HomePage() {
  const [state, setState] = useState({ loading: true, error: "", data: null });

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchHomeContent();
        setState({ loading: false, error: "", data });
      } catch (_error) {
        setState({ loading: false, error: "Failed to load home content.", data: null });
      }
    };

    load();
  }, []);

  if (state.loading) return <LoadingState />;
  if (state.error || !state.data) return <ErrorState message={state.error} />;

  const content = state.data;

  return (
    <div className="cursor-target grid gap-4">
      <Seo
        title="Official Team"
        description="NIAMT Racing is the official motorsport and Formula Student team of NIAMT Ranchi. Explore projects, achievements, and team updates."
        path="/"
      />

      <section className="relative min-h-[340px] overflow-hidden rounded-2xl">
        <img
          src={getCloudinaryImageUrl(content.heroImage, { width: 1400 })}
          srcSet={buildCloudinarySrcSet(content.heroImage)}
          sizes="(max-width: 768px) 100vw, 1200px"
          alt="NIAMT Racing vehicle at track event"
          className="h-screen w-full object-cover brightness-50"
          fetchPriority="high"
        />
        <div className="absolute inset-0 flex flex-col justify-center bg-gradient-to-r from-[#020810bf] to-[#02081030] p-5">
          <h2 className="font-display text-3xl leading-tight sm:text-4xl">{content.clubName}</h2>
          <p className="mt-2 text-lg text-[#ffc955]">{content.subtitle}</p>
          <small className="text-slate-300">{content.institution}</small>
        </div>
      </section>

      <section className={panelClass}>
        <h3 className={headingClass}>About The Club</h3>
        <p className={textClass}>{content.aboutPrimary}</p>
        <p className={`${textClass} mt-2`}>{content.aboutSecondary}</p>
      </section>

      <section className={panelClass}>
        <h3 className={headingClass}>{content.announcementTitle}</h3>
        <div className="mb-3 rounded-lg border-l-4 border-[#ffc955] bg-[#ffc95526] px-3 py-2 font-semibold text-[#ffc955]">
          {content.announcementTicker}
        </div>
        <p className={textClass}>{content.announcementMessage}</p>
      </section>

      <section>
        <video className="w-full rounded-2xl border border-white/10 " autoPlay muted loop playsInline>
          <source src={content.promoVideo} />
        </video>
      </section>

      <section className={panelClass}>
        <h3 className={headingClass}>Our Engineering Domains</h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {content.domains.map((item) => {
            const Icon = iconMap[item.icon] || iconMap.faCarSide;
            const accentClass = accentMap[item.accent] || "border-l-[#ffc95599]";
            return (
              <article className={`${cardClass} ${accentClass}`} key={item.title}>
                <Icon className="text-2xl text-[#ffc955]" />
                <h4 className="mt-2 text-lg font-semibold">{item.title}</h4>
                <strong className="text-[#ffc955]">{item.subtitle}</strong>
                <p className="mt-2 text-slate-300">{item.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className={panelClass}>
        <h3 className={headingClass}>Our Legacy</h3>
        <div className="grid gap-4 md:grid-cols-[1.2fr_1.8fr] md:items-center">
          <img
            src={getCloudinaryImageUrl(content.legacyImage, { width: 1000 })}
            srcSet={buildCloudinarySrcSet(content.legacyImage)}
            sizes="(max-width: 768px) 100vw, 45vw"
            alt="NIAMT Racing team legacy"
            className="w-full rounded-xl"
            loading="lazy"
          />
          <p className={textClass}>{content.legacyText}</p>
        </div>
      </section>

      <section className={panelClass}>
        <h3 className={headingClass}>Impact and Outreach</h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {content.reachMetrics.map((item) => (
            <article className="rounded-xl border border-[#ffc9553d] bg-white/5 p-3" key={item.label}>
              <h4 className="text-2xl font-bold text-[#ffc955]">{item.value}</h4>
              <p className="mt-1 text-slate-300">{item.label}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={`${panelClass} text-center`}>
        <img
          src={getCloudinaryImageUrl(content.testimonial.image, { width: 256 })}
          alt={content.testimonial.name}
          className="mx-auto h-20 w-20 rounded-full border-2 border-[#ffc955] object-cover"
          loading="lazy"
        />
        <blockquote className="mx-auto mt-3 max-w-2xl italic text-slate-200">{content.testimonial.text}</blockquote>
        <cite className="mt-2 block font-semibold text-[#ffc955]">{content.testimonial.name}</cite>
      </section>
    </div>
  );
}
