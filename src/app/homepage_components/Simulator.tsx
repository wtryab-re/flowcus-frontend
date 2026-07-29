"use client";
import { useState, useEffect, useRef } from "react";
import {
  FiArrowLeft,
  FiArrowRight,
  FiRotateCw,
  FiLock,
  FiUser,
  FiEye,
} from "react-icons/fi";
import { LuBookOpenText } from "react-icons/lu";
import { IoExtensionPuzzleOutline } from "react-icons/io5";
import { GiSoundWaves } from "react-icons/gi";

export default function Simulator() {
  // Feature Active States
  const [bionicActive, setBionicActive] = useState(true);
  const [tintActive, setTintActive] = useState(true);
  const [soundsActive, setSoundsActive] = useState(false);

  // Bionic Reading Settings
  const [focusPosition, setFocusPosition] = useState<"classic" | "middle">(
    "classic",
  );
  const [focusSize, setFocusSize] = useState(50);
  const [remainingOpacity, setRemainingOpacity] = useState(50);

  // Highlight Color Settings
  const [colorPreset, setColorPreset] = useState("dark");
  const [customHex, setCustomHex] = useState("#FF6B35");

  // Font Settings
  const [fontsActive, setFontsActive] = useState(true);
  const [selectedFont, setSelectedFont] = useState("System");

  // Eye-Comfort Tint Settings
  const [sepiaIntensity, setSepiaIntensity] = useState(30);

  // Focus Sounds Settings
  const [audioProfile, setAudioProfile] = useState<"adhd" | "40hz">("40hz");
  const [soundVolume, setSoundVolume] = useState(100);

  // Web Audio Context Refs
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Color Map Helper
  const getHighlightColor = () => {
    switch (colorPreset) {
      case "orange":
        return "#FF6B35";
      case "mint":
        return "#10B981";
      case "indigo":
        return "#6366F1";
      case "brown":
        return "#92400E";
      case "custom":
        return customHex;
      default:
        return "inherit";
    }
  };

  // Font Map Helper
  const getFontFamily = () => {
    if (!fontsActive) return "sans-serif";
    switch (selectedFont) {
      case "Verdana":
        return "Verdana, sans-serif";
      case "Open Sans":
        return "'Open Sans', sans-serif";
      case "Comic Neue":
        return "'Comic Sans MS', 'Comic Neue', cursive";
      default:
        return "sans-serif";
    }
  };

  // Main Audio Engine Effect
  useEffect(() => {
    // Safe helper to close AudioContext without throwing InvalidStateError
    const safeCloseCtx = async (ctx: AudioContext | null) => {
      if (ctx && ctx.state !== "closed") {
        try {
          await ctx.close();
        } catch (err) {
          // Silently handle context closure race conditions
        }
      }
    };

    if (soundsActive) {
      try {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext;
        const ctx = new AudioCtx();
        audioCtxRef.current = ctx;

        const gainNode = ctx.createGain();
        // Set initial volume
        gainNode.gain.setValueAtTime(
          (soundVolume / 100) * 0.1,
          ctx.currentTime,
        );
        gainNode.connect(ctx.destination);
        gainNodeRef.current = gainNode;

        if (audioProfile === "40hz") {
          const oscLeft = ctx.createOscillator();
          const oscRight = ctx.createOscillator();
          const panLeft = ctx.createStereoPanner();
          const panRight = ctx.createStereoPanner();

          oscLeft.type = "sine";
          oscRight.type = "sine";

          oscLeft.frequency.setValueAtTime(200, ctx.currentTime);
          oscRight.frequency.setValueAtTime(240, ctx.currentTime);

          panLeft.pan.setValueAtTime(-1, ctx.currentTime);
          panRight.pan.setValueAtTime(1, ctx.currentTime);

          oscLeft.connect(panLeft);
          panLeft.connect(gainNode);

          oscRight.connect(panRight);
          panRight.connect(gainNode);

          oscLeft.start();
          oscRight.start();
        } else {
          const bufferSize = 2 * ctx.sampleRate;
          const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
          const output = noiseBuffer.getChannelData(0);
          let lastOut = 0.0;

          for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            output[i] = (lastOut + 0.02 * white) / 1.02;
            lastOut = output[i];
            output[i] *= 3.5;
          }

          const brownNoise = ctx.createBufferSource();
          brownNoise.buffer = noiseBuffer;
          brownNoise.loop = true;
          brownNoise.connect(gainNode);
          brownNoise.start();
        }
      } catch (e) {
        console.error("Audio Engine error:", e);
      }
    }

    // Effect Cleanup (Runs when soundsActive turns false, profile changes, or unmounts)
    return () => {
      if (audioCtxRef.current) {
        safeCloseCtx(audioCtxRef.current);
        audioCtxRef.current = null;
        gainNodeRef.current = null;
      }
    };
  }, [soundsActive, audioProfile]); // Removed soundVolume to prevent context rebuilds on slider drag

  // Dynamic Volume Adjustment Effect
  useEffect(() => {
    if (
      gainNodeRef.current &&
      audioCtxRef.current &&
      audioCtxRef.current.state === "running"
    ) {
      gainNodeRef.current.gain.setValueAtTime(
        (soundVolume / 100) * 0.1,
        audioCtxRef.current.currentTime,
      );
    }
  }, [soundVolume]);

  // Bionic Engine Text Parser
  const applyBionic = (text: string) => {
    if (!bionicActive) return text;

    const highlightColor = getHighlightColor();

    return text.split(" ").map((word, index) => {
      if (!word) return null;

      const len = word.length;
      const highlightLen = Math.max(1, Math.round(len * (focusSize / 100)));

      let boldPart = "";
      let restPart1 = "";
      let restPart2 = "";

      if (focusPosition === "classic") {
        boldPart = word.slice(0, highlightLen);
        restPart2 = word.slice(highlightLen);
      } else {
        const start = Math.max(0, Math.floor((len - highlightLen) / 2));
        restPart1 = word.slice(0, start);
        boldPart = word.slice(start, start + highlightLen);
        restPart2 = word.slice(start + highlightLen);
      }

      return (
        <span key={index} className="inline-block mr-[0.25em]">
          {restPart1 && (
            <span style={{ opacity: remainingOpacity / 100 }}>{restPart1}</span>
          )}
          <strong
            className="font-bold"
            style={{
              color: highlightColor !== "inherit" ? highlightColor : undefined,
            }}
          >
            {boldPart}
          </strong>
          {restPart2 && (
            <span style={{ opacity: remainingOpacity / 100 }}>{restPart2}</span>
          )}
        </span>
      );
    });
  };

  return (
    <section className=" max-h-screen w-full  mx-auto py-2 font-sans text-gray-800 flex">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-1 rounded-2xl overflow-hidden items-center justify-center">
        {/* LEFT SIDE: SIMULATED BROWSER */}
        <div className="md:col-span-8 bg-white rounded-xl overflow-hidden flex flex-col h-100 relative border border-gray-100">
          {/* Browser Tab Bar */}
          <div className="bg-[#f0f3fe] px-2 pt-1 flex items-center gap-1.5 border-b border-gray-200 text-xs">
            <div className="bg-white px-2 py-1 rounded-t-md flex items-center gap-1.5 font-medium text-gray-700 shadow-xs cursor-pointer">
              <span className="w-3.5 h-3.5 rounded-full bg-blue-500 text-white flex items-center justify-center text-[9px] font-bold">
                BR
              </span>
              <span className="truncate max-w-30">ADHD & Focus M...</span>
            </div>
          </div>

          {/* Address Bar */}
          <div className="bg-white px-2 py-1 border-b border-gray-100 flex items-center gap-2 text-gray-500 text-xs">
            <FiArrowLeft className="cursor-pointer hover:text-gray-800" />
            <FiArrowRight className="cursor-pointer hover:text-gray-800" />
            <FiRotateCw className="cursor-pointer hover:text-gray-800" />

            <div className="flex-1 bg-[#f6f8fe] rounded-full px-3 py-1 flex items-center gap-1.5 text-[11px] text-blue-600 border border-transparent focus-within:border-blue-300">
              <FiLock className="text-emerald-500 shrink-0" />
              <span className="truncate">
                https://en.wikipedia.org/wiki/ADHD_Focus_and_Reading
              </span>
            </div>

            <IoExtensionPuzzleOutline className="text-gray-400 cursor-pointer" />
            <div className="w-5 h-5 rounded-full bg-rose-500 text-white font-bold text-[10px] flex items-center justify-center shadow-xs cursor-pointer">
              F
            </div>
            <FiUser className="text-gray-400 cursor-pointer" />
          </div>

          {/* Webpage Reading Canvas */}
          <div
            className="p-5 flex-1 overflow-y-hidden transition-all duration-300 relative"
            style={{
              backgroundColor: tintActive
                ? `rgba(251, 240, 217, ${sepiaIntensity / 100})`
                : "#ffffff",
              fontFamily: getFontFamily(),
            }}
          >
            <h1 className="text-xl font-extrabold text-gray-900 mb-3 tracking-tight">
              Attention, ADHD and reading mechanics
            </h1>

            <p className="text-xs leading-relaxed text-gray-700 mb-3">
              {applyBionic(
                'Reading is an active cognitive process that requires sustained visual, phonetic, and semantic attention. For readers diagnosed with Attention Deficit Hyperactivity Disorder (ADHD), conventional continuous text can trigger cognitive fatigue, leading to a phenomenon known as "inattentive skip-back" — where a reader repeatedly scans the same line without absorbing its meaning.',
              )}
            </p>

            <div className="bg-[#edf3ff] border-l-2 border-blue-600 rounded-r-lg p-2.5 mb-4">
              <p className="text-xs font-semibold text-blue-900">
                <span className="font-bold">Did you know?</span> Studies suggest
                that ADHD readers read up to 25% slower on traditional text
                layouts due to saccadic eye movement irregularities and spatial
                tracking drifts.
              </p>
            </div>
            <h2 className="text-xs font-bold text-gray-900 mb-3">
              The bionic reading hypothesis
            </h2>
            <p className="text-xs leading-relaxed text-gray-700">
              {applyBionic(
                "Bionic Reading is a typographic method designed to guide the eye through text by highlighting the initial letters of words. This allows the brain to complete words using prior visual memory, dramatically decreasing the ocular strain required during long reading sessions.",
              )}
            </p>
          </div>
        </div>

        {/* RIGHT SIDE: POPOVER EXTENSION CONTROLS */}
        <div className="md:col-span-4 flex items-start justify-end">
          <div className="rounded-2xl overflow-y-auto scrollbar-thumb-(--brand-font-color)/40 flex flex-col gap-2 w-full max-w-95 h-100 shrink-0 pr-1">
            {/* SECTION 1: BIONIC READING */}
            <div className="p-2.5 rounded-xl bg-white border border-gray-100 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <LuBookOpenText className="text-indigo-900 text-sm" />
                  <span className="font-bold text-xs text-indigo-950">
                    Bionic Reading
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={bionicActive}
                    onChange={(e) => setBionicActive(e.target.checked)}
                    className="sr-only peer cursor-pointer"
                  />
                  <div className="w-8 h-4 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-emerald-400 cursor-pointer"></div>
                </label>
              </div>

              <div className="space-y-2 pt-1.5 border-t border-gray-100 text-[11px]">
                {/* Focus Position Toggle */}
                <div className="flex justify-between items-center">
                  <span className="font-bold text-indigo-900">
                    Focus Position:
                  </span>
                  <div className="bg-gray-100 p-0.5 rounded-md flex gap-0.5">
                    <button
                      onClick={() => setFocusPosition("middle")}
                      className={`px-2 py-0.5 rounded font-semibold transition-all cursor-pointer text-[10px] ${
                        focusPosition === "middle"
                          ? "bg-white text-rose-500 shadow-2xs"
                          : "text-gray-500"
                      }`}
                    >
                      Middle
                    </button>
                    <button
                      onClick={() => setFocusPosition("classic")}
                      className={`px-2 py-0.5 rounded font-semibold transition-all cursor-pointer text-[10px] ${
                        focusPosition === "classic"
                          ? "bg-white text-rose-500 shadow-2xs"
                          : "text-gray-500"
                      }`}
                    >
                      Classic
                    </button>
                  </div>
                </div>

                {/* Focus Size Slider */}
                <div>
                  <div className="flex justify-between font-bold mb-0.5">
                    <span className="text-indigo-900">Focus Size:</span>
                    <span className="text-rose-500">{focusSize}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={focusSize}
                    onChange={(e) => setFocusSize(Number(e.target.value))}
                    className="w-full accent-rose-500 h-1 bg-indigo-50 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Remaining Opacity Slider */}
                <div>
                  <div className="flex justify-between font-bold mb-0.5">
                    <span className="text-indigo-900">Remaining Opacity:</span>
                    <span className="text-rose-500">{remainingOpacity}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={remainingOpacity}
                    onChange={(e) =>
                      setRemainingOpacity(Number(e.target.value))
                    }
                    className="w-full accent-rose-500 h-1 bg-indigo-50 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Highlight Colors */}
                <div className="pt-1.5 border-t border-gray-100">
                  <span className="font-bold text-indigo-900 block mb-1">
                    Highlight Color:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {[
                      { id: "dark", label: "Dark/Light", dot: "#CBD5E1" },
                      { id: "orange", label: "Orange", dot: "#FF6B35" },
                      { id: "mint", label: "Mint", dot: "#10B981" },
                      { id: "indigo", label: "Indigo", dot: "#6366F1" },
                      { id: "brown", label: "Brown", dot: "#92400E" },
                    ].map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setColorPreset(c.id)}
                        className={`flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] font-semibold transition-all cursor-pointer ${
                          colorPreset === c.id
                            ? "border-indigo-600 bg-indigo-50 text-indigo-900"
                            : "border-gray-200 bg-white text-gray-700"
                        }`}
                      >
                        <span
                          className="w-2 h-2 rounded-full inline-block"
                          style={{ backgroundColor: c.dot }}
                        />
                        {c.label}
                      </button>
                    ))}
                  </div>

                  {/* Custom Hex Input */}
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="font-bold text-indigo-900">
                      Custom hex:
                    </span>
                    <input
                      type="text"
                      value={customHex}
                      onChange={(e) => {
                        setCustomHex(e.target.value);
                        setColorPreset("custom");
                      }}
                      className="border border-blue-200 rounded-full px-2 py-0.5 w-20 text-center font-mono font-medium text-gray-700 focus:outline-none focus:border-indigo-500 bg-white text-[10px]"
                    />

                    <div className="relative">
                      <input
                        type="color"
                        id="hexSwatchPicker"
                        value={
                          customHex.startsWith("#") && customHex.length === 7
                            ? customHex
                            : "#FF6B35"
                        }
                        onChange={(e) => {
                          setCustomHex(e.target.value.toUpperCase());
                          setColorPreset("custom");
                        }}
                        className="absolute opacity-0 w-0 h-0 pointer-events-none"
                      />
                      <label
                        htmlFor="hexSwatchPicker"
                        className="block w-4 h-4 rounded border border-gray-400 cursor-pointer hover:scale-105 transition-transform"
                        style={{ backgroundColor: customHex }}
                        title="Click to open color chart"
                      />
                    </div>
                  </div>
                </div>

                {/* EASY-TO-READ FONTS SECTION */}
                <div className="pt-2 border-t border-gray-100">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-indigo-900">
                      Easy-to-Read Fonts:
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={fontsActive}
                        onChange={(e) => setFontsActive(e.target.checked)}
                        className="sr-only peer cursor-pointer"
                      />
                      <div className="w-8 h-4 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-emerald-400 cursor-pointer"></div>
                    </label>
                  </div>

                  <div className="grid grid-cols-2 gap-1">
                    {[
                      { name: "System", sub: "Default" },
                      { name: "Verdana", sub: "Readable" },
                      { name: "Open Sans", sub: "Readable" },
                      { name: "Comic Neue", sub: "Dyslexia" },
                    ].map((font) => (
                      <button
                        key={font.name}
                        onClick={() => setSelectedFont(font.name)}
                        className={`px-2 py-1 rounded-lg border text-left transition-all cursor-pointer ${
                          selectedFont === font.name
                            ? "bg-amber-50 border-amber-300 shadow-2xs"
                            : "bg-white border-gray-100 hover:border-gray-200"
                        }`}
                      >
                        <div className="font-bold text-[10px] text-gray-900 leading-tight">
                          {font.name}
                        </div>
                        <div className="text-[9px] text-gray-400 font-medium leading-none">
                          {font.sub}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 2: EYE-COMFORT TINT */}
            <div className="p-2.5 rounded-xl bg-white border border-gray-100 shadow-xs">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5">
                  <FiEye className="text-indigo-900 text-sm" />
                  <span className="font-bold text-xs text-indigo-950">
                    Eye-Comfort Tint
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={tintActive}
                    onChange={(e) => setTintActive(e.target.checked)}
                    className="sr-only peer cursor-pointer"
                  />
                  <div className="w-8 h-4 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-emerald-400 cursor-pointer"></div>
                </label>
              </div>

              <div className="pt-1 border-t border-gray-100 text-[11px]">
                <div className="flex justify-between font-bold mb-0.5">
                  <span className="text-indigo-900">Sepia Intensity:</span>
                  <span className="text-amber-500">{sepiaIntensity}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sepiaIntensity}
                  onChange={(e) => setSepiaIntensity(Number(e.target.value))}
                  className="w-full accent-amber-500 h-1 bg-indigo-50 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* SECTION 3: FOCUS SOUNDS */}
            <div className="p-2.5 rounded-xl bg-white border border-gray-100 shadow-xs">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5">
                  <GiSoundWaves className="text-indigo-900 text-sm" />
                  <span className="font-bold text-xs text-indigo-950">
                    Focus Sounds
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={soundsActive}
                    onChange={(e) => setSoundsActive(e.target.checked)}
                    className="sr-only peer cursor-pointer"
                  />
                  <div className="w-8 h-4 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-emerald-400 cursor-pointer"></div>
                </label>
              </div>

              <div className="space-y-2 pt-1 border-t border-gray-100 text-[11px]">
                <div>
                  <span className="font-bold text-indigo-900 block mb-1">
                    Audio Profile:
                  </span>
                  <div className="grid grid-cols-2 gap-1">
                    {[
                      { id: "adhd", label: "ADHD Mix" },
                      { id: "40hz", label: "40Hz Sine" },
                    ].map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setAudioProfile(p.id as "adhd" | "40hz")}
                        className={`py-1 rounded-lg border text-center font-bold transition-all cursor-pointer text-[10px] ${
                          audioProfile === p.id
                            ? "border-emerald-500 bg-emerald-50 text-emerald-800"
                            : "border-gray-200 bg-white text-gray-600"
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-bold mb-0.5">
                    <span className="text-indigo-900">Volume:</span>
                    <span className="text-emerald-500">{soundVolume}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={soundVolume}
                    onChange={(e) => setSoundVolume(Number(e.target.value))}
                    className="w-full accent-emerald-500 h-1 bg-indigo-50 rounded-lg cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
