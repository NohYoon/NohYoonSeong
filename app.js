let lang = localStorage.getItem("lang") || "en";
let activeTab = localStorage.getItem("tab") || "home";
const TABS = ["home", "research", "teaching", "cv"];
const TAB_LABEL_KEY = { home: "tabHome", research: "tabResearch", teaching: "tabTeaching", cv: "tabCV" };

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

function statementParagraphs(statement) {
  const div = el("div", { class: "statement" });
  statement[lang].forEach((p) => div.appendChild(el("p", { text: p })));
  return div;
}

// --- Section builders: each returns one chapter/section DOM node, reused across tabs ---

function buildProfileChapter() {
  const body = el("div", { class: "chapter-content" });
  PROFILE.summary[lang].forEach((line) => body.appendChild(el("p", { text: line })));
  return chapter("profile", "profile", body);
}

function buildSkillsChapter() {
  const body = el("ul", { class: "plain-list" });
  SKILLS[lang].forEach((s) => body.appendChild(el("li", { text: s })));
  return chapter("skills", "skills", body);
}

function buildExperienceChapter() {
  const body = el("div", { class: "chapter-content" });
  EXPERIENCE.forEach((entry) => body.appendChild(entryDetails(entry)));
  return chapter("experience", "experience", body);
}

function buildProjectsChapter() {
  const body = el("div", { class: "chapter-content" });
  PROJECTS.forEach((entry) => body.appendChild(entryDetails(entry)));
  return chapter("projects", "projects", body);
}

function buildEducationChapter() {
  const body = el("div", { class: "chapter-content" });
  EDUCATION.forEach((e) => {
    const summary = entrySummary(e.period, t(e.degree), t(e.org));
    const entryBody = el("div", { class: "entry-body" });
    if (e.location) entryBody.appendChild(el("p", { class: "entry-location", text: cityName(e.location) }));
    body.appendChild(el("details", { class: "entry" }, [summary, entryBody]));
  });
  return chapter("education", "education", body);
}

function buildTeachingChapter() {
  const body = el("div", { class: "chapter-content" });
  TEACHING.forEach((entry) => body.appendChild(entryDetails(entry)));
  return chapter("teaching", "teaching", body);
}

function buildConferencesChapter() {
  const body = el("div", { class: "chapter-content" });
  body.appendChild(chapter("conf-intl", "international", citationList(CONFERENCES.international)));
  body.appendChild(chapter("conf-dom", "domestic", citationList(CONFERENCES.domestic)));
  body.appendChild(el("p", { class: "notes", text: UI[lang].notes }));
  return chapter("conferences", "conferences", body);
}

function buildAwardsChapter() {
  const body = el("div", { class: "chapter-content" });
  AWARDS.forEach((entry) => body.appendChild(entryDetails(entry)));
  return chapter("awards", "awards", body);
}

function buildPatentsChapter() {
  return chapter("patents", "patents", patentList(PATENTS));
}

function buildPublicationsChapter() {
  const body = el("div", { class: "chapter-content" });
  body.appendChild(chapter("pub-intl", "intlJournal", citationList(PUBLICATIONS.intlJournal)));
  body.appendChild(chapter("pub-dom", "domJournal", citationList(PUBLICATIONS.domJournal)));
  body.appendChild(chapter("pub-wp", "workingPapers", citationList(PUBLICATIONS.workingPapers)));
  body.appendChild(el("p", { class: "notes", text: UI[lang].notes }));
  return chapter("publications", "publications", body);
}

function buildServicesChapter() {
  return chapter("services", "services", el("ul", { class: "plain-list" }, SERVICES.map((s) => el("li", { text: t(s) }))));
}

// --- Tabs ---

function switchTab(tabId) {
  if (tabId === activeTab) return;
  activeTab = tabId;
  localStorage.setItem("tab", tabId);
  render();
  window.scrollTo(0, 0);
}

