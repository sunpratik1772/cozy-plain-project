import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Hls from "hls.js";
import HeroSearchBar from "./HeroSearchBar";
import { ChevronRight } from "lucide-react";
import heroGradient from "@/assets/hero-gradient.png";
import WaveText from "@/components/ui/wave-text";

const shortcuts = [
  { label: "Overview", href: "/docs/overview" },
  { label: "Set Up Your Workspace", href: "/docs/workspace" },
];

const VIDEO_SRC =
  "https://customer-cbeadsgr09pnsezs.cloudflarestream.com/74cb72d57c6a6d6d7807693d02e6707b/manifest/video.m3u8";

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure video is muted for autoplay to work
    video.muted = true;

    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
      });

      hls.loadSource(VIDEO_SRC);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {
          // Autoplay failed silently
        });
      });

      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              hls.recoverMediaError();
              break;
            default:
              hls.destroy();
              break;
          }
        }
      });

      return () => {
        hls.destroy();
      };
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // Native HLS support (Safari)
      video.src = VIDEO_SRC;
      video.addEventListener("loadedmetadata", () => {
        video.play().catch(() => {
          // Autoplay failed silently
        });
      });
    }
  }, []);

  return (
    <section className="relative flex flex-col items-center justify-center px-4 md:px-8 pt-32 md:pt-40 pb-12 md:pb-16 overflow-hidden min-h-[500px]">
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover grayscale"
        style={{ zIndex: 0 }}
      />

      {/* Dark overlay for readability */}
      <div 
        className="absolute inset-0 bg-background/70"
        style={{ zIndex: 1 }}
      />

      {/* Gradient overlay */}
      <img 
        src={heroGradient}
        alt=""
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{ zIndex: 1 }}
      />

      {/* Bottom fade gradient */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"
        style={{ zIndex: 1 }}
      />

      {/* Content */}
      <div className="relative flex flex-col items-center" style={{ zIndex: 2 }}>
        {/* Announcement Badge */}
        <Link
          to="/docs/overview"
          className="inline-flex items-center gap-2 pl-4 pr-2 py-2 mb-8 text-sm text-muted-foreground bg-secondary rounded-full"
        >
          <span>Hello, I'm Sherpa.</span>
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-background">
            <ChevronRight className="w-4 h-4" />
          </span>
        </Link>

        {/* Headline */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground text-center tracking-tighter mb-6">
          <WaveText text="EMT Sun Docs & API Reference" />
        </h1>

        {/* Subheadline */}
        <p className="text-base md:text-lg text-muted-foreground text-center max-w-2xl mb-10">
          <WaveText text="Everything you need to build workflows, extend Sherpa, and ship integrations" staggerDelay={0.015} />
        </p>

        {/* Search Bar */}
        <div className="w-full max-w-[600px] mb-8 px-0 md:px-4">
          <HeroSearchBar />
        </div>

        {/* Search Shortcuts */}
        <div className="flex flex-col md:flex-row items-center gap-3">
          <span className="text-sm text-muted-foreground">Search shortcuts:</span>
          <div className="flex flex-row items-center gap-3">
            {shortcuts.map((shortcut) => (
              <Link
                key={shortcut.label}
                to={shortcut.href}
                className="inline-flex items-center px-4 py-2 text-sm text-muted-foreground border border-border rounded-xl transition-colors hover:text-foreground hover:border-muted-foreground/50"
              >
                {shortcut.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
