/* =================================================================
   Water Intake Calculator – Main JavaScript
   - Personalized hydration math (weight + age + gender + activity + climate)
   - Metric / Imperial toggle
   - Sidebar ads reveal on scroll into article (NOT on homepage top)
   - Sticky bottom ad + sidebar ads with working close buttons
   ================================================================= */

(function(){
  'use strict';

  // ---------- Year in footer ----------
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---------- Mobile navigation ----------
  var navToggle = document.querySelector('.nav-toggle');
  var mainNav   = document.querySelector('.main-nav');
  if (navToggle && mainNav){
    navToggle.addEventListener('click', function(){
      var open = mainNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    mainNav.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){
        mainNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded','false');
      });
    });
  }

  // ---------- Sticky bottom ad close ----------
  var closeSticky = document.getElementById('closeStickyAd');
  var stickyAd    = document.getElementById('stickyAd');
  if (closeSticky && stickyAd){
    closeSticky.addEventListener('click', function(){ stickyAd.style.display='none'; });
  }

  // ---------- Sidebar ads: close buttons ----------
  document.querySelectorAll('.sidebar-ad .ad-close').forEach(function(btn){
    btn.addEventListener('click', function(){
      btn.closest('.sidebar-ad').classList.add('hidden');
    });
  });

  // ---------- Sidebar ads: reveal ONLY when user scrolls into article ----------
  var articleEl = document.getElementById('article');
  var asideEl   = document.querySelector('.article-aside');
  if (articleEl && asideEl && 'IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if (e.isIntersecting){ asideEl.classList.add('show'); }
      });
    }, { threshold: 0.05 });
    io.observe(articleEl);
  } else if (asideEl){
    asideEl.classList.add('show');
  }

  // =================================================================
  //                    WATER INTAKE CALCULATOR
  // =================================================================
  var unit = 'metric';   // 'metric' | 'imperial'
  var tabs = document.querySelectorAll('.calc-tabs .tab');
  var weightInput = document.getElementById('weight');
  var weightUnit  = document.getElementById('weight-unit');
  var ageSel      = document.getElementById('age');
  var genderSel   = document.getElementById('gender');
  var activitySel = document.getElementById('activity');
  var climateSel  = document.getElementById('climate');
  var calcBtn     = document.getElementById('calc-btn');
  var resultBox   = document.getElementById('result');

  function setUnit(u){
    var prev = unit; unit = u;
    tabs.forEach(function(t){
      var active = t.dataset.unit === u;
      t.classList.toggle('active', active);
      t.setAttribute('aria-selected', active ? 'true':'false');
    });
    if (!weightInput.value) weightInput.value = (u==='metric') ? 70 : 154;
    // convert current value if user toggles
    if (prev !== u){
      var v = parseFloat(weightInput.value);
      if (!isNaN(v)){
        if (u === 'imperial') weightInput.value = Math.round(v * 2.2046);
        else                  weightInput.value = Math.round(v / 2.2046);
      }
    }
    weightUnit.textContent = (u==='metric') ? 'kg' : 'lbs';
    calculate();
  }
  tabs.forEach(function(t){ t.addEventListener('click', function(){ setUnit(t.dataset.unit); }); });

  // Activity multipliers (extra ml of water per kg of body weight)
  var ACTIVITY = {
    sedentary: 0,
    light:     5,    // +5 ml/kg
    moderate:  10,
    active:    15,
    athlete:   20
  };
  // Climate multipliers (% increase)
  var CLIMATE = {
    cool:      0,
    moderate:  0,
    hot:       0.12,    // +12%
    veryhot:   0.20     // +20%
  };

  function calculate(){
    var w = parseFloat(weightInput.value);
    if (isNaN(w) || w < 20 || w > 400){
      resultBox.innerHTML = '<div class="result-tips">⚠ Please enter a valid weight (20–400).</div>';
      return;
    }
    // normalize to kg
    var weightKg = (unit==='imperial') ? (w / 2.2046) : w;

    // Baseline: 35 ml per kg (NIH / Mayo Clinic)
    var baseline = weightKg * 35;

    // Age adjustment
    var age = ageSel.value;
    if (age === 'child')  baseline *= 0.85;
    if (age === 'senior') baseline *= 0.92;

    // Gender / life-stage adjustment
    var g = genderSel.value;
    if (g === 'female')         baseline *= 0.95;
    if (g === 'pregnant')       baseline *= 1.15;
    if (g === 'breastfeeding')  baseline *= 1.25;

    // Activity (extra ml per kg)
    var activityExtra = weightKg * (ACTIVITY[activitySel.value] || 0);

    // Climate %
    var climatePct = (CLIMATE[climateSel.value] || 0);

    var totalMl = (baseline + activityExtra) * (1 + climatePct);
    totalMl = Math.round(totalMl);

    var totalOz    = Math.round(totalMl / 29.5735);
    var totalLiter = (totalMl / 1000).toFixed(2);
    var totalCups  = Math.round(totalMl / 240);     // 1 cup ≈ 240 ml
    var totalGlass = Math.round(totalMl / 250);    // 1 glass ≈ 250 ml

    var primaryDisplay = (unit==='imperial')
      ? totalOz + ' <small style="font-size:18px;font-weight:600">oz</small>'
      : totalLiter + ' <small style="font-size:18px;font-weight:600">liters</small>';

    var html = ''
      + '<div class="result-hero">'
      +   '<div class="label">Your Daily Water Goal</div>'
      +   '<p class="big-number">' + primaryDisplay + '</p>'
      +   '<div class="sub">to keep your body fully hydrated 💧</div>'
      + '</div>'
      + '<div class="result-grid">'
      +   '<div class="result-card"><div class="rc-val">'+ totalMl +'</div><div class="rc-meta">ml</div></div>'
      +   '<div class="result-card"><div class="rc-val">'+ totalOz +'</div><div class="rc-meta">ounces</div></div>'
      +   '<div class="result-card"><div class="rc-val">'+ totalLiter +'</div><div class="rc-meta">liters</div></div>'
      +   '<div class="result-card"><div class="rc-val">'+ totalGlass +'</div><div class="rc-meta">glasses (250ml)</div></div>'
      + '</div>'
      + '<div class="glass-bar">≈ <b>'+ totalCups +' cups</b> (240 ml) &nbsp;·&nbsp; ≈ <b>'+ Math.round(totalMl/500) +' bottles</b> (500 ml)</div>'
      + buildTips(climatePct, activitySel.value, g);

    resultBox.innerHTML = html;
  }

  function buildTips(climatePct, act, gender){
    var tips = [];
    if (climatePct >= 0.12) tips.push('🔥 Hot climate detected — sip every 15–20 minutes.');
    if (act === 'active' || act === 'athlete') tips.push('🏋️ Add 350 ml per 30 minutes of intense workout.');
    if (gender === 'pregnant') tips.push('🤰 Pregnancy increases fluid demand — spread intake all day.');
    if (gender === 'breastfeeding') tips.push('🤱 Drink a full glass each time you nurse.');
    if (!tips.length) tips.push('💡 Pro tip: drink 500 ml right after waking to kickstart your metabolism.');
    return '<div class="result-tips">' + tips.join('<br>') + '</div>';
  }

  calcBtn.addEventListener('click', calculate);
  [weightInput, ageSel, genderSel, activitySel, climateSel].forEach(function(el){
    el.addEventListener('change', calculate);
  });

  // initial render
  setUnit('metric');

  // =================================================================
  // Smooth scroll with sticky header offset
  // =================================================================
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click', function(e){
      var id = a.getAttribute('href');
      if (id.length<2) return;
      var el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      var top = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({top:top, behavior:'smooth'});
    });
  });

})();
