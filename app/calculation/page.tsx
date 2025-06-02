import FadeUpWhenVisible from "@/components/animation/FadeUpWhenVisible"
import { Metadata } from "next"
import FeatureCard from "@/components/calculation/FeatureCard"

export const metadata: Metadata = {
  title: 'Currensa | DCA Calculators',
  description: 'Access powerful financial tools including DCA investment planning, currency conversion, and dividend calculators — all in one place to support smarter investing decisions.',
}
const features = [
  {
    title: "Calculate DCA Investment",
    description: "Calculate the results of DCA investments",
    link: "/calculation/dca",
  },
  {
    title: "Currency Conversion",
    description: "Convert currencies in real time",
    link: "/calculation/conversion",
  },
  {
    title: "Calculate Dividends",
    description:
      "Enter the investment amount and percentage of dividends. The system will calculate the dividends",
    link: "/calculation/dividends",
  },
];

const calculation = () => {
  return (
    <div className="w-full min-h-screen z-10 relative flex flex-col justify-center items-center pt-28">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/1 via-white/70 to-transparent dark:from-white/10 dark:via-[#0c0c0c]/50 dark:to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full flex flex-col items-center">
        <FadeUpWhenVisible>
          <h1 className="text-3xl mb-6 text-center font-semibold">Function</h1>
        </FadeUpWhenVisible>
        <FadeUpWhenVisible>
          <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3 w-[80vw] max-w-6xl">
            {features.map((feature) => (
              <FeatureCard
                key={feature.title}
                title={feature.title}
                description={feature.description}
                link={feature.link}
              />
            ))}
          </div>
        </FadeUpWhenVisible>
      </div>
    </div>
  )
}
export default calculation