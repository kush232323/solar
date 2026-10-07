import React, { useState, useEffect, useRef } from "react";
import logo from "./assets/logo.png";

// ─────────────────────────────────────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────────────────────────────────────

const styles = `
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    color: #1a202c;
    line-height: 1.6;
    background: #ffffff;
  }
  button { font-family: inherit; cursor: pointer; border: none; background: none; }
  img { display: block; max-width: 100%; }
  .app { min-height: 100vh; overflow-x: hidden; }

  :root {
    --brand-orange: #E85A24;
    --brand-orange-dark: #C74918;
    --brand-navy: #1B4965;
    --brand-navy-dark: #133850;
    --brand-cream: #FFF7F0;
  }

  /* ═══════════════════════════════════════════════
     NAVBAR — Bigger Logo + Premium Brand
     ═══════════════════════════════════════════════ */
  .navbar {
    position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
    transition: all 0.35s ease;
    background: rgba(255, 255, 255, 0.97);
    backdrop-filter: blur(16px);
    box-shadow: 0 4px 24px rgba(27, 73, 101, 0.08);
  }
  .navbar.scrolled {
    background: rgba(255, 255, 255, 0.99);
    box-shadow: 0 8px 32px rgba(27, 73, 101, 0.14);
  }
  .nav-container {
    max-width: 1320px; margin: 0 auto; padding: 0 28px;
    height: 92px; display: flex; align-items: center; justify-content: space-between;
    transition: height 0.35s ease;
  }
  .navbar.scrolled .nav-container { height: 84px; }

  /* ─── Premium Logo Lockup ─── */
  .nav-logo {
    display: flex; align-items: center; gap: 18px;
    cursor: pointer;
    padding: 6px 6px 6px 0;
    transition: transform 0.3s ease;
  }
  .nav-logo:hover { transform: translateY(-1px); }

  .nav-logo-img {
    width: 72px; height: 72px;
    object-fit: contain;
    border-radius: 16px;
    padding: 6px;
    background: linear-gradient(135deg, #ffffff, #FFF7F0);
    border: 2px solid rgba(232, 90, 36, 0.15);
    box-shadow:
      0 8px 22px rgba(27, 73, 101, 0.12),
      0 2px 6px rgba(232, 90, 36, 0.08);
    transition: all 0.35s ease;
    position: relative;
  }
  .nav-logo:hover .nav-logo-img {
    box-shadow:
      0 12px 30px rgba(232, 90, 36, 0.25),
      0 4px 10px rgba(232, 90, 36, 0.15);
    border-color: rgba(232, 90, 36, 0.4);
    transform: scale(1.03);
  }
  .navbar.scrolled .nav-logo-img {
    width: 64px; height: 64px;
  }

  .nav-logo-text {
    display: flex; flex-direction: column; gap: 4px;
    line-height: 1;
  }

  /* Bigger, premium "PBR Enterprises" */
  .logo-brand {
    font-size: 24px;
    font-weight: 900;
    letter-spacing: -0.035em;
    background: linear-gradient(135deg, #1B4965 0%, #133850 40%, #E85A24 100%);
    -webkit-background-clip: text; background-clip: text;
    color: transparent;
    line-height: 1.1;
    white-space: nowrap;
  }
  .navbar.scrolled .logo-brand { font-size: 22px; }

  /* Premium tagline with divider dots */
  .logo-tagline {
    display: flex; align-items: center; gap: 8px;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 1.6px;
    text-transform: uppercase;
    color: var(--brand-orange);
    white-space: nowrap;
  }
  .logo-tagline .divider {
    width: 4px; height: 4px;
    border-radius: 50%;
    background: var(--brand-navy);
    opacity: 0.35;
    flex-shrink: 0;
  }
  .logo-tagline .tag-word {
    transition: color 0.25s ease;
  }
  .logo-tagline .tag-word:hover { color: var(--brand-navy); }

  /* ─── Nav links ─── */
  .nav-links { display: flex; gap: 2px; }
  .nav-links button {
    padding: 10px 16px; font-size: 14px; font-weight: 700;
    color: var(--brand-navy); border-radius: 10px;
    transition: all 0.25s ease;
    letter-spacing: -0.005em;
    position: relative;
  }
  .nav-links button::after {
    content: "";
    position: absolute;
    bottom: 4px; left: 50%; transform: translateX(-50%);
    width: 0; height: 2px;
    background: linear-gradient(90deg, #E85A24, #F97316);
    border-radius: 2px;
    transition: width 0.3s ease;
  }
  .nav-links button:hover {
    color: var(--brand-orange);
    background: var(--brand-cream);
  }
  .nav-links button:hover::after { width: 60%; }

  .nav-toggle {
    display: none; color: var(--brand-navy); padding: 10px;
    border-radius: 10px;
  }
  .nav-mobile { display: none; }

  @media (max-width: 1140px) {
    .nav-links { display: none; }
    .nav-toggle { display: block; }
    .nav-mobile {
      display: flex; flex-direction: column; background: #ffffff;
      border-top: 1px solid #e2e8f0; padding: 14px 20px;
      animation: slideDown 0.25s ease;
    }
    .nav-mobile button {
      text-align: left; padding: 14px 18px; font-size: 15px;
      color: var(--brand-navy); border-radius: 10px; font-weight: 700;
    }
    .nav-mobile button:hover { background: var(--brand-cream); color: var(--brand-orange); }
  }
  @media (max-width: 640px) {
    .nav-logo-img { width: 56px; height: 56px; border-radius: 14px; padding: 4px; }
    .navbar.scrolled .nav-logo-img { width: 52px; height: 52px; }
    .logo-brand { font-size: 18px; }
    .navbar.scrolled .logo-brand { font-size: 17px; }
    .logo-tagline { font-size: 9px; letter-spacing: 1.2px; }
    .nav-logo { gap: 12px; }
    .nav-container { padding: 0 18px; height: 78px; }
    .navbar.scrolled .nav-container { height: 74px; }
  }
  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* ───────── SECTIONS ───────── */
  section { padding: 100px 24px; }
  .container { max-width: 1200px; margin: 0 auto; }
  .section-heading { text-align: center; margin-bottom: 64px; }
  .section-heading h2 {
    font-size: clamp(28px, 4vw, 44px); font-weight: 800;
    color: var(--brand-navy); margin-bottom: 14px; letter-spacing: -0.02em;
  }
  .section-heading p {
    font-size: clamp(14px, 2vw, 17px); color: #64748B;
    max-width: 640px; margin: 0 auto; line-height: 1.7;
  }
  .section-heading.light h2 { color: #ffffff; }
  .section-heading.light p { color: #CBD5E1; }
  .heading-line {
    width: 70px; height: 4px;
    background: linear-gradient(90deg, #E85A24, #C74918);
    border-radius: 999px; margin: 22px auto 0;
  }

  /* ───────── SVG ICON ───────── */
  .svg-icon {
    width: 24px; height: 24px; stroke: currentColor; fill: none;
    stroke-width: 2; stroke-linecap: round; stroke-linejoin: round;
  }
  .svg-icon-lg { width: 30px; height: 30px; stroke: currentColor; fill: none;
    stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
  .svg-icon-sm { width: 18px; height: 18px; stroke: currentColor; fill: none;
    stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
  .svg-icon-xs { width: 14px; height: 14px; stroke: currentColor; fill: none;
    stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; }

  /* ═══════════════════════════════════════════════
     ABOUT BANNER
     ═══════════════════════════════════════════════ */
  .about-banner {
    position: relative; overflow: hidden;
    min-height: 640px; display: flex; align-items: center; padding: 0;
    margin-top: 92px;
    background: var(--brand-navy-dark);
    cursor: grab; user-select: none; -webkit-user-select: none;
    touch-action: pan-y;
  }
  .about-banner.dragging { cursor: grabbing; }
  .banner-slides { position: absolute; inset: 0; z-index: 1; pointer-events: none; }
  .banner-slide {
    position: absolute; inset: 0; opacity: 0;
    transition: opacity 1s ease-in-out;
  }
  .banner-slide.active { opacity: 1; }
  .banner-slide-img {
    width: 100%; height: 100%; object-fit: cover;
    filter: brightness(0.85) saturate(1.2) contrast(1.05);
    transform: scale(1.05);
    transition: transform 8s ease-out;
    pointer-events: none;
    -webkit-user-drag: none;
  }
  .banner-slide.active .banner-slide-img {
    animation: kenBurns 8s ease-out forwards;
  }
  @keyframes kenBurns {
    0%   { transform: scale(1.05); }
    100% { transform: scale(1.15); }
  }
  .banner-slide-label {
    position: absolute; top: 130px; right: 40px;
    padding: 12px 22px;
    background: rgba(232, 90, 36, 0.95);
    color: #ffffff; font-size: 13px; font-weight: 800;
    letter-spacing: 1px; text-transform: uppercase;
    border-radius: 999px;
    box-shadow: 0 10px 24px rgba(232, 90, 36, 0.5);
    z-index: 3;
    animation: labelPop 0.5s ease;
    display: inline-flex; align-items: center; gap: 8px;
  }
  .banner-slide-label::before {
    content: ""; width: 6px; height: 6px;
    border-radius: 50%;
    background: #ffffff;
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.3);
    animation: labelDot 1.5s ease-in-out infinite;
  }
  @keyframes labelDot {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%      { opacity: 0.6; transform: scale(1.4); }
  }
  @keyframes labelPop {
    from { opacity: 0; transform: translateY(-10px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .about-banner-lines {
    position: absolute; inset: 0; z-index: 2;
    background-image:
      repeating-linear-gradient(45deg,
        rgba(232, 90, 36, 0.08) 0px,
        rgba(232, 90, 36, 0.08) 2px,
        transparent 2px, transparent 34px);
    mix-blend-mode: overlay; pointer-events: none;
  }
  .about-banner-lines::after {
    content: ""; position: absolute; inset: 0;
    background-image:
      repeating-linear-gradient(-45deg,
        rgba(255, 255, 255, 0.05) 0px,
        rgba(255, 255, 255, 0.05) 1px,
        transparent 1px, transparent 46px);
  }
  .about-banner-overlay {
    position: absolute; inset: 0; z-index: 2;
    background: linear-gradient(95deg,
      rgba(19, 56, 80, 0.92) 0%,
      rgba(19, 56, 80, 0.72) 32%,
      rgba(19, 56, 80, 0.35) 58%,
      rgba(19, 56, 80, 0.05) 82%,
      rgba(232, 90, 36, 0.1) 100%);
    pointer-events: none;
  }
  .about-banner-content {
    position: relative; z-index: 4;
    max-width: 1200px; margin: 0 auto;
    padding: 90px 24px; width: 100%;
    pointer-events: none;
  }
  .about-banner-content > * { pointer-events: auto; }
  .about-banner-inner { max-width: 720px; }

  /* ─── Banner Logo Lockup (premium, integrated) ─── */
  .banner-brand-lockup {
    display: inline-flex; align-items: center; gap: 14px;
    padding: 10px 20px 10px 10px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 999px;
    backdrop-filter: blur(12px);
    margin-bottom: 26px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  }
  .banner-brand-lockup .banner-logo {
    width: 44px; height: 44px;
    object-fit: contain;
    border-radius: 50%;
    background: #ffffff;
    padding: 4px;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
    flex-shrink: 0;
  }
  .banner-brand-lockup .banner-brand-text {
    display: flex; flex-direction: column; gap: 2px;
    line-height: 1;
  }
  .banner-brand-lockup .banner-brand-name {
    font-size: 16px; font-weight: 900;
    color: #ffffff;
    letter-spacing: -0.02em;
  }
  .banner-brand-lockup .banner-brand-tag {
    font-size: 9.5px; font-weight: 800;
    color: #FFB894;
    letter-spacing: 1.4px;
    text-transform: uppercase;
    display: flex; align-items: center; gap: 6px;
  }
  .banner-brand-lockup .banner-brand-tag .divider {
    width: 3px; height: 3px;
    background: rgba(255, 255, 255, 0.4);
    border-radius: 50%;
  }

  .about-banner-inner h1 {
    font-size: clamp(28px, 5vw, 50px);
    font-weight: 800; color: #ffffff;
    line-height: 1.15; margin-bottom: 20px;
    letter-spacing: -0.02em;
    text-shadow: 0 2px 14px rgba(0, 0, 0, 0.6);
  }
  .about-banner-inner h1 span {
    background: linear-gradient(90deg, #F97316, #FFB894);
    -webkit-background-clip: text; background-clip: text; color: transparent;
  }
  .about-banner-inner p {
    font-size: 16.5px; color: #F1F5F9;
    line-height: 1.75; max-width: 620px;
    text-shadow: 0 1px 10px rgba(0, 0, 0, 0.65);
  }
  .banner-services-chips {
    display: flex; flex-wrap: wrap; gap: 10px;
    margin-top: 28px; max-width: 720px;
  }
  .banner-chip {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 8px 14px;
    background: rgba(0, 0, 0, 0.35);
    border: 1px solid rgba(255, 255, 255, 0.35);
    border-radius: 999px;
    color: #ffffff; font-size: 12px; font-weight: 600;
    backdrop-filter: blur(10px);
    transition: all 0.25s ease;
    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
    cursor: pointer;
  }
  .banner-chip:hover, .banner-chip.active {
    background: rgba(232, 90, 36, 0.85);
    border-color: rgba(232, 90, 36, 0.95);
    transform: translateY(-2px);
  }
  .banner-chip .svg-icon-sm { color: #FFB894; }
  .banner-dots {
    display: flex; gap: 10px;
    margin-top: 32px; align-items: center;
  }
  .banner-dot {
    width: 32px; height: 4px;
    background: rgba(255, 255, 255, 0.35);
    border-radius: 999px; cursor: pointer;
    transition: all 0.35s ease;
    position: relative; overflow: hidden;
  }
  .banner-dot:hover { background: rgba(255, 255, 255, 0.6); }
  .banner-dot.active {
    background: rgba(255, 255, 255, 0.25); width: 60px;
  }
  .banner-dot.active::after {
    content: ""; position: absolute; top: 0; left: 0;
    height: 100%;
    background: linear-gradient(90deg, #E85A24, #F97316);
    border-radius: 999px;
    animation: dotProgress 4.5s linear;
  }
  @keyframes dotProgress {
    from { width: 0%; }
    to   { width: 100%; }
  }
  .banner-drag-hint {
    display: flex; align-items: center; gap: 8px;
    margin-top: 18px; font-size: 11.5px;
    color: rgba(255, 255, 255, 0.75);
    font-weight: 600; letter-spacing: 0.4px; text-transform: uppercase;
    text-shadow: 0 1px 6px rgba(0, 0, 0, 0.5);
    pointer-events: none;
  }
  .banner-drag-hint .svg-icon-sm {
    color: #FFB894;
    animation: hintSlide 1.8s ease-in-out infinite;
  }
  @keyframes hintSlide {
    0%, 100% { transform: translateX(0); }
    50%      { transform: translateX(4px); }
  }
  .btn {
    padding: 15px 34px; border-radius: 12px; font-size: 15px;
    font-weight: 700; transition: all 0.25s ease;
    display: inline-flex; align-items: center; gap: 10px;
    letter-spacing: 0.2px;
  }
  .btn-primary {
    background: linear-gradient(135deg, #E85A24, #C74918);
    color: #ffffff; box-shadow: 0 10px 28px rgba(232, 90, 36, 0.4);
  }
  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 16px 36px rgba(232, 90, 36, 0.55);
  }

  @media (max-width: 900px) {
    .about-banner { min-height: 720px; margin-top: 78px; }
    .banner-slide-label { top: 105px; right: 20px; font-size: 11px; padding: 8px 14px; }
  }
  @media (max-width: 600px) {
    .about-banner { min-height: 820px; margin-top: 74px; }
    .about-banner-overlay {
      background: linear-gradient(180deg,
        rgba(19, 56, 80, 0.92) 0%,
        rgba(19, 56, 80, 0.65) 55%,
        rgba(19, 56, 80, 0.15) 100%);
    }
    .banner-slide-label {
      top: auto; bottom: 24px; right: 50%;
      transform: translateX(50%); font-size: 10px;
    }
    .banner-dot { width: 24px; }
    .banner-dot.active { width: 44px; }
    .banner-brand-lockup { padding: 8px 16px 8px 8px; gap: 10px; }
    .banner-brand-lockup .banner-logo { width: 36px; height: 36px; }
    .banner-brand-lockup .banner-brand-name { font-size: 14px; }
    .banner-brand-lockup .banner-brand-tag { font-size: 8px; letter-spacing: 1.1px; }
  }

  /* ═══════════════════════════════════════════════
     PREMIUM ABOUT US
     ═══════════════════════════════════════════════ */
  .about-premium {
    position: relative;
    padding: 120px 24px;
    background: linear-gradient(180deg, #ffffff 0%, #F8FAFC 50%, #FFF7F0 100%);
    overflow: hidden;
  }
  .about-orb {
    position: absolute; border-radius: 50%;
    filter: blur(80px); opacity: 0.35;
    pointer-events: none; z-index: 0;
  }
  .about-orb-1 {
    width: 400px; height: 400px;
    background: radial-gradient(circle, #E85A24 0%, transparent 70%);
    top: -100px; right: -100px;
    animation: orbFloat1 12s ease-in-out infinite;
  }
  .about-orb-2 {
    width: 500px; height: 500px;
    background: radial-gradient(circle, #1B4965 0%, transparent 70%);
    bottom: -150px; left: -150px;
    animation: orbFloat2 15s ease-in-out infinite;
  }
  .about-orb-3 {
    width: 300px; height: 300px;
    background: radial-gradient(circle, #F97316 0%, transparent 70%);
    top: 40%; left: 45%;
    animation: orbFloat3 10s ease-in-out infinite;
    opacity: 0.15;
  }
  @keyframes orbFloat1 {
    0%, 100% { transform: translate(0, 0); }
    50%      { transform: translate(-40px, 40px); }
  }
  @keyframes orbFloat2 {
    0%, 100% { transform: translate(0, 0); }
    50%      { transform: translate(60px, -30px); }
  }
  @keyframes orbFloat3 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50%      { transform: translate(-30px, 30px) scale(1.1); }
  }

  .about-premium-container {
    max-width: 1200px; margin: 0 auto;
    position: relative; z-index: 1;
  }

  /* ─── Premium About Label Lockup (with mini logo) ─── */
  .about-premium-label {
    display: flex; align-items: center; justify-content: center;
    gap: 10px; margin-bottom: 26px;
  }
  .about-premium-label .pill {
    display: inline-flex; align-items: center; gap: 10px;
    padding: 8px 18px 8px 8px;
    background: linear-gradient(135deg, #FFF7F0, #FFEFE2);
    border: 1px solid rgba(232, 90, 36, 0.25);
    border-radius: 999px;
    color: var(--brand-orange);
    font-size: 12px; font-weight: 800;
    letter-spacing: 1.4px; text-transform: uppercase;
    box-shadow: 0 4px 14px rgba(232, 90, 36, 0.1);
  }
  .about-premium-label .pill-logo {
    width: 32px; height: 32px;
    border-radius: 50%;
    background: #ffffff;
    padding: 3px;
    object-fit: contain;
    box-shadow: 0 3px 8px rgba(232, 90, 36, 0.2);
  }

  .about-premium-heading {
    text-align: center;
    font-size: clamp(30px, 5vw, 54px);
    font-weight: 800;
    color: var(--brand-navy);
    line-height: 1.12;
    letter-spacing: -0.025em;
    margin-bottom: 22px;
    max-width: 900px;
    margin-left: auto; margin-right: auto;
  }
  .about-premium-heading .gradient {
    background: linear-gradient(135deg, #E85A24 0%, #F97316 50%, #C74918 100%);
    -webkit-background-clip: text; background-clip: text; color: transparent;
  }
  .about-premium-subheading {
    text-align: center;
    font-size: clamp(15px, 1.8vw, 17px);
    color: #64748B;
    max-width: 680px;
    margin: 0 auto 70px;
    line-height: 1.75;
  }

  .about-premium-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 70px;
    align-items: center;
  }
  @media (max-width: 950px) {
    .about-premium-grid { grid-template-columns: 1fr; gap: 50px; }
  }

  /* Visual */
  .about-premium-visual {
    position: relative;
    height: 580px;
    perspective: 1400px;
  }
  .about-visual-dots {
    position: absolute;
    top: -10px; left: -10px;
    width: 120px; height: 120px;
    background-image: radial-gradient(circle, rgba(232, 90, 36, 0.45) 1.5px, transparent 1.5px);
    background-size: 14px 14px;
    z-index: 0;
    opacity: 0.7;
    animation: dotsShift 8s ease-in-out infinite alternate;
  }
  @keyframes dotsShift {
    from { transform: translate(0, 0); }
    to   { transform: translate(6px, 6px); }
  }
  .about-visual-glow {
    position: absolute;
    top: 5%; left: 5%;
    width: 80%; height: 80%;
    background: radial-gradient(circle, rgba(232, 90, 36, 0.5) 0%, transparent 65%);
    filter: blur(60px);
    z-index: 0;
    animation: glowPulse 4s ease-in-out infinite alternate;
  }
  @keyframes glowPulse {
    from { opacity: 0.5; transform: scale(0.95); }
    to   { opacity: 0.85; transform: scale(1.05); }
  }
  .about-tilt-wrap {
    position: absolute;
    top: 0; left: 0;
    width: 82%; height: 82%;
    transform-style: preserve-3d;
    transition: transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
    will-change: transform;
    z-index: 2;
  }
  .about-img-gradient-frame {
    position: absolute;
    inset: -6px;
    border-radius: 30px;
    background: linear-gradient(135deg, #E85A24, #F97316 40%, #1B4965 100%);
    z-index: -1;
    box-shadow: 0 20px 50px rgba(232, 90, 36, 0.35);
  }
  .about-img-inner-frame {
    position: absolute;
    inset: 0;
    border-radius: 24px;
    overflow: hidden;
    background: #fff;
    box-shadow:
      0 40px 90px rgba(27, 73, 101, 0.35),
      0 12px 30px rgba(27, 73, 101, 0.15);
  }
  .about-img-main {
    width: 100%; height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
  }
  .about-img-inner-frame:hover .about-img-main {
    transform: scale(1.06);
  }
  .about-img-shine {
    position: absolute;
    inset: 0;
    background: linear-gradient(115deg,
      transparent 30%,
      rgba(255, 255, 255, 0.35) 50%,
      transparent 70%);
    transform: translateX(-100%);
    animation: imgShine 6s ease-in-out infinite;
    pointer-events: none;
  }
  @keyframes imgShine {
    0%      { transform: translateX(-100%); }
    40%, 100% { transform: translateX(100%); }
  }
  .about-img-secondary-wrap {
    position: absolute;
    bottom: 0; right: 0;
    width: 58%; height: 58%;
    transform-style: preserve-3d;
    transition: transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
    will-change: transform;
    z-index: 4;
  }
  .about-img-secondary-inner {
    position: relative;
    width: 100%; height: 100%;
    border-radius: 24px;
    overflow: hidden;
    border: 6px solid #ffffff;
    box-shadow:
      0 35px 80px rgba(27, 73, 101, 0.35),
      0 10px 25px rgba(27, 73, 101, 0.2);
  }
  .about-img-secondary {
    width: 100%; height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
  }
  .about-img-secondary-inner:hover .about-img-secondary {
    transform: scale(1.06);
  }

  .about-badge-live {
    position: absolute;
    top: 30px; right: 20px;
    padding: 10px 16px;
    background: #ffffff;
    border-radius: 14px;
    display: flex; align-items: center; gap: 8px;
    box-shadow: 0 16px 40px rgba(27, 73, 101, 0.25);
    z-index: 5;
    border: 1.5px solid rgba(232, 90, 36, 0.15);
    animation: badgeFloat 4s ease-in-out infinite;
  }
  @keyframes badgeFloat {
    0%, 100% { transform: translateY(0); }
    50%      { transform: translateY(-8px); }
  }
  .about-badge-live .dot {
    width: 8px; height: 8px;
    background: #EF4444;
    border-radius: 50%;
    box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.2);
    animation: recBlink 1.2s ease-in-out infinite;
  }
  @keyframes recBlink {
    0%, 100% { opacity: 1; }
    50%      { opacity: 0.4; }
  }
  .about-badge-live .text {
    font-size: 11px; font-weight: 800;
    color: var(--brand-navy);
    letter-spacing: 1px; text-transform: uppercase;
  }

  .about-badge-data {
    position: absolute;
    top: 40px; left: 20px;
    padding: 14px 18px;
    background: rgba(19, 56, 80, 0.85);
    backdrop-filter: blur(12px);
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    z-index: 5;
    box-shadow: 0 16px 40px rgba(19, 56, 80, 0.4);
    animation: badgeFloat2 5s ease-in-out infinite;
  }
  @keyframes badgeFloat2 {
    0%, 100% { transform: translateY(0); }
    50%      { transform: translateY(-6px); }
  }
  .about-badge-data .row1 {
    display: flex; align-items: center; gap: 6px;
    color: #FFB894;
    font-size: 10px; font-weight: 800;
    letter-spacing: 1px; text-transform: uppercase;
    margin-bottom: 6px;
  }
  .about-badge-data .row2 {
    font-size: 22px; font-weight: 800;
    color: #ffffff; line-height: 1;
    letter-spacing: -0.02em;
  }
  .about-badge-data .row3 {
    font-size: 10px; color: #CBD5E1;
    font-weight: 600; margin-top: 4px;
    letter-spacing: 0.4px;
  }

  .about-exp-badge {
    position: absolute;
    bottom: 30px; left: 20px;
    background: linear-gradient(135deg, #E85A24, #C74918);
    color: #ffffff;
    padding: 20px 24px;
    border-radius: 20px;
    box-shadow:
      0 24px 55px rgba(232, 90, 36, 0.5),
      inset 0 0 0 3px #ffffff;
    z-index: 6;
    animation: badgeFloat3 5s ease-in-out infinite;
    min-width: 140px;
  }
  @keyframes badgeFloat3 {
    0%, 100% { transform: translateY(0); }
    50%      { transform: translateY(-6px); }
  }
  .about-exp-badge .row-icon {
    width: 28px; height: 28px;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.25);
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 8px;
  }
  .about-exp-badge .num {
    font-size: 34px; font-weight: 800; line-height: 1;
    letter-spacing: -0.03em;
  }
  .about-exp-badge .lbl {
    font-size: 10px; color: #FFE4D6;
    font-weight: 800; letter-spacing: 1.2px;
    text-transform: uppercase; margin-top: 4px;
  }

  @media (max-width: 500px) {
    .about-premium-visual { height: 480px; }
    .about-badge-live { padding: 8px 12px; top: 20px; right: 12px; }
    .about-badge-live .text { font-size: 9px; }
    .about-badge-data { padding: 10px 14px; top: 30px; left: 12px; }
    .about-badge-data .row2 { font-size: 18px; }
    .about-exp-badge { padding: 14px 18px; bottom: 20px; left: 12px; min-width: 110px; }
    .about-exp-badge .num { font-size: 26px; }
    .about-visual-dots { display: none; }
  }

  /* Content */
  .about-premium-content .content-label {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 8px 16px;
    background: linear-gradient(135deg, #E85A24, #C74918);
    color: #ffffff;
    border-radius: 999px;
    font-size: 11px; font-weight: 800;
    letter-spacing: 1.4px; text-transform: uppercase;
    margin-bottom: 24px;
    box-shadow: 0 8px 20px rgba(232, 90, 36, 0.3);
  }
  .about-premium-content h3 {
    font-size: clamp(24px, 3vw, 34px);
    font-weight: 800;
    color: var(--brand-navy);
    line-height: 1.25;
    letter-spacing: -0.02em;
    margin-bottom: 24px;
  }
  .about-premium-content h3 span { color: var(--brand-orange); }
  .about-premium-content p {
    font-size: 15.5px;
    color: #475569;
    line-height: 1.85;
    margin-bottom: 18px;
  }
  .about-premium-content p strong {
    color: var(--brand-navy);
    font-weight: 700;
  }
  .mv-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin: 32px 0;
  }
  @media (max-width: 500px) { .mv-grid { grid-template-columns: 1fr; } }
  .mv-card {
    padding: 22px;
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(12px);
    border: 1.5px solid rgba(232, 90, 36, 0.15);
    border-radius: 18px;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }
  .mv-card::before {
    content: "";
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 3px;
    background: linear-gradient(90deg, #E85A24, #F97316);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s ease;
  }
  .mv-card:hover::before { transform: scaleX(1); }
  .mv-card:hover {
    transform: translateY(-4px);
    border-color: rgba(232, 90, 36, 0.4);
    box-shadow: 0 16px 40px rgba(232, 90, 36, 0.12);
  }
  .mv-icon {
    width: 44px; height: 44px;
    border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    color: #ffffff;
    margin-bottom: 14px;
    box-shadow: 0 8px 18px rgba(0, 0, 0, 0.15);
  }
  .mv-icon.orange { background: linear-gradient(135deg, #E85A24, #C74918); }
  .mv-icon.navy   { background: linear-gradient(135deg, #1B4965, #133850); }
  .mv-card h4 {
    font-size: 15px; font-weight: 800;
    color: var(--brand-navy);
    margin-bottom: 8px;
  }
  .mv-card p {
    font-size: 13px; color: #64748B; line-height: 1.6;
    margin: 0;
  }

  .metrics-block {
    margin-top: 32px;
    display: flex; flex-direction: column; gap: 18px;
  }
  .metric-item .metric-top {
    display: flex; justify-content: space-between; align-items: baseline;
    margin-bottom: 8px;
  }
  .metric-item .metric-name {
    font-size: 13.5px; font-weight: 700;
    color: var(--brand-navy);
  }
  .metric-item .metric-val {
    font-size: 15px; font-weight: 800;
    color: var(--brand-orange);
  }
  .metric-bar {
    width: 100%; height: 8px;
    background: #E5E9EF;
    border-radius: 999px;
    overflow: hidden;
    position: relative;
  }
  .metric-fill {
    height: 100%;
    background: linear-gradient(90deg, #E85A24, #F97316);
    border-radius: 999px;
    transition: width 1.5s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
  }
  .metric-fill::after {
    content: "";
    position: absolute; inset: 0;
    background: linear-gradient(90deg,
      transparent,
      rgba(255, 255, 255, 0.5),
      transparent);
    animation: shimmer 2s ease-in-out infinite;
  }
  @keyframes shimmer {
    from { transform: translateX(-100%); }
    to   { transform: translateX(100%); }
  }

  .about-founder-premium {
    display: flex; align-items: center; gap: 18px;
    padding: 22px 24px;
    margin-top: 34px;
    background: linear-gradient(135deg, #FFF7F0, #FFEFE2);
    border-radius: 18px;
    border-left: 4px solid var(--brand-orange);
    box-shadow: 0 10px 30px rgba(232, 90, 36, 0.1);
    transition: all 0.3s ease;
  }
  .about-founder-premium:hover {
    transform: translateY(-3px);
    box-shadow: 0 16px 40px rgba(232, 90, 36, 0.18);
  }
  .about-founder-avatar {
    width: 60px; height: 60px;
    border-radius: 16px;
    background: linear-gradient(135deg, var(--brand-navy), var(--brand-navy-dark));
    display: flex; align-items: center; justify-content: center;
    color: #ffffff;
    flex-shrink: 0;
    box-shadow: 0 10px 24px rgba(27, 73, 101, 0.35);
  }
  .about-founder-info .name {
    font-size: 16px; font-weight: 800;
    color: var(--brand-navy);
  }
  .about-founder-info .role {
    font-size: 12.5px; color: #64748B;
    font-weight: 600; margin-top: 3px;
  }

  .cert-badges {
    display: flex; flex-wrap: wrap;
    gap: 10px; margin-top: 30px;
  }
  .cert-badge {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 10px 16px;
    background: #ffffff;
    border: 1.5px solid #E5E9EF;
    border-radius: 12px;
    font-size: 12.5px; font-weight: 700;
    color: var(--brand-navy);
    transition: all 0.25s ease;
  }
  .cert-badge:hover {
    border-color: var(--brand-orange);
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(232, 90, 36, 0.15);
  }
  .cert-badge .svg-icon-xs { color: var(--brand-orange); }

  .about-stats-strip {
    margin-top: 90px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0;
    background: linear-gradient(135deg, var(--brand-navy), var(--brand-navy-dark));
    border-radius: 24px;
    box-shadow: 0 30px 70px rgba(27, 73, 101, 0.3);
    position: relative;
    overflow: hidden;
  }
  .about-stats-strip::before {
    content: "";
    position: absolute; inset: 0;
    background-image:
      repeating-linear-gradient(45deg,
        rgba(232, 90, 36, 0.1) 0px,
        rgba(232, 90, 36, 0.1) 2px,
        transparent 2px, transparent 28px);
    pointer-events: none;
  }
  .about-stat-cell {
    padding: 40px 24px;
    text-align: center;
    position: relative;
    z-index: 1;
    transition: all 0.3s ease;
  }
  .about-stat-cell:hover {
    background: rgba(255, 255, 255, 0.05);
  }
  .about-stat-cell:not(:last-child)::after {
    content: "";
    position: absolute;
    right: 0; top: 30%; bottom: 30%;
    width: 1px;
    background: rgba(255, 255, 255, 0.15);
  }
  .about-stat-cell .icon-wrap {
    width: 44px; height: 44px;
    margin: 0 auto 14px;
    border-radius: 12px;
    background: rgba(232, 90, 36, 0.15);
    border: 1px solid rgba(232, 90, 36, 0.3);
    display: flex; align-items: center; justify-content: center;
    color: #FFB894;
  }
  .about-stat-cell .num {
    font-size: clamp(28px, 3.5vw, 40px);
    font-weight: 800;
    background: linear-gradient(135deg, #F97316, #FFB894);
    -webkit-background-clip: text; background-clip: text; color: transparent;
    line-height: 1;
    letter-spacing: -0.03em;
  }
  .about-stat-cell .lbl {
    font-size: 12px;
    color: #CBD5E1;
    font-weight: 700;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    margin-top: 10px;
  }
  @media (max-width: 700px) {
    .about-stats-strip { grid-template-columns: repeat(2, 1fr); }
    .about-stat-cell:nth-child(2)::after { display: none; }
    .about-stat-cell:nth-child(1),
    .about-stat-cell:nth-child(2) {
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
  }

  /* ───────── SERVICES ───────── */
  .services { background: #FAFBFC; }
  .services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 28px;
  }
  .service-card {
    background: #ffffff;
    border-radius: 20px;
    overflow: hidden;
    border: 1.5px solid #E5E9EF;
    transition: all 0.4s ease;
    position: relative;
    display: flex;
    flex-direction: column;
  }
  .service-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 28px 60px rgba(27, 73, 101, 0.15);
    border-color: rgba(232, 90, 36, 0.4);
  }
  .service-img-wrap { position: relative; height: 200px; overflow: hidden; }
  .service-img {
    width: 100%; height: 100%; object-fit: cover;
    transition: transform 0.6s ease;
  }
  .service-card:hover .service-img { transform: scale(1.08); }
  .service-img-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(180deg, transparent 30%, rgba(19, 56, 80, 0.85));
  }
  .service-badge {
    position: absolute; top: 16px; left: 16px;
    padding: 7px 14px;
    background: rgba(232, 90, 36, 0.95);
    color: #ffffff;
    border-radius: 8px;
    font-size: 11px; font-weight: 800;
    letter-spacing: 0.8px; text-transform: uppercase;
    box-shadow: 0 6px 16px rgba(232, 90, 36, 0.4);
    z-index: 2;
  }
  .service-body {
    padding: 28px 26px 30px;
    display: flex; flex-direction: column; flex: 1;
  }
  .service-icon {
    width: 54px; height: 54px;
    border-radius: 14px;
    background: linear-gradient(135deg, var(--brand-navy), var(--brand-navy-dark));
    color: #fff;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 18px;
    box-shadow: 0 10px 24px rgba(27, 73, 101, 0.25);
  }
  .service-body h3 {
    font-size: 19px; font-weight: 800;
    color: var(--brand-navy);
    margin-bottom: 10px;
    letter-spacing: -0.01em; line-height: 1.3;
  }
  .service-body p {
    font-size: 13.5px; color: #64748B;
    line-height: 1.65; margin-bottom: 18px;
  }
  .service-points {
    list-style: none;
    display: flex; flex-direction: column; gap: 9px;
    margin-top: auto;
  }
  .service-points li {
    display: flex; gap: 10px; align-items: flex-start;
    font-size: 13px; color: var(--brand-navy);
    font-weight: 600; line-height: 1.5;
  }
  .service-points li::before {
    content: ""; width: 6px; height: 6px;
    background: var(--brand-orange);
    border-radius: 50%;
    margin-top: 7px; flex-shrink: 0;
    box-shadow: 0 0 0 3px rgba(232, 90, 36, 0.15);
  }

  /* ───────── CHALLENGE ───────── */
  .challenge { background: #ffffff; }
  .card-grid-3 {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 28px;
  }
  .challenge-card {
    background: #ffffff; border-radius: 20px; overflow: hidden;
    border: 1px solid #E5E9EF; box-shadow: 0 4px 20px rgba(27, 73, 101, 0.05);
    transition: all 0.35s ease;
  }
  .challenge-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 24px 48px rgba(27, 73, 101, 0.14);
    border-color: rgba(232, 90, 36, 0.25);
  }
  .challenge-img-wrap { position: relative; height: 200px; overflow: hidden; }
  .challenge-img {
    width: 100%; height: 100%; object-fit: cover;
    transition: transform 0.5s ease;
  }
  .challenge-card:hover .challenge-img { transform: scale(1.06); }
  .challenge-img-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(180deg, transparent 40%, rgba(27, 73, 101, 0.85));
  }
  .challenge-body { padding: 26px 28px 30px; }
  .challenge-icon-wrap {
    width: 56px; height: 56px; border-radius: 14px;
    background: linear-gradient(135deg, #FFE4D6, #FFD0B8);
    display: flex; align-items: center; justify-content: center;
    color: var(--brand-orange); margin-bottom: 18px;
    border: 2px solid rgba(232, 90, 36, 0.2);
  }
  .challenge-body h3 {
    font-size: 19px; font-weight: 800; margin-bottom: 16px;
    color: var(--brand-navy);
  }
  .challenge-body ul { list-style: none; }
  .challenge-body li {
    padding: 7px 0 7px 24px; position: relative;
    color: #475569; font-size: 14px; font-weight: 500;
  }
  .challenge-body li::before {
    content: ""; position: absolute; left: 0; top: 14px;
    width: 8px; height: 8px; background: var(--brand-orange);
    border-radius: 50%; box-shadow: 0 0 0 3px rgba(232, 90, 36, 0.15);
  }

  /* ───────── TECHNOLOGY ───────── */
  .tech-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center;
  }
  @media (max-width: 900px) { .tech-grid { grid-template-columns: 1fr; gap: 32px; } }
  .feature-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  @media (max-width: 500px) { .feature-grid { grid-template-columns: 1fr; } }
  .feature-card {
    background: #ffffff;
    border: 1.5px solid #E5E9EF; border-radius: 16px; padding: 24px;
    transition: all 0.3s;
  }
  .feature-card:hover {
    transform: translateY(-4px); border-color: rgba(232, 90, 36, 0.4);
    box-shadow: 0 14px 30px rgba(232, 90, 36, 0.12);
  }
  .feature-icon {
    width: 46px; height: 46px; border-radius: 12px;
    background: linear-gradient(135deg, #E85A24, #C74918);
    display: flex; align-items: center; justify-content: center;
    color: #fff; margin-bottom: 14px;
    box-shadow: 0 6px 18px rgba(232, 90, 36, 0.3);
  }
  .feature-card h3 {
    font-size: 15px; font-weight: 800; margin-bottom: 6px;
    color: var(--brand-navy);
  }
  .feature-card p { font-size: 13px; color: #64748B; line-height: 1.55; }
  .tech-panel {
    background: linear-gradient(135deg, var(--brand-navy), var(--brand-navy-dark));
    border-radius: 24px; padding: 38px; color: #ffffff;
    box-shadow: 0 24px 60px rgba(27, 73, 101, 0.25);
  }
  .tech-panel h3 {
    font-size: 22px; font-weight: 800; margin-bottom: 16px;
    display: flex; align-items: center; gap: 10px;
  }
  .tech-panel > p {
    color: #CBD5E1; font-size: 14px; margin-bottom: 26px; line-height: 1.75;
  }
  .stage-list { display: flex; flex-direction: column; gap: 16px; margin-bottom: 28px; }
  .stage-item { display: flex; align-items: center; gap: 14px; }
  .stage-dot {
    width: 42px; height: 42px; border-radius: 11px;
    background: rgba(232, 90, 36, 0.2);
    border: 1px solid rgba(232, 90, 36, 0.4);
    display: flex; align-items: center; justify-content: center;
    color: #FFA07A; flex-shrink: 0;
  }
  .stage-info { flex: 1; }
  .stage-info .top {
    display: flex; justify-content: space-between; font-size: 14px;
    font-weight: 600; margin-bottom: 7px;
  }
  .stage-info .top span:last-child {
    font-size: 11px; color: #94A3B8; font-weight: 500;
  }
  .progress-bar {
    width: 100%; height: 5px; background: rgba(255, 255, 255, 0.1);
    border-radius: 999px; overflow: hidden;
  }
  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #F97316, #E85A24);
    border-radius: 999px;
  }
  .emission-box {
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 16px; padding: 20px;
  }
  .emission-box h4 {
    font-size: 13px; font-weight: 700; color: #FFA07A;
    margin-bottom: 14px; display: flex; align-items: center;
    gap: 8px; letter-spacing: 0.4px; text-transform: uppercase;
  }
  .emission-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(80px, 1fr)); gap: 10px;
  }
  .emission-item {
    background: rgba(255, 255, 255, 0.05); border-radius: 10px;
    padding: 10px; text-align: center;
  }
  .emission-item .val { font-size: 16px; font-weight: 800; }
  .emission-item .val.blue { color: #60A5FA; }
  .emission-item .val.green { color: #4ADE80; }
  .emission-item .val.yellow { color: #FACC15; }
  .emission-item .val.orange { color: #FB923C; }
  .emission-item .val.emerald { color: #34D399; }
  .emission-item .lbl { font-size: 11px; color: #94A3B8; margin-top: 3px; font-weight: 600; }

  /* ───────── PROCESS ───────── */
  .process { background: #FAFBFC; }
  .card-grid-4 {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 26px;
  }
  .process-card {
    background: #ffffff; border-radius: 20px; overflow: hidden;
    border: 1px solid #E5E9EF; box-shadow: 0 4px 20px rgba(27, 73, 101, 0.05);
    position: relative; transition: all 0.35s;
  }
  .process-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 24px 48px rgba(27, 73, 101, 0.14);
  }
  .process-num {
    position: absolute; top: 14px; right: 14px; z-index: 2;
    width: 46px; height: 46px;
    background: linear-gradient(135deg, #E85A24, #C74918);
    color: #ffffff; border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-weight: 800; font-size: 14px;
    box-shadow: 0 8px 20px rgba(232, 90, 36, 0.45);
  }
  .process-img { width: 100%; height: 170px; object-fit: cover; }
  .process-body { padding: 22px 24px 26px; }
  .process-body h3 {
    font-size: 17px; font-weight: 800; margin-bottom: 10px;
    color: var(--brand-navy);
  }
  .process-body p { font-size: 13.5px; color: #64748B; line-height: 1.65; }
  .dump-yard { margin-top: 80px; }
  .dump-yard h3 {
    text-align: center; font-size: clamp(22px, 3vw, 30px);
    font-weight: 800; color: var(--brand-navy); margin-bottom: 40px;
  }
  .dump-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
  }
  .dump-card {
    display: flex; gap: 16px; align-items: flex-start;
    background: #ffffff; padding: 22px; border-radius: 14px;
    border: 1px solid #E5E9EF;
    box-shadow: 0 4px 14px rgba(27, 73, 101, 0.05);
    transition: all 0.25s;
  }
  .dump-card:hover {
    transform: translateY(-4px); border-color: rgba(232, 90, 36, 0.3);
    box-shadow: 0 14px 30px rgba(27, 73, 101, 0.1);
  }
  .dump-icon {
    width: 44px; height: 44px; border-radius: 11px;
    background: linear-gradient(135deg, var(--brand-navy), var(--brand-navy-dark));
    color: #ffffff; display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    box-shadow: 0 6px 16px rgba(27, 73, 101, 0.25);
  }
  .dump-card p {
    font-size: 13.5px; color: #334155; font-weight: 600; line-height: 1.55;
  }

  /* ───────── END PRODUCTS ───────── */
  .end-products {
    background: linear-gradient(135deg, var(--brand-navy), var(--brand-navy-dark));
    position: relative; overflow: hidden;
  }
  .end-products::before {
    content: ""; position: absolute; inset: 0;
    background: radial-gradient(circle at 80% 20%, rgba(232, 90, 36, 0.15) 0%, transparent 60%);
  }
  .end-products .container { position: relative; z-index: 1; }
  .product-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 22px;
  }
  .product-card {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 18px; padding: 28px; transition: all 0.3s;
  }
  .product-card:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-6px);
    border-color: rgba(232, 90, 36, 0.5);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
  }
  .product-icon {
    width: 52px; height: 52px; border-radius: 13px;
    background: linear-gradient(135deg, #E85A24, #C74918);
    display: flex; align-items: center; justify-content: center;
    color: #fff; margin-bottom: 18px;
    box-shadow: 0 8px 20px rgba(232, 90, 36, 0.4);
  }
  .product-card h3 {
    color: #ffffff; font-size: 17px; font-weight: 800; margin-bottom: 6px;
  }
  .product-card p { color: #94A3B8; font-size: 13px; font-weight: 500; }

  /* ───────── MODELS ───────── */
  .models { background: #FAFBFC; }
  .model-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(190px, 1fr)); gap: 22px;
  }
  .model-card {
    background: #ffffff; border-radius: 20px; padding: 34px 22px;
    text-align: center; border: 1.5px solid #E5E9EF;
    transition: all 0.35s;
  }
  .model-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 24px 50px rgba(232, 90, 36, 0.15);
    border-color: rgba(232, 90, 36, 0.4);
  }
  .model-icon {
    width: 64px; height: 64px; margin: 0 auto 20px;
    border-radius: 16px;
    background: linear-gradient(135deg, var(--brand-navy), var(--brand-navy-dark));
    display: flex; align-items: center; justify-content: center;
    color: #fff;
    box-shadow: 0 10px 24px rgba(27, 73, 101, 0.25);
  }
  .model-card .capacity {
    font-size: 28px; font-weight: 800; color: var(--brand-navy);
    margin-bottom: 6px; letter-spacing: -0.02em;
  }
  .model-card .cap-label {
    font-size: 11px; font-weight: 800; color: var(--brand-orange);
    text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px;
  }
  .model-card p { font-size: 13px; color: #64748B; line-height: 1.55; }

  /* ───────── CERTIFICATION ───────── */
  .cert-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center;
  }
  @media (max-width: 900px) { .cert-grid { grid-template-columns: 1fr; gap: 32px; } }
  .cert-list { display: flex; flex-direction: column; gap: 26px; }
  .cert-item { display: flex; gap: 18px; align-items: flex-start; }
  .cert-icon {
    width: 50px; height: 50px; border-radius: 13px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; color: #ffffff;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }
  .cert-icon.orange { background: linear-gradient(135deg, #E85A24, #C74918); }
  .cert-icon.navy { background: linear-gradient(135deg, var(--brand-navy), var(--brand-navy-dark)); }
  .cert-item h3 {
    font-size: 17px; font-weight: 800; color: var(--brand-navy); margin-bottom: 8px;
  }
  .cert-item p, .cert-item div p {
    font-size: 13.5px; color: #64748B; line-height: 1.65;
  }
  .cert-item .patent-info { font-size: 13px; color: #475569; line-height: 1.9; }
  .cert-item .patent-info strong { color: var(--brand-navy); font-weight: 700; }
  .cert-panel {
    background: linear-gradient(135deg, #FFF7F0, #FFEFE2);
    border: 2px dashed rgba(232, 90, 36, 0.4);
    border-radius: 24px; padding: 44px 32px; text-align: center;
  }
  .cert-panel-icon {
    width: 84px; height: 84px; margin: 0 auto 22px;
    border-radius: 22px;
    background: linear-gradient(135deg, #E85A24, #C74918);
    display: flex; align-items: center; justify-content: center;
    color: #fff;
    box-shadow: 0 12px 30px rgba(232, 90, 36, 0.35);
  }
  .cert-panel h3 {
    font-size: 21px; font-weight: 800; color: var(--brand-navy); margin-bottom: 6px;
  }
  .cert-panel > p {
    font-size: 13px; color: #64748B; margin-bottom: 26px; font-weight: 500;
  }
  .cert-inner {
    background: #ffffff; border-radius: 16px; padding: 22px;
    box-shadow: 0 4px 16px rgba(27, 73, 101, 0.08);
  }
  .cert-inner .top-row {
    display: flex; justify-content: space-between;
    font-size: 11px; color: #94A3B8; margin-bottom: 18px; font-weight: 600;
  }
  .cert-seal {
    width: 100px; height: 100px; margin: 0 auto 14px;
    border-radius: 50%;
    background: linear-gradient(135deg, #E85A24, #C74918);
    display: flex; align-items: center; justify-content: center;
    color: #fff;
    box-shadow: 0 12px 30px rgba(232, 90, 36, 0.35);
  }
  .cert-inner .title {
    font-size: 11px; color: var(--brand-navy);
    letter-spacing: 1.2px; text-transform: uppercase; font-weight: 700;
  }

  /* ───────── FOOTER (premium branding) ───────── */
  .footer {
    background: var(--brand-navy-dark); color: #ffffff;
    padding: 80px 24px 32px;
    position: relative;
    overflow: hidden;
  }
  .footer::before {
    content: "";
    position: absolute; inset: 0;
    background-image:
      repeating-linear-gradient(45deg,
        rgba(232, 90, 36, 0.06) 0px,
        rgba(232, 90, 36, 0.06) 2px,
        transparent 2px, transparent 40px);
    pointer-events: none;
  }
  .footer-grid {
    max-width: 1200px; margin: 0 auto;
    display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 48px;
    position: relative; z-index: 1;
  }
  .footer-brand {
    display: flex; align-items: center; gap: 18px;
    margin-bottom: 24px;
  }
  .footer-brand img {
    width: 72px; height: 72px; object-fit: contain;
    background: #ffffff; border-radius: 18px;
    padding: 8px;
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
    border: 2px solid rgba(232, 90, 36, 0.25);
  }
  .footer-brand-text { display: flex; flex-direction: column; gap: 5px; line-height: 1; }
  .footer-brand-text .name {
    font-size: 22px;
    font-weight: 900;
    letter-spacing: -0.03em;
    background: linear-gradient(135deg, #ffffff 0%, #FFB894 100%);
    -webkit-background-clip: text; background-clip: text; color: transparent;
    line-height: 1.1;
  }
  .footer-brand-text .tag {
    display: flex; align-items: center; gap: 8px;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 1.6px;
    text-transform: uppercase;
    color: var(--brand-orange);
  }
  .footer-brand-text .tag .divider {
    width: 4px; height: 4px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    flex-shrink: 0;
  }
  .footer p { color: #94A3B8; font-size: 14px; line-height: 1.75; }
  .footer h4 {
    font-size: 16px; font-weight: 800; margin-bottom: 20px;
    color: #ffffff;
    position: relative;
    padding-bottom: 12px;
  }
  .footer h4::after {
    content: "";
    position: absolute;
    bottom: 0; left: 0;
    width: 32px; height: 3px;
    background: linear-gradient(90deg, #E85A24, #F97316);
    border-radius: 999px;
  }
  .footer-links { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
  .footer-links button {
    text-align: left; font-size: 13.5px; color: #94A3B8;
    padding: 5px 0; transition: color 0.2s; font-weight: 500;
  }
  .footer-links button:hover { color: var(--brand-orange); }
  .footer-contact { display: flex; flex-direction: column; gap: 14px; }
  .footer-contact div {
    display: flex; align-items: center; gap: 12px;
    font-size: 13.5px; color: #94A3B8; font-weight: 500;
  }
  .footer-contact .svg-icon-sm { color: var(--brand-orange); flex-shrink: 0; }
  .footer-bottom {
    max-width: 1200px; margin: 56px auto 0; padding-top: 28px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    display: flex; justify-content: space-between; flex-wrap: wrap;
    gap: 12px; font-size: 13px; color: #64748B;
    position: relative; z-index: 1;
  }
  @media (max-width: 600px) {
    .footer-bottom { flex-direction: column; text-align: center; }
    .footer-brand img { width: 60px; height: 60px; }
    .footer-brand-text .name { font-size: 18px; }
  }

  /* ───────── REVEAL ───────── */
  .reveal { opacity: 0; transform: translateY(40px); transition: all 0.8s ease; }
  .reveal.visible { opacity: 1; transform: translateY(0); }
`;

