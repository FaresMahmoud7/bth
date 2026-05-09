"use client";

import { useState } from "react";
import { submitProductRequest } from "@/actions/submitRequest";
import { CheckCircle2, Loader2, MessageSquare } from "lucide-react";

export const ProductRequestForm = ({ productName }: { productName: string }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    formData.append("productName", productName);

    try {
      const result = await submitProductRequest(formData);

      if (result.success && result.waLink) {
        setSuccess(true);
        // Add a slight delay before redirecting to show the success state
        setTimeout(() => {
          window.location.href = result.waLink!;
        }, 1500);
      } else {
        setError(result.error || "Failed to submit request.");
        setLoading(false);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-10 px-6 text-center bg-green-50 rounded-2xl border border-green-100 animate-in fade-in zoom-in duration-300">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle2 className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-green-900 mb-2">Request Received!</h3>
        <p className="text-green-700 text-sm mb-6">Your details have been saved securely. Redirecting you to WhatsApp to start the conversation...</p>
        <Loader2 className="w-6 h-6 text-green-600 animate-spin" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100 animate-in fade-in slide-in-from-top-2">
          {error}
        </div>
      )}
      
      <div>
        <label htmlFor="name" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Full Name</label>
        <input 
          type="text" 
          id="name" 
          name="name" 
          required 
          minLength={3}
          maxLength={50}
          className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-zinc-50 focus:bg-white focus:border-black focus:ring-1 focus:ring-black outline-none transition-all" 
          placeholder="John Doe" 
        />
      </div>
      
      <div>
        <label htmlFor="phone" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Phone Number</label>
        <input 
          type="tel" 
          id="phone" 
          name="phone" 
          required 
          pattern="05[0-9]{8}"
          title="Please enter a valid Saudi mobile number starting with 05 (10 digits)"
          className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-zinc-50 focus:bg-white focus:border-black focus:ring-1 focus:ring-black outline-none transition-all" 
          placeholder="05xxxxxxx" 
        />
      </div>
      
      <div>
        <label htmlFor="message" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Message</label>
        <textarea 
          id="message" 
          name="message" 
          required 
          minLength={10}
          maxLength={1000}
          rows={3} 
          className="w-full p-4 rounded-xl border border-gray-200 bg-zinc-50 focus:bg-white focus:border-black focus:ring-1 focus:ring-black outline-none transition-all resize-none" 
          placeholder="Tell us about your project goals..." 
        />
      </div>
      
      <button 
        type="submit" 
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 h-14 bg-black text-white rounded-xl font-bold hover:bg-gray-800 transition-colors mt-4 disabled:opacity-70 disabled:cursor-not-allowed group"
      >
        {loading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <>
            <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Send & Continue to WhatsApp
          </>
        )}
      </button>
      
      <p className="text-center text-xs text-gray-400 mt-2">
        By submitting, you agree to our terms. Your information is securely stored.
      </p>
    </form>
  );
};
