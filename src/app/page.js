 "use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { events } from "./announcementsData";
import { socialLinks } from "./socialLinks";

function SectionHeading({ label, eyebrow }) {
  return (
    <div className="mb-6">
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#c9a84c]">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
        {label}
      </h2>
    </div>
  );
}

function PillCard({ title, subtitle, icon }) {
  return (
    <div className="flex flex-1 items-center gap-3 rounded-2xl bg-white/90 p-4 text-left shadow-sm ring-1 ring-slate-200 backdrop-blur">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#c9a84c]/90 text-slate-900 shadow">
        <span aria-hidden="true" className="text-lg">
          {icon}
        </span>
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-900">{title}</p>
        <p className="text-xs text-slate-600">{subtitle}</p>
      </div>
    </div>
  );
}

function EventCard({ item, language }) {
  const isSpanish = language === "es";
  const title = isSpanish ? item.titleEs : item.titleEn;
  const description = isSpanish ? item.descriptionEs : item.descriptionEn;
  const date = isSpanish ? (item.dateEs ?? item.dateEn) : (item.dateEn ?? item.date);

  return (
    <article
      className={`flex flex-col gap-2 rounded-2xl p-4 text-left shadow backdrop-blur ${
        item.highlight
          ? "bg-[#c9a84c]/95 text-slate-950 ring-1 ring-[#e5d4a8]"
          : "bg-white text-slate-800 ring-1 ring-slate-200 shadow-sm"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-sm font-semibold">{title}</h3>
        {item.category && (
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
              item.highlight
                ? "bg-slate-900/90 text-[#e5d4a8]"
                : "bg-[#c9a84c]/90 text-slate-900"
            }`}
          >
            {item.category}
          </span>
        )}
      </div>
      <p
        className={`text-xs font-medium ${
          item.highlight ? "text-slate-950/80" : "text-[#c9a84c]"
        }`}
      >
        {date}
        {item.time ? ` • ${item.time}` : null}
      </p>
      <p
        className={`text-xs leading-relaxed ${
          item.highlight ? "text-slate-950/80" : "text-slate-600"
        }`}
      >
        {description}
      </p>
    </article>
  );
}

const LANGUAGE_KEY = "mn-language";

