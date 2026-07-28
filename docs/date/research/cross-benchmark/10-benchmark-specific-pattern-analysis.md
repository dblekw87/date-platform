# Benchmark-specific Pattern Analysis

## 문서 목적

이 문서는 Phase 8.2.3 범위에서 Benchmark-specific Pattern을 분석한다.

목표는 특정 Benchmark에서만 강하게 확인된 Pattern을 DATE Product Principle 후보에서 바로 제외하거나, future validation 대상으로 낮추는 것이다. 새 Pattern은 만들지 않는다. Registry는 수정하지 않는다.

## Scope Note

Phase 8.1 Summary는 Benchmark-specific Pattern count를 `6`으로 기록한다. 그러나 [01-pattern-inventory.md](01-pattern-inventory.md)의 명시적 `Benchmark-specific Pattern` row는 `5`개다.

이 문서는 명시적 row `5`개만 분석하고, count gap `1`은 `Pattern Type Reconciliation Needed`로 남긴다. 임의로 Pattern Type을 바꾸거나 새 Pattern을 만들지 않는다.

## Analysis Summary

| Metric | Count |
| --- | ---: |
| Phase 8.1 Benchmark-specific Count | 6 |
| Explicit Benchmark-specific Row | 5 |
| 분석 완료 Pattern | 5 |
| Count Reconciliation Gap | 1 |
| Medium Evidence | 5 |
| High Evidence | 0 |
| Low Evidence | 0 |
| Finance Generalizability | 2 |
| Professional Generalizability | 2 |
| Platform-specific Generalizability | 1 |

## Result Classification

| Result | Count |
| --- | ---: |
| Keep for Future Validation | 2 |
| Reject for DATE | 1 |
| Needs Enterprise Benchmark | 1 |
| Needs App Validation | 0 |
| Needs Additional Observation | 1 |

## Benchmark-specific Pattern Matrix

| Pattern ID | Pattern Name | Current Benchmark | Generalization | Evidence Quality | Confidence | Result |
| --- | --- | --- | --- | --- | --- | --- |
| PT-011 | Chart-centered Workspace | TradingView | Professional | Medium | Medium | Keep for Future Validation |
| PT-015 | Symbol-level Document Evidence | TradingView | Finance | Medium | Medium | Needs Additional Observation |
| PT-016 | Dashboard Research Composition | Koyfin | Professional | Medium | Medium | Keep for Future Validation |
| PT-019 | Reported / Estimate / Consensus Label | Koyfin | Finance | Medium | Medium | Needs Enterprise Benchmark |
| PT-028 | Product Family Layer Boundary | Bloomberg | Platform-specific | Medium | Medium | Reject for DATE |

## PT-011 Chart-centered Workspace

