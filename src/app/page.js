"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const LANGUAGE_KEY = "mcn-lang";

const serif = "var(--font-newsreader), 'Newsreader', serif";
const sans = "var(--font-archivo), 'Archivo', sans-serif";

const STRINGS = {
  en: {
    brand1: "McAllen North",
    brand2: "Seventh-day Adventist Church",
    navHome: "Home",
    navAbout: "About",
    navAnn: "Announcements",
    navGive: "Tithes/Offerings",
    eyebrow: "Welcome to our church family",
    heroT1: "McAllen North ",
    heroEm: "SDA",
    heroT2: " Church",
    heroP:
      "A place of worship, community, and hope. Join us as we grow together in faith and service, centered on Jesus and grounded in God's Word.",
    btnAnn: "Announcements & Events",
    btnAbout: "Learn About Us",
    w1t: "Sabbath Worship",
    w1d: "Saturday · 11:00 AM",
    w2t: "Sabbath School",
    w2d: "Saturday · 9:30 AM",
    visitT: "New or visiting today?",
    visitL: "View announcements →",
    twEyebrow: "This week at McAllen North",
    twTitle: "Join us this Sabbath.",
    c1k: "Saturdays • 11:00 AM",
    c1t: "Sabbath Worship Service",
    c1d: "A Christ-centered worship service with Bible-based preaching and uplifting music.",
    c2k: "Saturdays • 9:30 AM",
    c2t: "Sabbath School",
    c2d: "Interactive Bible study classes for all ages. Visitors are always welcome.",
    bandT: "New or visiting today?",
    bandP:
      "We'd love to connect with you. Talk with a greeter or elder after the service, or ask about joining a Sabbath School class or small group.",
    bandBtn: "View Announcements",
    whoEyebrow: "Who we are",
    aboutTitle: "About McAllen North SDA Church",
    p1: "McAllen North is a Seventh-day Adventist congregation in McAllen, Texas. We are a Christian community and would love to have you join our church family for Bible study, worship, and prayer.",
    p2: "As part of the worldwide Seventh-day Adventist Church, we seek to improve the quality of life for people and let the world know that Jesus is coming soon. We believe in the Father, the Son, and the Holy Spirit, salvation by grace through faith, and the authority of Scripture.",
    p3: "Adventists believe that God cares about every area of life—our families, health, work, talents, resources, and time. Whether you are new to church, visiting from out of town, or looking for a church family, you are welcome here.",
    q: "Have questions about beliefs, ministries, or membership? Please speak with a pastor, elder, or greeter—we're here to help.",
    snapT: "Service snapshot",
    snapItems: [
      "Sabbath School – Saturdays at 9:30 AM (classes for all ages)",
      "Worship Service – Saturdays at 11:00 AM",
      "Prayer Meeting – Wednesdays at 7:30 PM",
    ],
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
    eyebrow: "Bienvenido a nuestra familia de iglesia",
    heroT1: "Iglesia Adventista ",
    heroEm: "McAllen Norte",
    heroT2: "",
    heroP:
      "Un lugar de adoración, comunidad y esperanza. Acompáñanos mientras crecemos juntos en fe y servicio, centrados en Jesús y fundamentados en la Palabra de Dios.",
    btnAnn: "Anuncios y Eventos",
    btnAbout: "Conócenos",
    w1t: "Culto de Adoración",
    w1d: "Sábado · 11:00 AM",
    w2t: "Escuela Sabática",
    w2d: "Sábado · 9:30 AM",
    visitT: "¿Nuevo o de visita hoy?",
    visitL: "Ver anuncios →",
    twEyebrow: "Esta semana en McAllen Norte",
    twTitle: "Acompáñanos este sábado.",
    c1k: "Sábados • 11:00 AM",
    c1t: "Culto de Adoración",
    c1d: "Un culto centrado en Cristo con predicación bíblica y música inspiradora.",
    c2k: "Sábados • 9:30 AM",
    c2t: "Escuela Sabática",
    c2d: "Clases interactivas de estudio bíblico para todas las edades. Los visitantes siempre son bienvenidos.",
    bandT: "¿Nuevo o de visita hoy?",
    bandP:
      "Nos encantaría conocerte. Habla con un recepcionista o anciano después del culto, o pregunta cómo unirte a una clase de Escuela Sabática o a un grupo pequeño.",
    bandBtn: "Ver Anuncios",
    whoEyebrow: "Quiénes somos",
    aboutTitle: "Acerca de la Iglesia Adventista McAllen Norte",
    p1: "McAllen Norte es una congregación Adventista del Séptimo Día en McAllen, Texas. Somos una comunidad cristiana y nos encantaría que te unieras a nuestra familia de iglesia para el estudio de la Biblia, la adoración y la oración.",
    p2: "Como parte de la Iglesia Adventista del Séptimo Día mundial, buscamos mejorar la calidad de vida de las personas y anunciar al mundo que Jesús viene pronto. Creemos en el Padre, el Hijo y el Espíritu Santo, en la salvación por gracia mediante la fe, y en la autoridad de las Escrituras.",
    p3: "Los adventistas creemos que a Dios le importa cada área de la vida: nuestras familias, salud, trabajo, talentos, recursos y tiempo. Ya sea que seas nuevo en la iglesia, estés de visita o busques una familia de iglesia, aquí eres bienvenido.",
    q: "¿Tienes preguntas sobre creencias, ministerios o membresía? Habla con un pastor, anciano o recepcionista; estamos para ayudarte.",
    snapT: "Horarios de servicio",
    snapItems: [
      "Escuela Sabática – Sábados a las 9:30 AM (clases para todas las edades)",
      "Culto de Adoración – Sábados a las 11:00 AM",
      "Reunión de Oración – Miércoles a las 7:30 PM",
    ],
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

const SOCIAL = {
  facebook: "https://www.facebook.com/iasdmcallennorte",
  youtube: "https://www.youtube.com/@iasdpharr-mcallennorte",
  instagram: "https://www.instagram.com/iglesiamcallennorte",
};

const DONATE_URL = "https://adventistgiving.org/donate/ANWFRQ";

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

export default function Home() {
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
        }}
      >
        <Link
          href="/"
          style={{ display: "flex", alignItems: "center", gap: "14px" }}
        >
          <img
            src="/adventist-logo.png"
            alt="Seventh-day Adventist Church logo"
            style={{ width: "40px", height: "auto", display: "block" }}
          />
          <span>
            <span
              style={{
                display: "block",
                font: `600 20px/1.1 ${serif}`,
                color: "#22352F",
              }}
            >
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
          <Link
            href="/"
            style={{
              color: "#22352F",
              borderBottom: "2px solid #C9971C",
              paddingBottom: "4px",
            }}
          >
            {t.navHome}
          </Link>
          <a href="#about">{t.navAbout}</a>
          <Link href="/announcements">{t.navAnn}</Link>
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
        <div
          className="flex min-[900px]:hidden"
          style={{ alignItems: "center", gap: "14px" }}
        >
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
            style={{
              padding: "12px 8px",
              font: `600 17px ${sans}`,
              color: "#22352F",
              borderBottom: "1px solid #EFEBE0",
            }}
          >
            {t.navHome}
          </Link>
          <a
            href="#about"
            onClick={() => setMenuOpen(false)}
            style={{
              padding: "12px 8px",
              font: `500 17px ${sans}`,
              color: "#33534B",
              borderBottom: "1px solid #EFEBE0",
            }}
          >
            {t.navAbout}
          </a>
          <Link
            href="/announcements"
            style={{
              padding: "12px 8px",
              font: `500 17px ${sans}`,
              color: "#33534B",
              borderBottom: "1px solid #EFEBE0",
            }}
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

      {/* HERO */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(min(480px,100%),1fr))",
          gap: "clamp(36px,4.5vw,64px)",
          padding:
            "clamp(48px,7vw,88px) clamp(20px,5vw,72px) clamp(56px,7vw,96px)",
          alignItems: "center",
        }}
      >
        <div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              font: `600 14px ${sans}`,
              letterSpacing: ".2em",
              textTransform: "uppercase",
              color: "#B0821A",
              marginBottom: "24px",
            }}
          >
            <span style={{ width: "34px", height: "1.5px", background: "#B0821A", display: "inline-block" }} />
            {t.eyebrow}
          </div>
          <h1
            style={{
              margin: "0 0 30px",
              font: `500 clamp(46px,6.5vw,84px)/1.06 ${serif}`,
              letterSpacing: "-.015em",
              color: "#22352F",
            }}
          >
            {t.heroT1}
            <em style={{ fontStyle: "italic", color: "#B0821A" }}>{t.heroEm}</em>
            {t.heroT2}
          </h1>
          <p
            style={{
              margin: "0 0 40px",
              font: `400 20px/1.65 ${sans}`,
              color: "#4B564F",
              maxWidth: "540px",
            }}
          >
            {t.heroP}
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "14px",
              marginBottom: "48px",
            }}
          >
            <Link
              href="/announcements"
              className="inline-flex items-center rounded-full bg-[#22352F] text-white transition-colors hover:bg-[#33534B] hover:text-white"
              style={{ gap: "10px", font: `600 17px ${sans}`, padding: "17px 32px" }}
            >
              {t.btnAnn} <span>→</span>
            </Link>
            <a
              href="#about"
              className="inline-flex items-center rounded-full transition-colors hover:bg-[#22352F] hover:text-white"
              style={{
                gap: "10px",
                color: "#22352F",
                border: "1.5px solid #22352F",
                font: `600 17px ${sans}`,
                padding: "17px 32px",
              }}
            >
              {t.btnAbout}
            </a>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "24px clamp(24px,3vw,40px)" }}>
            <div style={{ borderLeft: "2px solid #C9971C", paddingLeft: "18px" }}>
              <div style={{ font: `700 13px ${sans}`, letterSpacing: ".16em", textTransform: "uppercase", color: "#8A8474", marginBottom: "4px" }}>
                {t.w1t}
              </div>
              <div style={{ font: `500 20px ${serif}`, color: "#22352F" }}>{t.w1d}</div>
            </div>
            <div style={{ borderLeft: "2px solid #C9971C", paddingLeft: "18px" }}>
              <div style={{ font: `700 13px ${sans}`, letterSpacing: ".16em", textTransform: "uppercase", color: "#8A8474", marginBottom: "4px" }}>
                {t.w2t}
              </div>
              <div style={{ font: `500 20px ${serif}`, color: "#22352F" }}>{t.w2d}</div>
            </div>
          </div>
        </div>

        <div style={{ position: "relative" }}>
          <div
            style={{
              borderRadius: "320px 320px 0 0",
              overflow: "hidden",
              height: "min(640px,92vw)",
              background:
                "url('/hero-redesign.jpg') center/cover",
            }}
          />
          <Link
            href="/announcements"
            style={{
              position: "absolute",
              left: "max(-28px,-5vw)",
              bottom: "36px",
              background: "#fff",
              boxShadow: "0 16px 40px rgba(20,30,26,.15)",
              padding: "22px 28px",
              display: "flex",
              alignItems: "center",
              gap: "16px",
              borderRadius: "14px",
            }}
          >
            <img src="/adventist-logo.png" alt="" style={{ width: "34px", height: "auto" }} />
            <span>
              <span style={{ display: "block", font: `600 16px ${sans}`, color: "#22352F" }}>
                {t.visitT}
              </span>
              <span style={{ display: "block", font: `600 14px ${sans}`, color: "#B0821A" }}>
                {t.visitL}
              </span>
            </span>
          </Link>
        </div>
      </div>

      {/* THIS WEEK */}
      <div style={{ background: "#fff", padding: "clamp(56px,7vw,96px) clamp(20px,5vw,72px)" }}>
        <div style={{ font: `600 14px ${sans}`, letterSpacing: ".2em", textTransform: "uppercase", color: "#B0821A", marginBottom: "14px" }}>
          {t.twEyebrow}
        </div>
        <h2 style={{ margin: "0 0 52px", font: `500 clamp(34px,4.8vw,54px)/1.12 ${serif}`, letterSpacing: "-.01em", color: "#22352F" }}>
          {t.twTitle}
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(340px,100%),1fr))", gap: "28px" }}>
          <div style={{ border: "1px solid #E4DFD2", padding: "clamp(28px,3.5vw,44px)", display: "flex", flexDirection: "column", gap: "14px" }}>
            <div style={{ font: `700 14px ${sans}`, letterSpacing: ".16em", textTransform: "uppercase", color: "#33534B" }}>{t.c1k}</div>
            <div style={{ font: `500 28px ${serif}`, color: "#22352F" }}>{t.c1t}</div>
            <p style={{ margin: 0, font: `400 17px/1.6 ${sans}`, color: "#4B564F" }}>{t.c1d}</p>
          </div>
          <div style={{ border: "1px solid #E4DFD2", padding: "clamp(28px,3.5vw,44px)", display: "flex", flexDirection: "column", gap: "14px" }}>
            <div style={{ font: `700 14px ${sans}`, letterSpacing: ".16em", textTransform: "uppercase", color: "#33534B" }}>{t.c2k}</div>
            <div style={{ font: `500 28px ${serif}`, color: "#22352F" }}>{t.c2t}</div>
            <p style={{ margin: 0, font: `400 17px/1.6 ${sans}`, color: "#4B564F" }}>{t.c2d}</p>
          </div>
        </div>
        <div
          style={{
            marginTop: "28px",
            background: "#22352F",
            color: "#fff",
            padding: "clamp(28px,4vw,44px) clamp(24px,4vw,52px)",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "24px 40px",
          }}
        >
          <div style={{ maxWidth: "760px" }}>
            <div style={{ font: `500 26px ${serif}`, marginBottom: "10px" }}>{t.bandT}</div>
            <p style={{ margin: 0, font: `400 17px/1.6 ${sans}`, color: "rgba(255,255,255,.85)" }}>{t.bandP}</p>
          </div>
          <Link
            href="/announcements"
            className="inline-flex flex-none items-center rounded-full bg-white text-[#22352F] transition-colors hover:bg-[#E5B93C]"
            style={{ gap: "10px", font: `600 16px ${sans}`, padding: "16px 30px" }}
          >
            {t.bandBtn} <span>→</span>
          </Link>
        </div>
      </div>

      {/* ABOUT */}
      <div id="about" style={{ padding: "clamp(56px,7vw,96px) clamp(20px,5vw,72px)", background: "#FAF7F0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(440px,100%),1fr))", gap: "clamp(36px,5vw,72px)" }}>
          <div>
            <div style={{ font: `600 14px ${sans}`, letterSpacing: ".2em", textTransform: "uppercase", color: "#B0821A", marginBottom: "16px" }}>
              {t.whoEyebrow}
            </div>
            <h2 style={{ margin: 0, font: `500 clamp(34px,4.8vw,54px)/1.12 ${serif}`, letterSpacing: "-.01em", color: "#22352F" }}>
              {t.aboutTitle}
            </h2>
            <div style={{ marginTop: "44px", background: "#fff", border: "1px solid #E4DFD2", borderRadius: "18px", padding: "36px" }}>
              <div style={{ font: `500 22px ${serif}`, color: "#22352F", marginBottom: "20px" }}>{t.snapT}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {t.snapItems.map((item) => (
                  <div key={item} style={{ display: "flex", gap: "12px", font: `400 16px/1.5 ${sans}`, color: "#4B564F" }}>
                    <span style={{ color: "#000000" }}>●</span> {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "22px", font: `400 19px/1.7 ${sans}`, color: "#3B4740", paddingTop: "12px" }}>
            <p style={{ margin: 0 }}>{t.p1}</p>
            <p style={{ margin: 0 }}>{t.p2}</p>
            <p style={{ margin: 0 }}>{t.p3}</p>
            <p style={{ margin: 0, font: `italic 500 19px/1.7 ${serif}`, color: "#22352F" }}>{t.q}</p>
          </div>
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
