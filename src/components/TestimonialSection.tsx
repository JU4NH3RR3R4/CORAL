import { useState, useEffect } from "react";
import { Quote } from "lucide-react";
import { TESTIMONIALS_DATA } from "../types";
import { motion, AnimatePresence } from "motion/react";

export default function TestimonialSection() {
  const [activeIndex, setActiveIndex] = useState(1); // Default to Roberto G., page index 1 as in screenshot

  // Auto progression interval
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-coral-low overflow-hidden px-6">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        
        {/* Quote Marker */}
        <div className="flex justify-center">
          <Quote className="w-12 h-12 text-coral-light fill-coral-light" />
        </div>

        {/* Carousel Slide Area */}
        <div className="relative min-h-[160px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              <p className="font-sans text-xl md:text-2xl italic text-coral-text leading-relaxed font-light">
                "{TESTIMONIALS_DATA[activeIndex].text}"
              </p>
              <h5 className="font-display text-sm font-bold text-coral-dark tracking-wide uppercase">
                {TESTIMONIALS_DATA[activeIndex].author}
              </h5>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots Navigation indicators */}
        <div className="flex justify-center gap-2 pt-6">
          {TESTIMONIALS_DATA.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3.5 h-3.5 rounded-full transition-all duration-300 focus:outline-none cursor-pointer ${
                index === activeIndex
                  ? "bg-coral-dark scale-110"
                  : "bg-coral-outline/30 hover:bg-coral-outline/65"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
