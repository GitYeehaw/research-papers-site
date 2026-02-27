# Stanford–Yale Robotics Coauthor Analysis
**Tool:** `dblp_yale_coauthors.py`
**Date:** 2026-02-26

---

## Methodology

Used DBLP to scan every indexed publication for 13 Stanford robotics faculty and checked
whether any coauthor name matches the Yale CS/Robotics faculty list (`yale_faculty.txt`).
Fuzzy name matching with a 0.90 similarity threshold; name variants included for DBLP
disambiguation.

**Total publications scanned:** ~5,100
**Yale faculty checked against:** ~65 names (CS + ME/Robotics)

---

## Stanford Targets & DBLP PIDs

| Faculty | Dept | DBLP PID | Pubs Scanned |
|---|---|---|---|
| Dorsa Sadigh | CS | 117/3174 | 334 |
| Jiajun Wu | CS | 117/4768 (pinned) | 499 |
| Marco Pavone | AeroAstro | 91/3382-1 (pinned) | 676 |
| Oussama Khatib | CS | 77/811 | 257 |
| C. Karen Liu | CS | 93/5669 (pinned) | 257 |
| Leonidas Guibas | CS | g/LeonidasJGuibas | 928 |
| Mark Cutkosky | ME | 34/2886 | 249 |
| Allison Okamura | ME | 22/2757 | 411 |
| Monroe Kennedy III | ME | 310/1586 | 52 |
| Mac Schwager | AeroAstro | 22/7012 | 298 |
| Mykel Kochenderfer | AeroAstro | 34/2029 | 532 |
| Shuran Song | EE | 123/4433 | 223 |
| Gordon Wetzstein | EE | 13/4660 | 386 |

*(Pinned = DBLP search returned wrong person; PID verified manually)*

---

## Confirmed Coauthorships (6 hits)

### 1. Dorsa Sadigh ↔ Marynel Vázquez
**Paper:** Deep Local Trajectory Replanning and Control for Robot Navigation
**Year:** 2019
**Venue:** ICRA + arXiv
**DBLP:** https://dblp.org/rec/conf/icra/PokleMGCEYWSSSV19
**Full authors:** Ashwini Pokle, Roberto Martín-Martín, Patrick Goebel, Vincent Chow,
Hans M. Ewald, Junwei Yang, Zhenkai Wang, Amir Sadeghian, Dorsa Sadigh, Silvio Savarese,
Marynel Vázquez
**Note:** Large multi-author collaboration; Vázquez was at Stanford before joining Yale.

---

### 2. Mark Cutkosky ↔ Aaron M. Dollar
**Paper:** Special Issue on the Mechanics and Design of Robotic Hands
**Year:** 2014
**Venue:** International Journal of Robotics Research (IJRR)
**DBLP:** https://dblp.org/rec/journals/ijrr/DollarBCH14
**Full authors:** Aaron M. Dollar, Antonio Bicchi, Mark R. Cutkosky, Robert D. Howe
**Note:** Joint editorial on robotic hands — natural overlap given both labs' grasping focus.

---

### 3–5. Leonidas Guibas ↔ Michael Fischer (3 papers)

| Year | Title | Venue | DBLP |
|---|---|---|---|
| 1981 | Optimal Placement of Identical Resources in a Distributed Network | ICDCS | https://dblp.org/rec/conf/icdcs/FischerGGL81 |
| 1986 | Probabilistic Analysis of a Network Resource Allocation Algorithm | Inf. Control. | https://dblp.org/rec/journals/iandc/LynchGFG86 |
| 1992 | Optimal Placement of Identical Resources in a Tree | Inf. Comput. | https://dblp.org/rec/journals/iandc/FischerGGL92 |

**Note:** Three TCS papers from the 80s–90s, predating Guibas's shift to geometry/robotics.
Fischer is a Yale CS emeritus (distributed systems). Not a current robotics connection.

---

## Yale Faculty with No Stanford Connections but Strong Research Overlap

These Yale faculty were **not found** in any coauthorship but have directly aligned research
interests with the Stanford targets above.

| Yale Faculty | Research Area | Most Aligned Stanford Faculty |
|---|---|---|
| **Ian Abraham** | Autonomous systems, active learning, control | Sadigh, Schwager, Kochenderfer |
| **Daniel Rakita** | Motion planning, teleoperation, HRI | Sadigh, Karen Liu, Okamura |
| **Tesca Fitzgerald** | Robot learning from demonstration, task planning | Sadigh, Jiajun Wu |
| **Brian Scassellati** | Social robotics, HRI | Sadigh |
| **Alex Wong** | Depth estimation, 3D scene understanding | Guibas, Jiajun Wu, Song, Wetzstein |
| **Rebecca Kramer-Bottiglio** | Soft robotics, morphing materials | Okamura, Cutkosky |
| **Amin Karbasi** | Submodular optimization, active learning | Kochenderfer, Sadigh |
| **Julian Jara-Ettinger** | Theory of mind, cognitive modeling | Sadigh (human intent modeling) |

### Top 3 Most Notable Non-Connections

1. **Alex Wong ↔ Guibas / Song / Wu** — Wong works on depth completion and 3D
   reconstruction, squarely in Guibas's and Song's territory. No shared paper despite
   strong topical overlap.

2. **Daniel Rakita ↔ Sadigh / Karen Liu** — Both sides work on robot motion and
   human-in-the-loop planning. The overlap is very direct with no prior collaboration.

3. **Rebecca Kramer-Bottiglio ↔ Allison Okamura** — Both are prominent researchers in
   soft/medical robotics. The absence of a coauthorship is notable.

---

## Files

| File | Description |
|---|---|
| `dblp_yale_coauthors.py` | Main scraper script |
| `yale_faculty.txt` | Yale CS + ME/Robotics faculty name list (~65 names) |
| `coauthor_hits.csv` | Raw results (CSV) |
| `coauthor_hits.json` | Raw results (JSON) |

## Rerun Command

```bash
python3 dblp_yale_coauthors.py \
  --targets "Dorsa Sadigh" "Jiajun Wu" "Marco Pavone" "Oussama Khatib" "Karen Liu" \
            "Leonidas Guibas" "Mark Cutkosky" "Allison Okamura" "Monroe Kennedy" \
            "Mac Schwager" "Mykel Kochenderfer" "Shuran Song" "Gordon Wetzstein" \
  --pid-map "Jiajun Wu=117/4768" "Karen Liu=93/5669" "Marco Pavone=91/3382-1" \
  --yale-file yale_faculty.txt \
  --sleep 1.0
```
