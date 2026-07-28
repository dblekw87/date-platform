# Color Philosophy

## 문서 목적

이 문서는 DATE Visual Language 1.0의 color role을 정의한다.

색상값은 확정하지 않는다. 이 문서는 color role과 responsibility만 정의한다.

## Color Role Summary

| Metric | Count |
| --- | ---: |
| Color Role | 14 |
| Architecture Alignment | 15 |
| Principle Alignment | 12 |
| Open Question | 12 |

## Color Role Matrix

| Color Role | Purpose | Used For | Must Communicate | Must Not Communicate | Architecture Alignment | Related Principle | Confidence | Open Question |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Primary | product action and selected direction | primary actions, selected state | next action and active direction | Evidence truth | AD-001, AD-003 | DPP-001, DPP-003 | Medium | primary role in dense contexts |
| Neutral | flat data and default text hierarchy | numbers, labels, tables, baseline surfaces | readability and restraint | brand emotion | AD-002, AD-004 | DPP-002, DPP-004 | High | neutral contrast ladder |
| Positive | favorable movement or success state | positive Metric, completed action | state direction | recommendation | AD-008, AD-015 | DPP-008, DPP-012 | Medium | positive vs advice boundary |
| Negative | unfavorable movement or error state | negative Metric, failure, risk | risk or failed state | panic | AD-008, AD-015 | DPP-008, DPP-012 | Medium | severity threshold |
| Warning | limitation or ambiguous state | missing Source, weak method, ambiguity | caution before judgment | failure when not blocking | AD-005, AD-010 | DPP-005, DPP-009 | High | warning overload |
| Information | explanatory or secondary context | helper text, metadata, passive status | context support | priority action | AD-001, AD-006 | DPP-001, DPP-006 | Medium | hierarchy with Evidence |
| Evidence | Source, Freshness, boundary emphasis | Evidence card, Evidence timeline, Evidence detail | trust boundary | decoration | AD-005 | DPP-005 | High | depth of Evidence cue |
| AI | assistive interpretation boundary | AI assistant, summary, compare, reason layer | assistive and bounded interpretation | final decision | AD-006 | DPP-006 | Medium | AI visibility without authority |
| Workspace | reusable composition context | workspace shell, restored context cue | reusable state and composition | Source truth | AD-011 | DPP-010 | Low | Workspace ownership boundary |
| Monitoring | observed state and trigger | Watchlist, Alert, Signal, update status | attention and change | final urgency without Source | AD-008, AD-015 | DPP-008, DPP-012 | Medium | contrast and anxiety balance |
| Glass | translucent navigation or overlay context | Navigation, Workspace, Floating AI, overlay | layer separation | data density | AD-001, AD-010, AD-011 | DPP-001, DPP-009, DPP-010 | Medium | blur and readability boundary |
| Surface | primary working ground | flat data surface, reading surface | stable content area | elevated control | AD-002, AD-004 | DPP-002, DPP-004 | High | surface depth hierarchy |
| Background | product environment | global product ground | calm and continuity | active data | AD-001 | DPP-001 | Medium | dark/light mode readiness |
| Divider | separation without emphasis | table lines, Evidence layers, section separators | boundary and grouping | hierarchy ownership alone | AD-005, AD-010 | DPP-005, DPP-009 | High | divider density |

## Color Priority Rule

| Priority | Rule |
| --- | --- |
| 1 | Evidence and warning colors must outrank decoration. |
| 2 | Monitoring colors must be high contrast but not imply advice. |
| 3 | AI color must remain assistive and clearly separate from Evidence color. |
| 4 | Glass color must never reduce data readability. |
| 5 | Neutral color must carry the majority of financial reading work. |

## Do Not Use Color For

| Prohibited Use | Reason |
| --- | --- |
| final investment decision | product must not imply advice through color |
| Source truth without Evidence boundary | Source and Evidence must remain explicit |
| hidden ranking | color must not encode unverified importance |
| decoration-only emphasis | visual noise harms decision speed |
| AI authority | AI is interpretation, not Evidence |

## Phase Boundary

This document defines color role only.

It does not define fixed color values or production palette artifacts.
