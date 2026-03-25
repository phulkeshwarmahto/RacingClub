import { iconMap } from "./icons";

const { FaPhone, FaEnvelope, FaLocationDot } = iconMap;

const socialIconByPlatform = {
  linkedin: iconMap.linkedin,
  facebook: iconMap.facebook,
  instagram: iconMap.instagram,
  x: iconMap.x
};

export default function Footer({ homeContent }) {
  if (!homeContent) return null;

  return (
    <footer className="border-t border-white/10 px-4 pb-6 pt-5">
      <div className="mx-auto grid w-[92vw] max-w-6xl gap-4 md:grid-cols-[2fr_1fr]">
        <div>
          <h3 className="font-display text-lg">NIAMT Racing Club</h3>
          <p className="text-slate-300">Official Formula Student Club of NIAMT</p>
          <div className="mt-2 space-y-2">
            <p className="flex items-center gap-2 text-slate-300">
              <FaPhone /> <span>{homeContent.contactPhone}</span>
            </p>
            <p className="flex items-center gap-2 text-slate-300">
              <FaEnvelope /> <span>{homeContent.contactEmail}</span>
            </p>
            <p className="flex items-center gap-2 text-slate-300">
              <FaLocationDot /> <span>{homeContent.contactLocation}</span>
            </p>
          </div>
        </div>

        <div>
          <h3 className="font-display text-lg">Follow Us</h3>
          <div className="mt-2 flex gap-3">
            {(homeContent.socialLinks || []).map((item) => {
              const key = item.platform.toLowerCase();
              const Icon = socialIconByPlatform[key] || socialIconByPlatform.x;
              return (
                <a
                  href={item.url}
                  key={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition hover:bg-[#ffc95526] hover:text-[#ffc955]"
                >
                  <Icon />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <small className="mt-4 block text-center text-slate-400">© {new Date().getFullYear()} NIAMT Racing Club</small>
    </footer>
  );
}