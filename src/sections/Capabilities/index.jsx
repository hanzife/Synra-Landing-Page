import { useEffect, useRef, useState } from "react";

const features = [
  {
    icon: "✏️",
    title: "Capture anything",
    desc: "Text, voice, photos, files, links — saved in seconds. Auto-transcribes audio and extracts meaning from images via Gemini.",
  },
  {
    icon: "🔗",
    title: "Smart bookmarks",
    desc: "Paste a URL and Synra reads the page, extracts insights, and saves a rich bookmark with title, summary, and topics.",
  },
  {
    icon: "💬",
    title: "Talk to your memories",
    desc: "Ask anything in natural language. Synra searches your entire knowledge base and answers using Gemini AI.",
  },
  {
    icon: "📋",
    title: "Task extraction",
    desc: "Action items extracted automatically from everything you save. Your to-do list builds itself.",
  },
  {
    icon: "🔒",
    title: "On-device AI",
    desc: "Embeddings run on your device using ExecuTorch. Your most sensitive memories never leave your phone.",
  },
  {
    icon: "🌙",
    title: "Beautiful by default",
    desc: "Liquid glass UI, cinematic animations, system-adaptive. An app you'll actually want to open every day.",
  },
];

function FeatureCard({ icon, title, desc, delay }) {
  const cardRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [ripples, setRipples] = useState([]);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.07, rootMargin: "0px 0px -20px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  const handleMouseMove = (e) => {
    const r = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
    });
  };

  const handleClick = (e) => {
    const r = cardRef.current.getBoundingClientRect();
    const sz = Math.max(r.width, r.height) * 2.2;
    const id = Date.now();
    const rip = {
      id,
      left: e.clientX - r.left - sz / 2,
      top: e.clientY - r.top - sz / 2,
      size: sz,
    };
    setRipples((prev) => [...prev, rip]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 800);
  };

  return (
    <div
      ref={cardRef}
      className="fc"
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      style={{
        "--mx": `${mousePos.x}%`,
        "--my": `${mousePos.y}%`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.8s cubic-bezier(.16,1,.3,1), transform 0.8s cubic-bezier(.16,1,.3,1)`,
      }}
    >
      <div className="fci">{icon}</div>
      <h3>{title}</h3>
      <p>{desc}</p>
      {ripples.map((rip) => (
        <span
          key={rip.id}
          className="rip"
          style={{
            width: rip.size,
            height: rip.size,
            left: rip.left,
            top: rip.top,
          }}
        />
      ))}
    </div>
  );
}

export default function Features() {
  const eyRef = useRef(null);
  const h2Ref = useRef(null);
  const [eyVisible, setEyVisible] = useState(false);
  const [h2Visible, setH2Visible] = useState(false);

  useEffect(() => {
    const makeObs = (ref, setter) => {
      const el = ref.current;
      if (!el) return;
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) { setter(true); obs.unobserve(el); } },
        { threshold: 0.07, rootMargin: "0px 0px -20px 0px" }
      );
      obs.observe(el);
      return () => obs.disconnect();
    };
    const c1 = makeObs(eyRef, setEyVisible);
    const c2 = makeObs(h2Ref, setH2Visible);
    return () => { c1?.(); c2?.(); };
  }, []);

  return (
    <>
      <style>{`
        .features-sec {
          padding: 112px 24px;
        }
        .features-inner {
          max-width: 1100px;
          margin: 0 auto;
        }
        .ey {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 11.5px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--p);
          margin-bottom: 22px;
        }
        .eyb {
          width: 22px;
          height: 2px;
          background: currentColor;
          border-radius: 2px;
        }
        .sh {
          font-family: var(--serif);
          font-style: italic;
          font-size: clamp(38px, 5vw, 64px);
          line-height: 1.07;
          letter-spacing: -1.4px;
          color: var(--t1);
          max-width: 700px;
          margin-bottom: 22px;
        }
        .fg {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          margin-top: 72px;
          border-radius: 30px;
          overflow: hidden;
          border: 0.5px solid var(--b2);
          box-shadow: 0 2px 0 rgba(255,255,255,.82) inset, 0 12px 52px var(--s1);
        }
        .fc {
          padding: 40px 36px;
          background: rgba(255,255,255,.88);
          position: relative;
          cursor: default;
          overflow: hidden;
          transition: background 0.25s;
        }
        .fc::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1.5px;
          background: linear-gradient(90deg, transparent, var(--p), transparent);
          opacity: 0;
          transform: scaleX(0);
          transform-origin: center;
          transition: opacity 0.3s, transform 0.45s cubic-bezier(.16,1,.3,1);
        }
        .fc::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at var(--mx, 50%) var(--my, 50%),
            rgba(89,60,222,.07) 0%,
            transparent 55%
          );
          opacity: 0;
          transition: opacity 0.3s;
          pointer-events: none;
        }
        .fc:hover {
          background: rgba(255,255,255,.98);
        }
        .fc:hover::before {
          opacity: 1;
          transform: scaleX(1);
        }
        .fc:hover::after {
          opacity: 1;
        }
        .fci {
          width: 54px;
          height: 54px;
          border-radius: 17px;
          font-size: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 22px;
          background: rgba(89,60,222,.09);
          box-shadow: 0 1px 0 rgba(255,255,255,.88) inset, 0 2px 8px rgba(89,60,222,.09);
          transition: transform 0.35s cubic-bezier(.34,1.56,.64,1), box-shadow 0.25s;
        }
        .fc:hover .fci {
          transform: scale(1.16) rotate(-7deg);
          box-shadow: 0 1px 0 rgba(255,255,255,.88) inset, 0 6px 22px rgba(89,60,222,.20);
        }
        .fc h3 {
          font-size: 17px;
          font-weight: 600;
          color: var(--t1);
          margin-bottom: 10px;
          font-family: var(--sans);
        }
        .fc p {
          font-size: 14px;
          color: var(--t2);
          line-height: 1.72;
          font-family: var(--sans);
        }
        .rip {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          background: rgba(89,60,222,.11);
          transform: scale(0);
          animation: ra 0.65s cubic-bezier(.16,1,.3,1) forwards;
        }
        @keyframes ra {
          to { transform: scale(4.5); opacity: 0; }
        }
        @media (max-width: 960px) {
          .fg { grid-template-columns: 1fr; }
        }
      `}</style>

      <section className="features-sec" id="features">
        <div className="features-inner">
          <div
            ref={eyRef}
            className="ey"
            style={{
              opacity: eyVisible ? 1 : 0,
              transform: eyVisible ? "translateY(0)" : "translateY(32px)",
              transition: "opacity 0.8s cubic-bezier(.16,1,.3,1), transform 0.8s cubic-bezier(.16,1,.3,1)",
            }}
          >
            <div className="eyb" />
            Everything you need
          </div>

          <h2
            ref={h2Ref}
            className="sh"
            style={{
              opacity: h2Visible ? 1 : 0,
              transform: h2Visible ? "translateY(0)" : "translateY(32px)",
              transition: "opacity 0.8s cubic-bezier(.16,1,.3,1), transform 0.8s cubic-bezier(.16,1,.3,1)",
            }}
          >
            Built for how your
            <br />
            mind actually works.
          </h2>

          <div className="fg">
            {features.map((f, i) => (
              <FeatureCard
                key={f.title}
                icon={f.icon}
                title={f.title}
                desc={f.desc}
                delay={i * 70}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}