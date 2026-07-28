# Variant Pattern Synthesis

## 문서 목적

이 문서는 Phase 8.2.2 범위에서 Phase 8.1의 Variant Pattern 7개만 분석한다.

Variant Pattern은 같은 user problem을 다른 Product Strategy로 해결하는 Pattern이다. 이 문서는 UI 차이가 아니라 Primary User, Primary Goal, Primary Constraint, Design Decision 차이를 정리한다.

DATE Product Principle, DATE Information Architecture, DATE Navigation, DATE UX는 작성하지 않는다. Registry는 수정하지 않는다.

## Source Basis

- [01-pattern-inventory.md](01-pattern-inventory.md)
- [02-cross-benchmark-matrix.md](02-cross-benchmark-matrix.md)
- [03-layer-classification.md](03-layer-classification.md)
- [05-evidence-quality-matrix.md](05-evidence-quality-matrix.md)
- [06-generalizability-matrix.md](06-generalizability-matrix.md)
- [07-open-question-matrix.md](07-open-question-matrix.md)
- [08-shared-pattern-synthesis.md](08-shared-pattern-synthesis.md)

## Variant Pattern Summary

| Metric | Count |
| --- | ---: |
| Variant Pattern | 7 |
| 분석 완료 Pattern | 7 |
| High Evidence Pattern | 2 |
| Medium Evidence Pattern | 5 |
| Low Evidence Pattern | 0 |
| General Pattern | 0 |
| Finance Pattern | 4 |
| Professional Pattern | 2 |
| News Pattern | 1 |
| Platform-specific Pattern | 0 |
| Cross Validation Status | Pending |

## Variant Strategy Frame

Variant Pattern은 다음 logic으로 분석한다.

```text
Same Purpose
-> Different Structure
-> Primary User
-> Primary Goal
-> Primary Constraint
-> Design Decision
-> Trade-off
```

## Variant Pattern Dependency Summary

| Pattern ID | Pattern Name | Shared Pattern Dependency | Required Next Pattern | Layer Impact | Strategy Difference |
| --- | --- | --- | --- | --- | --- |
| PT-017 | Command / Function Entry | PT-002 Entity-directed Search | PT-029 Professional Workflow Density | Entry, Discovery, Workflow | expert user에게 Search보다 command-like task entry를 제공한다. |
| PT-022 | Filter / Result Co-location | PT-013 Screener Table Discovery | PT-012 Entity Hub with Local Analysis Modes | Discovery, Workflow | filter iteration과 result feedback을 같은 Surface에 둔다. |
| PT-023 | Dense Entity Hub | PT-012 Entity Hub with Local Analysis Modes | PT-007 Source / Freshness / Provider Signal | Entity, Evidence | Entity Hub를 summary-heavy 또는 tab-heavy가 아니라 dense validation Surface로 구성한다. |
| PT-026 | Portal Bridge from Passive to Active Research | PT-001 Market / Portal Entry | PT-002 Entity-directed Search | Entry, Discovery, Workflow | passive reading entry를 active research route로 전환한다. |
| PT-027 | Provider-labeled Research Module | PT-007 Source / Freshness / Provider Signal | PT-020 Methodology Documentation Layer | Research, Evidence, Policy | provider identity를 research trust calibration의 primary cue로 둔다. |
| PT-029 | Professional Workflow Density | PT-009 Surface Specialization vs Context Preservation | PT-014 Split Personal State | Workflow, Workspace, Infrastructure | Information Density보다 task transition cost를 줄이는 데 집중한다. |
| PT-030 | Evidence-preserving Interpretation Layer | PT-007 Source / Freshness / Provider Signal | PT-024 External Evidence Link with Context Loss | Evidence, Research | Summary, Translation 같은 interpretation layer를 Original Evidence boundary와 분리한다. |

## PT-017 Command / Function Entry