const copy = {
  en: {
    navHome: "Home",
    navAbout: "About",
    navAnnouncements: "Announcements",
    heroEyebrow: "Welcome to our church family",
    heroParagraph:
      "A place of worship, community, and hope. Join us as we grow together in faith and service, centered on Jesus and grounded in God's Word.",
    heroCtaAnnouncements: "Announcements & Events",
    heroCtaAbout: "Learn About Us",
    heroSeatText:
      "Scanned this from your seat? Click below to view all announcements and upcoming events.",
    highlightTitle: "This week at McAllen North",
    highlightWelcomeTitle: "New or visiting today?",
    highlightWelcomeBody:
      "We'd love to connect with you. Talk with a greeter or elder after the service, or ask about joining a Sabbath School class or small group.",
    aboutEyebrow: "Who we are",
    aboutHeading: "About McAllen North SDA Church",
    aboutP1:
      "McAllen North is a Seventh-day Adventist congregation in McAllen, Texas. We are a Christian community and would love to have you join our church family for Bible study, worship, and prayer.",
    aboutP2:
      "As part of the worldwide Seventh-day Adventist Church, we seek to improve the quality of life for people and let the world know that Jesus is coming soon. We believe in the Father, the Son, and the Holy Spirit, salvation by grace through faith, and the authority of Scripture.",
    aboutP3:
      "Adventists believe that God cares about every area of life—our families, health, work, talents, resources, and time. Whether you are new to church, visiting from out of town, or looking for a church family, you are welcome here.",
    snapshotTitle: "Service snapshot",
    snapshotSabbathSchool:
      "Sabbath School – Saturdays at 9:30 AM (classes for all ages)",
    snapshotWorship: "Worship Service – Saturdays at 11:00 AM",
    snapshotPrayer: "Prayer Meeting – Wednesdays at 7:30 PM",
    snapshotQuestions:
      "Have questions about beliefs, ministries, or membership? Please speak with a pastor, elder, or greeter—we're here to help.",
    announcementsEyebrow: "Stay connected",
    announcementsHeading: "Announcements & Events",
    currentAnnouncementsTitle: "Current Announcements",
    currentAnnouncementsBody:
      "Updated regularly. Check back each Sabbath for the latest information.",
    upcomingEventsTitle: "Upcoming Events",
    upcomingEventsBody:
      "Highlighting regular gatherings and special events in our church life.",
    updateNotePrefix: "To update these announcements, open",
    updateNoteMiddle: "and edit the",
    updateNoteSuffix: "lists near the top of the file.",
    footerVerse:
      "“Here is the patience of the saints: here are they that keep the commandments of God, and the faith of Jesus.” — Revelation 14:12",
    locationTitle: "Where we meet",
    locationAddress: "1217 N 27th 1/2 St",
    locationCity: "McAllen, TX",
    locationPhoneLabel: "Call us",
    locationPhoneNumber: "956-686-5065",
    pillWorshipTitle: "Sabbath Worship",
    pillWorshipSubtitle: "Saturday · 11:00 AM",
    pillSchoolTitle: "Sabbath School",
    pillSchoolSubtitle: "Saturday · 9:30 AM",
    langPromptTitle: "Choose your language",
    langPromptBody:
      "Welcome to McAllen North SDA Church. Please choose your preferred language for this page.",
    langEnglish: "English",
    langSpanish: "Español",
    footerFollowUs: "Follow us",
  },
  es: {
    navHome: "Inicio",
    navAbout: "Quiénes somos",
    navAnnouncements: "Anuncios",
    heroEyebrow: "Bienvenido a nuestra familia",
    heroParagraph:
      "Un lugar de adoración, comunidad y esperanza. Acompáñanos mientras crecemos juntos en la fe y el servicio, centrados en Jesús y en la Palabra de Dios.",
    heroCtaAnnouncements: "Anuncios y Eventos",
    heroCtaAbout: "Conócenos",
    heroSeatText:
      "¿Escaneaste este código desde tu asiento? Haz clic abajo para ver todos los anuncios y eventos próximos.",
    highlightTitle: "Esta semana en McAllen North",
    highlightWelcomeTitle: "¿Nuevo o de visita hoy?",
    highlightWelcomeBody:
      "Nos encantaría conocerte. Habla con un ujier o anciano después del servicio, o pregunta sobre las clases de Escuela Sabática o un grupo pequeño.",
    aboutEyebrow: "Quiénes somos",
    aboutHeading: "Acerca de McAllen North SDA Church",
    aboutP1:
      "McAllen North es una congregación Adventista del Séptimo Día en McAllen, Texas. Somos una comunidad cristiana y nos encantaría que te unieras a nuestra familia para el estudio bíblico, el culto y la oración.",
    aboutP2:
      "Como parte de la Iglesia Adventista del Séptimo Día a nivel mundial, buscamos mejorar la calidad de vida de las personas y dar a conocer que Jesús volverá pronto. Creemos en Dios Padre, Dios Hijo y Dios Espíritu Santo, en la salvación por gracia mediante la fe y en la autoridad de la Biblia.",
    aboutP3:
      "Los adventistas creemos que a Dios le importa cada área de nuestra vida: la familia, la salud, el trabajo, los talentos, los recursos y el tiempo. Ya sea que seas nuevo en la iglesia, estés de visita o busques una familia espiritual, eres bienvenido aquí.",
    snapshotTitle: "Horarios de servicio",
    snapshotSabbathSchool:
      "Escuela Sabática – Sábados a las 9:30 AM (clases para todas las edades)",
    snapshotWorship: "Servicio de Adoración – Sábados a las 11:00 AM",
    snapshotPrayer: "Reunión de oración – Miércoles a las 7:30 PM",
    snapshotQuestions:
      "¿Tienes preguntas sobre las creencias, ministerios o membresía? Habla con un pastor, anciano o ujier; queremos ayudarte.",
    announcementsEyebrow: "Mantente conectado",
    announcementsHeading: "Anuncios y Eventos",
    currentAnnouncementsTitle: "Anuncios actuales",
    currentAnnouncementsBody:
      "Se actualiza regularmente. Vuelve cada sábado para ver la información más reciente.",
    upcomingEventsTitle: "Próximos eventos",
    upcomingEventsBody:
      "Destacando reuniones regulares y eventos especiales de nuestra iglesia.",
    updateNotePrefix: "Para actualizar estos anuncios, abre",
    updateNoteMiddle: "y edita las listas",
    updateNoteSuffix: "cerca del inicio del archivo.",
    footerVerse:
      "“Aquí está la paciencia de los santos, los que guardan los mandamientos de Dios y la fe de Jesús.” — Apocalipsis 14:12",
    locationTitle: "Dónde nos reunimos",
    locationAddress: "1217 N 27th 1/2 St",
    locationCity: "McAllen, TX",
    locationPhoneLabel: "Llámanos",
    locationPhoneNumber: "956-686-5065",
    pillWorshipTitle: "Servicio de adoración",
    pillWorshipSubtitle: "Sábado · 11:00 AM",
    pillSchoolTitle: "Escuela Sabática",
    pillSchoolSubtitle: "Sábado · 9:30 AM",
    langPromptTitle: "Elige tu idioma",
    langPromptBody:
      "Bienvenido a McAllen North SDA Church. Por favor elige tu idioma preferido para esta página.",
    langEnglish: "English",
    langSpanish: "Español",
    footerFollowUs: "Síguenos",
  },
};

