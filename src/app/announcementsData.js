// ============================================================================
// EDIT THIS FILE to control what shows on the Announcements page.
//
// - Add / remove / reorder items in the arrays below and the page updates.
// - Keep BOTH the English (…En) and Spanish (…Es) fields filled in for every
//   item, so the page reads correctly in both languages.
// - `date` + `time` combine into the small label at the top of each card
//   (e.g. date "Saturdays" + time "11:00 AM"). Leave `time` as "" if not used.
// - `id` just needs to be unique (used internally); it is never shown.
// ============================================================================

// "Current Announcements" — the white cards near the top of the page.
export const announcements = [
  {
    id: "welcome",
    titleEn: "Welcome to McAllen North SDA Church",
    titleEs: "Bienvenido a la Iglesia Adventista del Séptimo Día McAllen North",
    dateEn: "Ongoing",
    dateEs: "Permanente",
    time: "",
    descriptionEn:
      "We are glad you're here. Scan this code anytime to stay up to date with what's happening in our church family.",
    descriptionEs:
      "Nos alegra que estés aquí. Escanea este código en cualquier momento para mantenerte al día con lo que sucede en nuestra familia de iglesia.",
  },
  {
    id: "prayer-meeting",
    titleEn: "Midweek Prayer Meeting",
    titleEs: "Reunión de oración entre semana",
    dateEn: "Wednesdays",
    dateEs: "Miércoles",
    time: "7:30 PM",
    descriptionEn:
      "Join us for a midweek time of prayer, worship, and reflection in the sanctuary.",
    descriptionEs:
      "Acompáñanos entre semana para un tiempo de oración, adoración y reflexión en el santuario.",
  },
];

// "Upcoming Events" — the bordered cards further down the page.
export const events = [
  {
    id: "sabbath-worship",
    titleEn: "Sabbath Worship Service",
    titleEs: "Servicio de adoración del sábado",
    dateEn: "Saturdays",
    dateEs: "Sábados",
    time: "11:00 AM",
    descriptionEn:
      "A Christ-centered worship service with Bible-based preaching and uplifting music.",
    descriptionEs:
      "Un servicio de adoración centrado en Cristo con predicación basada en la Biblia y música edificante.",
  },
  {
    id: "sabbath-school",
    titleEn: "Sabbath School",
    titleEs: "Escuela Sabática",
    dateEn: "Saturdays",
    dateEs: "Sábados",
    time: "9:30 AM",
    descriptionEn:
      "Interactive Bible study classes for all ages. Visitors are always welcome.",
    descriptionEs:
      "Clases interactivas de estudio bíblico para todas las edades. Los visitantes siempre son bienvenidos.",
  },
  {
    id: "youth-vespers",
    titleEn: "Youth Vespers",
    titleEs: "Grupo Pequeno de jóvenes",
    dateEn: "Fridays",
    dateEs: "Viernes",
    time: "7:30 PM",
    descriptionEn:
      "A time of worship, fellowship, and spiritual growth for youth and young adults.",
    descriptionEs:
      "Un tiempo de adoración, compañerismo y crecimiento espiritual para jóvenes y jóvenes adultos.",
  },
];