// ─────────────────────────────────────────────────────────────────────────────
// SVG ICONS
// ─────────────────────────────────────────────────────────────────────────────

const Svg = ({ children, className = "svg-icon", viewBox = "0 0 24 24" }) => (
  <svg className={className} viewBox={viewBox} fill="none"
    stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

const IconRecycle = ({ className }) => <Svg className={className}><path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5" /><path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12" /><path d="m14 16-3 3 3 3" /><path d="M8.293 13.596 7.196 9.5 3.1 10.598" /><path d="m9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843" /><path d="m13.378 9.633 4.096 1.098 1.097-4.096" /></Svg>;
const IconSun = ({ className }) => <Svg className={className}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" /></Svg>;
const IconEvCharger = ({ className }) => <Svg className={className}><rect x="4" y="6" width="10" height="15" rx="2" /><path d="M7 10h4M7 14h4" /><path d="M14 10h2a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2 2 2 0 0 0 2-2V8" /><path d="M20 8V5" /></Svg>;
const IconCable = ({ className }) => <Svg className={className}><path d="M17 21v-2a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1" /><path d="M3 3v2a1 1 0 0 0 1 1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3" /><path d="M17 3v18M7 3v18" /></Svg>;
const IconTrash = ({ className }) => <Svg className={className}><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" /></Svg>;
const IconCity = ({ className }) => <Svg className={className}><path d="M3 21h18" /><path d="M5 21V7l8-4v18" /><path d="M19 21V11l-6-4" /><path d="M9 9v.01M9 12v.01M9 15v.01M9 18v.01" /></Svg>;
const IconDroplet = ({ className }) => <Svg className={className}><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" /></Svg>;
const IconFlame = ({ className }) => <Svg className={className}><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" /></Svg>;
const IconAlert = ({ className }) => <Svg className={className}><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></Svg>;
const IconSettings = ({ className }) => <Svg className={className}><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></Svg>;
const IconUsers = ({ className }) => <Svg className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></Svg>;
const IconLayers = ({ className }) => <Svg className={className}><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></Svg>;
const IconLeaf = ({ className }) => <Svg className={className}><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" /><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" /></Svg>;
const IconTruck = ({ className }) => <Svg className={className}><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" /><path d="M15 18H9" /><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" /><circle cx="17" cy="18" r="2" /><circle cx="7" cy="18" r="2" /></Svg>;
const IconZap = ({ className }) => <Svg className={className}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></Svg>;
const IconWind = ({ className }) => <Svg className={className}><path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" /><path d="M9.6 4.6A2 2 0 1 1 11 8H2" /><path d="M12.6 19.4A2 2 0 1 0 14 16H2" /></Svg>;
const IconFactory = ({ className }) => <Svg className={className}><path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" /><path d="M17 18h1" /><path d="M12 18h1" /><path d="M7 18h1" /></Svg>;
const IconBox = ({ className }) => <Svg className={className}><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" /><polyline points="3.29 7 12 12 20.71 7" /><line x1="12" y1="22" x2="12" y2="12" /></Svg>;
const IconAward = ({ className }) => <Svg className={className}><circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" /></Svg>;
const IconShield = ({ className }) => <Svg className={className}><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /></Svg>;
const IconTrend = ({ className }) => <Svg className={className}><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></Svg>;
const IconGlobe = ({ className }) => <Svg className={className}><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></Svg>;
const IconRefresh = ({ className }) => <Svg className={className}><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" /><path d="M21 3v5h-5" /><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" /><path d="M8 16H3v5" /></Svg>;
const IconFile = ({ className }) => <Svg className={className}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><path d="m9 15 2 2 4-4" /></Svg>;
const IconCpu = ({ className }) => <Svg className={className}><rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" /><path d="M15 2v2M9 2v2M15 20v2M9 20v2M20 9h2M20 14h2M2 9h2M2 14h2" /></Svg>;
const IconThermo = ({ className }) => <Svg className={className}><path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" /></Svg>;
const IconGauge = ({ className }) => <Svg className={className}><path d="m12 14 4-4" /><path d="M3.34 19a10 10 0 1 1 17.32 0" /></Svg>;
const IconCheck = ({ className }) => <Svg className={className}><polyline points="20 6 9 17 4 12" /></Svg>;
const IconArrowRight = ({ className }) => <Svg className={className}><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></Svg>;
const IconMenu = ({ className }) => <Svg className={className}><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></Svg>;
const IconX = ({ className }) => <Svg className={className}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></Svg>;
const IconHand = ({ className }) => <Svg className={className}><path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" /><path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" /><path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" /><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" /></Svg>;
const IconTarget = ({ className }) => <Svg className={className}><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></Svg>;
const IconEye = ({ className }) => <Svg className={className}><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></Svg>;
const IconSparkles = ({ className }) => <Svg className={className}><path d="m12 3-1.9 5.8-5.8 1.9 5.8 1.9L12 18l1.9-5.4 5.8-1.9-5.8-1.9Z" /><path d="M5 3v4M19 17v4M3 5h4M17 19h4" /></Svg>;
const IconActivity = ({ className }) => <Svg className={className}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></Svg>;
const IconShieldCheck = ({ className }) => <Svg className={className}><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /><path d="m9 12 2 2 4-4" /></Svg>;

// ─────────────────────────────────────────────────────────────────────────────
// IMAGES
// ─────────────────────────────────────────────────────────────────────────────

const IMG = {
  soilPollution: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=800&q=80",
  landfillFire: "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=800&q=80",
  overflowingWaste: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800&q=80",
  wasteCollection: "https://images.unsplash.com/photo-1567093322503-ee4a4d5c5eb1?w=800&q=80",
  conveyorBelt: "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=800&q=80",
  gasifierPlant: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
  energyRecovery: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&q=80",
  solarPMC: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1600&q=80",
  evCharging: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1600&q=80",
  undergroundCable: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1600&q=80",
  wasteMgmt: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=1600&q=80",
  mswGasification: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1600&q=80",
  aboutMain: "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=1000&q=85",
  aboutSecondary: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&q=85",
};

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────

const bannerSlides = [
  { img: IMG.solarPMC, label: "Solar PMC for Maharashtra", Icon: IconSun, title: "Solar PMC" },
  { img: IMG.evCharging, label: "EV Charging Station Provider", Icon: IconEvCharger, title: "EV Charging" },
  { img: IMG.undergroundCable, label: "Electrical Underground Cabling", Icon: IconCable, title: "Underground Cabling" },
  { img: IMG.wasteMgmt, label: "Waste Management", Icon: IconTrash, title: "Waste Management" },
  { img: IMG.mswGasification, label: "Municipal Solid Waste", Icon: IconCity, title: "MSW Gasification" },
];

const navLinks = [
  { id: "about", label: "About Us" },
  { id: "about-premium", label: "Company" },
  { id: "services", label: "Services" },
  { id: "technology", label: "Technology" },
  { id: "process", label: "Process" },
  { id: "certification", label: "Certification" },
];

const services = [
  { img: IMG.solarPMC, Icon: IconSun, badge: "Solar PMC", title: "Solar PMC for Maharashtra", desc: "End-to-end Project Management Consultancy for solar rooftop and ground-mounted projects across Maharashtra — from feasibility to commissioning.", points: ["Site survey, feasibility & DPR preparation", "Vendor selection & tender management", "Subsidy assistance (PM Surya Ghar / MSEDCL)", "Project supervision, QA & commissioning"] },
  { img: IMG.evCharging, Icon: IconEvCharger, badge: "EV Charging", title: "EV Charging Station Services", desc: "Turnkey EV charging station provider — site assessment, installation, commissioning and AMC for AC & DC fast chargers.", points: ["AC & DC fast charger installation", "Site survey, load & civil work", "OEM partnerships & software integration", "Operation, maintenance & AMC"] },
  { img: IMG.undergroundCable, Icon: IconCable, badge: "Cabling", title: "Electrical Underground Cabling", desc: "Design and execution of underground HT/LT cable networks for townships, industries and infrastructure projects.", points: ["HT / LT underground cable laying", "Trenching, ducting & jointing", "Cable termination & testing", "Fault location & repair services"] },
  { img: IMG.wasteMgmt, Icon: IconTrash, badge: "Waste Management", title: "Waste Management Solutions", desc: "Complete waste management services — collection, segregation, transport, processing and disposal with a focus on sustainability.", points: ["Source segregation & collection", "Transportation & logistics", "Recycling & processing facilities", "Land reclamation & dump yard management"] },
  { img: IMG.mswGasification, Icon: IconCity, badge: "MSW Gasification", title: "Municipal Solid Waste Gasification", desc: "Patented MPCB-certified gasification technology that converts unsegregated municipal solid waste into syngas and valuable byproducts.", points: ["96% waste mass reduction", "No external fuel required", "Syngas, bio char, green coal output", "Pollution Control Board compliant"] },
];

const contaminationData = [
  { img: IMG.soilPollution, Icon: IconDroplet, title: "Environmental Contamination", points: ["Soil & Groundwater pollution", "Emission of harmful gases"] },
  { img: IMG.landfillFire, Icon: IconFlame, title: "Fire Hazards", points: ["Increased risk of landfill fires", "Causing air pollution & health issues"] },
  { img: IMG.overflowingWaste, Icon: IconAlert, title: "Unprocessed Waste", points: ["Increased land pollution", "Overflowing dump sites", "Respiratory diseases & health issues"] },
];

const techFeatures = [
  { Icon: IconSettings, title: "Low Maintenance", desc: "Low maintenance and operating costs" },
  { Icon: IconUsers, title: "Minimum Labor", desc: "Requires minimal labor for operation" },
  { Icon: IconLayers, title: "Unsorted Waste", desc: "Can handle unsorted municipal waste" },
  { Icon: IconLeaf, title: "Zero Pollution", desc: "Eco-friendly, zero pollution operations" },
];

const processSteps = [
  { step: "01", title: "Collection & Transport", desc: "Municipal solid waste collected and transported to the treatment facility.", img: IMG.wasteCollection },
  { step: "02", title: "Segregation & Pre-Processing", desc: "Waste transferred onto conveyor belt, mechanically segregated into recyclable, non-recyclable & organic parts. Shredded and dried.", img: IMG.conveyorBelt },
  { step: "03", title: "Gasification", desc: "Organic waste converted into syngas (CO, H2, CH4) by reacting with controlled oxygen/steam at 800-1200 degree C.", img: IMG.gasifierPlant },
  { step: "04", title: "Energy & Byproduct Recovery", desc: "Syngas used for electricity/heat. Char used as soil conditioner. Slag used in construction materials.", img: IMG.energyRecovery },
];

const gasificationStages = [
  { name: "Drying", Icon: IconThermo },
  { name: "Pyrolysis", Icon: IconFlame },
  { name: "Combustion", Icon: IconZap },
  { name: "Reduction", Icon: IconRefresh },
];

const endProducts = [
  { name: "Syngas", use: "Electricity / Heat generation", Icon: IconZap },
  { name: "Char", use: "Soil conditioner", Icon: IconLeaf },
  { name: "Slag", use: "Construction materials", Icon: IconBox },
  { name: "Green Coal", use: "Industrial fuel", Icon: IconFlame },
  { name: "Bio Char", use: "Agricultural amendment", Icon: IconRecycle },
  { name: "Ash", use: "Paver blocks (4% residue)", Icon: IconFactory },
];

const models = [
  { capacity: "1 Ton", desc: "Small communities, institutions" },
  { capacity: "3 Tons", desc: "Medium townships, industrial parks" },
  { capacity: "5 Tons", desc: "Small cities, municipal wards" },
  { capacity: "10 Tons", desc: "Medium cities, large municipalities" },
  { capacity: "20 Tons", desc: "Metropolitan areas, large-scale plants" },
];

const dumpYardOps = [
  { Icon: IconTruck, step: "Waste received, weighed, and recorded" },
  { Icon: IconLayers, step: "Primary segregation: removing recyclables & hazardous materials" },
  { Icon: IconWind, step: "Shredding and drying for moisture reduction" },
  { Icon: IconFactory, step: "Prepared feedstock for gasification plant" },
];

const emissionData = [
  { label: "CO2", value: "3.1%", cls: "blue" },
  { label: "SO2", value: "0.0 ppm", cls: "green" },
  { label: "NOx", value: "47.0 ppm", cls: "yellow" },
  { label: "CO", value: "44.4 ppm", cls: "orange" },
  { label: "Efficiency", value: "99.86%", cls: "emerald" },
];

// ─────────────────────────────────────────────────────────────────────────────
// HOOKS
// ─────────────────────────────────────────────────────────────────────────────

const useReveal = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -80px 0px" }
    );
    const elements = document.querySelectorAll(".reveal");
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
};

