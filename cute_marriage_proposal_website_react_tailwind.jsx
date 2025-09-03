import React, { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Flower2, PartyPopper } from "lucide-react";

const CONFIG = {
  yourName: "Saif",
  partnerName: "Aliza",
  tagline: "For the one who makes every day brighter",
  proposalLine: "Will you be my cute wife?",
  date: "Together for more than 2 years",
  highlights: [
    { title: "Coffee dates", note: "Our little tradition of sipping coffee and just being us." },
    { title: "Car rides", note: "Buying coffee and driving home, making simple things special." },
    { title: "Special days", note: "Every day with you feels like one, but November 30th is extra special." },
    { title: "Team us", note: "You + Me > everything." },
  ],
};

const FloatingHearts: React.FC = () => {
  const hearts = useMemo(
    () =>
      new Array(30).fill(0).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 10 + Math.random() * 6,
        size: 18 + Math.random() * 24,
        opacity: 0.3 + Math.random() * 0.5,
        rotate: (Math.random() - 0.5) * 60,
      })),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          initial={{ y: "110%", x: `${h.x}%`, opacity: 0 }}
          animate={{ y: "-10%", opacity: h.opacity, rotate: h.rotate }}
          transition={{ duration: h.duration, delay: h.delay, repeat: Infinity, ease: "easeOut" }}
          className="absolute text-pink-400/80"
          style={{ fontSize: h.size }}
        >
          ❤
        </motion.div>
      ))}
    </div>
  );
};

const Section: React.FC<{ id: string; children: React.ReactNode; className?: string }> = ({ id, children, className }) => (
  <section id={id} className={`relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 ${className || ""}`}>
    {children}
  </section>
);

const Card: React.FC<{ children: React.ReactNode; className?: string }>=({ children, className })=> (
  <div className={`rounded-2xl bg-white/70 backdrop-blur shadow-lg border border-pink-100 p-6 ${className||""}`}>{children}</div>
);

const Divider: React.FC = () => (
  <div className="my-10 flex items-center gap-3 text-pink-500/70">
    <div className="h-px flex-1 bg-pink-200" />
  </div>
);

function useRunawayButton() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [escaped, setEscaped] = useState(false);

  const move = () => {
    setEscaped(true);
    const nx = Math.random() * 70 + 10;
    const ny = Math.random() * 60 + 10;
    setPos({ x: nx, y: ny });
  };
  return { pos, move, escaped };
}

const Confetti: React.FC<{ show: boolean }>=({ show })=>{
  const pieces = useMemo(() => new Array(150).fill(0).map((_,i)=>({
    id:i, x:Math.random()*100, delay:Math.random()*0.5, size:6+Math.random()*10,
  })),[]);
  if(!show) return null;
  return(
    <div className="pointer-events-none fixed inset-0">
      {pieces.map(p=> (
        <motion.div key={p.id}
          initial={{y:-20, x:`${p.x}%`, opacity:0}}
          animate={{y:"110%", opacity:1, rotate:360}}
          transition={{duration:2 + Math.random()*1, delay:p.delay, ease:"easeOut"}}
          className="absolute"
          style={{fontSize:p.size}}
        >
          🎉
        </motion.div>
      ))}
    </div>
  )
}

