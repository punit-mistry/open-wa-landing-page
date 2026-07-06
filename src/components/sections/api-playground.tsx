"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Copy, Check, Terminal } from "lucide-react";
import { SectionHeading } from "@/components/effects/section-heading";

// Use lucide's Check icon directly — no local redefinition needed.

type Lang = "curl" | "javascript" | "python" | "node";

const samples: Record<Lang, { code: string; label: string }> = {
  curl: {
    label: "cURL",
    code: `# Send a WhatsApp message via REST API
curl -X POST https://api.wa-automation.dev/v1/messages \\
  -H "Authorization: Bearer wa_live_xxxxxxxxxxxx" \\
  -H "Content-Type: application/json" \\
  -d '{
    "to": "+919876543210",
    "type": "text",
    "text": "Hello from WA Automation! 👋",
    "workflow": "welcome_drip"
  }'`,
  },
  javascript: {
    label: "JavaScript",
    code: `// Browser / Edge / Deno compatible
import { WAAutomation } from "@wa-automation/sdk";

const wa = new WAAutomation(process.env.WA_API_KEY);

await wa.messages.send({
  to: "+919876543210",
  text: "Hello from WA Automation! 👋",
  workflow: "welcome_drip",
});

// Subscribe to inbound messages via webhook
wa.webhooks.on("message:inbound", async (event) => {
  await wa.ai.reply(event.message, { knowledgeBaseId: "kb_main" });
});`,
  },
  node: {
    label: "Node.js",
    code: `import { WAAutomation } from "@wa-automation/sdk";
import express from "express";

const app = express();
const wa = new WAAutomation(process.env.WA_API_KEY);

app.post("/lead", async (req, res) => {
  // Trigger welcome workflow
  await wa.workflows.trigger("welcome_drip", {
    contact: req.body.phone,
    variables: { name: req.body.name },
  });
  res.json({ ok: true });
});

app.listen(3000);`,
  },
  python: {
    label: "Python",
    code: `from wa_automation import WAAutomation
import os

wa = WAAutomation(os.environ["WA_API_KEY"])

# Send message
wa.messages.send(
    to="+919876543210",
    text="Hello from WA Automation! 👋",
    workflow="welcome_drip",
)

# Listen to inbound webhook (Flask example)
@app.route("/webhook", methods=["POST"])
def webhook():
    event = request.json
    wa.ai.reply(event["message"], knowledge_base_id="kb_main")
    return {"ok": True}`,
  },
};

export function ApiPlaygroundSection() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<Lang>("javascript");
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(samples[active].code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // ignore
    }
  };

  return (
    <section
      id="api"
      className="relative overflow-hidden bg-background py-20 lg:py-28"
      aria-labelledby="api-heading"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-1/4 top-10 h-72 w-72 rounded-full bg-wa-green/10 blur-3xl" />
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
                <Terminal className="h-3 w-3" />
                Developer-first
              </div>
              <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:leading-[1.1]">
                A typed REST API your engineers will love
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Send messages, build workflows and trigger AI replies with a few lines of code. SDKs for JavaScript, Python, Go and PHP. Signed webhooks, idempotency keys and 99.9% uptime SLA included on every plan.
              </p>

              <ul className="mt-6 space-y-3">
                {[
                  "REST API + GraphQL endpoints",
                  "Official SDKs in 4 languages",
                  "Signed, retry-safe webhooks",
                  "OpenAPI 3.1 spec + Postman collection",
                  "Idempotency keys & rate-limit headers",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm">
                    <span className="inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-wa-green/15 text-wa-green-dark">
                      <Check className="h-3 w-3" strokeWidth={3.5} />
                    </span>
                    <span className="text-foreground/90">{f}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-2">
                <code className="rounded-lg bg-muted px-3 py-2 text-xs font-mono text-foreground">npm i @wa-automation/sdk</code>
                <code className="rounded-lg bg-muted px-3 py-2 text-xs font-mono text-foreground">pip install wa-automation</code>
              </div>
            </motion.div>
          </div>

          {/* Right: code window */}
          <motion.div
            initial={reduce ? undefined : { opacity: 0, y: 24 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -60px 0px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="overflow-hidden rounded-2xl border border-border bg-[#0b141a] shadow-premium">
              {/* Window chrome */}
              <div className="flex items-center justify-between border-b border-white/5 px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
                  <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
                  <span className="h-3 w-3 rounded-full bg-[#28C840]" />
                  <span className="ml-2 font-mono text-[11px] text-white/60">~/send-message.{active === "python" ? "py" : active === "curl" ? "sh" : active === "node" ? "js" : "ts"}</span>
                </div>
                <button
                  onClick={copy}
                  className="inline-flex items-center gap-1.5 rounded-md bg-white/5 px-2 py-1 text-[11px] font-medium text-white/80 transition-colors hover:bg-white/10"
                  aria-label="Copy code"
                >
                  {copied ? (
                    <>
                      <Check className="h-3 w-3 text-wa-green" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      Copy
                    </>
                  )}
                </button>
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-1 border-b border-white/5 bg-black/20 px-3 py-2">
                {(Object.keys(samples) as Lang[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setActive(lang)}
                    className={`rounded-md px-3 py-1 text-[11px] font-semibold transition-colors ${
                      active === lang
                        ? "bg-wa-green/20 text-wa-green"
                        : "text-white/50 hover:bg-white/5 hover:text-white/80"
                    }`}
                  >
                    {samples[lang].label}
                  </button>
                ))}
              </div>

              {/* Code */}
              <pre className="custom-scroll overflow-x-auto p-5 text-[12.5px] leading-relaxed text-white/90 font-mono" style={{ minHeight: "320px" }}>
                <code>{samples[active].code}</code>
              </pre>

              {/* Response indicator */}
              <div className="border-t border-white/5 bg-black/20 px-5 py-3">
                <div className="flex items-center gap-2 text-[11px]">
                  <span className="inline-flex h-2 w-2 rounded-full bg-wa-green animate-pulse" />
                  <span className="font-mono text-white/60">200 OK · 248ms</span>
                  <span className="ml-auto font-mono text-white/40">id: msg_8fA2x…</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
