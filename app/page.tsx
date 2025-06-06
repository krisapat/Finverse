import FadeUpWhenVisible from "@/components/animation/FadeUpWhenVisible"
import MiniChartSwiper from "@/components/home/MiniChartSwiper"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { LineChart, Calculator } from 'lucide-react';
import { Metadata } from "next"
import { FeatureCard } from "@/components/home/FeatureCard"
import { FunctionCard } from "@/components/home/FunctionCard"
import { ScrollAnimatedCard } from "@/components/animation/ScrollAnimatedCard";
import AnimatedText from "@/components/animation/SplitTextWrapper";
export const metadata: Metadata = {
  title: "Currensa | Real-Time Stock Charts & Investment Tools",
  description: "Track live stock charts, get instant financial news, and analyze trends with powerful tools — all in one smart platform for modern investors.",
};

const page = () => {
  return (
    <div>
      {/* HERO SECTION */}
      <section className="relative flex justify-center items-center min-h-screen overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/1 via-white/70 to-transparent dark:from-white/10 dark:via-[#0c0c0c]/50 dark:to-transparent" />
        </div>


        <div className="relative z-10 flex flex-col items-center text-center px-4">
          <AnimatedText
            text="Plan your investments with real-time stock data"
            className="text-4xl md:text-5xl font-bold leading-tight mb-6 drop-shadow-lg"
          />
          <AnimatedText
            text="Currensa has all the features an investor needs — stock charts, economic news, calculators and in-depth analysis"
            className="text-xl md:text-2xl max-w-xl mb-6"
          />

          <div className="flex gap-4">
            <Button asChild size="lg">
              <Link href="/Real-time_graph">Get Started</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="#features">See all features</Link>
            </Button>
          </div>
        </div>

      </section>

      {/* FEATURE CARDS */}
      <section className="w-[95vw] mx-auto mt-20 py-12 px-6 rounded-xl backdrop-blur-md bg-white/20 dark:bg-white/5 border border-white/20 shadow-lg">
        <FadeUpWhenVisible>
          <h2 className="text-3xl font-semibold text-center mb-12">What can we do?</h2>
        </FadeUpWhenVisible>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-center">
          <ScrollAnimatedCard index={0}>
            <FeatureCard
              icon={<LineChart className="w-10 h-10 text-blue-500 mx-auto mb-4" />}
              title="Real-time stock chart"
              desc="View minute-by-minute stock price movements with indicators from TradingView."
            />
          </ScrollAnimatedCard>

          <ScrollAnimatedCard index={1}>
            <FeatureCard
              icon={<Calculator className="w-10 h-10 text-green-500 mx-auto mb-4" />}
              title="Financial calculator"
              desc="Calculate DCA, convert currencies and analyze dividends in a few clicks."
            />
          </ScrollAnimatedCard>
        </div>

      </section>

      {/* FUNCTION SECTION */}
      <section id="features" className="w-full py-20 px-4">
        <FadeUpWhenVisible>
          <h2 className="text-3xl font-semibold text-center mb-12">Main features of Currensa</h2>
        </FadeUpWhenVisible>
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <FadeUpWhenVisible>
            <FunctionCard
              title="Real-time stock chart"
              content={[
                'Follow live asset charts',
                'Free indicators from TradingView',
                'Multi-asset portfolio including stocks, crypto and indices',
              ]}
              link="/Real-time_graph"
            />
          </FadeUpWhenVisible>
          <FadeUpWhenVisible>
            <FunctionCard
              title="Calculating tools"
              content={[
                'Calculate DCA Investment',
                'Convert foreign currencies',
                'Calculate dividend yield',
              ]}
              link="/calculation"
            />
          </FadeUpWhenVisible>
        </div>
      </section>

      {/* RECOMMENDED STOCKS */}
      <section className="w-[90%] m-10 mx-auto">
  <div className="max-w-6xl mx-auto backdrop-blur-md bg-white/20 dark:bg-white/5 border border-white/20 shadow-xl rounded-xl p-8">
    <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-3">
      📈 Popular Stocks
    </h2>

    <div className="w-full">
      <MiniChartSwiper />
    </div>
  </div>
</section>

    </div>

  )
}
export default page
