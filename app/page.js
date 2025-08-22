'use client'

import Image from "next/image";
import { Plus, ChevronDown } from 'lucide-react';
import { useState, useMemo, useRef, useEffect } from 'react';

function Dropdown({ label, options }) {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(label);
  const containerRef = useRef(null);

  useEffect(() => {
    function onDocMouseDown(e) {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) document.addEventListener('mousedown', onDocMouseDown);
    return () => document.removeEventListener('mousedown', onDocMouseDown);
  }, [isOpen]);

  const handleSelect = (option) => {
    setValue(option);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative flex flex-col items-center">
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className="text-xl inline-flex items-center gap-2"
        style={{ fontFamily: 'var(--font-satoshi)' }}
      >
        {value}
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div className="mt-2 h-px w-40 bg-white/80" />

      {isOpen && (
        <div className="absolute top-full mt-3 w-56 rounded-md border border-white/15 bg-black/80 backdrop-blur p-1 shadow-xl z-10">
          <ul className="max-h-64 overflow-auto">
            {options.map((opt) => (
              <li key={opt}>
                <button
                  className="w-full text-left px-3 py-2 rounded hover:bg-white/10"
                  style={{ fontFamily: 'var(--font-satoshi)' }}
                  onClick={() => handleSelect(opt)}
                >
                  {opt}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function InputWithSuggestions({ options, placeholder }) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    function onDocMouseDown(e) {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) document.addEventListener('mousedown', onDocMouseDown);
    return () => document.removeEventListener('mousedown', onDocMouseDown);
  }, [isOpen]);

  const filtered = useMemo(() => {
    if (!query) return options;
    const q = query.toLowerCase();
    return options.filter((o) => o.toLowerCase().includes(q));
  }, [options, query]);

  const handleSelect = (opt) => {
    setQuery(opt);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative flex flex-col items-center">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsOpen(true)}
        placeholder={placeholder}
        className="text-xl bg-transparent text-white placeholder-white/80 outline-none text-center"
        style={{ fontFamily: 'var(--font-satoshi)' }}
      />
      <div className="mt-2 h-px w-40 bg-white/80" />

      {isOpen && filtered.length > 0 && (
        <div className="absolute top-full mt-3 w-56 rounded-md border border-white/15 bg-black/80 backdrop-blur p-1 shadow-xl z-10">
          <ul className="max-h-64 overflow-auto">
            {filtered.map((opt) => (
              <li key={opt}>
                <button
                  className="w-full text-left px-3 py-2 rounded hover:bg-white/10"
                  style={{ fontFamily: 'var(--font-satoshi)' }}
                  onMouseDown={() => handleSelect(opt)}
                >
                  {opt}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const lightingOptions = [
    'Natural light',
    'Soft studio',
    'Hard shadows',
    'Golden hour',
    'Blue hour',
    'Neon',
    'Backlit',
  ];

  const moodOptions = [
    'Moody', 'Vibrant', 'Minimal', 'Cinematic', 'Dreamy', 'Noir', 'Playful', 'Serene', 'Gritty', 'Surreal'
  ];

  const styleOptions = [
    'Analog film', 'Cyberpunk', 'Baroque', 'Futuristic', 'Abstract', 'Watercolor', 'Isometric', 'Vector', 'Photorealistic', 'Impressionist'
  ];

  return (
    <div className="">
      <main className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="prompt-container flex items-center gap-16">
          <p className="text-xl" style={{ fontFamily: 'var(--font-satoshi)', fontWeight: '700' }}>
            Prompt
          </p>
          <Plus className="w-6 h-6" />
          <div className="input-container-lighting">
            <InputWithSuggestions options={lightingOptions} placeholder="Lighting" />
          </div>
          
          <Plus className="w-6 h-6" />

          <div className="input-container-mood">
            <InputWithSuggestions options={moodOptions} placeholder="Mood" />
          </div>

          <Plus className="w-6 h-6" />

          <div className="input-container-style">
            <InputWithSuggestions options={styleOptions} placeholder="Style" />
          </div>
        </div>
      </main>
    </div>
  );
}
