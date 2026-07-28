# Bloomberg Evidence Hardening Review

## 문서 목적

이 문서는 Phase 6.1~6.3 Bloomberg 문서의 Evidence 상태를 점검하고, Candidate Principle Extraction 전 Evidence 품질을 판단한다.

새로운 웹 조사, Secondary Source 조사, Official Demonstration 추가 조사는 수행하지 않았다.

## 검토한 문서

| File | Review Role |
| --- | --- |
| README.md | 범위와 현재 Phase 확인 |
| 00-access-and-method.md | access boundary와 Evidence Type 기준 확인 |
| 01-product-boundary.md | Product Family와 Product Layer 구분 확인 |
| 02-product-surface-map.md | Surface와 Capability 분리 확인 |
| 03-screen-and-function-inventory.md | Public Page와 Terminal Function Category 후보 확인 |
| 04-navigation-map.md | Public Navigation과 Terminal Navigation 구분 확인 |
| 05-core-journey-observations.md | Public Journey, Professional Workflow, Terminal Journey 후보 확인 |
| 06-entity-and-state-observations.md | Entity Candidate와 User State Candidate 확인 |
| 07-information-density-observations.md | Information Density와 Workflow Density 구분 확인 |
| 08-trust-and-evidence-observations.md | Source, Provider, Freshness, Methodology, Entitlement 후보 확인 |
| 09-product-flow-architecture.md | Flow 유형과 Context Preservation 후보 확인 |

검토한 파일 수: 11

## 기존 Evidence 상태 분포

| Evidence / Flow Status | 수 |
| --- | ---: |
| Information Density Observation | 14 |
| Trust / Evidence Observation | 14 |
| Flow Types | 7 |
| Flow Observed | 5 |
| Flow Partially Observed | 8 |
| Flow Official Documentation Only | 2 |
| Flow Official Product Description | 18 |
| Institutional / Login / Enterprise Restricted | 17 |
| Flow Inference | 4 |
| Flow Not Verified | 9 |
| Journey 완료 가능 | 4 |
| Journey 부분 완료 | 14 |
| Journey 확인 불가 | 8 |
| Navigation Entry | 30 |
| Entity Candidate | 23 |
| User State Candidate | 10 |
| Context Preservation Pattern | 8 |
| Context Loss | 6 |

## 변경 Evidence 상태 분포

Evidence Hardening에서 기존 Observation을 변경하지 않았다.

| Change Type | Count | Reason |
| --- | ---: | --- |
| 하향 조정 | 0 | 기존 문서가 Terminal 제한을 대부분 유지하고 있음 |
| 삭제한 관계 | 0 | 관계는 후보 또는 Not Verified로 제한되어 있음 |
| Confidence 변경 | 0 | Product responsibility와 actual interaction Confidence가 분리되어 있음 |

## Public Observation 항목

| Area | Evidence Level | Hardening 판단 |
| --- | --- | --- |
| Bloomberg.com Home | Partially Observed | Portal entry로만 사용 가능 |
| Markets / Stocks / Futures / Commodities | Observed | Public Market comparison Pattern에 사용 가능 |
| Currencies / Rates & Bonds | Partially Observed | detail depth claim 제한 필요 |
| Public Quote | Partially Observed | Quote hub claim 제한 필요 |
| Article | Partially Observed | content Source Surface로만 사용 가능 |
| Subscription | Observed / Official Pricing | access boundary Pattern에 사용 가능 |
| Search | Partially Observed / Not Verified | Search result grouping claim 금지 |

## Official Product Description 항목

| Area | Evidence Level | Hardening 판단 |
| --- | --- | --- |
| Bloomberg Terminal | Official Product Description | professional environment responsibility로만 사용 |
| Command Entry / Function | Official Product Description / Not Verified | actual command parsing claim 금지 |
| Launchpad | Official Product Description | monitor composition candidate로만 사용 |
| Terminal News | Official Product Description | News monitoring stack으로 사용 가능, item metadata 제한 |
| Charts | Official Product Description | chart capability responsibility로 제한 |
| Portfolio & Risk Analytics | Official Product Description | portfolio workflow responsibility로 제한 |
| Collaboration Tools | Official Product Description | collaboration capability candidate로 제한 |

## Institutional Access 항목

| Area | Access | Hardening 판단 |
| --- | --- | --- |
| Terminal Workflows | Institutional Access Required | actual Workflow Observation 아님 |
| Security Lookup | Institutional Access Required | entry candidate only |
| Portfolio / Risk | Institutional Access Required | UI, calculation, import Not Verified |
| IB / MSG / NOTE | Institutional Access Required | chat state와 context link Not Verified |
| Excel Add-ins | Institutional Access Required candidate | workflow not tested |

## Enterprise Entitlement 항목

