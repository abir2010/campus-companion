'use client';

import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useState, useMemo } from "react";

export default function FeeCalculatorPage() {
  const [credits, setCredits] = useState(15);
  const [costPerCredit, setCostPerCredit] = useState(350);
  const [additionalFees, setAdditionalFees] = useState(500);
  const [paymentPlan, setPaymentPlan] = useState("full");

  const { tuition, planFee, total } = useMemo(() => {
    const tuition = credits * costPerCredit;
    const planFee = paymentPlan === "installment" ? tuition * 0.05 : 0;
    const total = tuition + additionalFees + planFee;
    return { tuition, planFee, total };
  }, [credits, costPerCredit, additionalFees, paymentPlan]);

  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <div>
      <PageHeader
        title="Fee Calculator"
        description="Estimate your tuition and other fees for the upcoming semester."
      />
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Fee Calculation Inputs</CardTitle>
            <CardDescription>Adjust the values below to see your estimated costs.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="credits">Credit Hours</Label>
                <span className="font-semibold">{credits}</span>
              </div>
              <Slider
                id="credits"
                min={1}
                max={24}
                step={1}
                value={[credits]}
                onValueChange={(value) => setCredits(value[0])}
              />
            </div>
             <div className="space-y-2">
                <Label htmlFor="costPerCredit">Cost per Credit Hour ($)</Label>
                <Input
                    id="costPerCredit"
                    type="number"
                    value={costPerCredit}
                    onChange={(e) => setCostPerCredit(Number(e.target.value))}
                />
            </div>
             <div className="space-y-2">
                <Label htmlFor="additionalFees">Additional Fees ($)</Label>
                <Input
                    id="additionalFees"
                    type="number"
                    value={additionalFees}
                    onChange={(e) => setAdditionalFees(Number(e.target.value))}
                />
            </div>
             <div className="space-y-2">
                <Label htmlFor="paymentPlan">Payment Plan</Label>
                <Select value={paymentPlan} onValueChange={setPaymentPlan}>
                    <SelectTrigger id="paymentPlan">
                        <SelectValue placeholder="Select a plan" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="full">Pay in Full</SelectItem>
                        <SelectItem value="installment">Installment Plan (+5% fee)</SelectItem>
                    </SelectContent>
                </Select>
            </div>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
            <CardHeader>
                <CardTitle>Estimated Fees</CardTitle>
                <CardDescription>Here is a breakdown of your estimated costs.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow space-y-4 text-lg">
                <div className="flex justify-between">
                    <span>Tuition ({credits} credits):</span>
                    <span className="font-semibold">{currencyFormatter.format(tuition)}</span>
                </div>
                <div className="flex justify-between">
                    <span>Additional Fees:</span>
                    <span className="font-semibold">{currencyFormatter.format(additionalFees)}</span>
                </div>
                 <div className="flex justify-between">
                    <span>Payment Plan Fee:</span>
                    <span className="font-semibold">{currencyFormatter.format(planFee)}</span>
                </div>
                 <div className="flex justify-between border-t pt-4 font-bold text-xl">
                    <span>Total Estimated Cost:</span>
                    <span>{currencyFormatter.format(total)}</span>
                </div>
            </CardContent>
            <CardFooter>
                <p className="text-xs text-muted-foreground">This is only an estimate. Actual fees may vary.</p>
            </CardFooter>
        </Card>
      </div>
    </div>
  );
}
