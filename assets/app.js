// 个人网站 · 渲染逻辑（app.js）
// 数据源：assets/data.js 的 window.SITE_DATA（内容与展示分离，改数据刷新即生效）

(function () {
  "use strict";

  var data = (typeof window.SITE_DATA !== "undefined" && window.SITE_DATA) || {};
  var profile = data.profile || {};
  var resume = data.resume || {};
  var projects = Array.isArray(data.projects) ? data.projects : [];

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = text;
    return node;
  }

  function externalLink(href, text) {
    var a = el("a", "", text);
    a.href = href;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    return a;
  }

  // ---------- 首屏 ----------

  function renderHero() {
    var box = document.getElementById("hero-content");
    if (!box) return;
    box.textContent = "";
    if (!profile.name) {
      box.appendChild(el("p", "hero-tagline", "内容待配置：请在 assets/data.js 中填写 profile。"));
      return;
    }
    box.appendChild(el("h1", "hero-name", profile.name));
    if (profile.title) box.appendChild(el("div", "hero-role", profile.title));
    if (profile.tagline) box.appendChild(el("p", "hero-tagline", profile.tagline));
    var links = el("div", "hero-links");
    if (profile.github) links.appendChild(externalLink(profile.github, "GitHub: " + profile.github.replace(/^https?:\/\//, "")));
    if (profile.email) {
      var mail = el("a", "", profile.email);
      mail.href = "mailto:" + profile.email;
      links.appendChild(mail);
    }
    if (links.childNodes.length) box.appendChild(links);
  }

  // ---------- 能力概览（含个人优势总结） ----------

  function renderResume() {
    var box = document.getElementById("resume-content");
    if (!box) return;
    box.textContent = "";

    if (profile.degree) {
      var edu = el("div", "degree-line");
      edu.appendChild(el("span", "degree-label", "教育背景"));
      edu.appendChild(el("span", "degree-value", profile.degree));
      box.appendChild(edu);
    }

    if (resume.headline) box.appendChild(el("p", "resume-headline", resume.headline));

    if (Array.isArray(resume.path) && resume.path.length) {
      var pathBar = el("div", "resume-path");
      resume.path.forEach(function (step, i) {
        if (!step) return;
        if (i > 0) pathBar.appendChild(el("span", "path-arrow", "→"));
        pathBar.appendChild(el("span", "path-step", step));
      });
      box.appendChild(pathBar);
    }

    if (Array.isArray(resume.items) && resume.items.length) {
      var grid = el("div", "resume-grid");
      resume.items.forEach(function (item) {
        if (!item || !item.label) return;
        var card = el("article", "resume-card");
        card.appendChild(el("h3", "", item.label));
        if (item.desc) card.appendChild(el("p", "", item.desc));
        grid.appendChild(card);
      });
      box.appendChild(grid);
    }

    if (Array.isArray(resume.keywords) && resume.keywords.length) {
      var chips = el("div", "tags resume-keywords");
      resume.keywords.forEach(function (kw) { if (kw) chips.appendChild(el("span", "chip", kw)); });
      box.appendChild(chips);
    }

    if (resume.summary) {
      var sum = el("p", "resume-summary");
      sum.appendChild(el("span", "summary-label", "总结"));
      sum.appendChild(document.createTextNode(resume.summary));
      box.appendChild(sum);
    }

    if (!box.childNodes.length) box.appendChild(el("p", "section-sub", "能力概览内容待配置。"));
  }

  // ---------- 项目经历 ----------

  function renderProjects() {
    var box = document.getElementById("projects-list");
    if (!box) return;
    box.textContent = "";
    if (!projects.length) {
      box.appendChild(el("p", "section-sub", "项目内容待配置。"));
      return;
    }
    projects.forEach(function (project) {
      if (!project || !project.name) return;
      var card = el("article", "project-card");

      var head = el("div", "project-head");
      head.appendChild(el("h3", "", project.name));
      if (project.href) head.appendChild(externalLink(project.href, "GitHub ↗"));
      card.appendChild(head);

      if (project.summary) card.appendChild(el("p", "project-summary", project.summary));

      if (Array.isArray(project.metrics) && project.metrics.length) {
        var metrics = el("div", "metrics");
        project.metrics.forEach(function (m) { if (m) metrics.appendChild(el("span", "metric", m)); });
        card.appendChild(metrics);
      }

      if (Array.isArray(project.highlights) && project.highlights.length) {
        var list = el("ul", "project-highlights");
        project.highlights.forEach(function (h) { if (h) list.appendChild(el("li", "", h)); });
        card.appendChild(list);
      }

      if (Array.isArray(project.tags) && project.tags.length) {
        var tags = el("div", "tags");
        project.tags.forEach(function (t) { if (t) tags.appendChild(el("span", "chip", t)); });
        card.appendChild(tags);
      }

      box.appendChild(card);
    });
  }

  // ---------- 联系 ----------

  function renderContact() {
    var box = document.getElementById("contact-links");
    if (!box) return;
    box.textContent = "";
    if (profile.github) box.appendChild(externalLink(profile.github, "GitHub：" + profile.github));
    if (profile.email) {
      var mail = el("a", "", "邮箱：" + profile.email);
      mail.href = "mailto:" + profile.email;
      box.appendChild(mail);
    }
    if (!box.childNodes.length) box.appendChild(el("p", "section-sub", "联系方式待配置。"));
  }

  function init() {
    renderHero();
    renderResume();
    renderProjects();
    renderContact();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
