"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { announcements, events } from "../announcementsData";

const LANGUAGE_KEY = "mcn-lang";

const serif = "var(--font-newsreader), 'Newsreader', serif";
const sans = "var(--font-archivo), 'Archivo', sans-serif";

const DONATE_URL = "https://adventistgiving.org/donate/ANWFRQ";

const SOCIAL = {
  facebook: "https://www.facebook.com/iasdmcallennorte",
  youtube: "https://www.youtube.com/@iasdpharr-mcallennorte",
  instagram: "https://www.instagram.com/iglesiamcallennorte",
};

const STRINGS = {
  en: {
    brand1: "McAllen North",
    brand2: "Seventh-day Adventist Church",
    navHome: "Home",
    navAbout: "About",
    navAnn: "Announcements",
    navGive: "Tithes/Offerings",
    qrBanner: "Welcome! You scanned the QR code from your seat.",
    eyebrow: "Stay connected",
    title: "Announcements & Events",
    curT: "Current Announcements",
    curD: "Updated regularly. Check back each Sabbath for the latest information.",
    upT: "Upcoming Events",
    upD: "Highlighting regular gatherings and special events in our church life.",
    whereT: "Where we meet",
    addr1: "1217 N 27th 1/2 St,",
    addr2: "McAllen, TX",
    call: "Call us: 956-686-5065",
    followT: "Follow us",
    yt: "YouTube — Sermons",
    verse:
      "“Here is the patience of the saints: here are they that keep the commandments of God, and the faith of Jesus.” — Revelation 14:12",
    copy: "© 2026 McAllen North Seventh-day Adventist Church. All rights reserved.",
  },
  es: {
    brand1: "McAllen Norte",
    brand2: "Iglesia Adventista del Séptimo Día",
    navHome: "Inicio",
    navAbout: "Nosotros",
    navAnn: "Anuncios",
    navGive: "Diezmos/Ofrendas",
    qrBanner: "¡Bienvenido! Escaneaste el código QR desde tu asiento.",
    eyebrow: "Mantente conectado",
    title: "Anuncios y Eventos",
    curT: "Anuncios Actuales",
    curD: "Se actualiza regularmente. Vuelve cada sábado para la información más reciente.",
    upT: "Próximos Eventos",
    upD: "Destacando las reuniones regulares y los eventos especiales de nuestra vida de iglesia.",
    whereT: "Dónde nos reunimos",
    addr1: "1217 N 27th 1/2 St,",
    addr2: "McAllen, TX",
    call: "Llámanos: 956-686-5065",
    followT: "Síguenos",
    yt: "YouTube — Sermones",
    verse:
      "“Aquí está la paciencia de los santos; aquí están los que guardan los mandamientos de Dios y la fe de Jesús.” — Apocalipsis 14:12",
    copy: "© 2026 Iglesia Adventista del Séptimo Día McAllen Norte. Todos los derechos reservados.",
  },
};

function pillStyle(active) {
  return {
    padding: "7px 15px",
    border: "none",
    cursor: "pointer",
    font: `600 13px ${sans}`,
    background: active ? "#33534B" : "transparent",
    color: active ? "#fff" : "#33534B",
  };
}

