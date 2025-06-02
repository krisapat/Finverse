'use client'

import { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { stockItems } from '@/utils/stockItemslist'
import MiniChart from '../minichart/MiniChart'

import 'swiper/css'
import 'swiper/css/navigation'

export default function RecommendedStocks() {
  const prevRef = useRef(null)
  const nextRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [visibleIndexes, setVisibleIndexes] = useState([0])

  const handleSlideChange = (swiper: any) => {
    const current = swiper.realIndex
    setActiveIndex(current)
    if (!visibleIndexes.includes(current)) {
      setVisibleIndexes((prev) => [...prev, current])
    }
  }

  return (
    <div className="w-full px-4 py-8 md:px-10 relative">
      {/* Navigation Buttons */}
      <Button
        ref={prevRef}
        variant="ghost"
        size="icon"
        className="absolute top-1/2 left-2 md:left-4 transform -translate-y-1/2 z-20 backdrop-blur-md bg-white/10 hover:bg-white/20 text-white hover:text-black border border-white/10 rounded-full"
      >
        <ChevronLeft size={20} />
      </Button>
      <Button
        ref={nextRef}
        variant="ghost"
        size="icon"
        className="absolute top-1/2 right-2 md:right-4 transform -translate-y-1/2 z-20 backdrop-blur-md bg-white/10 hover:bg-white/20 text-white hover:text-black border border-white/10 rounded-full"
      >
        <ChevronRight size={20} />
      </Button>

      {/* Swiper */}
      <Swiper
        modules={[Autoplay, Navigation]}
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        navigation={{
          prevEl: prevRef.current!,
          nextEl: nextRef.current!,
        }}
        onBeforeInit={(swiper) => {
          if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
            swiper.params.navigation.prevEl = prevRef.current
            swiper.params.navigation.nextEl = nextRef.current
          }
        }}
        onSlideChange={handleSlideChange}
        loop
        spaceBetween={30}
        slidesPerView={1}
      >
        {stockItems.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="rounded-2xl flex justify-center items-center w-full h-full transition-transform duration-500">
              <div className="w-full max-w-4xl mx-auto text-center bg-white/60 dark:bg-black/20 p-6 rounded-xl shadow-lg border border-white/10">
                {visibleIndexes.includes(index) && (
                  <MiniChart symbol={item.symbol} height="300" uniqueId={`chart-${index}`} />
                )}
                <div className="pt-4">
                  <h1 className="text-xl font-semibold text-black dark:text-white">
                    {item.title}
                  </h1>
                </div>
              </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Pagination Dots */}
      <div className="mt-6 flex justify-center gap-2">
        {stockItems.map((_, idx) => (
          <div
            key={idx}
            className={`h-2.5 rounded-full transition-all duration-300 ${activeIndex === idx
                ? 'w-6 bg-white'
                : 'w-2.5 bg-white/30'
              }`}
          />
        ))}
      </div>
    </div>
  )
}
