"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Loader2, Send, CheckCircle2, AlertCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Confetti } from "@/components/effects/confetti";
import { siteConfig, businessTypes } from "@/lib/site/content";

const contactSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name"),
  company: z.string().min(2, "Please enter your company name"),
  email: z.string().email("Enter a valid email address"),
  phone: z
    .string()
    .min(7, "Enter a valid phone number")
    .regex(/^[0-9+\-\s()]+$/, "Phone can only contain digits and + - ( )"),
  whatsapp: z
    .string()
    .min(7, "Enter a valid WhatsApp number")
    .regex(/^[0-9+\-\s()]+$/, "WhatsApp number can only contain digits and + - ( )"),
  businessType: z.string().min(1, "Please select a business type"),
  message: z.string().min(10, "Please tell us a bit more (10+ characters)"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactSection() {
  const reduce = useReducedMotion();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [whatsappUrl, setWhatsappUrl] = useState<string>("");
  const [showConfetti, setShowConfetti] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
    defaultValues: {
      fullName: "",
      company: "",
      email: "",
      phone: "",
      whatsapp: "",
      businessType: "",
      message: "",
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    setStatus("loading");

    // Build the pre-filled WhatsApp message exactly per spec
    const message = `Hello ${siteConfig.founder},

I am interested in your WhatsApp Automation Platform.

Name: ${data.fullName}
Company: ${data.company}
Email: ${data.email}
Phone: ${data.phone}
WhatsApp: ${data.whatsapp}
Business: ${data.businessType}
Message: ${data.message}

Please contact me.`;

    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/${siteConfig.phoneRaw}?text=${encoded}`;

    // Small delay so users see the loading state clearly
    setTimeout(() => {
      setWhatsappUrl(url);
      setStatus("success");
      setShowConfetti(true);
      // Reset confetti flag after the animation completes
      setTimeout(() => setShowConfetti(false), 3000);
      // Open WhatsApp in a new tab
      window.open(url, "_blank", "noopener,noreferrer");
    }, 700);
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-background py-20 lg:py-28"
      aria-labelledby="contact-heading"
    >
      <Confetti trigger={showConfetti} />
      {/* Background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-10 h-72 w-72 rounded-full bg-wa-green/10 blur-3xl" />
        <div className="absolute bottom-10 right-1/4 h-72 w-72 rounded-full bg-[#128C7E]/10 blur-3xl" />
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left: copy */}
          <div className="lg:col-span-5">
            <motion.div
              initial={reduce ? undefined : { opacity: 0, y: 16 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-wa-green/30 bg-wa-green/10 px-3 py-1 text-xs font-medium text-wa-green-dark">
                <span className="h-1.5 w-1.5 rounded-full bg-wa-green" />
                Contact
              </div>
              <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
                Let&apos;s automate your WhatsApp together
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Fill the form and it opens WhatsApp with your details pre-filled, ready to send to{" "}
                <span className="font-semibold text-foreground">{siteConfig.founder}</span>. Expect a reply within minutes during business hours.
              </p>

              <a
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-3 rounded-2xl border border-wa-green/30 bg-white p-4 shadow-premium transition-all hover:-translate-y-0.5 hover:shadow-glow-wa"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-wa text-white">
                  <Phone className="h-4 w-4" />
                </span>
                <div>
                  <div className="text-xs text-muted-foreground">Call / WhatsApp</div>
                  <div className="text-sm font-bold text-foreground">{siteConfig.phone}</div>
                </div>
              </a>

              <div className="mt-6 grid grid-cols-3 gap-2 text-center">
                {[
                  { v: "<2 min", l: "Avg reply" },
                  { v: "24/7", l: "AI bot" },
                  { v: "Free", l: "Demo call" },
                ].map((s) => (
                  <div key={s.l} className="rounded-xl bg-[#F6FBF8] p-3">
                    <div className="text-sm font-bold text-foreground">{s.v}</div>
                    <div className="text-[10px] text-muted-foreground">{s.l}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: form with Border Beam */}
          <div className="lg:col-span-7">
            <div className="border-beam relative rounded-3xl bg-white p-6 shadow-premium sm:p-8">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <motion.div
                      initial={reduce ? undefined : { scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.1 }}
                      className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-wa-green/15 text-wa-green-dark"
                    >
                      <CheckCircle2 className="h-8 w-8" />
                    </motion.div>
                    <h3 className="mt-4 text-xl font-bold text-foreground">WhatsApp opened!</h3>
                    <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                      Your message is pre-filled and ready to send to {siteConfig.founder}. Just hit send in WhatsApp.
                    </p>
                    <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                      <Button asChild className="bg-gradient-wa font-semibold text-white shadow-glow-wa">
                        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                          Re-open WhatsApp
                        </a>
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setStatus("idle");
                          reset();
                        }}
                      >
                        Send another
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={reduce ? undefined : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={reduce ? undefined : { opacity: 0 }}
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    className="space-y-4"
                  >
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Full Name" htmlFor="fullName" error={errors.fullName?.message} required>
                        <Input
                          id="fullName"
                          autoComplete="name"
                          placeholder="Aarav Mehta"
                          aria-invalid={!!errors.fullName}
                          {...register("fullName")}
                        />
                      </Field>
                      <Field label="Company Name" htmlFor="company" error={errors.company?.message} required>
                        <Input
                          id="company"
                          autoComplete="organization"
                          placeholder="Acme Corp"
                          aria-invalid={!!errors.company}
                          {...register("company")}
                        />
                      </Field>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Email" htmlFor="email" error={errors.email?.message} required>
                        <Input
                          id="email"
                          type="email"
                          autoComplete="email"
                          placeholder="you@company.com"
                          aria-invalid={!!errors.email}
                          {...register("email")}
                        />
                      </Field>
                      <Field label="Phone Number" htmlFor="phone" error={errors.phone?.message} required>
                        <Input
                          id="phone"
                          type="tel"
                          autoComplete="tel"
                          placeholder="+91 98765 43210"
                          aria-invalid={!!errors.phone}
                          {...register("phone")}
                        />
                      </Field>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="WhatsApp Number" htmlFor="whatsapp" error={errors.whatsapp?.message} required>
                        <Input
                          id="whatsapp"
                          type="tel"
                          autoComplete="tel"
                          placeholder="+91 98765 43210"
                          aria-invalid={!!errors.whatsapp}
                          {...register("whatsapp")}
                        />
                      </Field>
                      <Field label="Business Type" htmlFor="businessType" error={errors.businessType?.message} required>
                        <select
                          id="businessType"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          aria-invalid={!!errors.businessType}
                          {...register("businessType")}
                        >
                          <option value="">Select business type</option>
                          {businessTypes.map((t) => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                      </Field>
                    </div>

                    <Field label="Message" htmlFor="message" error={errors.message?.message} required>
                      <Textarea
                        id="message"
                        rows={4}
                        placeholder="Tell us about your use case, current tools and what you'd like to automate…"
                        aria-invalid={!!errors.message}
                        {...register("message")}
                      />
                    </Field>

                    {status === "error" && (
                      <div className="flex items-center gap-2 rounded-xl bg-red-50 p-3 text-sm text-red-700">
                        <AlertCircle className="h-4 w-4 flex-shrink-0" />
                        Something went wrong. Please try again or message {siteConfig.founder} directly.
                      </div>
                    )}

                    <Button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full bg-gradient-wa font-semibold text-white shadow-glow-wa hover:opacity-95 disabled:opacity-70"
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Preparing WhatsApp…
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>

                    <p className="text-center text-[11px] text-muted-foreground">
                      Clicking send opens WhatsApp with your details pre-filled to{" "}
                      <span className="font-semibold">{siteConfig.phone}</span>.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  htmlFor,
  error,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={htmlFor} className="text-xs font-semibold text-foreground">
        {label}
        {required && <span className="ml-0.5 text-wa-green">*</span>}
      </Label>
      {children}
      {error && (
        <p className="flex items-center gap-1 text-[11px] font-medium text-red-600" role="alert">
          <AlertCircle className="h-3 w-3 flex-shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}
