import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface FunctionCardProps {
  title: string
  content: string[]
  link: string
}

export const FunctionCard: React.FC<FunctionCardProps> = ({ title, content, link }) => (
  <div className="relative min-h-[300px] bg-white dark:bg-[#272727] p-8 rounded-xl border border-white/20 shadow-md backdrop-blur-lg">
    <h3 className="text-2xl font-semibold mb-4">{title}</h3>
    <ul className="list-disc list-inside space-y-2 text-left">
      {content.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
    <Button asChild className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
      <Link href={link}>More details</Link>
    </Button>
  </div>
)