const SocialIcon = ({ href, ariaLabel, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={ariaLabel}
    className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-[#c9a84c] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] focus-visible:ring-offset-2"
  >
    {children}
  </a>
);

export default function Home() {
  const [language, setLanguage] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(LANGUAGE_KEY);
    if (stored === "en" || stored === "es") {
      setLanguage(stored);
    }
  }, []);

  const activeLanguage = language === "es" ? "es" : "en";
  const t = copy[activeLanguage];

  const scrollToSection = (id) => {
    if (typeof window === "undefined") return;
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="relative isolate overflow-hidden">
        {/* Hero background image with overlay */}
        <div className="pointer-events-none absolute inset-0 -z-20">
          <Image
            src="/bible.jpg"
            alt="Bible"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-br from-white/90 via-white/70 to-white/40" />
        </div>

        {/* Subtle top gradient glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-52 bg-linear-to-b from-[#c9a84c]/15 via-transparent to-transparent"
        />

        <header className="mx-auto flex max-w-5xl items-center justify-between px-5 pt-5 sm:px-6 sm:pt-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="relative h-9 w-9 overflow-hidden rounded-full bg-white p-1 shadow ring-1 ring-slate-200">
              <Image
                src="/adventist-logo.gif"
                alt="Seventh-day Adventist Church logo"
                fill
                sizes="36px"
                className="object-contain"
              />
            </div>
            <div className="leading-tight">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#c9a84c]">
                McAllen North
              </p>
              <p className="text-xs text-slate-600">
                Seventh-day Adventist Church
              </p>
            </div>
          </div>

          <nav
            className="hidden items-center gap-5 text-xs font-medium text-slate-600 sm:flex"
            aria-label="Main navigation"
          >
            <button
              type="button"
              onClick={() => scrollToSection("home")}
              className="rounded-full px-3 py-1 text-[#c9a84c] shadow-sm ring-1 ring-[#c9a84c]/40 transition hover:bg-[#c9a84c]/10 hover:text-[#c9a84c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c]"
            >
              {t.navHome}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("about")}
              className="rounded-full px-3 py-1 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c]"
            >
              {t.navAbout}
            </button>
            <Link
              href="/announcements"
              className="rounded-full px-3 py-1 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c]"
            >
              {t.navAnnouncements}
            </Link>
          </nav>
        </header>

        <main
          id="home"
          className="mx-auto flex max-w-5xl flex-col gap-16 px-5 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-12 lg:flex-row lg:items-stretch lg:gap-20 lg:px-8 lg:pb-24 lg:pt-16"
        >
          {/* Left column: Hero text */}
          <section
            aria-labelledby="hero-heading"
            className="flex-1 space-y-8 lg:space-y-10"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#c9a84c]">
                {t.heroEyebrow}
              </p>
              <h1
                id="hero-heading"
                className="mt-3 text-4xl font-semibold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl"
              >
                McAllen North{" "}
                <span className="block text-[#c9a84c]">SDA Church</span>
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-700 sm:text-base">
                {t.heroParagraph}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Link
                href="/announcements"
                className="inline-flex items-center justify-center rounded-full bg-[#c9a84c] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#c9a84c]/40 transition hover:bg-[#c9a84c]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              >
                {t.heroCtaAnnouncements}
                <span aria-hidden="true" className="ml-2">
                  →
                </span>
              </Link>
              <button
                type="button"
                onClick={() => scrollToSection("about")}
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-slate-50 px-6 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              >
                {t.heroCtaAbout}
              </button>
            </div>

            <div className="mt-4 grid gap-3 text-xs text-slate-700 sm:grid-cols-2">
              <PillCard
                title={t.pillWorshipTitle}
                subtitle={t.pillWorshipSubtitle}
                icon="⛪"
              />
              <PillCard
                title={t.pillSchoolTitle}
                subtitle={t.pillSchoolSubtitle}
                icon="📖"
              />
            </div>

            <p className="mt-4 text-[11px] text-slate-600">{t.heroSeatText}</p>
          </section>

          {/* Right column: Highlight cards (desktop) */}
          <section
            aria-label="Highlighted information"
            className="flex-1 space-y-4 rounded-3xl bg-white/80 p-4 shadow-xl ring-1 ring-slate-200 backdrop-blur sm:p-5 lg:flex lg:flex-col lg:justify-between"
          >
            <div className="space-y-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#c9a84c]">
                {t.highlightTitle}
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <EventCard item={events[0]} language={activeLanguage} />
                <EventCard item={events[1]} language={activeLanguage} />
              </div>
            </div>

            <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-xs text-slate-700 ring-1 ring-slate-200">
              <p className="font-semibold text-[#c9a84c]">
                {t.highlightWelcomeTitle}
              </p>
              <p className="mt-1">{t.highlightWelcomeBody}</p>
            </div>
          </section>
        </main>
      </div>

      {/* About Section */}
      <section
        id="about"
        className="border-t border-slate-200 bg-slate-50 px-5 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16"
      >
        <div className="mx-auto max-w-5xl">
          <SectionHeading eyebrow={t.aboutEyebrow} label={t.aboutHeading} />
          <div className="grid gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:items-start">
            <div className="space-y-4 text-sm leading-relaxed text-slate-700 sm:text-base">
              <p>{t.aboutP1}</p>
              <p>{t.aboutP2}</p>
              <p>{t.aboutP3}</p>
            </div>
            <div className="space-y-4 rounded-2xl bg-white p-4 text-sm text-slate-700 ring-1 ring-slate-200 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#c9a84c]">
                {t.snapshotTitle}
              </p>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li className="flex items-start gap-2">
                  <span className="mt-[2px] text-[#c9a84c]" aria-hidden="true">
                    ●
                  </span>
                  <span>{t.snapshotSabbathSchool}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-[2px] text-[#c9a84c]" aria-hidden="true">
                    ●
                  </span>
                  <span>{t.snapshotWorship}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-[2px] text-[#c9a84c]" aria-hidden="true">
                    ●
                  </span>
                  <span>{t.snapshotPrayer}</span>
                </li>
              </ul>
              <p className="pt-1 text-xs text-slate-600">
                {t.snapshotQuestions}
              </p>
              <div className="mt-4 border-t border-slate-200 pt-3 text-xs text-slate-600 sm:text-sm">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#c9a84c]">
                  {t.locationTitle}
                </p>
                <p className="mt-1">
                  {t.locationAddress}, {t.locationCity}
                </p>
                <p className="mt-1">
                  <span className="font-semibold">{t.locationPhoneLabel}:</span>{" "}
                  {t.locationPhoneNumber}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white px-5 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-4">
          {/* Social links */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                {t.footerFollowUs}
              </p>
              <div className="flex gap-2">
                <SocialIcon
                  href={socialLinks.facebook}
                  ariaLabel="Facebook"
                >
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </SocialIcon>
                <SocialIcon
                  href={socialLinks.youtube}
                  ariaLabel="YouTube"
                >
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
                      clipRule="evenodd"
                    />
                  </svg>
                </SocialIcon>
                <SocialIcon
                  href={socialLinks.instagram}
                  ariaLabel="Instagram"
                >
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 0 1 1.772 1.153 4.902 4.902 0 0 1 1.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 0 1-1.153 1.772 4.902 4.902 0 0 1-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 0 1-1.772-1.153 4.902 4.902 0 0 1-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 0 1 1.153-1.772A4.902 4.902 0 0 1 5.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 0 0-.748-1.15 3.098 3.098 0 0 0-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 1 1 0 10.27 5.135 5.135 0 0 1 0-10.27zm0 8.468a3.333 3.333 0 1 1 0-6.666 3.333 3.333 0 0 1 0 6.666zm5.338-3.205a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </SocialIcon>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 text-[11px] text-slate-600 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} McAllen North Seventh-day Adventist
              Church. All rights reserved.
            </p>
            <p className="text-[10px]">{t.footerVerse}</p>
          </div>
        </div>
      </footer>

      {/* Language chooser overlay (first visit) */}
      {language === null && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/50 px-6">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="language-dialog-title"
            className="w-full max-w-sm rounded-3xl bg-white p-6 text-center shadow-xl ring-1 ring-slate-200"
          >
            <p
              id="language-dialog-title"
              className="text-sm font-semibold text-slate-900 sm:text-base"
            >
              {copy.en.langPromptTitle} / {copy.es.langPromptTitle}
            </p>
            <p className="mt-3 text-xs leading-relaxed text-slate-600">
              {copy.en.langPromptBody}
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={() => {
                  setLanguage("en");
                  if (typeof window !== "undefined") {
                    window.localStorage.setItem(LANGUAGE_KEY, "en");
                  }
                }}
                className="inline-flex flex-1 items-center justify-center rounded-full bg-[#c9a84c] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#c9a84c]/40 transition hover:bg-[#c9a84c]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              >
                {copy.en.langEnglish}
              </button>
              <button
                type="button"
                onClick={() => {
                  setLanguage("es");
                  if (typeof window !== "undefined") {
                    window.localStorage.setItem(LANGUAGE_KEY, "es");
                  }
                }}
                className="inline-flex flex-1 items-center justify-center rounded-full border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              >
                {copy.es.langSpanish}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
