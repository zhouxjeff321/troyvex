(function () {
  // d..d2 = multi-day event range
  const EVENTS = [
    {
      y: 2026,
      m: 8,
      d: 6,
      d2: 8,
      name: "Mall of America Signature Event",
      loc: "Mall of America, 60 East Broadway, Bloomington, Minnesota",
      detail: "August 6-8",
      tag: "Signature",
      kind: "plain",
    },
    {
      y: 2026,
      m: 11,
      d: 21,
      d2: 22,
      name: "One World @ UC Berkeley",
      loc: "Pauley Ballroom, 2495 Bancroft Way, Berkeley, California",
      detail: "November 21-22",
      tag: "Signature",
      kind: "plain",
    },
  ];

  const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // An event counts as past only once its LAST day is over, so a team is never
  // told the competition it is currently at has already finished.
  function endOf(e) {
    return new Date(e.y, e.m - 1, e.d2 || e.d, 23, 59, 59);
  }

  function el(tag, cls, text) {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function renderEvent(e, now) {
    const ev = el("div", "ev");
    ev.appendChild(el("h3", null, e.name));
    ev.appendChild(el("p", "when", e.detail));
    ev.appendChild(el("p", "loc", e.loc));

    const bits = el("div", "bits");
    if (e.tag) bits.appendChild(el("span", "tag", e.tag));
    bits.appendChild(el("span", "state", endOf(e) < now ? "Completed" : "Upcoming"));
    ev.appendChild(bits);
    return ev;
  }

  function init() {
    const host = document.getElementById("line");
    if (!host || !EVENTS.length) return;

    const now = new Date();
    const nowKey = now.getFullYear() * 12 + now.getMonth();

    const keys = EVENTS.map(function (e) {
      return e.y * 12 + (e.m - 1);
    });
    // Stretch the spine to include the current month, so "you are here" always has
    // somewhere to sit — otherwise it vanishes once the season ends.
    let lo = Math.min.apply(null, keys.concat(nowKey));
    let hi = Math.max.apply(null, keys.concat(nowKey));

    for (let k = lo; k <= hi; k++) {
      const y = Math.floor(k / 12);
      const m = (k % 12) + 1;
      const evs = EVENTS.filter(function (e) {
        return e.y === y && e.m === m;
      }).sort(function (a, b) {
        return a.d - b.d;
      });

      const isNow = k === nowKey;
      const allDone =
        evs.length &&
        evs.every(function (e) {
          return endOf(e) < now;
        });

      const mo = el(
        "div",
        "mo" +
          (evs.length ? " has" : " empty") +
          (allDone ? " done" : "") +
          (isNow ? " today" : "")
      );
      mo.appendChild(el("span", "dot"));
      mo.appendChild(el("span", "mo-lb", MONTHS[m - 1] + " " + y));

      const body = el("div", "mo-body");

      // Within the current month the marker has to sit between what has already
      // happened and what has not: an event earlier in the month belongs above it.
      const doneEvs = evs.filter(function (e) {
        return endOf(e) < now;
      });
      const aheadEvs = evs.filter(function (e) {
        return endOf(e) >= now;
      });

      doneEvs.forEach(function (e) {
        body.appendChild(renderEvent(e, now));
      });

      if (isNow) {
        const nw = el("div", "now");
        nw.appendChild(el("span", "now-mark"));
        nw.appendChild(el("span", "now-lb", "You are here"));
        body.appendChild(nw);
      }

      aheadEvs.forEach(function (e) {
        body.appendChild(renderEvent(e, now));
      });

      if (!evs.length) body.appendChild(el("p", "gap", "No competition scheduled."));

      mo.appendChild(body);
      host.appendChild(mo);
    }
  }

  if (document.readyState !== "loading") init();
  else document.addEventListener("DOMContentLoaded", init);
})();
