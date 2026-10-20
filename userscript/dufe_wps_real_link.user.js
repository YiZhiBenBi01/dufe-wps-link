// ==UserScript==
// @name         DUFEE 课件真实链接提取器
// @namespace    https://github.com/1railgun1/dufe-wps-link
// @version      1.1
// @description  在 ginkgostu 课程详情页识别 WPS 在线预览的真实下载链接，仅在当前页面悬浮窗显示（不自动跳转）
// @author       WorkBuddy
// @match        https://ginkgostu.dufe.edu.cn/course/detail*
// @grant        none
// @run-at       document-idle
// @license      MIT
// @homepageURL  https://github.com/1railgun1/dufe-wps-link
// @supportURL   https://github.com/1railgun1/dufe-wps-link/issues
// @updateURL    https://raw.githubusercontent.com/1railgun1/dufe-wps-link/main/dufe_wps_real_link.user.js
// @downloadURL  https://raw.githubusercontent.com/1railgun1/dufe-wps-link/main/dufe_wps_real_link.user.js
// ==/UserScript==

(function () {
  'use strict';

  // 识别哪些 URL 属于 WPS 在线预览体系
  const WPS_PATTERNS = /weboffice|_w_third_business|wpsopen|kdocs\.cn|wps\.cn/i;

  // 收集页面里所有可能的链接（标签属性优先，整页 HTML 兜底）
  function collectCandidates() {
    const set = new Set();
    const sels = ['a[href]', 'iframe[src]', 'embed[src]', 'source[src]',
                  '[data-src]', '[data-url]', '[data-href]'];
    sels.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => {
        ['href', 'src', 'data-src', 'data-url', 'data-href'].forEach(a => {
          const v = el.getAttribute(a);
          if (v) set.add(v.trim());
        });
      });
    });
    // 兜底：扫描整页原始 HTML 中的 URL（捕捉 JS / JSON 里的链接）
    const html = document.documentElement.outerHTML;
    const re = /https?:\/\/[^\s"'<>()]+/g;
    let m;
    while ((m = re.exec(html))) set.add(m[0]);
    return [...set];
  }

  // 从 weboffice 预览链接里解出真实源站地址（解码 _w_third_business，兼容二次编码）
  function decodeReal(url) {
    try {
      const m = url.match(/[?&]_w_third_business=([^&]+)/);
      if (!m) return null;
      let v = decodeURIComponent(m[1]);
      if (/%[0-9A-Fa-f]{2}/.test(v)) v = decodeURIComponent(v); // 二次编码兜底
      return v;
    } catch (e) { return null; }
  }

  function fileName(real) {
    const m = real.match(/attname=([^&]+)/);
    if (m) return decodeURIComponent(m[1]);
    try {
      const p = new URL(real).pathname.split('/').pop();
      if (p) return decodeURIComponent(p);
    } catch (e) {}
    return real;
  }

  function extract() {
    const cands = collectCandidates().filter(u => WPS_PATTERNS.test(u));
    const seen = new Set();
    const out = [];
    cands.forEach(u => {
      const r = decodeReal(u);
      if (r && !seen.has(r)) { seen.add(r); out.push({ preview: u, real: r, name: fileName(r) }); }
    });
    return out;
  }

  // ---------- 注入 UI ----------
  if (document.getElementById('dufeWpsBox')) return;
  const box = document.createElement('div');
  box.id = 'dufeWpsBox';
  box.innerHTML = `
    <style>
      #dufeWpsBox { position: fixed; right: 16px; bottom: 16px; z-index: 2147483647;
        font-family: -apple-system, "Microsoft YaHei", sans-serif; font-size: 13px; }
      #dufeWpsBtn { background:#c00; color:#fff; border:none; border-radius:22px;
        padding:11px 18px; cursor:pointer; box-shadow:0 2px 10px rgba(0,0,0,.35); font-weight:700; }
      #dufeWpsBtn .badge { background:#fff; color:#c00; border-radius:10px; padding:0 7px;
        margin-left:6px; font-size:11px; }
      #dufeWpsPanel { display:none; position:fixed; right:16px; bottom:66px; width:420px; max-height:74vh;
        overflow:auto; background:#fff; border:1px solid #ddd; border-radius:12px;
        box-shadow:0 6px 26px rgba(0,0,0,.28); padding:14px; color:#222; }
      #dufeWpsPanel h4 { margin:0 0 8px; font-size:14px; }
      #dufeWpsPanel .row { border-bottom:1px solid #eee; padding:9px 0; }
      #dufeWpsPanel .nm { font-weight:700; word-break:break-all; }
      #dufeWpsPanel .lk { color:#06c; word-break:break-all; font-size:11px; display:block; margin:4px 0;
        background:#f6f8fa; padding:5px 7px; border-radius:5px; }
      #dufeWpsPanel .lk:hover { background:#eef3ff; }
      #dufeWpsPanel button { margin-right:6px; margin-top:4px; cursor:pointer; border:1px solid #c00;
        background:#fff; color:#c00; border-radius:5px; padding:3px 9px; font-size:12px; }
      #dufeWpsPanel button.primary { background:#c00; color:#fff; }
      #dufeWpsPanel .acts { margin-top:10px; border-top:1px solid #eee; padding-top:9px; }
      #dufeWpsPanel .empty { color:#888; line-height:1.6; }
      #dufeWpsPanel .tip { color:#888; font-size:11px; margin:6px 0 0; }
    </style>
    <div id="dufeWpsPanel"></div>
    <button id="dufeWpsBtn">显示真实链接</button>
  `;
  document.body.appendChild(box);

  const btn = document.getElementById('dufeWpsBtn');
  const panel = document.getElementById('dufeWpsPanel');
  let current = [];

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  function render(list) {
    if (!list.length) {
      panel.innerHTML = '<h4>未找到 WPS 预览链接</h4>' +
        '<div class="empty">本页未发现 weboffice / wpsopen 类链接。' +
        '试试先展开课件列表、或等页面完全加载后再点此按钮。</div>';
      return;
    }
    let html = `<h4>找到 ${list.length} 个真实链接</h4>`;
    list.forEach((it, i) => {
      html += `<div class="row">
        <div class="nm">${escapeHtml(it.name)}</div>
        <span class="lk" title="${escapeHtml(it.real)}">${escapeHtml(it.real)}</span>
        <button data-act="open" data-i="${i}">新标签打开</button>
        <button data-act="dl" data-i="${i}">下载</button>
      </div>`;
    });
    html += `<div class="acts">
      <button data-act="copy">复制全部链接</button>
    </div>
    <p class="tip">提示：以上链接仅供个人学习使用，请勿二次传播。</p>`;
    panel.innerHTML = html;
    panel.querySelectorAll('button[data-act]').forEach(b => {
      b.addEventListener('click', () => handle(b.dataset.act, +b.dataset.i, list));
    });
  }

  function scan() {
    current = extract();
    render(current);
    const n = current.length;
    btn.innerHTML = '显示真实链接' + (n ? `<span class="badge">${n}</span>` : '');
  }

  // 仅在用户点击按钮时手动打开 / 下载，绝不自动新标签打开
  function handle(act, i, list) {
    if (act === 'open') {
      window.open(list[i].real, '_blank', 'noopener');
    } else if (act === 'copy') {
      const txt = list.map(it => it.real).join('\n');
      (navigator.clipboard ? navigator.clipboard.writeText(txt) : Promise.reject())
        .then(() => alert('已复制 ' + list.length + ' 个真实链接'))
        .catch(() => prompt('复制下面的真实链接：', txt));
    } else if (act === 'dl') {
      // 源站 CORS 为 *，可直接 fetch 成 blob 下载，绕开 Referer 限制
      const it = list[i];
      fetch(it.real).then(r => r.blob()).then(b => {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(b);
        a.download = it.name || 'download';
        document.body.appendChild(a); a.click(); a.remove();
        setTimeout(() => URL.revokeObjectURL(a.href), 1000);
      }).catch(e => alert('下载失败（可能被源站拦截）：' + e));
    }
  }

  btn.addEventListener('click', () => {
    scan();
    // 只切换悬浮窗的显示 / 隐藏，不做任何自动跳转
    panel.style.display = panel.style.display === 'block' ? 'none' : 'block';
  });

  // 页面加载后自动扫描一次（仅更新按钮角标，不弹窗、不开标签）
  scan();
})();