| Field | 내용 |
| --- | --- |
| Pattern Name | Chart-centered Workspace |
| Current Benchmark | TradingView |
| Definition | Chart가 time-series visualization을 넘어 Watchlist, Alert, News, Screener Panel의 center가 되는 Pattern이다. |
| Purpose | price action context를 유지하며 adjacent task를 수행하게 한다. |
| Observed Evidence | TradingView Supercharts와 chart-adjacent Surface가 primary context로 기록되었다. Koyfin Graph와 Bloomberg Chart는 variant 또는 supporting responsibility로만 확인되었다. |
| Evidence Limitation | Workspace persistence, cross-panel state owner, chart-as-primary rule은 full validation 상태가 아니다. |
| Why It Exists | TradingView의 Primary User는 chart-driven trader와 technical analysis user다. 이 user에게 time-series context가 가장 중요한 decision frame이다. |
| Why It Is Benchmark-specific | 다른 Benchmark는 Quote, Screener, Portal, Professional Workflow, News Feed를 primary entry로 둔다. Chart가 전체 Workspace center가 되는 구조는 TradingView identity에 강하게 묶인다. |
| Generalization 가능성 | Professional. chart-heavy workflow Product에서는 가능하지만 general finance Product rule로 바로 승격하기 어렵다. |
| Potential Product Value | time-series context를 잃지 않고 Alert, News, Screener로 확장할 수 있다. |
| Risk | Chart 중심이 되면 fundamental Evidence, News reading, portfolio context가 secondary로 밀릴 수 있다. |
| Why It Should NOT Become DATE Product Principle | DATE가 chart-first Product인지 아직 결정되지 않았다. Chart를 primary Workspace로 두면 Evidence 연결 platform의 scope를 좁힐 수 있다. |
| Future Validation Needed | TradingView, Koyfin, Bloomberg에서 chart state, linked panel, saved layout, alert relation을 확인해야 한다. |
| Current Evidence | TradingView Observed, Koyfin Variant, Bloomberg Variant, EidosLayer Not Present, SaveTicker Not Present |
| Required Evidence | chart state persistence, cross-Surface context preservation, saved chart-to-Evidence relation |
| Blocking Reason | Structural Unknown |
| Next Validation Target | TradingView advanced workspace, Koyfin Graph, Bloomberg professional chart documentation |
| Evidence Quality | Medium |
| Confidence | Medium |
| Dependency | PT-018 Table / Chart / Heatmap Role Separation, PT-014 Split Personal State |
| Layer Impact | Workspace, Workflow, Monitoring |
| Open Question | Chart가 primary Workspace인지 supporting View인지 구분 기준이 필요하다. |
| Result | Keep for Future Validation |

## PT-015 Symbol-level Document Evidence

| Field | 내용 |
| --- | --- |
| Pattern Name | Symbol-level Document Evidence |
| Current Benchmark | TradingView |
| Definition | filings, transcripts, documents가 Symbol context 안에 별도 Surface로 배치되는 Pattern이다. |
| Purpose | News와 official Evidence를 분리한다. |
| Observed Evidence | TradingView Documents가 Symbol-level Evidence Surface로 기록되었다. Koyfin filings / transcripts는 candidate 수준이다. |
| Evidence Limitation | News claim과 Document relation, document Source lineage, filing-level citation은 충분히 확인되지 않았다. |
| Why It Exists | Symbol analysis에서 News와 official document는 서로 다른 validation role을 가진다. TradingView는 Symbol context 안에서 이를 local mode로 제공한다. |
| Why It Is Benchmark-specific | Yahoo Finance와 Finviz는 document access가 external 또는 partial이고, Bloomberg는 professional access limitation이 있다. SaveTicker는 report detail이 Not Verified다. |
| Generalization 가능성 | Finance. official document가 중요한 Product에는 유효하지만, News-first나 chart-only Product에는 과도할 수 있다. |
| Potential Product Value | News claim을 official document와 분리해 validation depth를 높일 수 있다. |
| Risk | document relation이 자동 연결되지 않으면 사용자는 claim validation을 수동으로 해야 한다. |
| Why It Should NOT Become DATE Product Principle | Document relation과 Evidence granularity가 아직 insufficient하다. DATE Product Rule로 만들려면 claim-to-document relation이 필요하다. |
| Future Validation Needed | TradingView Documents, Koyfin filings, Bloomberg filings / research Surface의 relation model 확인이 필요하다. |
| Current Evidence | TradingView Observed, Koyfin Partial, Bloomberg Partial, others Not Present or Partial |
| Required Evidence | claim-to-document linking, filing timestamp, document Source, original document persistence |
| Blocking Reason | Observation Gap |
| Next Validation Target | TradingView document detail, Koyfin filings, Bloomberg official documentation |
| Evidence Quality | Medium |
| Confidence | Medium |
| Dependency | PT-012 Entity Hub with Local Analysis Modes, PT-020 Methodology Documentation Layer |
| Layer Impact | Entity, Evidence, Research |
| Open Question | Document와 News relation은 자동 연결되는가. |
| Result | Needs Additional Observation |

## PT-016 Dashboard Research Composition