export default function ProposalPage() {
  const { partnerName, yourName, tagline, proposalLine, date, highlights } = CONFIG;
  const [open, setOpen] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const runaway = useRunawayButton();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleYes = () => {
    setConfetti(true);
    setOpen(true);
    audioRef.current?.play().catch(()=>{});
    setTimeout(()=> setConfetti(false), 2800);
  };

  return (
    <div className="min-h-screen w-full relative bg-gradient-to-b from-rose-100 via-pink-100 to-rose-200 text-gray-900">
      <FloatingHearts />
      <Confetti show={confetti} />

      <audio ref={audioRef} preload="auto">
        <source src="https://cdn.pixabay.com/download/audio/2022/03/15/audio_4a64a79626.mp3?filename=success-1-6297.mp3" type="audio/mpeg" />
      </audio>

      <Section id="hero" className="pt-14">
        <div className="relative overflow-hidden rounded-3xl border border-pink-100 bg-white/70 shadow-xl text-center p-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-pink-700"
          >
            Hey {partnerName},
          </motion.h1>
          <h2 className="mt-4 text-2xl sm:text-3xl font-semibold text-gray-700">
            it's {yourName} 💕
          </h2>
          <p className="mt-6 text-lg text-gray-600">{tagline}</p>
          <div className="flex items-center justify-center gap-3 text-sm text-pink-600/80 mt-2">
            <Sparkles className="h-4 w-4" />
            <span>{date}</span>
          </div>
        </div>
      </Section>

      <Section id="story" className="py-12">
        <Card>
          <div className="flex items-center gap-3 mb-4 justify-center">
            <Flower2 className="h-5 w-5 text-pink-500" />
            <h2 className="text-3xl sm:text-4xl font-bold">A tiny love letter</h2>
          </div>
          <p className="leading-relaxed text-gray-700 text-center">
            I love how we turn ordinary moments into glitter. How your laugh fixes rough days. How your hand finds mine without looking.
            From our coffee runs to our car rides, every little thing we do feels like a story worth keeping.
            We’ve been us for over two years now, and I can’t wait for all the years still waiting.
          </p>
          <Divider />
          <div className="grid sm:grid-cols-2 gap-4" id="reasons">
            {highlights.map((h, i) => (
              <motion.div key={i} initial={{opacity:0, y:8}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.4, delay:i*0.06}} className="rounded-xl border border-rose-100 bg-white/60 p-4">
                <div className="flex items-center gap-2 font-semibold text-pink-600"><Heart className="h-4 w-4" /> {h.title}</div>
                <div className="text-gray-700 mt-1">{h.note}</div>
              </motion.div>
            ))}
          </div>
        </Card>
      </Section>

      <Section id="proposal" className="pb-20">
        <Card className="text-center relative overflow-hidden">
          <motion.div initial={{scale:0.9, opacity:0}} whileInView={{scale:1, opacity:1}} viewport={{once:true}} transition={{duration:0.5}}>
            <div className="flex justify-center mb-2">
              <PartyPopper className="h-6 w-6 text-pink-600" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-3 text-pink-700">
              {proposalLine}
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Not the big formal one yet—just a soft, silly, from-the-heart kind of promise: that I’ll keep making you coffee, laughing at your jokes,
              and choosing you in every small way, every day.
            </p>
            <div className="mt-6 flex justify-center gap-4 relative h-24">
              <button onClick={handleYes} className="px-6 py-3 rounded-2xl bg-pink-600 text-white font-semibold shadow hover:shadow-md">Yes! 💗</button>
              <motion.button
                onMouseEnter={runaway.move}
                onClick={runaway.move}
                className="px-6 py-3 rounded-2xl bg-white border border-pink-200 text-gray-700 font-semibold shadow"
                animate={{ left: `${runaway.pos.x}%`, top: `${runaway.pos.y}%` }}
                transition={{ type: "spring", stiffness: 120, damping: 12 }}
                style={{ position: "absolute" }}
                aria-label="No"
              >
                Ummm… No?
              </motion.button>
            </div>
            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{opacity:0, y:10}}
                  animate={{opacity:1, y:0}}
                  exit={{opacity:0, y:10}}
                  transition={{duration:0.3}}
                  className="mt-8 text-sm text-gray-600"
                >
                  P.S. If you say "Yes", I owe you dessert. If you say "Also yes", I owe you two. 😉
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </Card>
      </Section>

      <footer className="pb-12">
        <Section id="footer">
          <p className="text-center text-xs text-gray-500">
            Made with ❤ by {yourName} for {partnerName}. {new Date().getFullYear()}
          </p>
        </Section>
      </footer>
    </div>
  );
}