| Field | 내용 |
| --- | --- |
| Definition | Search와 Function Navigation이 command-like entry에서 결합되는 Pattern이다. |
| Purpose | expert task entry를 줄이고 반복 workflow를 빠르게 시작하게 한다. |
| User Problem | 반복 task를 page tree에서 매번 찾으면 professional workflow cost가 커진다. |
| Supporting Benchmark | Koyfin, Bloomberg |
| Variant Benchmark | TradingView, Yahoo Finance |
| Primary User | Professional Trader, Institutional Analyst, power research user |
| Primary Goal | Expert Task Entry, Workflow Continuity |
| Primary Constraint | command literacy, discoverability, autocomplete / history 확인 제한 |
| Design Decision | broad Search보다 task 또는 Function을 직접 호출하는 entry를 강화한다. |
| Alternative Implementations | TradingView는 Symbol / Chart-first Search를 쓴다. Yahoo Finance는 Portal / Quote Search를 쓴다. Finviz는 Screener와 table entry를 쓴다. SaveTicker는 News-first Search candidate다. EidosLayer는 Market task와 AI tool entry가 제한적으로 연결된다. |
| Why This Variant Exists | 반복 task가 많고 user가 target task를 이미 아는 professional context에서는 page hierarchy보다 direct command entry가 빠를 수 있다. |
| Why Other Products Did Not Choose It | retail 또는 public Product는 command literacy보다 visible navigation과 learnability가 더 중요하다. |
| User Benefit | Professional Scalability, Decision Speed |
| Trade-off | command를 모르면 discoverability가 낮아지고 novice onboarding 비용이 커질 수 있다. |
| When This Variant Wins | task vocabulary가 안정적이고 user가 반복 workflow를 수행할 때 유리하다. |
| When This Variant Fails | casual user, news reader, occasional investor에게는 entry cost가 높다. |
| Evidence Quality | Medium. Bloomberg는 No Direct Terminal Session 제한이 있고, Koyfin command detail도 full interaction으로 검증되지 않았다. |
| Confidence | Medium |
| Generalizability | Professional |
| Related Principle | P-017, P-002 |
| Cross Validation Status | Pending |
| Open Question | autocomplete, recent command, history, command discoverability가 실제로 어떻게 작동하는지 확인이 필요하다. |

### Benchmark Strategy Comparison

| Benchmark | Implementation | Strategy Interpretation |
| --- | --- | --- |
| EidosLayer | Not Present | AI task entry가 일부 존재하지만 command-like Function entry로 보기에는 Evidence가 부족하다. |
| TradingView | Variant | Chart and Symbol Search 중심이다. expert chart workflow는 강하지만 command-first model은 아니다. |
| Koyfin | Observed | app workflow에서 command-like entry와 professional research entry가 결합된다. |
| Finviz | Not Present | Screener와 table entry를 우선한다. visible criteria discovery가 command보다 중요하다. |
| Yahoo Finance | Not Present | public portal과 quote Search를 우선한다. broad audience learnability가 더 중요하다. |
| Bloomberg | Variant | Professional Services에서 Function-oriented entry가 핵심 candidate지만 direct Terminal session은 없다. |
| SaveTicker | Not Present | News consumption 중심 Product라 command literacy보다 reading entry가 중요하다. |

## PT-022 Filter / Result Co-location

| Field | 내용 |
| --- | --- |
| Definition | filter controls와 result feedback이 같은 Surface에 위치하는 Pattern이다. |
| Purpose | 조건 변경과 결과 확인의 iteration loop를 줄인다. |
| User Problem | filter를 바꾸고 result를 다른 Surface에서 확인하면 반복 cost가 커진다. |
| Supporting Benchmark | Finviz |
| Variant Benchmark | Koyfin, Yahoo Finance, TradingView |
| Primary User | Retail Investor, Research User, active screener user |
| Primary Goal | Iterative Discovery, Comparison Efficiency |
| Primary Constraint | screen space, filter complexity, novice overload |
| Design Decision | control과 feedback을 분리하지 않고 같은 Surface 안에서 조합한다. |
| Alternative Implementations | Finviz는 dense filter + table을 강하게 결합한다. TradingView는 screener와 chart ecosystem을 결합한다. Koyfin은 app workflow와 data table variant를 쓴다. Yahoo Finance는 public screener와 quote routes를 결합한다. Bloomberg는 professional screening candidate로 제한된다. |
| Why This Variant Exists | candidate universe를 줄이는 task는 조건 변경과 immediate feedback이 핵심이다. |
| Why Other Products Did Not Choose It | portal-first Product는 broad navigation을 우선하고, chart-first Product는 visualization context를 우선한다. |
| User Benefit | Decision Speed, Comparison Efficiency |
| Trade-off | complex filter가 한 Surface에 많아지면 novice에게는 interaction cost가 커진다. |
| When This Variant Wins | user가 criteria를 명확히 알고 반복 refinement를 할 때 유리하다. |
| When This Variant Fails | user가 criteria를 모르는 early discovery나 news-driven entry에서는 부담이 크다. |
| Evidence Quality | High. Finviz와 여러 screener variant에서 반복 확인된다. |
| Confidence | High |
| Generalizability | Finance |
| Related Principle | P-022, P-013 |
| Cross Validation Status | Pending |
| Open Question | complex filter를 novice에게 어떻게 단계적으로 노출할지 검증이 필요하다. |

