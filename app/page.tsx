"use client";

import { useRef, useState } from "react";
import { sendContactEmail } from "./action";
import {
  MessageCircle,
  Facebook,
  Linkedin,
  Instagram,
  ExternalLink,
} from "lucide-react";
import { Toaster, toast } from "react-hot-toast";

export default function PersonalLandingPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);

    const formData = new FormData(e.currentTarget);
    const result = await sendContactEmail(formData);

    setIsPending(false);

    if (result?.success) {
      toast.success("Message sent successfully!"); // <-- Modern success toast
      formRef.current?.reset();
    } else {
      toast.error("Failed to send message. Please try again."); // <-- Modern error toast
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4 sm:p-8 bg-slate-950 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-slate-800 via-slate-950 to-slate-950">
      {/* This renders the popup notifications */}
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#1e293b",
            color: "#fff",
          },
        }}
      />

      <div className="bg-slate-900/80 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-slate-800 max-w-md w-full">
        <div className="text-center mb-6">
          <div className="w-24 h-24 bg-slate-800 rounded-full mx-auto mb-4 overflow-hidden border-4 border-slate-700 shadow-lg">
            <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-400 font-medium">
              <img src="/image.png" alt="profile image" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            BABALAWO IFAWUYI
          </h1>
          <p className="text-cyan-500 font-medium text-sm mt-1">
            Consultation & Guidance
          </p>
          <p className="text-slate-400 text-sm mt-3 px-4 leading-relaxed">
            For consultations, spiritual guidance, and traditional Ifá
            divination, Consultations are available by appointment. Please send
            a message to schedule a suitable time.
          </p>
        </div>

        {/* Social Icons Row */}
        <div className="flex justify-center gap-4 mb-8">
          <a
            href="https://www.facebook.com/share/1C1TCsaGYH/?mibextid=wwXIfr"
            className="p-2 bg-slate-800 rounded-full text-slate-400 hover:text-cyan-400 hover:bg-slate-700 transition-all"
          >
            <Facebook size={20} />
          </a>
          <a
            href="#"
            className="p-2 bg-slate-800 rounded-full text-slate-400 hover:text-cyan-400 hover:bg-slate-700 transition-all"
          >
            <Instagram size={20} />
          </a>
        </div>

        {/* Quick Links (Linktree Style) */}
        <div className="space-y-3 mb-8">
          {/* WhatsApp Button */}
          <a
            href="https://api.whatsapp.com/send?phone=2347044237704"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-between px-4 py-3 bg-green-600/10 border border-green-500/30 text-green-400 rounded-xl hover:bg-green-600/20 transition-all"
          >
            <span className="flex items-center gap-3 font-medium">
              <MessageCircle size={20} /> Chat on WhatsApp
            </span>
            <ExternalLink size={16} className="opacity-50" />
          </a>

        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-slate-800"></div>
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
            Or Send an Email
          </span>
          <div className="flex-1 h-px bg-slate-800"></div>
        </div>

        {/* Contact Form */}
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="senderName"
              required
              className="w-full px-4 py-3 bg-slate-950/50 border border-slate-800 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all text-sm placeholder:text-slate-600"
              placeholder="Your Name"
            />
          </div>

          <div>
            <input
              type="email"
              name="senderEmail"
              required
              className="w-full px-4 py-3 bg-slate-950/50 border border-slate-800 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all text-sm placeholder:text-slate-600"
              placeholder="Your Email"
            />
          </div>

          <div>
            <textarea
              name="message"
              required
              rows={3}
              className="w-full px-4 py-3 bg-slate-950/50 border border-slate-800 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all text-sm resize-none placeholder:text-slate-600"
              placeholder="Have questions or need spiritual guidance?"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className={`w-full text-white font-medium py-3 rounded-xl transition-all shadow-lg ${
              isPending
                ? "bg-cyan-900/50 text-cyan-500 cursor-not-allowed"
                : "bg-cyan-600 hover:bg-cyan-500 hover:shadow-cyan-500/20"
            }`}
          >
            {isPending ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </main>
  );
}
