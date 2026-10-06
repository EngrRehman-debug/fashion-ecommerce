"use client";

import { useState, type FormEvent } from "react";
import { useT } from "@/lib/i18n/client";
import { whatsappLink } from "@/lib/site";
import { WhatsAppIcon } from "./icons";

/** Enquiry form that opens a pre-filled WhatsApp message. */
export default function ContactForm() {
  const t = useT();
  const f = t.m.contact.form;
  const w = t.m.whatsapp;
  const [name, setName] = useState("");
  const [topic, setTopic] = useState(f.topics[0]);
  const [order, setOrder] = useState("");
  const [message, setMessage] = useState("");
  const [tried, setTried] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setTried(true);
    if (!name.trim() || !message.trim()) return;
    const text = [
      w.contactIntro(name.trim()),
      `${w.topic}: ${topic}`,
      ...(order.trim() ? [`${w.orderNumber}: ${order.trim()}`] : []),
      "",
      message.trim(),
    ].join("\n");
    window.open(whatsappLink(text), "_blank", "noopener,noreferrer");
  };

  const bad = (v: string) => tried && !v.trim();

  return (
    <form onSubmit={submit} noValidate className="grid gap-5 sm:grid-cols-2">
      <label className="block">
        <span className="field-label">{f.name}</span>
        <input className={`field ${bad(name) ? "border-red-600" : ""}`} autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} aria-invalid={bad(name)} />
      </label>
      <label className="block">
        <span className="field-label">{f.topic}</span>
        <select className="field" value={topic} onChange={(e) => setTopic(e.target.value)}>
          {f.topics.map((tp) => (
            <option key={tp}>{tp}</option>
          ))}
        </select>
      </label>
      <label className="block sm:col-span-2">
        <span className="field-label">{f.orderNumber}</span>
        <input className="field" placeholder={f.orderPlaceholder} value={order} onChange={(e) => setOrder(e.target.value)} />
      </label>
      <label className="block sm:col-span-2">
        <span className="field-label">{f.message}</span>
        <textarea
          className={`field resize-none ${bad(message) ? "border-red-600" : ""}`}
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          aria-invalid={bad(message)}
        />
      </label>
      {tried && (bad(name) || bad(message)) && (
        <p role="alert" className="text-[13px] text-red-700 sm:col-span-2">
          {f.missing}
        </p>
      )}
      <div className="sm:col-span-2">
        <button type="submit" className="btn-primary">
          <WhatsAppIcon className="h-5 w-5" />
          <span>{f.send}</span>
        </button>
      </div>
    </form>
  );
}
