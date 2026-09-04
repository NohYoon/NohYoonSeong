let lang = localStorage.getItem("lang") || "en";

function t(field) {
  return typeof field === "string" ? field : field[lang];
}

const CITY_KR = { Seoul: "서울", Daejeon: "대전" };
function cityName(city) {
  return lang === "kr" ? CITY_KR[city] || city : city;
}

function el(tag, opts = {}, children = []) {
  const node = document.createElement(tag);
  if (opts.class) node.className = opts.class;
  if (opts.text) node.textContent = opts.text;
  if (opts.open) node.open = true;
  children.forEach((c) => c && node.appendChild(c));
  return node;
}

function roleOrgLine(role, org) {
  const span = el("span", { class: "entry-roleorg" });
  span.appendChild(el("strong", { text: role }));
  span.appendChild(document.createTextNode(", "));
  span.appendChild(el("em", { text: org }));
  return span;
}

function entrySummary(period, role, org) {
  return el("summary", { class: "entry-summary" }, [
    el("span", { class: "entry-period", text: period }),
    roleOrgLine(role, org),
    el("span", { class: "disclosure", text: "▾" }),
  ]);
}

function entryDetails(entry) {
  const summary = entrySummary(entry.period, t(entry.role), t(entry.org));
  const body = el("div", { class: "entry-body" });
  if (entry.orgNote) body.appendChild(el("p", { class: "entry-orgnote", text: t(entry.orgNote) }));
  if (entry.location) body.appendChild(el("p", { class: "entry-location", text: cityName(entry.location) }));
  const ul = el("ul", { class: "entry-bullets" });
  entry.bullets.forEach((b) => ul.appendChild(el("li", { text: t(b) })));
  body.appendChild(ul);
  if (entry.projectList) {
    body.appendChild(el("p", { class: "entry-subheading", text: UI[lang].selectedProjects }));
    const pl = el("ul", { class: "entry-bullets project-list" });
    entry.projectList.forEach((p) => {
      const li = document.createElement("li");
      const periodText = p.note ? `${p.period}, ${t(p.note)}` : p.period;
      li.appendChild(el("strong", { text: t(p.org) }));
      li.appendChild(document.createTextNode(" — " + t(p.name) + " "));
      li.appendChild(el("span", { class: "project-period", text: "(" + periodText + ")" }));
      pl.appendChild(li);
    });
    body.appendChild(pl);
  }
  if (entry.note) body.appendChild(el("p", { class: "entry-note", text: t(entry.note) }));
  return el("details", { class: "entry" }, [summary, body]);
}

function chapter(id, titleKey, contentNode, openByDefault = false) {
  const label = el("span", { class: "chapter-label", text: UI[lang][titleKey] });
  const disclosure = el("span", { class: "disclosure", text: "▾" });
  const summary = el("summary", { class: "chapter-summary" }, [label, disclosure]);
  const details = el("details", { class: "chapter", open: openByDefault }, [summary, contentNode]);
  details.id = id;
  return details;
}

function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Highlights the CV owner's name wherever it appears in a citation, in either casing used in the source data.
function boldName(text) {
  return escapeHtml(text).replace(/NohYoon Seong|Nohyoon Seong/g, "<strong>$&</strong>");
}

function citationList(items) {
  const ul = el("ul", { class: "citation-list" });
  items.forEach((c) => {
    const li = document.createElement("li");
    li.innerHTML = boldName(c);
    ul.appendChild(li);
  });
  return ul;
}

// Renders one patent citation, e.g. "Title. Korean Patent No. 10-XXXXXXX (2025.04.21). Applicant. Inventors: A, B."
function patentText(p) {
  const noLabel = lang === "kr" ? "특허 제" : "Korean Patent No. ";
  const noSuffix = lang === "kr" ? "호" : "";
  const inventorLabel = lang === "kr" ? "발명자: " : "Inventors: ";
  const statusNote = p.status === "lapsed" ? (lang === "kr" ? ", 소멸" : ", lapsed") : "";
  return `${t(p.title)}. ${noLabel}${p.number}${noSuffix} (${p.date}${statusNote}). ${t(p.applicant)}. ${inventorLabel}${p.inventors.join(", ")}.`;
}

function patentList(items) {
  const ul = el("ul", { class: "citation-list" });
  items.forEach((p) => {
    const li = document.createElement("li");
    li.innerHTML = escapeHtml(patentText(p)).replace(/성노윤/g, "<strong>성노윤</strong>");
    ul.appendChild(li);
  });
  return ul;
}

const NAV_ORDER = ["profile", "skills", "experience", "projects", "education", "teaching", "conferences", "awards", "patents", "publications", "services"];
let sectionObserver;

function renderNav() {
  const nav = document.getElementById("section-nav-inner");
  nav.innerHTML = "";
  NAV_ORDER.forEach((id) => {
    const a = document.createElement("a");
    a.href = "#" + id;
    a.textContent = UI[lang][id];
    a.dataset.navFor = id;
    nav.appendChild(a);
  });
}

