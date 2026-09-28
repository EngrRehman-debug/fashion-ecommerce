"use client";

import { useState, type FormEvent } from "react";
import { whatsappLink } from "@/lib/site";
import { WhatsAppIcon } from "./icons";

const TOPICS = ["An order I placed", "Sizing & fit", "A product question", "Returns & exchanges", "Wholesale / bulk", "Something else"];

/** Enquiry form that opens a pre-filled WhatsApp message. */
export default function ContactForm() {
  const [name, setName] = useState("");
  const [topic, setTopic] = useState(TOPICS[0]);
  const [order, setOrder] = useState("");
  const [message, setMessage] = useState("");
  const [tried, setTried] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setTried(true);
    if (!name.trim() || !message.trim()) return;
    const text = [
      `Hi CWSK Enterprises! My name is ${name.trim()}.`,
      `Topic: ${topic}`,
      ...(order.trim() ? [`Order number: ${order.trim()}`] : []),
      "",
      message.trim(),
    ].join("\n");
    window.open(whatsappLink(text), "_blank", "noopener,noreferrer");
  };

  const bad = (v: string) => tried && !v.trim();

  return (
    <form onSubmit={submit} noValidate className="grid gap-5 sm:grid-cols-2">
      <label className="block">
        <span className="field-label">Your name</span>
        <input className={`field ${bad(name) ? "border-red-600" : ""}`} autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} aria-invalid={bad(name)} />
      </label>
      <label className="block">
        <span className="field-label">Topic</span>
        <select className="field" value={topic} onChange={(e) => setTopic(e.target.value)}>
          {TOPICS.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </label>
      <label className="block sm:col-span-2">
        <span className="field-label">Order number (optional)</span>
        <input className="field" placeholder="e.g. CW260928-AB12" value={order} onChange={(e) => setOrder(e.target.value)} />
      </label>
      <label className="block sm:col-span-2">
        <span className="field-label">Message</span>
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
          Please add your name and a message.
        </p>
      )}
      <div className="sm:col-span-2">
        <button type="submit" className="btn-primary">
          <WhatsAppIcon className="h-5 w-5" />
          <span>Send on WhatsApp</span>
        </button>
      </div>
    </form>
  );
}
