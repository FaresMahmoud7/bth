"use client";

import { useState } from "react";
import { submitFeedback } from "@/actions/submitFeedback";
import { CheckCircle2, Loader2, Send } from "lucide-react";

export const FeedbackForm = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);

    try {
      const result = await submitFeedback(formData);

      if (result.success && result.waLink) {
        setSuccess(true);
        // Add a slight delay before redirecting to show the success state
        setTimeout(() => {
          window.location.href = result.waLink!;
        }, 1500);
      } else {
        setError(result.error || "Failed to submit. Please try again.");
        setLoading(false);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-6 text-center bg-zinc-900 rounded-3xl border border-zinc-800 animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-500" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">Submission Successful</h3>
        <p className="text-zinc-400 text-lg mb-8 max-w-sm">
          Thank you for reaching out. We are redirecting you to our dedicated WhatsApp line...
        </p>
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {error && (
        <div className="p-4 bg-red-500/10 text-red-400 rounded-xl text-sm font-medium border border-red-500/20 animate-in fade-in slide-in-from-top-2">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-bold text-zinc-400 mb-2">Full Name</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            required 
            className="w-full h-14 px-5 rounded-xl border border-zinc-800 bg-zinc-900 text-white focus:bg-zinc-800 focus:border-zinc-700 focus:ring-1 focus:ring-zinc-700 outline-none transition-all placeholder:text-zinc-600" 
            placeholder="Jane Doe" 
          />
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-bold text-zinc-400 mb-2">Phone Number</label>
          <input 
            type="tel" 
            id="phone" 
            name="phone" 
            required 
            className="w-full h-14 px-5 rounded-xl border border-zinc-800 bg-zinc-900 text-white focus:bg-zinc-800 focus:border-zinc-700 focus:ring-1 focus:ring-zinc-700 outline-none transition-all placeholder:text-zinc-600" 
            placeholder="+1 (555) 000-0000" 
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-zinc-400 mb-3">Submission Type</label>
        <div className="flex gap-4">
          <label className="flex-1 cursor-pointer">
            <input type="radio" name="type" value="complaint" className="peer sr-only" required />
            <div className="w-full h-14 flex items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-400 peer-checked:bg-white peer-checked:text-black peer-checked:border-white font-semibold transition-all">
              Complaint
            </div>
          </label>
          <label className="flex-1 cursor-pointer">
            <input type="radio" name="type" value="suggestion" className="peer sr-only" required />
            <div className="w-full h-14 flex items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-400 peer-checked:bg-white peer-checked:text-black peer-checked:border-white font-semibold transition-all">
              Suggestion
            </div>
          </label>
        </div>
      </div>
      
      <div>
        <label htmlFor="message" className="block text-sm font-bold text-zinc-400 mb-2">Message Details</label>
        <textarea 
          id="message" 
          name="message" 
          required 
          rows={5} 
          className="w-full p-5 rounded-xl border border-zinc-800 bg-zinc-900 text-white focus:bg-zinc-800 focus:border-zinc-700 focus:ring-1 focus:ring-zinc-700 outline-none transition-all resize-none placeholder:text-zinc-600" 
          placeholder="Please provide the details here..." 
        />
      </div>
      
      <button 
        type="submit" 
        disabled={loading}
        className="w-full flex items-center justify-center gap-3 h-16 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors mt-2 disabled:opacity-70 disabled:cursor-not-allowed group"
      >
        {loading ? (
          <Loader2 className="w-6 h-6 animate-spin" />
        ) : (
          <>
            <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            Send via WhatsApp
          </>
        )}
      </button>
      
      <p className="text-center text-xs text-zinc-500 mt-2">
        Your submission will be processed entirely via email and WhatsApp. No data is saved to our databases.
      </p>
    </form>
  );
};
