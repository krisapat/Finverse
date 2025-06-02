"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import { Undo2 } from "lucide-react";
import { AnimatedNumber } from "../animation/AnimatedNumber";

export default function DividendCalculator() {
    const [principalInvestment, setPrincipalInvestment] = useState<string>("");
    const [annualReturnPercent, setAnnualReturnPercent] = useState<string>("");
    const [annualDividend, setAnnualDividend] = useState<number | null>(null);
    const [monthlyDividend, setMonthlyDividend] = useState<number | null>(null);

    const isValid = () => {
        const principal = parseFloat(principalInvestment);
        const percent = parseFloat(annualReturnPercent);
        return !isNaN(principal) && principal > 0 && !isNaN(percent) && percent > 0;
    };

    useEffect(() => {
        if (isValid()) {
            const principal = parseFloat(principalInvestment);
            const percent = parseFloat(annualReturnPercent);
            const annual = principal * (percent / 100);
            const monthly = annual / 12;
            setAnnualDividend(annual);
            setMonthlyDividend(monthly);
        } else {
            setAnnualDividend(null);
            setMonthlyDividend(null);
        }
    }, [principalInvestment, annualReturnPercent]);

    return (
        <div className="relative flex justify-center items-center min-h-[80vh] overflow-hidden pt-28">
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-black/1 via-white/70 to-transparent dark:from-white/10 dark:via-[#0c0c0c]/50 dark:to-transparent" />
            </div>
            <div className="relative w-[90vw] max-w-3xl mx-auto space-y-8 p-8 border-white/20 shadow-md backdrop-blur-lg rounded-xl
                      bg-white dark:bg-[#272727] z-10">
                <div className="flex justify-between items-center space-x-4 mx-auto">
                    <h1 className="text-3xl font-bold">Dividend calculator</h1>
                    <Button asChild className="bg-white dark:bg-black/30">
                        <Link href="/calculation">
                            <Undo2 className="text-black dark:text-white" />
                        </Link>
                    </Button>
                </div>

                <div className="space-y-4">
                    <div>
                        <Input
                            id="principal-investment"
                            type="number"
                            value={principalInvestment}
                            onChange={(e) => setPrincipalInvestment(e.target.value)}
                            placeholder="Investment amount (baht)"
                        />
                    </div>

                    <div>
                        <Input
                            id="annual-return"
                            type="number"
                            value={annualReturnPercent}
                            onChange={(e) => setAnnualReturnPercent(e.target.value)}
                            placeholder="Annual return (%)"
                        />
                    </div>
                </div>

                <Card>
                    <CardContent className="p-6 text-center space-y-2">
                        {isValid() ? (
                            <>
                                <p className="text-sm text-muted-foreground">Estimated annual dividend:</p>
                                <AnimatedNumber
                                    value={annualDividend ?? 0}
                                    format={(val) =>
                                        val.toLocaleString("th-TH", {
                                            style: "currency",
                                            currency: "THB",
                                        })
                                    }
                                    className="text-2xl font-semibold text-green-600"
                                />

                                <p className="text-sm text-muted-foreground">Which is about</p>
                                <AnimatedNumber
                                    value={monthlyDividend ?? 0}
                                    format={(val) =>
                                        val.toLocaleString("th-TH", {
                                            style: "currency",
                                            currency: "THB",
                                        })
                                    }
                                    className="text-xl font-medium text-blue-600"
                                />
                                <p className="text-sm text-muted-foreground">/ month</p>
                            </>
                        ) : (
                            <p className="text-lg font-medium">Waiting for information 😉</p>
                        )}
                    </CardContent>

                </Card>
            </div>
        </div>
    );
}