### Benchmark Strategy Comparison

| Benchmark | Implementation | Strategy Interpretation |
| --- | --- | --- |
| EidosLayer | Not Present | Product focus가 screener table iteration으로 확인되지 않았다. |
| TradingView | Variant | screener가 존재하지만 chart ecosystem과 Symbol context가 함께 작동한다. |
| Koyfin | Variant | professional data table과 app workflow 중심 variant다. |
| Finviz | Observed | filter-result loop를 같은 dense Surface에 강하게 결합한다. |
| Yahoo Finance | Variant | public screener가 있지만 portal과 quote entry가 함께 작동한다. |
| Bloomberg | Partial | professional screening capability candidate이나 direct interaction은 제한된다. |
| SaveTicker | Insufficient | Search result grouping과 filtering 구조가 충분히 확인되지 않았다. |

## PT-023 Dense Entity Hub

| Field | 내용 |
| --- | --- |
| Definition | summary, Metric, Chart, News, ownership, transaction Evidence가 한 Stock context에 밀집되는 Pattern이다. |
| Purpose | Entity 판단에 필요한 adjacent Evidence를 한 context 안에 압축한다. |
| User Problem | 사용자는 같은 Stock 판단을 위해 여러 Surface를 열어야 한다. |
| Supporting Benchmark | Finviz |
| Variant Benchmark | Yahoo Finance, TradingView, Bloomberg |
| Primary User | Retail Investor, Research User |
| Primary Goal | Deep Analysis, Evidence Reading, transition cost reduction |
| Primary Constraint | Information Density, readability, density control |
| Design Decision | 여러 analysis unit을 하나의 Entity Hub에 밀집 배치한다. |
| Alternative Implementations | Finviz는 dense single-page Stock context를 선호한다. Yahoo Finance는 Quote tabs와 sections로 나눈다. TradingView는 Symbol page와 chart-heavy context를 쓴다. Bloomberg는 Security workflow candidate로 분산 professional Surface를 연결한다. SaveTicker는 ticker detail이 Not Verified다. |
| Why This Variant Exists | 빠른 validation을 위해 여러 Evidence type을 한 번에 보려는 user에게 유리하다. |
| Why Other Products Did Not Choose It | mobile, novice, professional workflow Product는 dense single-page보다 tab, panel, workspace, command를 선호할 수 있다. |
| User Benefit | Decision Speed, Evidence Traceability |
| Trade-off | density control이 부족하면 overload와 Source boundary confusion이 생길 수 있다. |
| When This Variant Wins | user가 Stock context 안에서 빠른 scan과 validation을 원할 때 유리하다. |
| When This Variant Fails | long-form research, collaboration, multi-session workflow에서는 state preservation이 약할 수 있다. |
| Evidence Quality | High. Finviz Stock page 구조와 Yahoo / TradingView variants에서 반복된다. |
| Confidence | High |
| Generalizability | Finance |
| Related Principle | P-023, P-012 |
| Cross Validation Status | Pending |
| Open Question | density control 없이 overload가 발생하는지, Source boundary가 충분한지 확인이 필요하다. |

### Benchmark Strategy Comparison

| Benchmark | Implementation | Strategy Interpretation |
| --- | --- | --- |
| EidosLayer | Not Present | dense Stock hub로 확인되지 않았다. |
| TradingView | Variant | Chart와 Symbol context 중심으로 deep analysis를 구성한다. |
| Koyfin | Partial | professional app tab body와 data surface가 후보로 확인된다. |
| Finviz | Observed | dense Stock page가 multiple Evidence unit을 한 context에 배치한다. |
| Yahoo Finance | Variant | Quote tabs와 sections로 density를 분산한다. |
| Bloomberg | Variant | Security workflow responsibility는 있으나 direct Terminal interaction은 Not Verified다. |
| SaveTicker | Insufficient | independent ticker detail이 확인되지 않았다. |

