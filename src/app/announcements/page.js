"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { announcements, events } from "../announcementsData";

const LANGUAGE_KEY = "mn-language";

const copy = {
  en: {
    navHome: "Home",
    navAbout: "About",
    navAnnouncements: "Announcements",
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
      '"Here is the patience of the saints: here are they that keep the commandments of God, and the faith of Jesus." — Revelation 14:12',
    langPromptTitle: "Choose your language",
    langPromptBody:
      "Welcome to McAllen North SDA Church. Please choose your preferred language for this page.",
    langEnglish: "English",
    langSpanish: "Español",
    backToHome: "Back to Home",
    qrWelcome: "Welcome! You scanned the QR code from your seat.",
  },
  es: {
    navHome: "Inicio",
    navAbout: "Quiénes somos",
    navAnnouncements: "Anuncios",
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
      '"Aquí está la paciencia de los santos, los que guardan los mandamientos de Dios y la fe de Jesús." — Apocalipsis 14:12',
    langPromptTitle: "Elige tu idioma",
    langPromptBody:
      "Bienvenido a McAllen North SDA Church. Por favor elige tu idioma preferido para esta página.",
    langEnglish: "English",
    langSpanish: "Español",
    backToHome: "Volver al inicio",
    qrWelcome: "¡Bienvenido! Escaneaste el código QR desde tu asiento.",
  },
};

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

function AnnouncementCard({ item, language }) {
  const isSpanish = language === "es";
  const title = isSpanish ? item.titleEs : item.titleEn;
  const description = isSpanish ? item.descriptionEs : item.descriptionEn;
  const date = isSpanish ? (item.dateEs ?? item.dateEn) : (item.dateEn ?? item.date);

  return (
    <article className="flex flex-col gap-2 rounded-2xl bg-white p-4 text-left shadow-sm ring-1 ring-slate-200">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
        {item.category && (
          <span className="inline-flex items-center rounded-full bg-[#c9a84c]/90 px-2.5 py-0.5 text-xs font-semibold text-slate-900">
            {item.category}
          </span>
        )}
      </div>
      <p className="text-xs font-medium text-[#c9a84c]">
        {date}
        {item.time ? ` • ${item.time}` : null}
      </p>
      <p className="text-xs leading-relaxed text-slate-600">{description}</p>
    </article>
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

export default function AnnouncementsPage() {
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

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
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
          </Link>

          <nav
            className="flex items-center gap-3 text-xs font-medium text-slate-600"
            aria-label="Main navigation"
          >
            <Link
              href="/"
              className="rounded-full px-3 py-1 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c]"
            >
              {t.navHome}
            </Link>
            <Link
              href="/#about"
              className="rounded-full px-3 py-1 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c]"
            >
              {t.navAbout}
            </Link>
            <span className="rounded-full px-3 py-1 text-[#c9a84c] shadow-sm ring-1 ring-[#c9a84c]/40">
              {t.navAnnouncements}
            </span>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-5xl px-5 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        {/* QR Welcome Message */}
        <div className="mb-8 rounded-2xl bg-[#c9a84c]/10 p-4 text-center ring-1 ring-[#c9a84c]/20">
          <p className="text-sm font-semibold text-[#c9a84c] sm:text-base">
            {t.qrWelcome}
          </p>
        </div>

        <SectionHeading
          eyebrow={t.announcementsEyebrow}
          label={t.announcementsHeading}
        />

        <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:items-start">
          {/* Current announcements */}
          <section
            aria-label="Current announcements"
            className="space-y-4 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200"
          >
            <h3 className="text-sm font-semibold text-slate-900 sm:text-base">
              {t.currentAnnouncementsTitle}
            </h3>
            <p className="text-xs text-slate-600">
              {t.currentAnnouncementsBody}
            </p>
            <div className="mt-3 grid gap-3">
              {announcements.map((item) => (
                <AnnouncementCard
                  key={item.id}
                  item={item}
                  language={activeLanguage}
                />
              ))}
            </div>
          </section>

          {/* Upcoming events */}
          <section
            aria-label="Upcoming events"
            className="space-y-4 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200"
          >
            <h3 className="text-sm font-semibold text-slate-900 sm:text-base">
              {t.upcomingEventsTitle}
            </h3>
            <p className="text-xs text-slate-600">
              {t.upcomingEventsBody}
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {events.map((item) => (
                <EventCard
                  key={item.id}
                  item={item}
                  language={activeLanguage}
                />
              ))}
            </div>
          </section>
        </div>

        <p className="mt-6 text-[11px] text-slate-600">
          {t.updateNotePrefix}{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] text-[#c9a84c]">
            src/app/announcementsData.js
          </code>{" "}
          {t.updateNoteMiddle}{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] text-[#c9a84c]">
            announcements
          </code>{" "}
          and{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] text-[#c9a84c]">
            events
          </code>{" "}
          {t.updateNoteSuffix}
        </p>
      </main>

      <footer className="border-t border-slate-200 bg-white px-5 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-3 text-[11px] text-slate-600 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} McAllen North Seventh-day Adventist
            Church. All rights reserved.
          </p>
          <p className="text-[10px]">{t.footerVerse}</p>
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
