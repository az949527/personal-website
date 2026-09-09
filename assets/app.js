// 个人网站 · 渲染与交互逻辑（app.js）
// 数据源：assets/data.js 的 window.SITE_DATA（内容与展示分离，改数据刷新即生效）

(function () {
  "use strict";

  var data = (typeof window.SITE_DATA !== "undefined" && window.SITE_DATA) || {};
  var profile = data.profile || {};
  var resume = Array.isArray(data.resume) ? data.resume : [];
  var cap = (data.capability && data.capability.nodes) ? data.capability : { nodes: [], edges: [] };
  var nodes = cap.nodes || [];
  var edges = cap.edges || [];
  var works = Array.isArray(data.works) ? data.works : [];

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = text;
    return node;
  }

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
    if (profile.github) {
      var gh = el("a", "", "GitHub: " + profile.github.replace(/^https?:\/\//, ""));
      gh.href = profile.github;
      gh.target = "_blank";
      gh.rel = "noopener noreferrer";
      links.appendChild(gh);
    }
    if (profile.email) {
      var mail = el("a", "", profile.email);
      mail.href = "mailto:" + profile.email;
      links.appendChild(mail);
    }
    if (links.childNodes.length) box.appendChild(links);
  }

  function renderResume() {
    var box = document.getElementById("resume-timeline");
    if (!box) return;
    box.textContent = "";
    if (!resume.length) {
      box.appendChild(el("p", "section-sub", "简历内容待配置。"));
      return;
    }
    resume.forEach(function (item) {
      if (!item || !item.title) return;
      var row = el("div", "timeline-item");
      if (item.date) row.appendChild(el("div", "timeline-date", item.date));
      row.appendChild(el("h3", "timeline-title", item.title));
      var points = el("ul", "timeline-points");
      (Array.isArray(item.points) ? item.points : []).forEach(function (p) {
        if (p) points.appendChild(el("li", "", p));
      });
      row.appendChild(points);
      box.appendChild(row);
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
    Object.keys(attrs || {}).forEach(function (k) {
      node.setAttribute(k, attrs[k]);
    });
    return node;
  }

  var detailBox = null;

  function showDetail(node, activate) {
    if (!detailBox || !node) return;
    detailBox.textContent = "";
    var h = el("h3", "", node.label || node.id);
    detailBox.appendChild(h);
    var lv = el("div", "level", "自评 " + (node.level || 0) + " / 5");
    detailBox.appendChild(lv);
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
    var linked = adj[activeId] || [];
    nodes.forEach(function (n) {
      var group = document.getElementById("gn-" + n.id);
      if (!group) return;
      var isActive = n.id === activeId;
      var isLink = linked.indexOf(n.id) !== -1;
      group.classList.toggle("active", isActive);
      group.classList.toggle("dim", !isActive && !isLink && activeId !== null);
    });
    edges.forEach(function (e) {
      var line = document.getElementById("ge-" + e.source + "-" + e.target);
      var reverse = document.getElementById("ge-" + e.target + "-" + e.source);
      var on = e.source === activeId || e.target === activeId;
      [line, reverse].forEach(function (l) {
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
    var adj = adjacency();

    var defs = svgEl("defs", {});
    var grad = svgEl("linearGradient", { id: "g-accent", x1: "0", y1: "0", x2: "1", y2: "1" });
    grad.appendChild(svgEl("stop", { offset: "0%", "stop-color": "#22d3ee" }));
    grad.appendChild(svgEl("stop", { offset: "100%", "stop-color": "#818cf8" }));
    defs.appendChild(grad);
    svg.appendChild(defs);

    edges.forEach(function (e) {
      var a = pos[e.source], b = pos[e.target];
      if (!a || !b) return;
      var line = svgEl("line", {
        id: "ge-" + e.source + "-" + e.target,
        x1: a.x, y1: a.y, x2: b.x, y2: b.y
      });
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
      var label = svgEl("text", {
        y: node.id === hub ? r + 22 : r + 18,
        "text-anchor": "middle"
      });
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

    if (adj[hub] && adj[hub].length && nodeById(hub)) showDetail(nodeById(hub), false);
  }

  // ---------- 作品 ----------

  function renderWorks() {
    var box = document.getElementById("works-list");
    if (!box) return;
    box.textContent = "";
    if (!works.length) {
      box.appendChild(el("p", "section-sub", "作品内容待配置。"));
      return;
    }
    works.forEach(function (work) {
      if (!work || !work.name) return;
      var card = el("article", "work-card");
      var head = el("h3", "");
      if (work.href) {
        var a = el("a", "", work.name);
        a.href = work.href;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        head.appendChild(a);
      } else {
        head.appendChild(document.createTextNode(work.name));
      }
      card.appendChild(head);
      if (work.tagline) card.appendChild(el("p", "tagline", work.tagline));
      if (Array.isArray(work.tags) && work.tags.length) {
        var tags = el("div", "tags");
        work.tags.forEach(function (t) { if (t) tags.appendChild(el("span", "chip", t)); });
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
    if (profile.github) {
      var gh = el("a", "", "GitHub：" + profile.github);
      gh.href = profile.github;
      gh.target = "_blank";
      gh.rel = "noopener noreferrer";
      box.appendChild(gh);
    }
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
    renderCapability();
    renderWorks();
    renderContact();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
