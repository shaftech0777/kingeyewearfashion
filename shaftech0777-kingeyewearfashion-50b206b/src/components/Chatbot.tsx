import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Crown } from "lucide-react";
import { askKingBot } from "@/lib/chatbot.functions";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "What's the delivery time?",
  "How do I track my order?",
  "Tell me about this product",
  "Can I open & check before paying?",
];

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "assistant", content: "👑 Welcome to King Eyewear! I'm your style assistant. Ask me about the King Cartier Rimless Eyewear, delivery, order tracking, or payment." },
  ]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, open]);

  async function send(text: string) {
    if (!text.trim() || busy) return;
    const next: Msg[] = [...msgs, { role: "user", content: text }];
    setMsgs(next);
    setInput("");
    setBusy(true);
    try {
      const reply = await askKingBot({ data: { messages: next } });
      setMsgs([...next, { role: "assistant", content: reply.text }]);
    } catch (e) {
      setMsgs([...next, { role: "assistant", content: "Sorry, I'm having trouble right now. Please reach us at Kingeyewearfashion@gmail.com or 03051544177." }]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <button onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-105 transition-transform"
        aria-label="Open chat">
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[32rem] w-[22rem] max-w-[calc(100vw-2rem)] flex-col rounded-xl border bg-card shadow-2xl">
          <header className="flex items-center gap-2 border-b p-4">
            <Crown className="h-5 w-5 text-[var(--gold)]" />
            <div>
              <p className="font-semibold text-sm">King Assistant</p>
              <p className="text-xs text-muted-foreground">Online · Replies instantly</p>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {msgs.map((m, i) => (
              <div key={i} className={m.role === "user" ? "flex justify-end" : ""}>
                <div className={`max-w-[85%] rounded-lg px-3 py-2 text-sm whitespace-pre-wrap ${
                  m.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground"
                }`}>
                  {m.content}
                </div>
              </div>
            ))}
            {busy && (
              <div className="bg-muted rounded-lg px-3 py-2 text-sm w-fit text-muted-foreground">Thinking…</div>
            )}
            {msgs.length === 1 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {SUGGESTIONS.map((s) => (
                  <button key={s} onClick={() => send(s)}
                    className="text-xs rounded-full border px-3 py-1 hover:bg-muted">
                    {s}
                  </button>
                ))}
              </div>
            )}
            <div ref={endRef} />
          </div>

          <form onSubmit={(e) => { e.preventDefault(); send(input); }}
            className="flex gap-2 border-t p-3">
            <input value={input} onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything…"
              className="flex-1 rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
            <button type="submit" disabled={busy || !input.trim()}
              className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground disabled:opacity-50">
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
