# Domain Boundary Definition

## 문서 목적

이 문서는 Phase 8.3.1 Architecture Domain의 In Scope, Out of Scope, Boundary, Do Not Own을 정의한다.

Boundary는 DATE Architecture 확정안이 아니다. Pattern 기반 Domain responsibility를 분리하기 위한 review artifact다.

## Boundary Summary

| Metric | Count |
| --- | ---: |
| Architecture Domain | 15 |
| Domain Boundary | 15 |
| Ready | 4 |
| Ready with Scope Limitation | 8 |
| Needs Additional Evidence | 3 |
| Blocked | 0 |

## Boundary Matrix

| Domain ID | Architecture Domain | In Scope | Out of Scope | Boundary | Do Not Own | Architecture Readiness |
| --- | --- | --- | --- | --- | --- | --- |
| AD-001 | Entry Architecture | first entry, Market orientation, route exposure | full dashboard state, deep research method | Entry selects next task; it does not complete research. | Evidence validation, saved state persistence | Ready with Scope Limitation |
| AD-002 | Discovery Architecture | screener, table discovery, candidate narrowing | final decision, full Entity context | Discovery creates candidate set; Entity owns detail context. | Evidence methodology, personal state | Ready |
| AD-003 | Search Architecture | Search entry, Entity resolver, command variant | full command workflow, saved query model | Search resolves known intent; Workflow owns task chain. | professional command history until validated | Ready with Scope Limitation |
| AD-004 | Entity Architecture | Entity context, local analysis modes, dense hub variant | provider method, external source return | Entity owns object context; Evidence owns trust layer. | Watchlist persistence, portfolio state | Ready |
| AD-005 | Evidence Architecture | Source, Freshness, provider cue, methodology, Original Evidence path | generated interpretation content ownership | Evidence owns trust boundary; Interpretation owns compression layer. | UI ranking method, community opinion | Ready with Scope Limitation |
| AD-006 | Interpretation Layer | Summary, Translation, AI interpretation boundary | Original Evidence creation, accuracy scoring | Interpretation reduces reading cost; Evidence owns original boundary. | methodology if Not Verified | Needs Additional Evidence |
| AD-007 | Workflow Architecture | task transition cost, professional workflow candidate | full Workspace implementation | Workflow owns task chain; Workspace owns composition. | enterprise entitlement behavior | Ready with Scope Limitation |
| AD-008 | Monitoring Architecture | Watchlist, live / delayed state, Alert candidate | notification payload, full persistence model | Monitoring observes state; Personal Continuity owns saved intent. | push delivery unless validated | Ready with Scope Limitation |
| AD-009 | Personal Continuity | saved state owner, Watchlist, Profile, layout candidate | entity definition, evidence method | Personal Continuity owns user state; Entity owns object state. | external evidence citation | Ready with Scope Limitation |
| AD-010 | Context Preservation | return path, state restoration, Surface transition context | all Workspace persistence | Context Preservation owns transition rules; Workspace owns composition. | external site behavior | Ready with Scope Limitation |
| AD-011 | Workspace Architecture | Dashboard, chart layout, linked context candidate | primary app IA, enterprise product family | Workspace owns composition and layout state. | command model, Source method | Needs Additional Evidence |
| AD-012 | Community Architecture | Discussion, Reaction, participation boundary | Financial Evidence, editorial ranking | Community owns opinion layer; Evidence owns trust layer. | Source truth, moderation policy until validated | Ready with Scope Limitation |
| AD-013 | Research Architecture | provider-labeled research, documents, estimates | raw Market data infrastructure | Research owns report and provider context; Evidence owns traceability layer. | full provider methodology when unavailable | Ready with Scope Limitation |
| AD-014 | Calendar Architecture | Event or time-based discovery candidate | full economic calendar product | Calendar owns time context; Discovery owns candidate selection. | Event Source relation until validated | Needs Additional Evidence |
| AD-015 | Notification Architecture | notification candidate, alert delivery boundary | Alert rule engine, push payload detail | Notification delivers Monitoring triggers; Monitoring owns observed state. | app-only behavior until validated | Ready with Scope Limitation |

## Boundary Risk Matrix

| Domain | Boundary Risk | Mitigation Before Principle Draft |
| --- | --- | --- |
| Entry Architecture | Portal may become content overload. | separate Entry route from Evidence validation. |
| Discovery Architecture | Screener complexity may overload novice user. | distinguish expert filter loop from broad discovery. |
| Search Architecture | Command entry may be over-generalized. | scope professional command variant separately. |
| Entity Architecture | Stock / Company / Security boundary may blur. | define Entity owner before applying Pattern. |
| Evidence Architecture | Source Visibility may be mistaken for complete Traceability. | separate Signal, Source, Methodology, Original Evidence. |
| Interpretation Layer | Summary or Translation may be read as Original Evidence. | require boundary labels and Original Evidence path. |
| Workflow Architecture | Professional workflow may imply Bloomberg-like complexity. | keep scope limitation by user type. |
| Monitoring Architecture | Watchlist may be overloaded as all saved state. | separate Monitoring state from Personal Continuity. |
| Personal Continuity | saved state owner can become ambiguous. | classify state by intent. |
| Context Preservation | external return path may be Not Verified. | keep as Open Question until validated. |
| Workspace Architecture | linked context may be assumed without Evidence. | require direct validation. |
| Community Architecture | Reaction may be read as Evidence. | keep opinion / Evidence boundary explicit. |
| Research Architecture | provider label may replace item-level Traceability. | require methodology and Source checks. |
| Calendar Architecture | Event relation may be inferred. | validate Event Source and relation. |
| Notification Architecture | app claim may be treated as observed behavior. | separate App Description from product Observation. |

## Open Question Matrix

| Domain | Open Question |
| --- | --- |
| Entry Architecture | public entry와 logged-in entry의 responsibility는 같은가 |
| Discovery Architecture | filter context와 result row context는 유지되는가 |
| Search Architecture | Search result grouping과 command discoverability는 어떻게 표시되는가 |
| Entity Architecture | Stock, Company, Security boundary는 어떻게 나눌 것인가 |
| Evidence Architecture | Source Visibility와 complete Traceability는 어떻게 분리되는가 |
| Interpretation Layer | methodology, update time, correction policy는 표시되는가 |
| Workflow Architecture | actual transition cost와 context propagation은 확인되는가 |
| Monitoring Architecture | Watchlist가 research state도 보존하는가 |
| Personal Continuity | state owner와 persistence scope는 무엇인가 |
| Context Preservation | external transition 후 return anchor가 필요한가 |
| Workspace Architecture | Dashboard와 Workspace의 boundary는 무엇인가 |
| Community Architecture | Community Opinion과 Financial Evidence boundary는 명확한가 |
| Research Architecture | provider identity가 item-level Traceability를 대체하지 않는가 |
| Calendar Architecture | Event relation과 Evidence Source는 확인되는가 |
| Notification Architecture | Alert payload와 trigger Source는 확인되는가 |

## Phase Boundary

이 문서는 Domain boundary만 정의한다.

DATE Product Principle, Entity Model, Information Architecture, Navigation, UX, Wireframe, UI는 작성하지 않는다.