| Field | 내용 |
| --- | --- |
| Pattern Name | Dashboard Research Composition |
| Current Benchmark | Koyfin |
| Definition | Dashboard가 static report page가 아니라 reusable research composition이 되는 Pattern이다. |
| Purpose | multiple chart, table, News, Metric unit을 반복적으로 재사용하게 한다. |
| Observed Evidence | Koyfin dashboard documentation과 Bloomberg Workspace, TradingView chart layout variant가 기록되었다. |
| Evidence Limitation | default dashboard, saved layout persistence, widget state owner는 fully observed 상태가 아니다. |
| Why It Exists | Koyfin의 Primary User는 multi-asset research와 recurring monitoring을 수행하는 advanced finance user다. |
| Why It Is Benchmark-specific | Finviz와 Yahoo Finance는 public page / quote 중심이고, SaveTicker는 News-first Product다. TradingView는 chart layout 중심, Bloomberg는 professional Workspace candidate로 분리된다. |
| Generalization 가능성 | Professional. reusable composition이 필요한 complex research Product에서 유효하다. |
| Potential Product Value | 반복되는 research setup cost를 줄이고 personal continuity를 강화할 수 있다. |
| Risk | Dashboard와 Workspace, Home, Watchlist boundary가 흐려질 수 있다. |
| Why It Should NOT Become DATE Product Principle | DATE의 Workspace ownership과 saved state model이 아직 정의되지 않았다. composition을 Principle로 확정하면 IA보다 implementation이 먼저 고정될 수 있다. |
| Future Validation Needed | Dashboard default behavior, saved widget state, layout sharing, restore behavior를 확인해야 한다. |
| Current Evidence | Koyfin Observed, Bloomberg Variant, TradingView Variant, public-only benchmarks Partial or Not Present |
| Required Evidence | widget state owner, saved layout persistence, Entity context binding |
| Blocking Reason | Structural Unknown |
| Next Validation Target | Koyfin dashboard, Bloomberg Workspace candidate, TradingView layout |
| Evidence Quality | Medium |
| Confidence | Medium |
| Dependency | PT-014 Split Personal State, PT-021 Linked Workspace Context |
| Layer Impact | Workspace, Personal Continuity, Monitoring |
| Open Question | Dashboard와 Workspace의 boundary는 무엇인가. |
| Result | Keep for Future Validation |

## PT-019 Reported / Estimate / Consensus Label

| Field | 내용 |
| --- | --- |
| Pattern Name | Reported / Estimate / Consensus Label |
| Current Benchmark | Koyfin |
| Definition | Actual, Estimate, Consensus를 interpretation 전에 분리하는 Pattern이다. |
| Purpose | reported value와 expectation을 혼동하지 않게 한다. |
| Observed Evidence | Koyfin documentation에서 Actual, Estimate, Consensus labeling이 확인되었다. Yahoo Analysis와 Bloomberg estimates는 candidate 또는 partial이다. |
| Evidence Limitation | estimate Source, provider identity, revision timestamp, consensus method가 충분히 확인되지 않았다. |
| Why It Exists | analyst workflow에서는 actual performance와 expected performance를 구분해야 valuation 판단이 가능하다. |
| Why It Is Benchmark-specific | public benchmark는 summary Metric을 많이 제공하지만 estimate methodology와 revision detail을 깊게 노출하지 않는다. |
| Generalization 가능성 | Finance. estimates와 consensus를 다루는 Product에서는 중요하지만 모든 DATE Surface에 필요한 rule은 아니다. |
| Potential Product Value | forecast-based 판단에서 source and methodology confusion을 줄일 수 있다. |
| Risk | label만 있고 methodology와 revision timing이 없으면 trust boundary가 부족하다. |
| Why It Should NOT Become DATE Product Principle | estimates domain 자체가 DATE 초기 Product scope인지 미확정이다. methodology and provider Evidence가 부족하다. |
| Future Validation Needed | Koyfin, Yahoo Finance, Bloomberg에서 estimate provider, revision timestamp, consensus method를 확인해야 한다. |
| Current Evidence | Koyfin Observed, Yahoo Partial, Bloomberg Partial, others Not Present or Partial |
| Required Evidence | estimate Source, consensus calculation method, revision timestamp, provider coverage |
| Blocking Reason | Requires Enterprise Access |
| Next Validation Target | Koyfin estimates, Yahoo Analysis, Bloomberg Intelligence / estimates documentation |
| Evidence Quality | Medium |
| Confidence | Medium |
| Dependency | PT-007 Source / Freshness / Provider Signal, PT-027 Provider-labeled Research Module |
| Layer Impact | Evidence, Research, Policy |
| Open Question | estimate Source, revision timestamp, consensus method는 표시되는가. |
| Result | Needs Enterprise Benchmark |