export default function AnnouncementsPage() {
  const [lang, setLang] = useState("en");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(LANGUAGE_KEY);
    if (stored === "en" || stored === "es") setLang(stored);
  }, []);

  const setLanguage = (l) => {
    window.localStorage.setItem(LANGUAGE_KEY, l);
    setLang(l);
  };

  const t = STRINGS[lang] || STRINGS.en;

  const LangToggle = () => (
    <div
      style={{
        display: "flex",
        border: "1px solid #C9C3B2",
        borderRadius: "999px",
        overflow: "hidden",
      }}
    >
      <button onClick={() => setLanguage("en")} style={pillStyle(lang === "en")}>
        EN
      </button>
      <button onClick={() => setLanguage("es")} style={pillStyle(lang === "es")}>
        ES
      </button>
    </div>
  );

  // Pull each editable item from announcementsData.js and resolve its
  // English/Spanish fields for the active language. `kicker` is the small
  // label at the top of each card (date + optional time).
  const localize = (item) => {
    const isEs = lang === "es";
    const date = (isEs ? item.dateEs : item.dateEn) || "";
    const time = item.time || "";
    return {
      id: item.id,
      kicker: [date, time].filter(Boolean).join(" • "),
      title: isEs ? item.titleEs : item.titleEn,
      description: isEs ? item.descriptionEs : item.descriptionEn,
    };
  };

  const currentAnnouncements = announcements.map(localize);
  const upcomingEvents = events.map(localize);

  return (
    <div style={{ background: "#FAF7F0", minHeight: "100vh" }}>
      {/* NAV */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "14px 24px",
          padding: "20px clamp(20px,5vw,72px)",
          borderBottom: "1px solid #E4DFD2",
          background: "#FAF7F0",
        }}
      >
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <img
            src="/adventist-logo.png"
            alt="Seventh-day Adventist Church logo"
            style={{ width: "40px", height: "auto", display: "block" }}
          />
          <span>
            <span style={{ display: "block", font: `600 20px/1.1 ${serif}`, color: "#22352F" }}>
              {t.brand1}
            </span>
            <span
              style={{
                display: "block",
                font: `500 11px/1.3 ${sans}`,
                letterSpacing: ".16em",
                textTransform: "uppercase",
                color: "#8A8474",
              }}
            >
              {t.brand2}
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div
          className="hidden min-[900px]:flex"
          style={{
            alignItems: "center",
            flexWrap: "wrap",
            gap: "14px clamp(16px,2.5vw,36px)",
            font: `500 16px ${sans}`,
            color: "#33534B",
          }}
        >
          <Link href="/">{t.navHome}</Link>
          <Link href="/#about">{t.navAbout}</Link>
          <Link
            href="/announcements"
            style={{ color: "#22352F", borderBottom: "2px solid #C9971C", paddingBottom: "4px" }}
          >
            {t.navAnn}
          </Link>
          <a
            href={DONATE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full bg-[#33534B] font-semibold text-white transition-colors hover:bg-[#22352F] hover:text-white"
            style={{ padding: "12px 24px" }}
          >
            {t.navGive}
          </a>
          <LangToggle />
        </div>

        {/* Mobile cluster */}
        <div className="flex min-[900px]:hidden" style={{ alignItems: "center", gap: "14px" }}>
          <LangToggle />
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "5px",
              width: "44px",
              height: "44px",
              background: "transparent",
              border: "1px solid #C9C3B2",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            <span style={{ width: "20px", height: "2px", background: "#22352F", display: "block" }} />
            <span style={{ width: "20px", height: "2px", background: "#22352F", display: "block" }} />
            <span style={{ width: "20px", height: "2px", background: "#22352F", display: "block" }} />
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div
          className="min-[900px]:hidden"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            padding: "12px 20px 20px",
            borderBottom: "1px solid #E4DFD2",
            background: "#FAF7F0",
          }}
        >
          <Link
            href="/"
            style={{ padding: "12px 8px", font: `500 17px ${sans}`, color: "#33534B", borderBottom: "1px solid #EFEBE0" }}
          >
            {t.navHome}
          </Link>
          <Link
            href="/#about"
            style={{ padding: "12px 8px", font: `500 17px ${sans}`, color: "#33534B", borderBottom: "1px solid #EFEBE0" }}
          >
            {t.navAbout}
          </Link>
          <Link
            href="/announcements"
            style={{ padding: "12px 8px", font: `600 17px ${sans}`, color: "#22352F", borderBottom: "1px solid #EFEBE0" }}
          >
            {t.navAnn}
          </Link>
          <a
            href={DONATE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:bg-[#22352F] hover:text-white"
            style={{
              marginTop: "14px",
              display: "inline-flex",
              justifyContent: "center",
              background: "#33534B",
              color: "#fff",
              padding: "14px 24px",
              borderRadius: "999px",
              font: `600 17px ${sans}`,
            }}
          >
            {t.navGive}
          </a>
        </div>
      )}

      {/* QR BANNER */}
      <div
        style={{
          background: "#C9971C",
          color: "#22261A",
          padding: "14px clamp(20px,5vw,72px)",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          font: `600 15px ${sans}`,
        }}
      >
        <span style={{ fontSize: "17px" }}>✦</span> {t.qrBanner}
      </div>

      {/* PAGE HEADER */}
      <div style={{ padding: "clamp(48px,6vw,80px) clamp(20px,5vw,72px) clamp(40px,5vw,64px)" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            font: `600 14px ${sans}`,
            letterSpacing: ".2em",
            textTransform: "uppercase",
            color: "#B0821A",
            marginBottom: "22px",
          }}
        >
          <span style={{ width: "34px", height: "1.5px", background: "#B0821A", display: "inline-block" }} />
          {t.eyebrow}
        </div>
        <h1 style={{ margin: 0, font: `500 clamp(40px,6vw,72px)/1.08 ${serif}`, letterSpacing: "-.015em", color: "#22352F" }}>
          {t.title}
        </h1>
      </div>

      {/* CURRENT ANNOUNCEMENTS */}
      <div style={{ padding: "0 clamp(20px,5vw,72px) clamp(48px,6vw,80px)" }}>
        <div style={{ display: "flex", alignItems: "baseline", flexWrap: "wrap", gap: "8px 20px", marginBottom: "36px" }}>
          <h2 style={{ margin: 0, font: `500 38px ${serif}`, color: "#22352F" }}>{t.curT}</h2>
          <div style={{ font: `400 16px ${sans}`, color: "#8A8474" }}>{t.curD}</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(340px,100%),1fr))", gap: "28px" }}>
          {currentAnnouncements.map((item) => (
            <div key={item.id} style={{ background: "#fff", border: "1px solid #E4DFD2", padding: "40px", display: "flex", flexDirection: "column", gap: "12px" }}>
              {item.kicker && (
                <div style={{ font: `700 13px ${sans}`, letterSpacing: ".16em", textTransform: "uppercase", color: "#B0821A" }}>{item.kicker}</div>
              )}
              <div style={{ font: `500 26px ${serif}`, color: "#22352F" }}>{item.title}</div>
              <p style={{ margin: 0, font: `400 17px/1.6 ${sans}`, color: "#4B564F" }}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* UPCOMING EVENTS */}
      <div style={{ background: "#fff", padding: "clamp(56px,7vw,88px) clamp(20px,5vw,72px)" }}>
        <div style={{ display: "flex", alignItems: "baseline", flexWrap: "wrap", gap: "8px 20px", marginBottom: "44px" }}>
          <h2 style={{ margin: 0, font: `500 38px ${serif}`, color: "#22352F" }}>{t.upT}</h2>
          <div style={{ font: `400 16px ${sans}`, color: "#8A8474" }}>{t.upD}</div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(300px,100%),1fr))", gap: "28px" }}>
          {upcomingEvents.map((ev) => (
            <div key={ev.id} style={{ border: "1px solid #E4DFD2", padding: "38px", display: "flex", flexDirection: "column", gap: "12px" }}>
              {ev.kicker && (
                <div style={{ font: `700 13px ${sans}`, letterSpacing: ".16em", textTransform: "uppercase", color: "#33534B" }}>{ev.kicker}</div>
              )}
              <div style={{ font: `500 25px ${serif}`, color: "#22352F" }}>{ev.title}</div>
              <p style={{ margin: 0, font: `400 16px/1.6 ${sans}`, color: "#4B564F" }}>{ev.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ background: "#1B2A25", color: "#fff", padding: "clamp(48px,6vw,72px) clamp(20px,5vw,72px) 36px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(280px,100%),1fr))",
            gap: "clamp(32px,4.5vw,64px)",
            paddingBottom: "52px",
            borderBottom: "1px solid rgba(255,255,255,.15)",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "20px" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img src="/adventist-logo.png" alt="" style={{ width: "32px", height: "auto" }} />
              </div>
              <div>
                <div style={{ font: `600 20px ${serif}` }}>{t.brand1}</div>
                <div style={{ font: `500 11px ${sans}`, letterSpacing: ".16em", textTransform: "uppercase", color: "rgba(255,255,255,.6)" }}>
                  {t.brand2}
                </div>
              </div>
            </div>
            <p style={{ margin: 0, font: `italic 400 17px/1.65 ${serif}`, color: "rgba(255,255,255,.75)", maxWidth: "400px" }}>
              {t.verse}
            </p>
          </div>
          <div>
            <div style={{ font: `700 13px ${sans}`, letterSpacing: ".18em", textTransform: "uppercase", color: "#E5B93C", marginBottom: "18px" }}>
              {t.whereT}
            </div>
            <div style={{ font: `400 17px/1.7 ${sans}`, color: "rgba(255,255,255,.85)" }}>
              {t.addr1}
              <br />
              {t.addr2}
            </div>
            <div style={{ font: `400 17px ${sans}`, color: "rgba(255,255,255,.85)", marginTop: "12px" }}>{t.call}</div>
          </div>
          <div>
            <div style={{ font: `700 13px ${sans}`, letterSpacing: ".18em", textTransform: "uppercase", color: "#E5B93C", marginBottom: "18px" }}>
              {t.followT}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", font: `400 17px ${sans}` }}>
              <a href={SOCIAL.facebook} target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,.85)" }}>
                Facebook
              </a>
              <a href={SOCIAL.youtube} target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,.85)" }}>
                {t.yt}
              </a>
              <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,.85)" }}>
                Instagram
              </a>
            </div>
          </div>
        </div>
        <div style={{ paddingTop: "26px", font: `400 14px ${sans}`, color: "rgba(255,255,255,.5)" }}>{t.copy}</div>
      </div>
    </div>
  );
}