document.addEventListener("click", (e) => {
  const link = e.target.closest("[data-tab]");
  if (!link) return;
  e.preventDefault();
  switchTab(link.dataset.tab);
});

function renderTabsNav() {
  const nav = document.getElementById("page-tabs-inner");
  nav.innerHTML = "";
  TABS.forEach((tabId) => {
    const a = document.createElement("a");
    a.href = "#";
    a.textContent = UI[lang][TAB_LABEL_KEY[tabId]];
    a.dataset.tab = tabId;
    a.classList.toggle("active", tabId === activeTab);
    nav.appendChild(a);
  });
}

function renderHomeTab(main) {
  const intro = el("div", { class: "chapter-content" });
  PROFILE.summary[lang].forEach((line) => intro.appendChild(el("p", { text: line })));
  main.appendChild(intro);

  const skillsList = el("ul", { class: "plain-list" });
  SKILLS[lang].forEach((s) => skillsList.appendChild(el("li", { text: s })));
  main.appendChild(skillsList);

  const links = el("ul", { class: "home-links" });
  [
    ["research", UI[lang].homeLinkResearch],
    ["teaching", UI[lang].homeLinkTeaching],
    ["cv", UI[lang].homeLinkCV],
  ].forEach(([tabId, text]) => {
    const a = document.createElement("a");
    a.href = "#";
    a.dataset.tab = tabId;
    a.textContent = text;
    links.appendChild(el("li", {}, [a]));
  });
  main.appendChild(links);
}

function renderResearchTab(main) {
  main.appendChild(el("h2", { class: "statement-heading", text: UI[lang].researchStatement }));
  main.appendChild(statementParagraphs(RESEARCH_STATEMENT));
  main.appendChild(buildPublicationsChapter());
  main.appendChild(buildConferencesChapter());
  main.appendChild(buildPatentsChapter());
  main.appendChild(buildServicesChapter());
}

function renderTeachingTab(main) {
  main.appendChild(el("h2", { class: "statement-heading", text: UI[lang].teachingStatement }));
  main.appendChild(statementParagraphs(TEACHING_STATEMENT));
  main.appendChild(buildTeachingChapter());
}

function renderCVTab(main) {
  main.appendChild(buildProfileChapter());
  main.appendChild(buildSkillsChapter());
  main.appendChild(buildExperienceChapter());
  main.appendChild(buildProjectsChapter());
  main.appendChild(buildEducationChapter());
  main.appendChild(buildTeachingChapter());
  main.appendChild(buildConferencesChapter());
  main.appendChild(buildAwardsChapter());
  main.appendChild(buildPatentsChapter());
  main.appendChild(buildPublicationsChapter());
  main.appendChild(buildServicesChapter());
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

  renderTabsNav();

  const main = document.getElementById("main");
  main.innerHTML = "";

  if (activeTab === "home") renderHomeTab(main);
  else if (activeTab === "research") renderResearchTab(main);
  else if (activeTab === "teaching") renderTeachingTab(main);
  else renderCVTab(main);

  const sectionNav = document.getElementById("section-nav");
  sectionNav.hidden = activeTab !== "cv";
  if (activeTab === "cv") {
    renderNav();
    setupScrollspy();
  } else if (sectionObserver) {
    sectionObserver.disconnect();
  }
}

document.querySelectorAll(".lang-option").forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.dataset.lang === lang) return;
    lang = btn.dataset.lang;
    localStorage.setItem("lang", lang);
    render();
  });
});

// Export PDF always exports the full CV tab, matching the single combined document this produced before tabs existed.
document.getElementById("export-pdf").addEventListener("click", () => {
  const previousTab = activeTab;
  if (activeTab !== "cv") {
    activeTab = "cv";
    render();
  }
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
      if (activeTab !== previousTab) {
        activeTab = previousTab;
        render();
      }
    },
    { once: true }
  );
});

render();