## PT-026 Portal Bridge from Passive to Active Research

| Field | 내용 |
| --- | --- |
| Definition | Portal이 passive Market / News discovery에서 active research entry로 연결되는 Pattern이다. |
| Purpose | reading mode를 quote, search, screen, article, watch 같은 task entry로 전환한다. |
| User Problem | 사용자는 News 또는 Market summary를 본 뒤 분석으로 넘어가는 route가 필요하다. |
| Supporting Benchmark | Yahoo Finance, Bloomberg, SaveTicker |
| Variant Benchmark | EidosLayer, TradingView |
| Primary User | Retail Investor, News Consumer, Research User |
| Primary Goal | Fast Discovery, Market Orientation, mode transition |
| Primary Constraint | portal hierarchy, content mixing, research focus loss |
| Design Decision | passive feed와 active research route를 같은 entry Surface에 연결한다. |
| Alternative Implementations | Yahoo Finance는 Portal / Quote bridge를 쓴다. Bloomberg public web은 media와 Market route를 결합한다. SaveTicker는 News-first entry에서 Original Source와 related context 후보로 확장한다. TradingView는 chart-first ecosystem으로 mode를 시작한다. Koyfin은 logged-in app entry가 강하다. |
| Why This Variant Exists | 많은 user는 처음부터 ticker를 입력하지 않고 News나 Market summary에서 research question을 만든다. |
| Why Other Products Did Not Choose It | professional Product는 direct task entry가 더 빠르고, screener-first Product는 criteria narrowing을 우선한다. |
| User Benefit | Entry Cost Reduction, Market Orientation |
| Trade-off | portal hierarchy가 강하면 active research route가 묻히거나 content consumption에 머물 수 있다. |
| When This Variant Wins | user가 broad Market context나 News에서 분석 question을 시작할 때 유리하다. |
| When This Variant Fails | user가 이미 target Entity와 task를 알고 있을 때는 Search, command, screener보다 느릴 수 있다. |
| Evidence Quality | Medium. public portal Evidence는 강하지만 logged-in / professional entry 비교는 제한된다. |
| Confidence | Medium |
| Generalizability | Finance |
| Related Principle | P-026, P-001 |
| Cross Validation Status | Pending |
| Open Question | Portal hierarchy가 research 집중을 방해하는지 확인이 필요하다. |

### Benchmark Strategy Comparison

| Benchmark | Implementation | Strategy Interpretation |
| --- | --- | --- |
| EidosLayer | Observed | Market task와 AI-oriented entry가 passive-to-active variant를 만든다. |
| TradingView | Partial | Home과 symbol discovery가 있으나 chart-first Product identity가 더 강하다. |
| Koyfin | Insufficient | public Home보다 logged-in professional app entry가 중심이다. |
| Finviz | Partial | portal and screener links는 있으나 dense table discovery가 더 강하다. |
| Yahoo Finance | Observed | public portal에서 quote, market, news, watch route로 이어진다. |
| Bloomberg | Variant | public portal과 professional Product layer가 분리되어 있다. |
| SaveTicker | Variant | News-first entry가 passive reading에서 source and entity candidate로 이어진다. |

## PT-027 Provider-labeled Research Module

