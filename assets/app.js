// 个人网站 · 渲染与交互逻辑（app.js）
// 数据源：assets/data.js 的 window.SITE_DATA（内容与展示分离，改数据刷新即生效）

(function () {
  "use strict";

  var data = (typeof window.SITE_DATA !== "undefined" && window.SITE_DATA) || {};
  var profile = data.profile || {};
  var capabilities = Array.isArray(data.capabilities) ? data.capabilities : [];
  var projects = Array.isArray(data.projects) ? data.projects : [];
  var cap = (data.capability && data.capability.nodes) ? data.capability : { nodes: [], edges: [] };
  var nodes = cap.nodes || [];
  var edges = cap.edges || [];

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

  // ---------- 能力概览 ----------

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
    if (!capabilities.length) {
      box.appendChild(el("p", "section-sub", "能力条目待配置。"));
      return;
    }
    var grid = el("div", "capability-grid");
    capabilities.forEach(function (item) {
      if (!item || !item.label) return;
      var card = el("article", "capability-card");
      card.appendChild(el("h3", "", item.label));
      if (item.desc) card.appendChild(el("p", "", item.desc));
      grid.appendChild(card);
    });
    box.appendChild(grid);
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

  // ---------- 能力图谱（hub-spoke 径向布局，内联 SVG） ----------

  var LAYOUT = { w: 1000, h: 620, cx: 500, cy: 310, r: 225 };

  function hubId() {
    var count = {};
    edges.forEach(function (e) { count[e.source] = (count[e.source] || 0) + 1; });
    var best = nodes.length ? nodes[0].id : null;
    Object.keys(count).forEach(function (id) { if (count[id] > (count[best] || 0)) best = id; });
    return best;
  }

  function layout() {
    var center = hubId();
    var spokes = nodes.filter(function (n) { return n.id !== center; });
    var pos = {};
    pos[center] = { x: LAYOUT.cx, y: LAYOUT.cy, isHub: true };
    var n = spokes.length || 1;
    spokes.forEach(function (node, i) {
      var angle = -Math.PI / 2 + (2 * Math.PI * i) / n;
      pos[node.id] = {
        x: LAYOUT.cx + LAYOUT.r * Math.cos(angle),
        y: LAYOUT.cy + LAYOUT.r * Math.sin(angle),
        isHub: false
      };
    });
    return pos;
  }

  function adjacency() {
    var adj = {};
    nodes.forEach(function (n) { adj[n.id] = []; });
    edges.forEach(function (e) {
      if (adj[e.source] && adj[e.target]) {
        adj[e.source].push(e.target);
        adj[e.target].push(e.source);
      }
    });
    return adj;
  }

  function nodeById(id) {
    for (var i = 0; i < nodes.length; i++) if (nodes[i].id === id) return nodes[i];
    return null;
  }

  var svgNS = "http://www.w3.org/2000/svg";

  function svgEl(name, attrs) {
    var node = document.createElementNS(svgNS, name);
    Object.keys(attrs || {}).forEach(function (k) { node.setAttribute(k, attrs[k]); });
    return node;
  }

  var detailBox = null;

  function showDetail(node, activate) {
    if (!detailBox || !node) return;
    detailBox.textContent = "";
    detailBox.appendChild(el("h3", "", node.label || node.id));
    detailBox.appendChild(el("div", "level", "自评 " + (node.level || 0) + " / 5"));
    if (node.intro) detailBox.appendChild(el("p", "", node.intro));
    if (Array.isArray(node.skills) && node.skills.length) {
      var tags = el("div", "tags");
      node.skills.forEach(function (s) { if (s) tags.appendChild(el("span", "chip", s)); });
      detailBox.appendChild(tags);
    }
    if (activate) highlight(node.id);
  }

  function highlight(activeId) {
    var adj = adjacency();
    var linked = activeId ? (adj[activeId] || []) : [];
    nodes.forEach(function (n) {
      var group = document.getElementById("gn-" + n.id);
      if (!group) return;
      var isActive = n.id === activeId;
      var isLink = linked.indexOf(n.id) !== -1;
      group.classList.toggle("active", isActive);
      group.classList.toggle("dim", !isActive && !isLink && activeId !== null);
    });
    edges.forEach(function (e) {
      var l1 = document.getElementById("ge-" + e.source + "-" + e.target);
      var l2 = document.getElementById("ge-" + e.target + "-" + e.source);
      var on = e.source === activeId || e.target === activeId;
      [l1, l2].forEach(function (l) {
        if (l) {
          l.classList.toggle("active", on);
          l.classList.toggle("dim", !on && activeId !== null);
        }
      });
    });
  }

  function renderCapability() {
    var svg = document.getElementById("capability-graph");
    detailBox = document.getElementById("capability-detail");
    if (!svg) return;
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    if (!nodes.length) {
      if (detailBox) detailBox.textContent = "能力图谱内容待配置。";
      return;
    }
    svg.setAttribute("viewBox", "0 0 " + LAYOUT.w + " " + LAYOUT.h);
    var pos = layout();
    var hub = hubId();

    var defs = svgEl("defs", {});
    var grad = svgEl("linearGradient", { id: "g-accent", x1: "0", y1: "0", x2: "1", y2: "1" });
    grad.appendChild(svgEl("stop", { offset: "0%", "stop-color": "#22d3ee" }));
    grad.appendChild(svgEl("stop", { offset: "100%", "stop-color": "#818cf8" }));
    defs.appendChild(grad);
    svg.appendChild(defs);

    edges.forEach(function (e) {
      var a = pos[e.source], b = pos[e.target];
      if (!a || !b) return;
      var line = svgEl("line", { id: "ge-" + e.source + "-" + e.target, x1: a.x, y1: a.y, x2: b.x, y2: b.y });
      line.setAttribute("class", "link");
      svg.appendChild(line);
    });

    nodes.forEach(function (node) {
      var p = pos[node.id];
      var g = svgEl("g", {
        id: "gn-" + node.id,
        transform: "translate(" + p.x + "," + p.y + ")",
        class: "node" + (node.id === hub ? " node-core" : ""),
        tabindex: "0",
        role: "button",
        "aria-label": (node.label || node.id) + "，自评 " + (node.level || 0) + " / 5"
      });
      var r = node.id === hub ? 30 : 17;
      g.appendChild(svgEl("circle", { r: r }));
      var label = svgEl("text", { y: node.id === hub ? r + 22 : r + 18, "text-anchor": "middle" });
      label.textContent = node.label || node.id;
      g.appendChild(label);

      g.addEventListener("mouseenter", function () { highlight(node.id); });
      g.addEventListener("mouseleave", function () { highlight(null); });
      g.addEventListener("focus", function () { showDetail(node, true); });
      g.addEventListener("click", function () { showDetail(node, true); });
      g.addEventListener("keydown", function (ev) {
        if (ev.key === "Enter" || ev.key === " ") {
          ev.preventDefault();
          showDetail(node, true);
        }
      });
      svg.appendChild(g);
    });

    if (nodeById(hub)) showDetail(nodeById(hub), false);
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
    renderCapability();
    renderContact();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
