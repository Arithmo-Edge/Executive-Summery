      (() => {
        "use strict";

        // 1. Interactive Canvas Constellation Hero
        const canvas = document.getElementById("heroCanvas");
        const ctx = canvas.getContext("2d");
        let width, height, particles;
        let mouse = { x: -1000, y: -1000 };

        function resizeCanvas() {
          width = canvas.width = canvas.offsetWidth;
          height = canvas.height = canvas.offsetHeight;
        }

        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();

        window.addEventListener("mousemove", (e) => {
          const rect = canvas.getBoundingClientRect();
          mouse.x = e.clientX - rect.left;
          mouse.y = e.clientY - rect.top;
        });

        class ConstellationParticle {
          constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.6;
            this.vy = (Math.random() - 0.5) * 0.6;
            this.radius = Math.random() * 2 + 1;
          }
          update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
          }
          draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(0, 240, 255, 0.45)";
            ctx.fill();
          }
        }

        function initParticles() {
          particles = [];
          const count = Math.floor((width * height) / 18000);
          for (let i = 0; i < Math.min(count, 70); i++) {
            particles.push(new ConstellationParticle());
          }
        }
        initParticles();

        function animateCanvas() {
          ctx.clearRect(0, 0, width, height);
          for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            // Connect particles & mouse
            for (let j = i + 1; j < particles.length; j++) {
              const dx = particles[i].x - particles[j].x;
              const dy = particles[i].y - particles[j].y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist < 130) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `rgba(0, 240, 255, ${0.15 * (1 - dist / 130)})`;
                ctx.lineWidth = 0.8;
                ctx.stroke();
              }
            }

            const mDist = Math.hypot(
              particles[i].x - mouse.x,
              particles[i].y - mouse.y,
            );
            if (mDist < 150) {
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(mouse.x, mouse.y);
              ctx.strokeStyle = `rgba(139, 92, 246, ${0.3 * (1 - mDist / 150)})`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
          requestAnimationFrame(animateCanvas);
        }
        animateCanvas();

        // 2. Mouse-Tracking Spotlight Effect for Bento Cards
        document.querySelectorAll(".spotlight-card").forEach((card) => {
          card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);
          });
        });

        // 3. Right-Side Slide-In Overlay Drawer Toggle (GSAP)
        const menuToggler = document.getElementById("menuToggler");
        const togglerIcon = document.getElementById("togglerIcon");
        const navOverlay = document.getElementById("navOverlay");
        const backdrop = document.getElementById("backdrop");
        const drawerContent = document.getElementById("drawerContent");
        const closeDrawer = document.getElementById("closeDrawer");
        let isDrawerOpen = false;

        function toggleDrawer(open) {
          isDrawerOpen = open;
          if (open) {
            navOverlay.style.pointerEvents = "auto";
            navOverlay.style.opacity = "1";
            gsap.to(drawerContent, {
              x: "0%",
              duration: 0.4,
              ease: "power3.out",
            });
            togglerIcon.textContent = "✕";
          } else {
            navOverlay.style.pointerEvents = "none";
            navOverlay.style.opacity = "0";
            gsap.to(drawerContent, {
              x: "100%",
              duration: 0.3,
              ease: "power3.in",
            });
            togglerIcon.textContent = "☰";
          }
        }

        menuToggler.addEventListener("click", () =>
          toggleDrawer(!isDrawerOpen),
        );
        closeDrawer.addEventListener("click", () => toggleDrawer(false));
        backdrop.addEventListener("click", () => toggleDrawer(false));
        document.querySelectorAll(".drawer-link").forEach((link) => {
          link.addEventListener("click", () => toggleDrawer(false));
        });

        // 4. Widget #1: Interactive 14-Portal Ecosystem Explorer
        const PORTALS = [
          {
            id: "core",
            name: "Core Portal (Hub)",
            url: "rayaantasnim.github.io/arithmo-edge",
            color: "#00F0FF",
            rule: "Central Gateway & Global Auth",
            desc: "Central gateway, global telemetry & unified auth entry.",
          },
          {
            id: "nt",
            name: "#1 Number Theory",
            url: "rayaantasnim.github.io/arithmo-edge/nt",
            color: "#00F0FF",
            rule: "Rated / Unrated Arena",
            desc: "Dedicated General & Expert ELO ladder for Number Theory (#00F0FF).",
          },
          {
            id: "alg",
            name: "#2 Algebra",
            url: "rayaantasnim.github.io/arithmo-edge/algebra",
            color: "#8B5CF6",
            rule: "Rated / Unrated Arena",
            desc: "Dedicated General & Expert ELO ladder for Algebra (#8B5CF6).",
          },
          {
            id: "geo",
            name: "#3 Geometry",
            url: "rayaantasnim.github.io/arithmo-edge/geometry",
            color: "#F59E0B",
            rule: "Rated / Unrated Arena",
            desc: "Dedicated General & Expert ELO ladder for Geometry (#F59E0B).",
          },
          {
            id: "comb",
            name: "#4 Combinatorics & Permutation",
            url: "rayaantasnim.github.io/arithmo-edge/combinatorics",
            color: "#10B981",
            rule: "Rated / Unrated Arena",
            desc: "Dedicated General & Expert ELO ladder for Combinatorics (#10B981).",
          },
          {
            id: "mix",
            name: "#5 Mixed Mathematical Olympiad",
            url: "rayaantasnim.github.io/arithmo-edge/mixed-olympiad",
            color: "#F43F5E",
            rule: "Primary Anchor for All-Rounder Rating",
            desc: "Primary anchor for Overall All-Rounder Rating (#F43F5E).",
          },
          {
            id: "contest",
            name: "#6 Contest Section",
            url: "rayaantasnim.github.io/arithmo-edge/contests",
            color: "#00F0FF",
            rule: "7-Day Calendar & 1v1 Blitz",
            desc: "7-day contest calendar, 1v1 Blitz & Virtual Gym.",
          },
          {
            id: "standings",
            name: "#7 Public Standings",
            url: "rayaantasnim.github.io/arithmo-edge/standings",
            color: "#00F0FF",
            rule: "14 Live Leaderboards + Patrons",
            desc: "14 live leaderboards + official Wall of Patrons.",
          },
          {
            id: "ai",
            name: "#8 Arithmo Personal AI",
            url: "rayaantasnim.github.io/arithmo-edge/personal-ai",
            color: "#00F0FF",
            rule: "Socratic Tutor (Locked in Matches)",
            desc: "Personalized Socratic guidance (hard-locked during live contests).",
          },
          {
            id: "academy",
            name: "#9 Arithmo Academy Arena",
            url: "rayaantasnim.github.io/arithmo-edge/academy",
            color: "#8B5CF6",
            rule: "B2B Cohorts & KYB Verification",
            desc: "Institutional cohorts, KYB verification & Arithmo Guild AI.",
          },
          {
            id: "forge",
            name: "#10 Arithmo Forge",
            url: "rayaantasnim.github.io/arithmo-edge/forge",
            color: "#00F0FF",
            rule: "Problem Authoring Studio",
            desc: "Problem creation, SymPy verification & Golden Vault pipeline.",
          },
          {
            id: "socials",
            name: "#11 Arithmo Socials",
            url: "rayaantasnim.github.io/arithmo-edge/socials",
            color: "#00F0FF",
            rule: "Blog-to-Lab (+5 ELO) & Appeals",
            desc: "Blog-to-Lab (+5 ELO), 2000+ Expert Q&A & Forensic Appeals.",
          },
          {
            id: "hq",
            name: "#12 Headquarters Core",
            url: "rayaantasnim.github.io/arithmo-edge/hq",
            color: "#F59E0B",
            rule: "Command & Supreme Headquarters AI",
            desc: "Monotonic HQ governance, arbitration & supreme Headquarters AI.",
          },
          {
            id: "db",
            name: "#13 Arithmo Database",
            url: "rayaantasnim.github.io/arithmo-edge/database",
            color: "#00F0FF",
            rule: "Post-#1–#12 Launch Archive",
            desc: "Launches after #1–#12; houses past rounds + world IMO/Putnam archives + AI editorials.",
          },
        ];

        const portalGrid = document.getElementById("portalPillsGrid");
        const portalConsole = document.getElementById("portalConsoleContent");

        function renderPortalConsole(portal) {
          portalConsole.innerHTML = `
          <div class="text-white font-bold text-base flex items-center justify-between">
            <span>${portal.name}</span>
            <span class="text-xs px-2.5 py-1 rounded bg-white/5 border border-white/10" style="color: ${portal.color}">${portal.rule}</span>
          </div>
          <div class="text-cyan-300 font-mono text-xs">URL: https://${portal.url}</div>
          <p class="text-slate-300 text-xs mt-2 leading-relaxed">${portal.desc}</p>
        `;
        }

        PORTALS.forEach((p, idx) => {
          const btn = document.createElement("button");
          btn.className = `px-3.5 py-2 rounded-xl text-xs font-mono font-semibold transition-all duration-300 border hover:scale-105 ${idx === 0 ? "bg-cyan-500 text-[#050811] border-cyan-400 shadow-md shadow-cyan-500/30" : "bg-white/5 hover:bg-white/10 text-slate-300 border-white/10 hover:border-cyan-400/50"}`;
          btn.textContent = p.name;
          btn.addEventListener("click", () => {
            document
              .querySelectorAll("#portalPillsGrid button")
              .forEach((b) => {
                b.className =
                  "px-3.5 py-2 rounded-xl text-xs font-mono font-semibold transition-all duration-300 border bg-white/5 hover:bg-white/10 text-slate-300 border-white/10 hover:border-cyan-400/50 hover:scale-105";
              });
            btn.className =
              "px-3.5 py-2 rounded-xl text-xs font-mono font-semibold transition-all duration-300 border bg-cyan-500 text-[#050811] border-cyan-400 shadow-md shadow-cyan-500/30 hover:scale-105";
            renderPortalConsole(p);
          });
          portalGrid.appendChild(btn);
        });
        renderPortalConsole(PORTALS[0]);

        // 5. Widget #2: Interactive 5-Arena & 60-Tier ELO Rank Simulator
        const ARENAS = [
          { name: "Number Theory", color: "#00F0FF", prefix: "ARITHMETIC" },
          { name: "Algebra", color: "#8B5CF6", prefix: "ALGEBRAIC" },
          { name: "Geometry", color: "#F59E0B", prefix: "EUCLIDEAN" },
          {
            name: "Combinatorics & Permutation",
            color: "#10B981",
            prefix: "COMBINATORIAL",
          },
          {
            name: "Mixed Mathematical Olympiad",
            color: "#F43F5E",
            prefix: "OMNI-OLYMPIAD",
          },
        ];

        const TIER_BRACKETS = [
          { tier: 1, min: 0, max: 499, label: "0–499" },
          { tier: 2, min: 500, max: 749, label: "500–749" },
          { tier: 3, min: 750, max: 999, label: "750–999" },
          { tier: 4, min: 1000, max: 1249, label: "1000–1249" },
          { tier: 5, min: 1250, max: 1499, label: "1250–1499" },
          { tier: 6, min: 1500, max: 1749, label: "1500–1749" },
          { tier: 7, min: 1750, max: 1999, label: "1750–1999" },
          { tier: 8, min: 2000, max: 2249, label: "2000–2249" },
          { tier: 9, min: 2250, max: 2499, label: "2250–2499" },
          { tier: 10, min: 2500, max: 2749, label: "2500–2749" },
          { tier: 11, min: 2750, max: 2999, label: "2750–2999" },
          { tier: 12, min: 3000, max: Infinity, label: "3000+" },
        ];

        let selectedArenaIndex = 0;
        const genRange = document.getElementById("genRange");
        const expRange = document.getElementById("expRange");
        const genValDisplay = document.getElementById("genValDisplay");
        const expValDisplay = document.getElementById("expValDisplay");
        const simAvgDisplay = document.getElementById("simAvgDisplay");
        const simArenaLabel = document.getElementById("simArenaLabel");
        const simTierTitle = document.getElementById("simTierTitle");
        const simTierBracket = document.getElementById("simTierBracket");
        const simTierCard = document.getElementById("simTierCard");
        const arenaTabsContainer = document.getElementById("arenaTabs");

        ARENAS.forEach((a, idx) => {
          const b = document.createElement("button");
          b.className = `px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all duration-300 border hover:scale-105 ${idx === 0 ? "bg-violet-600 text-white border-violet-400 shadow-md shadow-violet-500/30" : "bg-white/5 hover:bg-white/10 text-slate-300 border-white/10 hover:border-violet-400/50"}`;
          b.textContent = a.name.split(" ")[0];
          b.addEventListener("click", () => {
            selectedArenaIndex = idx;
            document.querySelectorAll("#arenaTabs button").forEach((tb) => {
              tb.className =
                "px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all duration-300 border bg-white/5 hover:bg-white/10 text-slate-300 border-white/10 hover:border-violet-400/50 hover:scale-105";
            });
            b.className =
              "px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all duration-300 border bg-violet-600 text-white border-violet-400 shadow-md shadow-violet-500/30 hover:scale-105";
            updateSimulator();
          });
          arenaTabsContainer.appendChild(b);
        });

        function updateSimulator() {
          const gen = Number(genRange.value);
          const exp = Number(expRange.value);
          genValDisplay.textContent = gen;
          expValDisplay.textContent = exp;

          const avg = (gen + exp) / 2;
          simAvgDisplay.textContent = Number.isInteger(avg)
            ? avg
            : avg.toFixed(1);

          const bracket =
            TIER_BRACKETS.find((tb) => avg >= tb.min && avg <= tb.max) ||
            TIER_BRACKETS[11];
          const arena = ARENAS[selectedArenaIndex];

          simArenaLabel.textContent = `${arena.name} Arena`;
          simArenaLabel.style.color = arena.color;
          simTierCard.style.borderColor = arena.color;

          if (bracket.tier === 1) {
            simTierTitle.textContent = `${arena.prefix} INITIATE`;
          } else if (bracket.tier === 12) {
            simTierTitle.textContent = `${arena.prefix} SINGULARITY`;
          } else {
            simTierTitle.textContent = `${arena.prefix} • TIER ${bracket.tier}`;
          }
          simTierTitle.style.color = arena.color;
          simTierBracket.textContent = `Tier ${bracket.tier} • ${bracket.label}`;
        }

        genRange.addEventListener("input", updateSimulator);
        expRange.addEventListener("input", updateSimulator);
        updateSimulator();

        // 6. Widget #3: Interactive Mode Switcher
        const contestDisplay = document.getElementById("contestModeDisplay");
        const modeButtons = document.querySelectorAll(
          "#contestModeTabs button",
        );

        const CONTEST_MODES = {
          general: {
            title: "General Velocity Flow",
            badge: "High-Tempo Rapid Entry",
            color: "#00F0FF",
            content:
              'Engineered with an <span class="font-mono text-cyan-300">Overtime Loop</span> and a custom <span class="font-mono text-cyan-300">Mobile Touch Numpad</span> for zero-friction rapid entry during fast-paced general division rounds.',
          },
          expert: {
            title: "3-Column Toph.co-Style Expert Dashboard",
            badge: "Olympiad Authenticity",
            color: "#8B5CF6",
            content:
              'Enforces <span class="font-mono text-violet-300">Max 2 Subs</span> per problem, Live Clarifications, <strong>Proof-Based Grading + 2000+ ELO Grandmaster Peer Review</strong> in Segments 1–2, plus a <strong>Drag-and-Drop LaTeX + GeoGebra-style Geometry Tool</strong>.',
          },
          flaw: {
            title: 'Post-Contest "Find the Flaw" Protocol',
            badge: "Peer-Hacking & Edge-Case Auditing",
            color: "#F59E0B",
            content:
              'Dedicated peer-hacking window (<span class="font-mono text-amber-300">6h</span> after daily rounds / <span class="font-mono text-amber-300">2h</span> after Sunday Mega). Catching logical flaws triggers a <span class="font-mono text-amber-300">2-min SymPy Global Rejudge</span>!',
          },
        };

        function renderContestMode(modeKey) {
          const m = CONTEST_MODES[modeKey];
          contestDisplay.innerHTML = `
          <div class="flex items-center justify-between">
            <span class="font-bold text-white text-base">${m.title}</span>
            <span class="px-3 py-1 rounded bg-white/5 border border-white/10 text-xs font-mono" style="color: ${m.color}">${m.badge}</span>
          </div>
          <p class="text-slate-300 text-sm mt-3 leading-relaxed">${m.content}</p>
          <div class="mt-4 pt-3 border-t border-white/10 text-xs font-mono text-slate-400">
            Active Contest Protocol State: Verified &amp; Synchronized with Arithmo-Core-SDK
          </div>
        `;
        }

        modeButtons.forEach((btn) => {
          btn.addEventListener("click", () => {
            modeButtons.forEach((b) => {
              b.className =
                "px-4 py-2 rounded-xl text-xs font-mono font-bold bg-white/5 hover:bg-white/10 text-slate-300 border border-white/15 transition-all duration-300 hover:scale-105";
            });
            btn.className =
              "px-4 py-2 rounded-xl text-xs font-mono font-bold bg-cyan-500 text-[#050811] transition-all duration-300 shadow-md shadow-cyan-500/30 hover:scale-105";
            renderContestMode(btn.dataset.mode);
          });
        });
        renderContestMode("general");

        // 7. Widget #4: AI Filter & Prompt Simulator
        const AI_ENGINES = [
          {
            name: "Arithmo Personal AI",
            cat: "public",
            desc: "Personalized Socratic guidance (hard-locked during live matches).",
          },
          {
            name: "Arithmo Guild AI",
            cat: "public",
            desc: "Institutional cohort assistant for academy members.",
          },
          {
            name: "Gemini Pro/Flash Spine",
            cat: "hybrid",
            desc: "Core neural reasoning and synthesis backbone.",
          },
          {
            name: "Qwen-Math + SymPy",
            cat: "hybrid",
            desc: "Deterministic symbolic verification and mathematical reasoning.",
          },
          ...Array.from({ length: 24 }, (_, i) => ({
            name: `QPRT-4 Guardian Sentinel #${i + 1}`,
            cat: "qprt",
            desc: "Autonomous failover, latency isolation & state integrity sentinel.",
          })),
          ...Array.from({ length: 12 }, (_, i) => ({
            name: `Anti-LLM Forge Agent #${i + 1}`,
            cat: "forge",
            desc: "AdversarialRedTeam & IntuitionForge question generation engine.",
          })),
          {
            name: "Arithmo Alert AI",
            cat: "hq",
            desc: "AES-256 encrypted, non-accusatory Soft-Pinch Warning generator.",
          },
          {
            name: "Supreme Headquarters AI",
            cat: "hq",
            desc: "Exclusive command intelligence restricted to Prime Sovereign & Chief Arbiter.",
          },
        ];

        const aiListCard = document.getElementById("aiEngineListCard");
        const aiFilterTabs = document.querySelectorAll("#aiFilterTabs button");

        function renderAiEngines(filter) {
          const filtered =
            filter === "all"
              ? AI_ENGINES
              : AI_ENGINES.filter((e) => e.cat === filter);
          aiListCard.innerHTML = filtered
            .map(
              (e) => `
          <div class="p-3 rounded-lg bg-[#060913] border border-white/10 hover:border-emerald-400/40 hover:bg-emerald-500/[0.03] transition-all duration-300 flex items-center justify-between text-xs">
            <div>
              <strong class="text-white">${e.name}</strong>
              <p class="text-slate-400 mt-0.5">${e.desc}</p>
            </div>
            <span class="px-2 py-0.5 rounded bg-white/5 text-[10px] font-mono text-cyan-300 uppercase shrink-0">${e.cat}</span>
          </div>
        `,
            )
            .join("");
        }

        aiFilterTabs.forEach((btn) => {
          btn.addEventListener("click", () => {
            aiFilterTabs.forEach((b) => {
              b.className =
                "px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-white/5 text-slate-300 border border-white/15 hover:border-emerald-400/50 hover:scale-105 transition-all duration-300";
            });
            btn.className =
              "px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-emerald-500 text-[#050811] shadow-md shadow-emerald-500/30 hover:scale-105 transition-all duration-300";
            renderAiEngines(btn.dataset.filter);
          });
        });
        renderAiEngines("all");

        window.testAiPrompt = function (type) {
          const resBox = document.getElementById("aiTestResultBox");
          if (type === "greeting") {
            resBox.className =
              "mt-4 p-3 rounded bg-cyan-500/10 border border-cyan-400/30 text-xs font-mono text-cyan-300";
            resBox.textContent =
              "Prompt accepted. Socratic tutoring engaged. Cost: 0 tokens.";
          } else if (type === "duplicate") {
            resBox.className =
              "mt-4 p-3 rounded bg-rose-500/10 border border-rose-400/30 text-xs font-mono text-rose-300";
            resBox.textContent =
              "Arithmo Alert AI triggered! Soft-Pinch Warning issued. Cost: -1 ELO penalty.";
          } else {
            resBox.className =
              "mt-4 p-3 rounded bg-amber-500/10 border border-amber-400/30 text-xs font-mono text-amber-300";
            resBox.textContent =
              "Rapid batch query detected. Rate-limiter engaged. Cost: -3 Quota Tokens.";
          }
        };

        // 8. Widget #5: Academy Calculator
        const rosterSlider = document.getElementById("rosterSlider");
        const rosterSizeDisplay = document.getElementById("rosterSizeDisplay");
        const academyRecommendationBox = document.getElementById(
          "academyRecommendationBox",
        );

        function updateAcademyCalc() {
          const size = Number(rosterSlider.value);
          rosterSizeDisplay.textContent = `${size} Students`;

          let rec = "";
          if (size <= 100) {
            rec = {
              tier: "General Academy Package",
              fee: "$29.99/mo",
              per: "$0.99/member",
              cap: "100 cap",
            };
          } else if (size <= 500) {
            rec = {
              tier: "Premium Academy Package",
              fee: "$49.99/mo",
              per: "$2.99/member",
              cap: "500 cap",
            };
          } else if (size <= 1000) {
            rec = {
              tier: "Supreme Academy Package",
              fee: "$79.99/mo",
              per: "$6.99/member",
              cap: "1,000 cap (ALL add-ons FREE)",
            };
          } else {
            rec = {
              tier: "Enterprise Academy Package",
              fee: "$149.99 1st mo / $79.99 base",
              per: "$5.99–$7.99/member",
              cap: "Unlimited + Guild AI tokens",
            };
          }

          academyRecommendationBox.innerHTML = `
          <div class="text-xs font-mono uppercase text-cyan-400">Recommended Tier</div>
          <div class="text-base font-bold text-white">${rec.tier}</div>
          <div class="text-slate-300">Base Fee: <span class="text-cyan-300 font-mono">${rec.fee}</span></div>
          <div class="text-slate-300">Capacity: <span class="text-white font-mono">${rec.cap}</span></div>
          <div class="text-slate-300">Member Rate: <span class="text-emerald-300 font-mono">${rec.per}</span></div>
        `;
        }
        rosterSlider.addEventListener("input", updateAcademyCalc);
        updateAcademyCalc();

        // 9. Widget #6: QPRT-4 Phase Inspector
        const QPRT_PHASES = {
          1: {
            title: "Phase I: Pre-Exam Telemetry & Golden Vault",
            desc: "Anti-LLM Question-Forge Agents and Co-Founders 5x4 Golden Vault curate and sanitize problem sets prior to release.",
          },
          2: {
            title: "Phase II: In-Exam 30s Hot-Swap & GridShield",
            desc: "Real-time telemetry monitoring. In case of leak detection, the 30s reserve problem hot-swap engages instantly.",
          },
          3: {
            title: "Phase III: 2-min SymPy Global Rejudge",
            desc: "Automated post-exam symbolic re-verification across all candidate submissions to guarantee absolute grading integrity.",
          },
          4: {
            title: "Phase IV: 24h Zero-PII Data Lake",
            desc: "Sanitized anonymized telemetry archived into the automated private GitHub Zero-PII JSONL data lake.",
          },
        };

        const qprtTabs = document.querySelectorAll("#qprtPhaseTabs button");
        const qprtDisplay = document.getElementById("qprtPhaseDisplay");

        function renderQprtPhase(num) {
          const p = QPRT_PHASES[num];
          qprtDisplay.innerHTML = `
          <strong class="text-white text-base block mb-2">${p.title}</strong>
          <p class="text-slate-300 leading-relaxed">${p.desc}</p>
        `;
        }

        qprtTabs.forEach((btn) => {
          btn.addEventListener("click", () => {
            qprtTabs.forEach((b) => {
              b.className =
                "px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-white/5 text-slate-300 border border-white/15 hover:border-cyan-400/50 hover:scale-105 transition-all duration-300";
            });
            btn.className =
              "px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-cyan-500 text-[#050811] shadow-md shadow-cyan-500/30 hover:scale-105 transition-all duration-300";
            renderQprtPhase(btn.dataset.phase);
          });
        });
        renderQprtPhase(1);

        // 10. GSAP Counter & ScrollTrigger Animations
        if (typeof gsap !== "undefined") {
          gsap.from(".hero-stagger", {
            y: 24,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
          });

          if (typeof ScrollTrigger !== "undefined") {
            gsap.registerPlugin(ScrollTrigger);
            document.querySelectorAll(".reveal-section").forEach((section) => {
              gsap.from(section, {
                y: 28,
                opacity: 0,
                duration: 0.75,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: section,
                  start: "top 85%",
                  once: true,
                },
              });
            });
          }
        }
      })();