| Field | 내용 |
| --- | --- |
| Definition | aggregated research나 provider module이 provider identity를 표시하는 Pattern이다. |
| Purpose | third-party research trust calibration을 지원한다. |
| User Problem | 사용자는 report Source, provider, methodology를 구분해야 한다. |
| Supporting Benchmark | Yahoo Finance, Bloomberg |
| Variant Benchmark | Koyfin |
| Primary User | Research User, Institutional Analyst, retail investor using third-party research |
| Primary Goal | Trust Calibration, Evidence Reading |
| Primary Constraint | provider coverage, methodology visibility, entitlement boundary |
| Design Decision | research content를 Product-owned Evidence처럼 보이지 않게 provider label과 함께 표시한다. |
| Alternative Implementations | Yahoo Finance는 provider-labeled analysis modules를 쓴다. Bloomberg는 Bloomberg Intelligence와 provider / data Product를 구분한다. Koyfin은 provider documentation variant를 가진다. Finviz와 SaveTicker는 report detail traceability가 제한된다. |
| Why This Variant Exists | Research는 Product가 직접 생성한 content와 third-party content가 섞일 수 있어 provider identity가 trust boundary를 만든다. |
| Why Other Products Did Not Choose It | chart-first 또는 screener-first Product는 provider research보다 price, chart, table grammar를 우선할 수 있다. |
| User Benefit | Trust Calibration, Evidence Traceability |
| Trade-off | provider label이 item-level Traceability나 methodology를 대체하는 것처럼 보일 수 있다. |
| When This Variant Wins | multiple provider research를 한 Product 안에서 비교할 때 유리하다. |
| When This Variant Fails | provider methodology, revision time, entitlement boundary가 불명확하면 label만으로는 부족하다. |
| Evidence Quality | Medium. Yahoo와 Bloomberg Evidence는 강하지만 item-level lineage는 제한된다. |
| Confidence | Medium |
| Generalizability | Finance |
| Related Principle | P-027, P-020 |
| Cross Validation Status | Pending |
| Open Question | provider identity가 item-level Traceability를 대체하지 않도록 어떤 표시가 필요한지 확인이 필요하다. |

### Benchmark Strategy Comparison

| Benchmark | Implementation | Strategy Interpretation |
| --- | --- | --- |
| EidosLayer | Not Present | provider-labeled research module로 확인되지 않았다. |
| TradingView | Partial | ideas and documents candidate가 있으나 provider research module 중심은 아니다. |
| Koyfin | Variant | provider documentation과 professional data context가 결합된다. |
| Finviz | Partial | research-related item은 있으나 provider module depth가 제한된다. |
| Yahoo Finance | Observed | public quote / analysis context에서 provider-labeled research가 나타난다. |
| Bloomberg | Observed | Bloomberg Intelligence, BloombergNEF, data product responsibility가 분리된다. |
| SaveTicker | Insufficient | Reports detail과 original report traceability가 확인되지 않았다. |

## PT-029 Professional Workflow Density

| Field | 내용 |
| --- | --- |
| Definition | density를 한 Surface의 정보량이 아니라 task transition cost로 평가하는 Pattern이다. |
| Purpose | professional workflow에서 Security, chart, news, portfolio, export task 간 전환을 줄인다. |
| User Problem | professional user는 한 Entity에 대해 여러 task를 반복 전환한다. |
| Supporting Benchmark | Bloomberg |
| Variant Benchmark | Koyfin, TradingView |
| Primary User | Institutional Analyst, Professional Trader |
| Primary Goal | Workflow Compression, Professional Scalability |
| Primary Constraint | workflow complexity, setup cost, entitlement, direct interaction Evidence limitation |
| Design Decision | more information per page가 아니라 task adjacency와 workspace / command access를 우선한다. |
| Alternative Implementations | Bloomberg는 Professional Workflow responsibility를 통합한다. Koyfin은 dashboard and app workflow variant를 제공한다. TradingView는 Supercharts and panels 중심이다. Yahoo Finance, Finviz, SaveTicker는 public-facing Surface가 중심이다. |
| Why This Variant Exists | professional user는 speed보다 repeatable task chain과 context transfer가 더 중요할 수 있다. |
| Why Other Products Did Not Choose It | public Product는 setup cost와 learning cost를 낮추기 위해 page, quote, portal, table 중심 구조를 선택한다. |
| User Benefit | Workflow Efficiency, Professional Scalability |
| Trade-off | high setup cost, entitlement complexity, command learning cost, context propagation uncertainty가 생긴다. |
| When This Variant Wins | user가 반복 professional workflow를 수행하고 Product vocabulary를 배웠을 때 유리하다. |
| When This Variant Fails | casual user, public web user, single-task user에게는 과도하다. |
| Evidence Quality | Medium. Bloomberg는 Official Product Description 중심이고 direct Terminal interaction은 Not Verified다. |
| Confidence | Medium |
| Generalizability | Professional |
| Related Principle | P-029, P-017, P-021 |
| Cross Validation Status | Pending |
| Open Question | actual interaction speed와 context propagation이 실제로 확인되는지 검증이 필요하다. |