| Area | Access | Hardening 판단 |
| --- | --- | --- |
| Data License | Enterprise / Additional Product Required | data delivery responsibility만 사용 |
| Server API | Enterprise / Terminal entitlement | API behavior Not Verified |
| B-PIPE | Enterprise / Entitlement Required | feed and exchange controls Not Verified |
| Exchange Entitlement | Exchange Entitlement Required candidate | user-facing display Not Verified |

## Inferred 항목

| Area | Hardening 판단 |
| --- | --- |
| Security Context across functions | Not Verified 중심으로 유지 |
| Function-oriented expert efficiency | Interpretation으로만 사용 |
| Workspace as User-owned Entity | 확정 금지 |
| Public Web to Terminal continuity | Not Verified 유지 |
| Data lineage preservation | Not Verified 유지 |

## Not Verified 항목

- Terminal Command Autocomplete
- Recent / Favorites
- Function Execution Detail
- Security Context Linking
- Workspace Save / Restore
- Launchpad Persistence
- Bloomberg Anywhere Continuity
- Portfolio Calculation UI
- Collaboration Context Linking
- API / Excel Field Lineage
- Public Search Result Grouping
- Quote Full Body
- Article Return Path
- Exchange Entitlement Behavior

## Workflow Flow 검토

Observation:
Professional Workflow는 Security 검색, Company Research, Market Monitor, News Monitoring, Portfolio Monitoring, Risk, Macro, Fixed Income, Messaging, Excel / API Integration으로 기록되어 있다.

Hardening:
이 Flow는 actual click Flow가 아니다. Official Product Description 기준 Product Responsibility 연결 후보로만 Principle Extraction에 넘긴다.

Confidence:
Medium

## Workspace Flow 검토

Observation:
Workspace, Launchpad Monitor, Panel / Window, Linked Window, Worksheet가 기록되어 있다.

Hardening:
Workspace Surface와 Workspace State를 분리해야 한다. Panel, Linked Window, Security Context sharing은 Not Verified이므로 Principle Extraction 중심 Evidence로 사용하지 않는다.

Confidence:
Low to Medium

## Collaboration Flow 검토

Observation:
Instant Bloomberg, MSG, NOTE, research sharing, Message Thread 후보가 기록되어 있다.

Hardening:
Collaboration capability 존재와 context preservation을 분리한다. structured data link behavior와 message-to-Security relation은 Not Verified다.

Confidence:
Medium

## Data Flow 검토

Observation:
Data License, Server API, B-PIPE, Excel Add-ins / API Components가 enterprise data and integration 후보로 기록되어 있다.

Hardening:
Data Integration은 Bloomberg Benchmark-specific Pattern으로 강하지만, field-level Source Lineage는 Not Verified다. Candidate extraction에서는 Data Portability 또는 enterprise integration 범위로 제한해야 한다.

Confidence:
Medium

## Context Preservation 검토

| Context | Current Status | Hardening 판단 |
| --- | --- | --- |
| Public Market category | Partially Observed | Public Flow에서만 사용 |
| Public Quote ticker | Partially Observed | Quote body 제한 유지 |
| Article category | Partially Observed | return path Not Verified |
| Security Context | Not Verified | Principle 중심 Evidence로 사용 금지 |
| Launchpad Workspace | Product Description / Not Verified | Scope Limitation 필요 |
| Worksheet | Product Description | actual restore Not Verified |
| IB chat state | Product Description | chat UI Not Verified |
| Portfolio / Position | Product Description | import and ownership Not Verified |

## Evidence 품질 판단

Observation:
Bloomberg Benchmark는 Public Web Observation보다 Terminal / Professional Workflow의 Official Product Description 비중이 높다.

Interpretation:
Product Boundary, Public / Terminal 책임 분리, Markets Table, access boundary는 Principle Extraction 준비가 가능하다. Function execution, Workspace persistence, Security Context, Collaboration Context, Data Lineage는 추가 Evidence가 필요하다.

Final Judgment:
Ready for Principle Extraction

Reason:
Ready 또는 Ready with Scope Limitation으로 넘길 Pattern은 명확하지만, Terminal direct interaction이 필요한 Pattern은 Needs Additional Evidence 또는 Benchmark-specific으로 유지해야 한다.

## 다음 단계 진행 가능 여부

다음 단계에서 Candidate Principle Extraction을 진행할 수 있다.

조건:

- No Direct Terminal Session 제한을 모든 Bloomberg Candidate에 명시한다.
- Official Product Description Only 기반 Pattern에는 Scope Limitation을 붙인다.
- Security Context, Workspace Persistence, Function Execution, Excel / API Field Lineage를 확정 Principle의 중심 Evidence로 사용하지 않는다.
- Bloomberg-specific institutional access model은 일반 Product Principle로 과도하게 일반화하지 않는다.
