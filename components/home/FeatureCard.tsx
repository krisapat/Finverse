import React from 'react'

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  desc: string
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, desc }) => (
  <div className="bg-white/60 dark:bg-black/20 sm:min-h-[250px] p-6 rounded-xl shadow-md hover:scale-105 transition-all duration-300">
    {icon}
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-md text-gray-700 dark:text-gray-300">{desc}</p>
  </div>
)
