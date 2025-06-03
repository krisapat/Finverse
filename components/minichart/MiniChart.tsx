'use client'

import { useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'

const MiniChart = ({
  symbol = 'NASDAQ:AAPL',
  width = '100%',
  height = '300',
  uniqueId = 'default',
}) => {
  const { resolvedTheme } = useTheme()
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!containerRef.current || !resolvedTheme) return

    containerRef.current.innerHTML = ''

    const script = document.createElement('script')
    script.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js'
    script.async = true
    script.innerHTML = JSON.stringify({
      symbol,
      width,
      height,
      locale: 'en',
      dateRange: '1D',
      colorTheme: resolvedTheme === 'dark' ? 'dark' : 'light',
      isTransparent: false,
      autosize: true,
    })

    containerRef.current.appendChild(script)

    return () => {
      // Cleanup on unmount
      if (containerRef.current) {
        containerRef.current.innerHTML = ''
      }
    }
  }, [symbol, resolvedTheme, height, width])

  return (
    <div
      ref={containerRef}
      className="rounded-lg overflow-hidden"
      id={`tradingview-mini-chart-${uniqueId}`}
    />
  )
}

export default MiniChart
