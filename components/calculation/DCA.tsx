'use client'

import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from 'recharts'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Undo2 } from 'lucide-react'
import { AnimatedNumber } from '../animation/AnimatedNumber'
interface ChartPoint {
    month: number
    value: number
}
export default function DCA() {
    const [initial, setInitial] = useState(0)
    const [monthly, setMonthly] = useState(0)
    const [rate, setRate] = useState(5)
    const [years, setYears] = useState(10)
    const [data, setData] = useState<ChartPoint[]>([])
    const [finalValue, setFinalValue] = useState(0)

    useEffect(() => {
        if (initial >= 0 && monthly >= 0 && rate >= 0 && years > 0) {
            const monthlyRate = rate / 100 / 12
            const months = years * 12
            let total = initial
            const chartData = [{ month: 0, value: parseFloat(total.toFixed(2)) }]

            for (let i = 1; i <= months; i++) {
                total = total * (1 + monthlyRate) + monthly
                chartData.push({ month: i, value: parseFloat(total.toFixed(2)) })
            }

            setData(chartData)
            setFinalValue(parseFloat(total.toFixed(2)))
        }
    }, [initial, monthly, rate, years])

    const totalInvested = initial + monthly * (years * 12)
    const totalGain = finalValue - totalInvested
    return (
        <div className="relative flex justify-center items-center min-h-[80vh] overflow-hidden pt-28">
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-black/1 via-white/70 to-transparent dark:from-white/10 dark:via-[#0c0c0c]/50 dark:to-transparent" />
            </div>

            <div className="relative w-[90vw] max-w-3xl mx-auto space-y-8 p-8 border-white/20 shadow-md backdrop-blur-lg rounded-xl
                      bg-white dark:bg-[#272727] z-10">
                <div className='flex justify-between items-center space-x-4 mx-auto'>
                    <h1 className="text-3xl font-bold">DCA Investment Calculator</h1>
                    <Button asChild className='bg-white dark:bg-black/30'>
                        <Link href={'/calculation'}><Undo2 className='text-black dark:text-white' /></Link>
                    </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                        type="number"
                        placeholder="Initial Investment (THB)"
                        className="bg-white rounded-lg"
                        onChange={(e) => setInitial(Number(e.target.value))}
                    />
                    <Input
                        type="number"
                        placeholder="Monthly Contribution (THB)"
                        className="bg-white rounded-lg"
                        onChange={(e) => setMonthly(Number(e.target.value))}
                    />
                    <Input
                        type="number"
                        placeholder="Annual Return Rate (%)"
                        className="bg-white rounded-lg"
                        onChange={(e) => setRate(Number(e.target.value))}
                    />
                    <Input
                        type="number"
                        placeholder="Investment Period (Years)"
                        className="bg-white rounded-lg"
                        onChange={(e) => setYears(Number(e.target.value))}
                    />
                </div>

                {data.length > 0 && (
                    <Card className="shadow-lg rounded-2xl">
                        <CardContent className="pt-6">
                            <h2 className="text-xl font-semibold mb-4 text-center">
                                Investment Growth Over Time
                            </h2>
                            <ResponsiveContainer width="100%" height={320}>
                                <LineChart data={data}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(229, 231, 235, 0.5)" />

                                    <XAxis dataKey="month" stroke="#6b7280" tick={{ fontSize: 12 }} />
                                    <YAxis stroke="#6b7280" tick={{ fontSize: 12 }} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#f3f4f6', borderColor: '#4f46e5' }}
                                        labelStyle={{ color: '#111827' }}
                                        itemStyle={{ color: '#111827' }}
                                        formatter={(value: number | string) => [`฿${Number(value).toLocaleString()}`, 'Total Value']}
                                        labelFormatter={(label: number | string) => `Month ${label}`}
                                    />

                                    <Line
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#72d572"
                                        strokeWidth={3}
                                        dot={false}
                                        isAnimationActive
                                    />
                                </LineChart>
                            </ResponsiveContainer>

                            {/* Summary Section */}
                            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center text-base">
                                <div>
                                    <div className="text-sm text-gray-500">Final Value</div>
                                    <AnimatedNumber
                                        value={finalValue}
                                        format={(val) =>
                                            `฿${val.toLocaleString("th-TH", {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2,
                                            })}`
                                        }
                                        className="text-lg font-bold text-green-600"
                                    />
                                </div>

                                <div>
                                    <div className="text-sm text-gray-500">Total Invested</div>
                                    <AnimatedNumber
                                        value={totalInvested}
                                        format={(val) =>
                                            `฿${val.toLocaleString("th-TH", {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2,
                                            })}`
                                        }
                                        className="text-lg font-bold text-green-600"
                                    />
                                </div>

                                <div>
                                    <div className="text-sm text-gray-500">Total Gain</div>
                                    <AnimatedNumber
                                        value={totalGain}
                                        format={(val) =>
                                            `฿${val.toLocaleString("th-TH", {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2,
                                            })}`
                                        }
                                        className="text-lg font-bold text-green-600"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
}