function setupScrollspy() {
  if (sectionObserver) sectionObserver.disconnect();
  const links = document.querySelectorAll("#section-nav a");
  sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((l) => l.classList.toggle("active", l.dataset.navFor === entry.target.id));
      });
    },
    { rootMargin: "-15% 0px -70% 0px" }
  );
  NAV_ORDER.forEach((id) => {
    const section = document.getElementById(id);
    if (section) sectionObserver.observe(section);
  });
}

function render() {
  document.documentElement.lang = lang === "kr" ? "ko" : "en";
  document.getElementById("lang-kr").classList.toggle("active", lang === "kr");
  document.getElementById("lang-en").classList.toggle("active", lang === "en");

  document.getElementById("name").textContent = PROFILE.name;
  document.getElementById("photo").src = PROFILE.photo;
  const emailLink = document.getElementById("email");
  emailLink.textContent = PROFILE.email;
  emailLink.href = "mailto:" + PROFILE.email;
  document.getElementById("scholar").href = PROFILE.scholar;
  document.getElementById("last-update").textContent = `${UI[lang].lastUpdate}: ${LAST_UPDATE}`;

  const main = document.getElementById("main");
  main.innerHTML = "";

  // Profile
  const profileBody = el("div", { class: "chapter-content" });
  PROFILE.summary[lang].forEach((line) => profileBody.appendChild(el("p", { text: line })));
  main.appendChild(chapter("profile", "profile", profileBody, true));

  // Skills
  const skillsBody = el("ul", { class: "plain-list" });
  SKILLS[lang].forEach((s) => skillsBody.appendChild(el("li", { text: s })));
  main.appendChild(chapter("skills", "skills", skillsBody, true));

  // Experience
  const expBody = el("div", { class: "chapter-content" });
  EXPERIENCE.forEach((entry) => expBody.appendChild(entryDetails(entry)));
  main.appendChild(chapter("experience", "experience", expBody, true));

  // Projects
  const projBody = el("div", { class: "chapter-content" });
  PROJECTS.forEach((entry) => projBody.appendChild(entryDetails(entry)));
  main.appendChild(chapter("projects", "projects", projBody));

  // Education
  const eduBody = el("div", { class: "chapter-content" });
  EDUCATION.forEach((e) => {
    const summary = entrySummary(e.period, t(e.degree), t(e.org));
    const body = el("div", { class: "entry-body" });
    if (e.location) body.appendChild(el("p", { class: "entry-location", text: cityName(e.location) }));
    eduBody.appendChild(el("details", { class: "entry" }, [summary, body]));
  });
  main.appendChild(chapter("education", "education", eduBody, true));

  // Teaching Experience
  const teachingBody = el("div", { class: "chapter-content" });
  TEACHING.forEach((entry) => teachingBody.appendChild(entryDetails(entry)));
  main.appendChild(chapter("teaching", "teaching", teachingBody, true));

  // Conferences
  const confBody = el("div", { class: "chapter-content" });
  confBody.appendChild(chapter("conf-intl", "international", citationList(CONFERENCES.international)));
  confBody.appendChild(chapter("conf-dom", "domestic", citationList(CONFERENCES.domestic)));
  confBody.appendChild(el("p", { class: "notes", text: UI[lang].notes }));
  main.appendChild(chapter("conferences", "conferences", confBody));

  // Awards
  const awardsBody = el("div", { class: "chapter-content" });
  AWARDS.forEach((entry) => awardsBody.appendChild(entryDetails(entry)));
  main.appendChild(chapter("awards", "awards", awardsBody));

  // Patents
  main.appendChild(chapter("patents", "patents", patentList(PATENTS)));

  // Publications
  const pubBody = el("div", { class: "chapter-content" });
  pubBody.appendChild(chapter("pub-intl", "intlJournal", citationList(PUBLICATIONS.intlJournal)));
  pubBody.appendChild(chapter("pub-dom", "domJournal", citationList(PUBLICATIONS.domJournal)));
  pubBody.appendChild(chapter("pub-wp", "workingPapers", citationList(PUBLICATIONS.workingPapers)));
  pubBody.appendChild(el("p", { class: "notes", text: UI[lang].notes }));
  main.appendChild(chapter("publications", "publications", pubBody));

  // Services
  main.appendChild(chapter("services", "services", el("ul", { class: "plain-list" }, SERVICES.map((s) => el("li", { text: t(s) })))));

  renderNav();
  setupScrollspy();
}

document.querySelectorAll(".lang-option").forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.dataset.lang === lang) return;
    lang = btn.dataset.lang;
    localStorage.setItem("lang", lang);
    render();
  });
});

document.getElementById("export-pdf").addEventListener("click", () => {
  const openDetails = [...document.querySelectorAll("details:not([open])")];
  openDetails.forEach((d) => d.setAttribute("data-was-closed", ""));
  document.querySelectorAll("details").forEach((d) => (d.open = true));
  window.print();
  window.addEventListener(
    "afterprint",
    () => {
      document.querySelectorAll("details[data-was-closed]").forEach((d) => {
        d.open = false;
        d.removeAttribute("data-was-closed");
      });
    },
    { once: true }
  );
});

render();