const useCounter = (end, duration = 2000) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) setStarted(true);
        });
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(end);
    };
    requestAnimationFrame(step);
  }, [started, end, duration]);

  return { count, ref };
};

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

const SectionHeading = ({ title, subtitle, light }) => (
  <div className={`section-heading reveal ${light ? "light" : ""}`}>
    <h2>{title}</h2>
    {subtitle && <p>{subtitle}</p>}
    <div className="heading-line" />
  </div>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-container">
        <div className="nav-logo" onClick={() => scrollTo("about")}>
          <img src={logo} alt="PBR Enterprises" className="nav-logo-img" />
          <div className="nav-logo-text">
            <span className="logo-brand">PBR Enterprises</span>
            <span className="logo-tagline">
              <span className="tag-word">Waste</span>
              <span className="divider" />
              <span className="tag-word">Solar</span>
              <span className="divider" />
              <span className="tag-word">Electrical</span>
            </span>
          </div>
        </div>
        <div className="nav-links">
          {navLinks.map((link) => (
            <button key={link.id} onClick={() => scrollTo(link.id)}>{link.label}</button>
          ))}
        </div>
        <button className="nav-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <IconX /> : <IconMenu />}
        </button>
      </div>
      {isOpen && (
        <div className="nav-mobile">
          {navLinks.map((link) => (
            <button key={link.id} onClick={() => scrollTo(link.id)}>{link.label}</button>
          ))}
        </div>
      )}
    </nav>
  );
};

