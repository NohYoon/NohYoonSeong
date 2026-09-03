let lang = localStorage.getItem("lang") || "en";

function t(field) {
  return typeof field === "string" ? field : field[lang];
}

function el(tag, opts = {}, children = []) {
  const node = document.createElement(tag);
  if (opts.class) node.className = opts.class;
  if (opts.text) node.textContent = opts.text;
  if (opts.open) node.open = true;
  children.forEach((c) => c && node.appendChild(c));
  return node;
}

function entryDetails(entry) {
  const summary = el("summary", { class: "entry-summary" }, [
    el("span", { class: "entry-period", text: entry.period }),
    el("span", { class: "entry-role", text: t(entry.role) }),
    el("span", { class: "entry-org", text: entry.org }),
  ]);
  const body = el("div", { class: "entry-body" });
  if (entry.orgNote) body.appendChild(el("p", { class: "entry-orgnote", text: entry.orgNote }));
  if (entry.location) body.appendChild(el("p", { class: "entry-location", text: entry.location }));
  const ul = el("ul", { class: "entry-bullets" });
  entry.bullets.forEach((b) => ul.appendChild(el("li", { text: t(b) })));
  body.appendChild(ul);
  if (entry.note) body.appendChild(el("p", { class: "entry-note", text: t(entry.note) }));
  return el("details", { class: "entry" }, [summary, body]);
}

function chapter(id, titleKey, contentNode, openByDefault = false) {
  const summary = el("summary", { class: "chapter-summary", text: UI[lang][titleKey] });
  return el("details", { class: "chapter", open: openByDefault }, [summary, contentNode]);
}

function citationList(items) {
  const ul = el("ul", { class: "citation-list" });
  items.forEach((c) => ul.appendChild(el("li", { text: c })));
  return ul;
}

function render() {
  document.documentElement.lang = lang === "kr" ? "ko" : "en";
  document.getElementById("lang-toggle").textContent = UI[lang].langToggle;

  document.getElementById("name").textContent = PROFILE.name;
  document.getElementById("affiliation").textContent = PROFILE.affiliation;
  document.getElementById("address").textContent = PROFILE.address;
  document.getElementById("photo").src = PROFILE.photo;
  const emailLink = document.getElementById("email");
  emailLink.textContent = PROFILE.email;
  emailLink.href = "mailto:" + PROFILE.email;
  document.getElementById("phone").textContent = PROFILE.phone;
  document.getElementById("scholar").href = PROFILE.scholar;

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
    const summary = el("summary", { class: "entry-summary" }, [
      el("span", { class: "entry-period", text: e.period }),
      el("span", { class: "entry-role", text: t(e.degree) }),
      el("span", { class: "entry-org", text: e.org }),
    ]);
    const body = el("div", { class: "entry-body" });
    if (e.location) body.appendChild(el("p", { class: "entry-location", text: e.location }));
    eduBody.appendChild(el("details", { class: "entry" }, [summary, body]));
  });
  main.appendChild(chapter("education", "education", eduBody, true));

  // Conferences
  const confBody = el("div", { class: "chapter-content" });
  confBody.appendChild(chapter("conf-intl", "international", citationList(CONFERENCES.international)));
  confBody.appendChild(chapter("conf-dom", "domestic", citationList(CONFERENCES.domestic)));
  confBody.appendChild(el("p", { class: "notes", text: UI[lang].notes }));
  main.appendChild(chapter("conferences", "conferences", confBody));

  // Publications
  const pubBody = el("div", { class: "chapter-content" });
  pubBody.appendChild(chapter("pub-intl", "intlJournal", citationList(PUBLICATIONS.intlJournal)));
  pubBody.appendChild(chapter("pub-dom", "domJournal", citationList(PUBLICATIONS.domJournal)));
  pubBody.appendChild(chapter("pub-wp", "workingPapers", citationList(PUBLICATIONS.workingPapers)));
  pubBody.appendChild(el("p", { class: "notes", text: UI[lang].notes }));
  main.appendChild(chapter("publications", "publications", pubBody));

  // Services
  main.appendChild(chapter("services", "services", el("ul", { class: "plain-list" }, SERVICES.map((s) => el("li", { text: s })))));
}

document.getElementById("lang-toggle").addEventListener("click", () => {
  lang = lang === "en" ? "kr" : "en";
  localStorage.setItem("lang", lang);
  render();
});

render();
