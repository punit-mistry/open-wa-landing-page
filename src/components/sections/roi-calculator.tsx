"use client";

import { useState, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Clock, IndianRupee, TrendingUp, Users, ArrowRight, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/effects/section-heading";
import { Button } from "@/components/ui/button";
import { useCountUp } from "@/hooks/use-count-up";

function RoiStat({
  icon: Icon,
  label,
  value,
  prefix,
  suffix,
  color,
  delay,
}: {
  icon: any;
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  color: string;
  delay: number;
}) {
  const reduce = useReducedMotion();
  const { ref, display } = useCountUp(value, { prefix, suffix, duration: 800 });

  return (
    <motion.div
      initial={reduce ? undefined : { opacity: 0, y: 16 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="rounded-2xl border border-border bg-card p-5 shadow-premium"
    >
      <div className="flex items-center gap-2">
        <span
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg"
          style={{ backgroundColor: `${color}1a`, color }}
        >
          <Icon className="h-4 w-4" />
        </span>
        <span className="text-xs font-medium text-muted-foreground">{label}</span>
      </div>
      <div ref={ref} className="mt-2 text-2xl font-bold tabular-nums text-foreground">
        {display}
      </div>
    </motion.div>
  );
}

export function RoiCalculatorSection() {
  const reduce = useReducedMotion();
  const [messages, setMessages] = useState(10000);
  const [teamSize, setTeamSize] = useState(5);

  const calc = useMemo(() => {
    // Assumptions (clearly stated for transparency):
    // - Manual send: 5 mins per 100 messages → 0.05 hrs per message
    // - Manual cost: ₹200/hr for human operator
    // - Automation saves 92% of manual time
    // - Leads recovered: 35% of messages that would've been missed after-hours
    // - Avg lead value: ₹850
    const hoursManual = messages * 0.05;
    const hoursSaved = Math.round(hoursManual * 0.92);
    const moneyManual = hoursManual * 200;
    const moneySaved = Math.round(moneyManual * 0.92);
    const leadsRecovered = Math.round(messages * 0.35 * 0.4); // 40% of after-hours convos
    const leadsValue = leadsRecovered * 850;
    const totalBenefit = moneySaved + leadsValue;
    const platformCost = teamSize <= 3 ? 2499 : teamSize <= 10 ? 7999 : 25000;
    const roi = Math.round(((totalBenefit - platformCost) / platformCost) * 100);
    return {
      hoursSaved,
      moneySaved,
      leadsRecovered,
      roi: Math.max(0, roi),
      platformCost,
    };
  }, [messages, teamSize]);

  const formatINR = (n: number) =>
    new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(n);

  return (
    <section
      id="roi-calculator"
      className="relative overflow-hidden bg-subtle py-20 lg:py-28"
      aria-labelledby="roi-heading"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-dots opacity-30" />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="ROI Calculator"
          title="See exactly how much you save"
          description="Drag the sliders to your scale. We'll show you the hours, money and recovered leads — calculated transparently, no fluff."
        />

        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 24 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -60px 0px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-12 max-w-5xl"
        >
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Sliders */}
            <div className="rounded-3xl border border-border bg-card p-6 shadow-premium sm:p-8">
              <div className="space-y-8">
                <div>
                  <div className="flex items-baseline justify-between">
                    <label htmlFor="roi-msg" className="text-sm font-semibold text-foreground">
                      Messages sent per month
                    </label>
                    <div className="text-2xl font-bold tabular-nums text-wa-green-dark">
                      {formatINR(messages)}
                    </div>
                  </div>
                  <input
                    id="roi-msg"
                    type="range"
                    min={500}
                    max={100000}
                    step={500}
                    value={messages}
                    onChange={(e) => setMessages(Number(e.target.value))}
                    className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full bg-gradient-to-r from-wa-green to-[#128C7E] outline-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-card [&::-webkit-slider-thumb]:shadow-glow-wa [&::-webkit-slider-thumb]:ring-2 [&::-webkit-slider-thumb]:ring-wa-green [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-card"
                  />
                  <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
                    <span>500</span>
                    <span>50K</span>
                    <span>100K</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-baseline justify-between">
                    <label htmlFor="roi-team" className="text-sm font-semibold text-foreground">
                      Team size (operators)
                    </label>
                    <div className="text-2xl font-bold tabular-nums text-wa-green-dark">
                      {teamSize}
                    </div>
                  </div>
                  <input
                    id="roi-team"
                    type="range"
                    min={1}
                    max={50}
                    step={1}
                    value={teamSize}
                    onChange={(e) => setTeamSize(Number(e.target.value))}
                    className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full bg-gradient-to-r from-wa-green to-[#128C7E] outline-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-card [&::-webkit-slider-thumb]:shadow-glow-wa [&::-webkit-slider-thumb]:ring-2 [&::-webkit-slider-thumb]:ring-wa-green [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-card"
                  />
                  <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
                    <span>1</span>
                    <span>25</span>
                    <span>50</span>
                  </div>
                </div>

                <div className="rounded-2xl bg-wa-green/5 p-4 text-xs leading-relaxed text-muted-foreground">
                  <strong className="text-foreground">Assumptions:</strong> Manual send = 5 min per 100 messages. Operator cost = ₹200/hr. Automation saves 92% of manual time. 35% of after-hours convos recovered as leads (avg value ₹850).
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <RoiStat icon={Clock} label="Hours saved / mo" value={calc.hoursSaved} suffix="h" color="#25D366" delay={0} />
                <RoiStat icon={IndianRupee} label="Money saved / mo" value={calc.moneySaved} prefix="₹" color="#128C7E" delay={0.08} />
                <RoiStat icon={TrendingUp} label="Leads recovered / mo" value={calc.leadsRecovered} color="#53BDEB" delay={0.16} />
                <RoiStat icon={Users} label="Team productivity" value={92} suffix="%" color="#075E54" delay={0.24} />
              </div>

              {/* ROI hero number */}
              <div className="relative overflow-hidden rounded-2xl border-2 border-wa-green/30 bg-gradient-to-br from-wa-green/10 to-card p-6 shadow-glow-wa">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-wa-green-dark">
                      <Sparkles className="h-3 w-3" />
                      Your ROI
                    </div>
                    <div className="mt-1 text-5xl font-bold tabular-nums text-gradient-wa">
                      {calc.roi}%
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      Return on platform cost (₹{formatINR(calc.platformCost)}/mo)
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">Total benefit / mo</div>
                    <div className="text-2xl font-bold text-foreground">
                      ₹{formatINR(calc.moneySaved + calc.leadsRecovered * 850)}
                    </div>
                  </div>
                </div>
                <Button asChild className="mt-4 w-full bg-gradient-wa font-semibold text-white shadow-glow-wa">
                  <a href="#contact">
                    Claim this ROI
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
