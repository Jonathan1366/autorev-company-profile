"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useReducedMotion } from "framer-motion";

type TransitionPhase = "idle" | "leaving" | "arriving";

const LEAVE_DURATION_MS = 120;
const ARRIVE_DURATION_MS = 220;
const SAFETY_TIMEOUT_MS = 1600;

function isPlainPrimaryClick(event: MouseEvent) {
  return event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
}

function findInternalLink(event: MouseEvent) {
  if (!(event.target instanceof Element)) return null;

  const anchor = event.target.closest<HTMLAnchorElement>("a[href]");
  if (!anchor || anchor.hasAttribute("download") || anchor.dataset.noTransition !== undefined) return null;
  if (anchor.target && anchor.target !== "_self") return null;

  const href = anchor.getAttribute("href");
  if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return null;

  const url = new URL(anchor.href, window.location.href);
  if (url.origin !== window.location.origin) return null;

  return url;
}

export function RouteTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<TransitionPhase>("idle");
  const previousPathname = useRef(pathname);
  const phaseRef = useRef<TransitionPhase>("idle");
  const navigationTimer = useRef<number | null>(null);
  const safetyTimer = useRef<number | null>(null);

  useEffect(() => {
    phaseRef.current = phase;
    document.documentElement.dataset.routeTransition = phase;

    const main = document.getElementById("main-content");
    if (phase === "leaving") main?.setAttribute("aria-busy", "true");
    else main?.removeAttribute("aria-busy");

    return () => {
      main?.removeAttribute("aria-busy");
    };
  }, [phase]);

  useEffect(() => {
    if (previousPathname.current === pathname) return;

    previousPathname.current = pathname;
    if (safetyTimer.current !== null) window.clearTimeout(safetyTimer.current);

    let arrivalTimer: number | null = null;
    const arrivalFrame = window.requestAnimationFrame(() => {
      if (reduceMotion) {
        phaseRef.current = "idle";
        setPhase("idle");
        return;
      }

      phaseRef.current = "arriving";
      setPhase("arriving");
      arrivalTimer = window.setTimeout(() => {
        phaseRef.current = "idle";
        setPhase("idle");
      }, ARRIVE_DURATION_MS);
    });

    return () => {
      window.cancelAnimationFrame(arrivalFrame);
      if (arrivalTimer !== null) window.clearTimeout(arrivalTimer);
    };
  }, [pathname, reduceMotion]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (reduceMotion || event.defaultPrevented || !isPlainPrimaryClick(event)) return;

      const url = findInternalLink(event);
      if (!url) return;

      const current = new URL(window.location.href);
      // Hash and filter/query changes stay instant; pathname changes receive the
      // full branded transition and are observed reliably through usePathname.
      if (url.pathname === current.pathname) return;
      if (phaseRef.current !== "idle") {
        event.preventDefault();
        return;
      }

      event.preventDefault();
      phaseRef.current = "leaving";
      setPhase("leaving");

      if (navigationTimer.current !== null) window.clearTimeout(navigationTimer.current);
      navigationTimer.current = window.setTimeout(() => {
        router.push(`${url.pathname}${url.search}${url.hash}`);
      }, LEAVE_DURATION_MS);

      if (safetyTimer.current !== null) window.clearTimeout(safetyTimer.current);
      safetyTimer.current = window.setTimeout(() => {
        phaseRef.current = "idle";
        setPhase("idle");
      }, SAFETY_TIMEOUT_MS);
    };

    document.addEventListener("click", handleClick, true);
    return () => {
      document.removeEventListener("click", handleClick, true);
      if (navigationTimer.current !== null) window.clearTimeout(navigationTimer.current);
      if (safetyTimer.current !== null) window.clearTimeout(safetyTimer.current);
    };
  }, [reduceMotion, router]);

  const isEnglish = pathname?.startsWith("/en");
  const status = phase === "idle"
    ? ""
    : isEnglish
      ? "Opening the next page"
      : "Membuka halaman berikutnya";

  return (
    <>
      <div className={`route-curtain route-curtain--${phase}`} aria-hidden="true">
        <div className="route-curtain__panel" />
        <div className="route-curtain__beam" />
        <div className="route-curtain__brand">
          <span>AR</span>
          <strong>AutoRev</strong>
        </div>
      </div>
      <p className="route-transition-status" role="status" aria-live="polite" aria-atomic="true">
        {status}
      </p>
    </>
  );
}