/* ───────── ABOUT BANNER ───────── */
const AboutBanner = () => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const dragStart = useRef(null);
  const dragCurrent = useRef(null);
  const bannerRef = useRef(null);

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const goTo = (idx) =>
    setCurrent(((idx % bannerSlides.length) + bannerSlides.length) % bannerSlides.length);
  const next = () => goTo(current + 1);
  const prev = () => goTo(current - 1);

  useEffect(() => {
    if (paused || dragging) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % bannerSlides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [paused, dragging]);

  const onDragStart = (x) => { setDragging(true); dragStart.current = x; dragCurrent.current = x; };
  const onDragMove = (x) => { if (!dragging || dragStart.current === null) return; dragCurrent.current = x; setDragOffset(x - dragStart.current); };
  const onDragEnd = () => {
    if (!dragging) return;
    const delta = dragCurrent.current - dragStart.current;
    if (delta < -80) next(); else if (delta > 80) prev();
    setDragging(false); setDragOffset(0); dragStart.current = null; dragCurrent.current = null;
  };

  const handleMouseDown = (e) => { if (e.button !== 0) return; onDragStart(e.clientX); };
  const handleMouseMove = (e) => { if (!dragging) return; onDragMove(e.clientX); };
  const handleMouseUp = () => onDragEnd();
  const handleTouchStart = (e) => onDragStart(e.touches[0].clientX);
  const handleTouchMove = (e) => { if (!dragging) return; onDragMove(e.touches[0].clientX); };
  const handleTouchEnd = () => onDragEnd();

  useEffect(() => {
    if (dragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleTouchEnd);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [dragging]);

  const activeSlide = bannerSlides[current];
  const visualOffset = dragging ? dragOffset * 0.35 : 0;

  return (
    <div
      id="about"
      ref={bannerRef}
      className={`about-banner ${dragging ? "dragging" : ""}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => { setPaused(false); if (dragging) onDragEnd(); }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      <div className="banner-slides" style={{ transform: `translateX(${visualOffset}px)`, transition: dragging ? "none" : "transform 0.5s ease" }}>
        {bannerSlides.map((slide, i) => (
          <div key={i} className={`banner-slide ${i === current ? "active" : ""}`}>
            <img src={slide.img} alt={slide.title} className="banner-slide-img" loading={i === 0 ? "eager" : "lazy"} draggable={false} />
          </div>
        ))}
      </div>

      <div key={current} className="banner-slide-label">{activeSlide.label}</div>
      <div className="about-banner-lines" />
      <div className="about-banner-overlay" />

      <div className="about-banner-content">
        <div className="about-banner-inner">
          {/* Premium brand lockup with logo */}
          <div className="banner-brand-lockup">
            <img src={logo} alt="PBR" className="banner-logo" />
            <div className="banner-brand-text">
              <span className="banner-brand-name">PBR Enterprises</span>
              <span className="banner-brand-tag">
                Waste <span className="divider" />
                Solar <span className="divider" />
                Electrical
              </span>
            </div>
          </div>

          <h1>Powering Tomorrow with <span>Solar, EV &amp; Waste</span> Solutions</h1>
          <p>
            Your trusted partner for Solar PMC, EV charging stations,
            underground cabling, waste management and municipal solid waste
            gasification across Maharashtra.
          </p>
          <div className="banner-services-chips">
            {bannerSlides.map((slide, i) => {
              const { Icon } = slide;
              return (
                <button key={i} className={`banner-chip ${i === current ? "active" : ""}`}
                  onClick={(e) => { e.stopPropagation(); goTo(i); }}
                  onMouseDown={(e) => e.stopPropagation()}>
                  <Icon className="svg-icon-sm" /> {slide.title}
                </button>
              );
            })}
          </div>
          <div className="banner-dots">
            {bannerSlides.map((_, i) => (
              <div key={i} className={`banner-dot ${i === current ? "active" : ""}`}
                onClick={(e) => { e.stopPropagation(); goTo(i); }}
                onMouseDown={(e) => e.stopPropagation()} />
            ))}
          </div>
          <div className="banner-drag-hint">
            <IconHand className="svg-icon-sm" /> Drag to slide <IconArrowRight className="svg-icon-sm" />
          </div>
          <button className="btn btn-primary" style={{ marginTop: "24px" }}
            onClick={(e) => { e.stopPropagation(); scrollTo("services"); }}
            onMouseDown={(e) => e.stopPropagation()}>
            Explore Services <IconArrowRight className="svg-icon-sm" />
          </button>
        </div>
      </div>
    </div>
  );
};

/* ───────── PREMIUM ABOUT US ───────── */
const PremiumAboutUs = () => {
  const tiltMainRef = useRef(null);
  const tiltSecRef = useRef(null);
  const visualRef = useRef(null);

  const c1 = useCounter(5, 1500);
  const c2 = useCounter(96, 1800);
  const c3 = useCounter(20, 1400);
  const c4 = useCounter(99, 2000);

  const handleTiltMove = (e) => {
    if (!visualRef.current) return;
    const rect = visualRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    if (tiltMainRef.current) {
      tiltMainRef.current.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateZ(0)`;
    }
    if (tiltSecRef.current) {
      tiltSecRef.current.style.transform = `rotateY(${x * -8}deg) rotateX(${y * 8}deg) translateZ(20px)`;
    }
  };

  const handleTiltLeave = () => {
    if (tiltMainRef.current) tiltMainRef.current.style.transform = "";
    if (tiltSecRef.current) tiltSecRef.current.style.transform = "";
  };

  return (
    <section id="about-premium" className="about-premium">
      <div className="about-orb about-orb-1" />
      <div className="about-orb about-orb-2" />
      <div className="about-orb about-orb-3" />

      <div className="about-premium-container">
        {/* Label with mini logo */}
        <div className="about-premium-label">
          <span className="pill">
            <img src={logo} alt="PBR" className="pill-logo" />
            About PBR Enterprises
          </span>
        </div>

        <h2 className="about-premium-heading">
          Engineering a <span className="gradient">Sustainable Future</span> with Innovative Solutions
        </h2>
        <p className="about-premium-subheading">
          Multi-service expertise across solar energy, EV infrastructure,
          electrical systems, and sustainable waste management — trusted by
          government bodies and enterprises across Maharashtra.
        </p>

        <div className="about-premium-grid">
          <div
            ref={visualRef}
            className="about-premium-visual reveal"
            onMouseMove={handleTiltMove}
            onMouseLeave={handleTiltLeave}
          >
            <div className="about-visual-dots" />
            <div className="about-visual-glow" />

            <div ref={tiltMainRef} className="about-tilt-wrap">
              <div className="about-img-gradient-frame" />
              <div className="about-img-inner-frame">
                <img src={IMG.aboutMain} alt="PBR Enterprises Facility" className="about-img-main" loading="lazy" />
                <div className="about-img-shine" />
              </div>
            </div>

            <div ref={tiltSecRef} className="about-img-secondary-wrap">
              <div className="about-img-secondary-inner">
                <img src={IMG.aboutSecondary} alt="Solar Panel Facility" className="about-img-secondary" loading="lazy" />
              </div>
            </div>

            <div className="about-badge-live">
              <span className="dot" />
              <span className="text">Live</span>
            </div>

            <div className="about-badge-data">
              <div className="row1">
                <IconActivity className="svg-icon-xs" /> Active Since
              </div>
              <div className="row2">2018</div>
              <div className="row3">Patent Granted 2024</div>
            </div>

            <div className="about-exp-badge">
              <div className="row-icon">
                <IconAward className="svg-icon-sm" />
              </div>
              <div className="num">20+</div>
              <div className="lbl">Years Patent</div>
            </div>
          </div>

          <div className="about-premium-content reveal">
            <span className="content-label">
              <IconAward className="svg-icon-xs" /> Who We Are
            </span>

            <h3>
              Building a <span>Cleaner Tomorrow</span> with End-to-End Solutions
            </h3>

            <p>
              <strong>PBR Enterprises</strong> is a multi-service company
              powering India's green and infrastructure revolution. From our{" "}
              <strong>MPCB-certified patented gasification technology</strong>{" "}
              to <strong>Solar PMC, EV charging stations, underground cabling,
              and waste management</strong> — we deliver turnkey solutions
              across Maharashtra.
            </p>
            <p>
              We work across the entire value chain — from source segregation
              and collection to gasification and energy recovery — ensuring
              zero landfill dependency and a minimal environmental footprint.
            </p>

            <div className="mv-grid">
              <div className="mv-card">
                <div className="mv-icon orange"><IconTarget className="svg-icon-sm" /></div>
                <h4>Our Mission</h4>
                <p>Deliver sustainable, cost-effective infrastructure solutions that create measurable environmental impact.</p>
              </div>
              <div className="mv-card">
                <div className="mv-icon navy"><IconEye className="svg-icon-sm" /></div>
                <h4>Our Vision</h4>
                <p>A cleaner, greener India with zero waste to landfills and universal clean energy access.</p>
              </div>
            </div>

            <div className="metrics-block">
              <div className="metric-item">
                <div className="metric-top">
                  <span className="metric-name">Waste Mass Reduction</span>
                  <span className="metric-val">96%</span>
                </div>
                <div className="metric-bar"><div className="metric-fill" style={{ width: "96%" }} /></div>
              </div>
              <div className="metric-item">
                <div className="metric-top">
                  <span className="metric-name">Operational Efficiency</span>
                  <span className="metric-val">99.86%</span>
                </div>
                <div className="metric-bar"><div className="metric-fill" style={{ width: "99.86%" }} /></div>
              </div>
              <div className="metric-item">
                <div className="metric-top">
                  <span className="metric-name">Client Satisfaction</span>
                  <span className="metric-val">98%</span>
                </div>
                <div className="metric-bar"><div className="metric-fill" style={{ width: "98%" }} /></div>
              </div>
            </div>

            <div className="about-founder-premium">
              <div className="about-founder-avatar"><IconUsers className="svg-icon" /></div>
              <div className="about-founder-info">
                <div className="name">Mr. Pyla Babji Rao</div>
                <div className="role">Founder &amp; Representative, PBR Enterprises</div>
              </div>
            </div>

            <div className="cert-badges">
              <span className="cert-badge"><IconAward className="svg-icon-xs" /> MPCB Certified</span>
              <span className="cert-badge"><IconShieldCheck className="svg-icon-xs" /> Patented Tech</span>
              <span className="cert-badge"><IconFile className="svg-icon-xs" /> Govt. Recognized</span>
            </div>
          </div>
        </div>

        <div className="about-stats-strip reveal">
          <div className="about-stat-cell" ref={c1.ref}>
            <div className="icon-wrap"><IconLayers className="svg-icon" /></div>
            <div className="num">{c1.count}+</div>
            <div className="lbl">Core Services</div>
          </div>
          <div className="about-stat-cell" ref={c2.ref}>
            <div className="icon-wrap"><IconRecycle className="svg-icon" /></div>
            <div className="num">{c2.count}%</div>
            <div className="lbl">Waste Reduced</div>
          </div>
          <div className="about-stat-cell" ref={c3.ref}>
            <div className="icon-wrap"><IconAward className="svg-icon" /></div>
            <div className="num">{c3.count}+</div>
            <div className="lbl">Years Patent</div>
          </div>
          <div className="about-stat-cell" ref={c4.ref}>
            <div className="icon-wrap"><IconTrend className="svg-icon" /></div>
            <div className="num">{c4.count}%</div>
            <div className="lbl">Efficiency</div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ServicesSection = () => (
  <section id="services" className="services">
    <div className="container">
      <SectionHeading title="Our Core Services" subtitle="Turnkey solutions across solar energy, EV infrastructure, cabling and sustainable waste management" />
      <div className="services-grid">
        {services.map((s, i) => {
          const { Icon } = s;
          return (
            <div key={i} className="service-card reveal">
              <div className="service-img-wrap">
                <img src={s.img} alt={s.title} className="service-img" loading="lazy" />
                <div className="service-img-overlay" />
                <span className="service-badge">{s.badge}</span>
              </div>
              <div className="service-body">
                <div className="service-icon"><Icon className="svg-icon" /></div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <ul className="service-points">
                  {s.points.map((p, j) => (<li key={j}>{p}</li>))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

const ChallengeSection = () => (
  <section id="challenge" className="challenge">
    <div className="container">
      <SectionHeading title="The Growing Challenge" subtitle="Unprocessed waste poses serious environmental and health risks that demand immediate action" />
      <div className="card-grid-3">
        {contaminationData.map((item, i) => {
          const { Icon } = item;
          return (
            <div key={i} className="challenge-card reveal">
              <div className="challenge-img-wrap">
                <img src={item.img} alt={item.title} className="challenge-img" loading="lazy" />
                <div className="challenge-img-overlay" />
              </div>
              <div className="challenge-body">
                <div className="challenge-icon-wrap"><Icon className="svg-icon-lg" /></div>
                <h3>{item.title}</h3>
                <ul>{item.points.map((p, j) => (<li key={j}>{p}</li>))}</ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

const TechnologySection = () => (
  <section id="technology">
    <div className="container">
      <SectionHeading title="Gasification Technology" subtitle="Advanced thermal conversion of waste into clean energy and valuable resources" />
      <div className="tech-grid">
        <div className="feature-grid">
          {techFeatures.map((f, i) => {
            const { Icon } = f;
            return (
              <div key={i} className="feature-card reveal">
                <div className="feature-icon"><Icon className="svg-icon" /></div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            );
          })}
        </div>
        <div className="tech-panel reveal">
          <h3><IconFactory className="svg-icon" /> How It Works</h3>
          <p>Gasification converts organic waste into syngas (CO, H2, CH4) by reacting with controlled oxygen/steam at high temperature (800-1200 degree C).</p>
          <div className="stage-list">
            {gasificationStages.map((s, i) => {
              const { Icon } = s;
              return (
                <div key={i} className="stage-item">
                  <div className="stage-dot"><Icon className="svg-icon-sm" /></div>
                  <div className="stage-info">
                    <div className="top"><span>{s.name}</span><span>Stage {i + 1}</span></div>
                    <div className="progress-bar"><div className="progress-fill" style={{ width: `${(i + 1) * 25}%` }} /></div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="emission-box">
            <h4><IconGauge className="svg-icon-sm" /> Live Emission Monitoring</h4>
            <div className="emission-grid">
              {emissionData.map((e, i) => (
                <div key={i} className="emission-item">
                  <div className={`val ${e.cls}`}>{e.value}</div>
                  <div className="lbl">{e.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const ProcessSection = () => (
  <section id="process" className="process">
    <div className="container">
      <SectionHeading title="End-to-End Process" subtitle="From waste collection to energy recovery - a seamless, efficient workflow" />
      <div className="card-grid-4">
        {processSteps.map((step, i) => (
          <div key={i} className="process-card reveal">
            <div className="process-num">{step.step}</div>
            <img src={step.img} alt={step.title} className="process-img" loading="lazy" />
            <div className="process-body">
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="dump-yard">
        <h3>Dump Yard Operations</h3>
        <div className="dump-grid">
          {dumpYardOps.map((op, i) => {
            const { Icon } = op;
            return (
              <div key={i} className="dump-card reveal">
                <div className="dump-icon"><Icon className="svg-icon-sm" /></div>
                <p>{op.step}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </section>
);

const EndProductsSection = () => (
  <section className="end-products">
    <div className="container">
      <SectionHeading title="End Products" subtitle="Turning waste into wealth - creating energy and eco-bricks from solid waste" light />
      <div className="product-grid">
        {endProducts.map((p, i) => {
          const { Icon } = p;
          return (
            <div key={i} className="product-card reveal">
              <div className="product-icon"><Icon className="svg-icon" /></div>
              <h3>{p.name}</h3>
              <p>{p.use}</p>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

const ModelsSection = () => (
  <section id="models" className="models">
    <div className="container">
      <SectionHeading title="Models Available" subtitle="Scalable solutions for every need - from small communities to metropolitan areas" />
      <div className="model-grid">
        {models.map((m, i) => (
          <div key={i} className="model-card reveal">
            <div className="model-icon"><IconBox className="svg-icon-lg" /></div>
            <div className="capacity">{m.capacity}</div>
            <div className="cap-label">Capacity</div>
            <p>{m.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const CertificationSection = () => (
  <section id="certification">
    <div className="container">
      <SectionHeading title="Certified &amp; Patented" subtitle="Recognized by government bodies for excellence in waste management" />
      <div className="cert-grid">
        <div className="cert-list">
          <div className="cert-item reveal">
            <div className="cert-icon orange"><IconAward className="svg-icon" /></div>
            <div>
              <h3>MPCB Certified Patented System</h3>
              <p>Our patented gasifier technology, developed and certified by the Maharashtra Pollution Control Board (MPCB), provides an environmentally safe solution to waste management.</p>
            </div>
          </div>
          <div className="cert-item reveal">
            <div className="cert-icon navy"><IconFile className="svg-icon" /></div>
            <div>
              <h3>Patent Details</h3>
              <div className="patent-info">
                <p><strong>Patent No:</strong> 509458</p>
                <p><strong>Application No:</strong> 201821005097</p>
                <p><strong>Date of Filing:</strong> 10/02/2018</p>
                <p><strong>Patentee:</strong> Ajit Anil Gadgil</p>
              </div>
            </div>
          </div>
          <div className="cert-item reveal">
            <div className="cert-icon navy"><IconShield className="svg-icon" /></div>
            <div>
              <h3>Government Recognition</h3>
              <p>Recognized by Govt.'s Waste to Wealth Program. Complied with Pollution Control Board norms.</p>
            </div>
          </div>
          <div className="cert-item reveal">
            <div className="cert-icon orange"><IconCpu className="svg-icon" /></div>
            <div>
              <h3>High-Temperature Pyrolysis Gasifier</h3>
              <p>Processes unsegregated waste without external fuels like petrol or diesel. Patent granted for 20 years from 10th February 2018.</p>
            </div>
          </div>
        </div>
        <div className="cert-panel reveal">
          <div className="cert-panel-icon"><IconAward className="svg-icon-lg" /></div>
          <h3>Patent Certificate</h3>
          <p>The Patent Office, Government of India</p>
          <div className="cert-inner">
            <div className="top-row">
              <span>Patent No: 509458</span>
              <span>Date: 12/02/2024</span>
            </div>
            <div className="cert-seal"><IconAward className="svg-icon-lg" /></div>
            <div className="title">High-Temperature Pyrolysis Gasifier</div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <div className="footer-brand">
            <img src={logo} alt="PBR Enterprises" />
            <div className="footer-brand-text">
              <span className="name">PBR Enterprises</span>
              <span className="tag">
                <span>Waste</span>
                <span className="divider" />
                <span>Solar</span>
                <span className="divider" />
                <span>Electrical</span>
              </span>
            </div>
          </div>
          <p>Multi-service company delivering Solar PMC, EV charging stations, underground cabling, waste management and MSW gasification across Maharashtra.</p>
        </div>
        <div>
          <h4>Quick Links</h4>
          <div className="footer-links">
            {navLinks.map((link) => (
              <button key={link.id} onClick={() => scrollTo(link.id)}>{link.label}</button>
            ))}
          </div>
        </div>
        <div>
          <h4>Contact</h4>
          <div className="footer-contact">
            <div><IconUsers className="svg-icon-sm" /><span>Mr. Pyla Babji Rao</span></div>
            <div><IconFactory className="svg-icon-sm" /><span>PBR Enterprises</span></div>
            <div><IconGlobe className="svg-icon-sm" /><span>Maharashtra, India</span></div>
            <div><IconAward className="svg-icon-sm" /><span>Patent Granted: 12/02/2024</span></div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 PBR Enterprises. All rights reserved.</span>
        <span>Solar PMC • EV Charging • Cabling • Waste Management • MSW</span>
      </div>
    </footer>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MAIN APP
// ─────────────────────────────────────────────────────────────────────────────

const App = () => {
  useReveal();
  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <Navbar />
        <main>
          <AboutBanner />
          <PremiumAboutUs />
          <ServicesSection />
          <ChallengeSection />
          <TechnologySection />
          <ProcessSection />
          <EndProductsSection />
          <ModelsSection />
          <CertificationSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default App;