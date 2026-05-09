"use client";

import { motion } from "framer-motion";
import { FeedbackForm } from "@/components/forms/FeedbackForm";

export default function ComplaintsPage() {
  return (
    <div className="min-h-screen bg-black pt-32 pb-24 text-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white/80 text-sm font-medium tracking-wide mb-6 border border-white/10"
          >
            We Value Your Voice
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tighter mb-6"
          >
            Complaints & <span className="text-zinc-500">Suggestions</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-zinc-400 max-w-2xl mx-auto"
          >
            Whether you have a brilliant idea or need us to make things right, our dedicated team is ready to listen.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-zinc-950 p-8 md:p-12 rounded-3xl border border-zinc-900 shadow-2xl"
        >
          <FeedbackForm />
        </motion.div>
      </div>
    </div>
  );
}
