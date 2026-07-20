import { motion } from "framer-motion";
import { MessageSquare, Headset } from "lucide-react";
import SupportCard from "./SupportCard";
import supportBg from "@/assets/support-bg.png";
import WaveText from "@/components/ui/wave-text";

const supportOptions = [
  {
    icon: MessageSquare,
    title: "Join the knowledge hub",
    description: "Connect with developers in our hub.",
    linkText: "Join Hub",
    href: "/docs/overview",
  },
  {
    icon: Headset,
    title: "Get guided",
    description: "Our team is here to guide you.",
    linkText: "Get Assistance",
    href: "/docs/account-setup",
  },
];

const Support = () => {
  return (
    <section className="py-10 md:py-14 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Card Container with Background */}
        <div 
          className="relative rounded-[2rem] border border-border overflow-hidden p-6 md:p-10"
          style={{
            backgroundImage: `url(${supportBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Section Heading */}
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
            <WaveText text="Community & support" />
          </h2>

          {/* Cards Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
          >
            {supportOptions.map((option) => (
              <motion.div
                key={option.title}
                variants={{
                  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    filter: "blur(0px)",
                    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }
                  },
                }}
              >
                <SupportCard
                  icon={option.icon}
                  title={option.title}
                  description={option.description}
                  linkText={option.linkText}
                  href={option.href}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Support;