### Benchmark Strategy Comparison

| Benchmark | Implementation | Strategy Interpretation |
| --- | --- | --- |
| EidosLayer | Not Present | professional workflow density로 확인되지 않았다. |
| TradingView | Variant | chart-centered workflow가 professional density 일부를 담당한다. |
| Koyfin | Variant | dashboard and app workflow가 task adjacency를 제공한다. |
| Finviz | Not Present | dense information scan은 강하지만 professional workflow chain은 제한된다. |
| Yahoo Finance | Partial | public quote and portfolio features는 있으나 professional workflow density는 제한된다. |
| Bloomberg | Observed | professional workflow product responsibility가 핵심이다. |
| SaveTicker | Insufficient | News-first Product라 professional workflow chain Evidence가 부족하다. |

## PT-030 Evidence-preserving Interpretation Layer

| Field | 내용 |
| --- | --- |
| Definition | Summary, Translation, AI-generated layer가 Original Evidence boundary를 유지해야 하는 Pattern이다. |
| Purpose | reading cost reduction과 trust boundary를 동시에 관리한다. |
| User Problem | 사용자는 compression이나 translation을 Original Evidence로 오인할 수 있다. |
| Supporting Benchmark | SaveTicker |
| Variant Benchmark | EidosLayer, Yahoo Finance, Bloomberg |
| Primary User | News Consumer, Research User |
| Primary Goal | Reading Cost Reduction, Trust Calibration |
| Primary Constraint | methodology gap, update time, correction policy, Original Source Return Path |
| Design Decision | interpretation layer를 original article, Source, timestamp와 분리해 표시한다. |
| Alternative Implementations | SaveTicker는 AI Summary와 Translation candidate를 News Detail context에 둔다. EidosLayer는 AI persona / source identity separation variant를 가진다. Yahoo Finance와 Bloomberg는 summary and article presentation variants를 가진다. Finviz, Koyfin, TradingView는 raw headline, table, chart 중심이라 interpretation layer Evidence가 제한된다. |
| Why This Variant Exists | long-form News와 multilingual reading context에서는 raw article만 제공하면 reading cost가 높다. |
| Why Other Products Did Not Choose It | screener, chart, quote-first Product는 reading compression보다 data comparison과 visualization이 더 중요한 task다. |
| User Benefit | Reading Cost Reduction, Trust Calibration |
| Trade-off | methodology, correction, update time이 없으면 interpretation layer가 Evidence boundary를 흐릴 수 있다. |
| When This Variant Wins | user가 긴 article을 빠르게 파악하되 Original Source까지 확인해야 할 때 유리하다. |
| When This Variant Fails | summary accuracy, translation quality, source return path가 불명확하면 trust risk가 커진다. |
| Evidence Quality | Medium. SaveTicker public Observation은 있으나 AI Summary Methodology와 Translation Methodology는 Not Verified다. |
| Confidence | Medium |
| Generalizability | News |
| Related Principle | P-030, P-007, P-024 |
| Cross Validation Status | Pending |
| Open Question | methodology, update time, correction policy가 표시되는지 확인이 필요하다. |

### Benchmark Strategy Comparison

| Benchmark | Implementation | Strategy Interpretation |
| --- | --- | --- |
| EidosLayer | Variant | AI source identity separation 문제를 다루지만 News interpretation layer와는 다르다. |
| TradingView | Not Present | chart and symbol analysis 중심이라 local text interpretation layer가 핵심이 아니다. |
| Koyfin | Insufficient | provider documentation은 있으나 AI summary / translation pattern은 확인되지 않았다. |
| Finviz | Not Present | headline and external evidence 중심이다. |
| Yahoo Finance | Partial | article summary와 provider content 후보가 있으나 method boundary는 제한된다. |
| Bloomberg | Partial | professional news and public article presentation은 있으나 generated interpretation boundary는 제한된다. |
| SaveTicker | Observed | AI Summary, Translation, Original Source boundary candidate가 확인되었다. |

## Alternative Implementation Taxonomy