## PT-028 Product Family Layer Boundary

| Field | 내용 |
| --- | --- |
| Pattern Name | Product Family Layer Boundary |
| Current Benchmark | Bloomberg |
| Definition | Public, Professional, Enterprise, App, Media Layer가 responsibility와 access boundary를 분리하는 Pattern이다. |
| Purpose | multi-layer product family에서 어떤 user가 어떤 Product Layer를 사용해야 하는지 구분한다. |
| Observed Evidence | Bloomberg Product Boundary에서 Public Web, Terminal / Professional Services, Anywhere, Enterprise Data, Bloomberg Intelligence, BloombergNEF가 분리되었다. |
| Evidence Limitation | context transfer contract, entitlement behavior, enterprise workflow는 direct interaction으로 확인되지 않았다. |
| Why It Exists | Bloomberg는 public media, professional workflow, enterprise data distribution이 하나의 brand 아래 공존한다. |
| Why It Is Benchmark-specific | 다른 Benchmark는 product family breadth가 Bloomberg만큼 크지 않다. Yahoo Premium, Koyfin plan, SaveTicker app candidate는 partial variant다. |
| Generalization 가능성 | Platform-specific. multi-delivery, enterprise product family에만 적용 가능하다. |
| Potential Product Value | Product responsibility와 access boundary를 명확히 할 수 있다. |
| Risk | DATE에 조기 적용하면 product family complexity와 entitlement model을 불필요하게 키울 수 있다. |
| Why It Should NOT Become DATE Product Principle | DATE는 아직 multi-product family나 enterprise distribution Product가 아니다. Product Family Layering은 현재 DATE Product Rule보다 future scaling constraint에 가깝다. |
| Future Validation Needed | enterprise product, app, public web 사이 context transfer와 entitlement contract 확인이 필요하다. |
| Current Evidence | Bloomberg Observed at product boundary level, Yahoo / Koyfin / SaveTicker Partial variants |
| Required Evidence | cross-layer context transfer, access rule, entitlement impact, organization permission model |
| Blocking Reason | Benchmark Locked |
| Next Validation Target | Bloomberg follow-up only if enterprise layer becomes DATE scope |
| Evidence Quality | Medium |
| Confidence | Medium |
| Dependency | PT-009 Surface Specialization vs Context Preservation, PT-029 Professional Workflow Density |
| Layer Impact | Infrastructure, Policy, Entry |
| Open Question | Product Layer 사이 context transfer contract가 존재하는가. |
| Result | Reject for DATE |

## Count Reconciliation

| Item | Status |
| --- | --- |
| Phase 8.1 Summary Count | Benchmark-specific Pattern `6` |
| Explicit Rows in 01-pattern-inventory.md | `5` |
| Resolution in this document | 새 Pattern을 만들지 않고 explicit row `5`개만 분석한다. |
| Required Follow-up | Phase 8 final review에서 Pattern Type count reconciliation이 필요하다. |

## Phase Boundary

이 문서는 Benchmark-specific Pattern만 다룬다.

Insufficient Pattern은 [11-insufficient-pattern-analysis.md](11-insufficient-pattern-analysis.md)에서 별도로 다룬다. 신규 Candidate Principle은 만들지 않는다. Registry는 수정하지 않는다. Cross Validation Status는 모두 `Pending`이다.
