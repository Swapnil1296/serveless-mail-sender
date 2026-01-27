import React, { useState } from "react";
import { motion } from "framer-motion";

const Contact = ({ darkMode }) => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
    submitted: false,
    error: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState({
      ...formState,
      submitted: true,
      name: "",
      email: "",
      message: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <div className="inline-block relative">
          <h2 id="contact" className="text-2xl font-black tracking-[0.3em] text-white uppercase relative z-10">
            &lt; COMMS_LINK /&gt;
          </h2>
          <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="p-8 bg-slate-800/60 border-2 border-cyan-500/20 relative group"
      >
        {/* Terminal Header */}
        <div className="absolute top-0 left-0 right-0 h-6 bg-cyan-500/10 flex items-center px-4 gap-1.5">
          <div className="w-2 h-2 rounded-full bg-cyan-500/40"></div>
          <div className="w-2 h-2 rounded-full bg-cyan-500/40"></div>
          <div className="flex-1 text-[8px] font-black tracking-widest text-cyan-400 text-center uppercase">secure_uplink_v4.02</div>
          <div className="w-2 h-2 rounded-full bg-cyan-500/40"></div>
        </div>

        {formState.submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <div className="w-20 h-20 mx-auto border-2 border-cyan-400 flex items-center justify-center mb-6 relative">
              <div className="absolute inset-0 bg-cyan-400/20 blur-md animate-pulse"></div>
              <svg className="w-10 h-10 text-cyan-400 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-black text-white tracking-widest mb-4 uppercase">TRANSMISSION_COMPLETE</h3>
            <p className="text-xs text-cyan-100/60 font-bold mb-8 italic">Your message has been encoded and uplinked to the main server.</p>
            <button
              onClick={() => setFormState({ ...formState, submitted: false })}
              className="px-6 py-2 border border-cyan-500/50 text-cyan-400 text-[10px] font-black tracking-widest hover:bg-cyan-500/10 transition-all uppercase"
            >
              [ REBOOT_COMMS ]
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6">
            <div className="grid grid-cols-1 gap-6">
              <div className="relative">
                <label htmlFor="name" className="text-[10px] font-black tracking-widest text-cyan-400 uppercase mb-2 block">NAME_IDENTIFIER</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                  className="w-full bg-cyan-500/5 border border-cyan-500/30 px-4 py-3 text-sm text-cyan-100 placeholder-cyan-500/30 focus:border-cyan-400 outline-none transition-all font-mono"
                  placeholder="&gt; USERNAME_REQUIRED"
                />
              </div>

              <div className="relative">
                <label htmlFor="email" className="text-[10px] font-black tracking-widest text-cyan-400 uppercase mb-2 block">EMAIL_ENDPOINT</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                  className="w-full bg-cyan-500/5 border border-cyan-500/30 px-4 py-3 text-sm text-cyan-100 placeholder-cyan-500/30 focus:border-cyan-400 outline-none transition-all font-mono"
                  placeholder="&gt; DOMAIN_NODE@VIRTUAL_HEX"
                />
              </div>

              <div className="relative">
                <label htmlFor="message" className="text-[10px] font-black tracking-widest text-cyan-400 uppercase mb-2 block">SIGNAL_DATA</label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full bg-cyan-500/5 border border-cyan-500/30 px-4 py-3 text-sm text-cyan-100 placeholder-cyan-500/30 focus:border-cyan-400 outline-none transition-all font-mono resize-none"
                  placeholder="&gt; ENCODE_MESSAGE_HERE..."
                ></textarea>
              </div>

              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(6,182,212,0.3)" }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-4 mt-4 bg-cyan-500 border-2 border-cyan-400 text-black font-black tracking-[0.4em] uppercase text-xs hover:bg-cyan-400 transition-colors"
              >
                EXECUTE_TRANSMISSION
              </motion.button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default Contact;