| Alternative Implementation | Related Variant Pattern | Strategy |
| --- | --- | --- |
| Command First | PT-017 | expert user가 task vocabulary로 직접 entry한다. |
| Search First | PT-017, PT-002 | known Entity나 content를 query로 해결한다. |
| Filter First | PT-022 | criteria iteration으로 candidate universe를 줄인다. |
| Dense Hub First | PT-023 | Entity context 안에 adjacent Evidence를 압축한다. |
| Portal First | PT-026 | passive reading에서 active research로 전환한다. |
| Provider First | PT-027 | research content의 trust boundary를 provider label로 시작한다. |
| Workflow First | PT-029 | task transition cost를 Surface density보다 우선한다. |
| Interpretation First | PT-030 | reading cost를 줄이되 Original Evidence boundary를 유지한다. |

## Layer Impact Summary

| Layer | Variant Impact |
| --- | --- |
| Entry | PT-017과 PT-026은 command-first와 portal-first entry philosophy를 비교하게 한다. |
| Discovery | PT-022는 discovery를 filter loop로, PT-026은 portal route로 구성한다. |
| Entity | PT-023은 Entity Hub density를 높이고, PT-017은 Entity로 가는 route를 command로 단축한다. |
| Evidence | PT-027과 PT-030은 Source, provider, Original Evidence boundary를 다룬다. |
| Workflow | PT-017과 PT-029는 task transition cost를 중심으로 Product Strategy를 만든다. |
| Monitoring | PT-029는 professional monitoring 후보와 연결되지만 public benchmark에서는 제한된다. |
| Community | PT-030은 reaction과 interpretation boundary를 분리해야 하며, community-heavy Pattern은 이번 대상이 아니다. |
| Calendar | Variant Pattern 7개 중 calendar-first strategy는 없다. calendar impact는 PT-026 portal route 또는 PT-029 workflow candidate에 제한된다. |
| Research | PT-027은 provider-labeled research를, PT-030은 interpretation boundary를 research trust problem으로 다룬다. |
| Personal Continuity | PT-029는 workspace and saved state candidate를 요구하고, PT-022와 PT-023은 filter / entity context preservation issue를 남긴다. |

## Evidence Quality Reasoning

| Evidence Quality | Pattern Count | Pattern IDs | Reason |
| --- | ---: | --- | --- |
| High | 2 | PT-022, PT-023 | Finviz, Yahoo Finance, TradingView, Koyfin 등에서 직접 확인된 screener, table, dense entity hub Evidence가 강하다. |
| Medium | 5 | PT-017, PT-026, PT-027, PT-029, PT-030 | professional access limitation, provider lineage gap, interpretation methodology gap, portal hierarchy gap이 남아 있다. |
| Low | 0 | None | Low Evidence Pattern은 Phase 8.2.2 대상에서 제외했다. |

## Generalizability Reasoning

| Generalizability | Pattern Count | Pattern IDs | Reason |
| --- | ---: | --- | --- |
| General | 0 | None | 이번 Variant는 Finance, Professional, News context의 Product Strategy 차이에 묶여 있다. |
| Finance | 4 | PT-022, PT-023, PT-026, PT-027 | screener, dense entity, portal-to-research, provider research가 finance task에 강하게 연결된다. |
| Professional | 2 | PT-017, PT-029 | command entry와 workflow density는 expert vocabulary와 setup cost를 전제로 한다. |
| News | 1 | PT-030 | interpretation layer와 Original Evidence boundary가 News reading context에 강하게 연결된다. |
| Platform-specific | 0 | None | Platform-specific Pattern은 이번 대상에서 제외했다. |

## Open Question Summary

| Pattern ID | Open Question |
| --- | --- |
| PT-017 | autocomplete, history, discoverability는 확인되는가 |
| PT-022 | complex filter가 novice에게 과도한가 |
| PT-023 | density control 없이 overload가 발생하는가 |
| PT-026 | Portal hierarchy가 research 집중을 방해하는가 |
| PT-027 | provider identity가 item-level Traceability를 대체하지 않는가 |
| PT-029 | actual interaction speed와 context propagation은 확인되는가 |
| PT-030 | methodology, update time, correction policy가 표시되는가 |

## Phase Boundary

이 문서는 Variant Pattern만 다룬다.

Benchmark-specific Pattern, Insufficient Pattern, Shared Pattern 재분석, Potential Contradiction은 다루지 않는다. 신규 Candidate Principle은 만들지 않는다. Registry는 수정하지 않는다. Cross Validation Status는 모두 `Pending`이다.
