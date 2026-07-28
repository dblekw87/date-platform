# Bloomberg Phase 6 Summary

## 조사 범위

Bloomberg Phase 6은 Bloomberg Product Family를 Public Web, Digital Subscription, Terminal / Professional Services, Bloomberg Anywhere, Professional App, Enterprise Data, Supporting Media, Separate Domain으로 분리해 조사했다.

## Access Limitation

- Bloomberg Terminal: Institutional Access Required
- No Direct Terminal Session
- Bloomberg Anywhere: Login Required, no post-login session
- Digital Subscription: No subscription
- Enterprise Data / API / B-PIPE: Enterprise Entitlement Required
- Secondary Source: Not Used

## Product Boundary 요약

Bloomberg는 하나의 Product가 아니라 Public Market / News Product, institutional professional workflow Product, enterprise data product가 결합된 Product Family다.

## Public Web 요약

Bloomberg.com Home은 News, Video, Market Data footer, category Navigation, Subscription CTA를 포함하는 Portal Entry다. Markets는 asset class table과 Market news 중심으로 기록되었다.

## Terminal / Professional Services 요약

Terminal은 data, News, analytics, execution, collaboration, Portfolio & Risk Analytics, Launchpad, Workspace를 묶는 professional environment로 기록되었다. 실제 Terminal Interaction은 확인하지 않았다.

## Navigation 요약

Navigation Entry 수는 30개다. Public Navigation과 Terminal Navigation을 분리했으며, Terminal Command Entry와 Function은 Official Product Description 기준 후보로만 기록했다.

## Professional Workflow 요약

Professional Workflow 후보는 Security 검색, Company Research, Market Monitor, News Monitoring, Portfolio Monitoring, Risk, Macro, Fixed Income, Messaging, Excel / API Integration이다.

## Core Journey 요약

Journey는 총 26개다.

| Status | 수 |
| --- | ---: |
| 완료 가능 | 4 |
| 부분 완료 | 14 |
| 확인 불가 | 8 |

## Entity / User State 요약

Entity Candidate는 23개, User State Candidate는 10개다. Security, Stock, Company, Portfolio, Position, Workspace, Function, User, Organization을 후보로 기록했지만 Entity Architecture는 확정하지 않았다.

## Information Density 요약

Information Density Observation은 14개다. Bloomberg는 Public Information Density와 Terminal Workflow Density를 분리해야 한다.

## Workflow Density 요약

Workflow Density는 Security, Analysis, Chart, News, Portfolio, Alert, Messaging, Excel / API 후보의 전환 비용으로 평가해야 한다. 실제 연속 Interaction은 Not Verified다.

## Workspace 요약

Workspace, Launchpad, Panel, Linked Window, Worksheet, Security Context는 후보로 기록되었다. Workspace Persistence, Launchpad Save / Restore, Security Context Linking은 Not Verified다.

## Trust / Evidence 요약

Trust / Evidence Observation은 14개다. Bloomberg Original News, Public Markets, Terminal real-time Market Data responsibility, Bloomberg Intelligence, Data License, Server API, B-PIPE, Entitlement boundary가 핵심 Signal이다.

## Data Integration 요약

Data License, Server API, B-PIPE, Excel Add-ins는 professional workflow를 primary interface 밖으로 확장하는 Integration 후보로 기록되었다. Field-level Source Lineage는 Not Verified다.

## Collaboration 요약

Instant Bloomberg, MSG, NOTE, Research Sharing, Alert는 collaboration candidates로 기록되었다. Collaboration Context Linking은 Not Verified다.

## Access / Entitlement 요약

Public Access, Digital Subscription, Institutional Contract, Exchange Entitlement, Additional Product, Enterprise Entitlement, User Permission, Organization Permission을 분리했다.

## Product Flow 요약

Flow 유형은 7개다.

- Public Flow
- Professional Workflow
- Entity Flow
- Workspace Flow
- Collaboration Flow
- Anywhere Flow
- Data Flow

## 주요 Structural Strength

- Product Family Boundary
- Access Layer Separation
- Public Web and Terminal Responsibility Split
- Markets Table Comparison
- Terminal Workspace as Professional Environment
- Terminal News Monitoring Stack
- Portfolio & Risk Analytics Responsibility
- Data Integration Boundary

## 주요 User Friction

- Terminal 접근 불가
- Function Code 학습 비용
- Workspace 구성 복잡성
- Security Context Linking 미확인
- Public / Terminal Context 단절
- Quote Full Body 제한
- Institutional Contract Boundary
- Enterprise Entitlement Complexity
- Excel / API Field Lineage 미확인

## Context Preservation

Context Preservation Pattern은 8개다. Public Market category와 Quote ticker는 Partial이며, Security Context, Launchpad Workspace, Worksheet, IB chat state, Portfolio / Position은 Product Description 또는 Not Verified 상태다.

## Context Loss

Context Loss 지점은 14개다. 주요 지점은 Article return path, Search result context, Markets row origin, Terminal Security Context, Command Entry parsing, Launchpad restore, Anywhere continuity, Excel / API lineage다.

## Candidate Principle 요약

Bloomberg Candidate Principle 총수는 12개다.

| Type | 수 |
| --- | ---: |
| Existing Principle Evidence Added | 10 |
| New Candidate Principle | 2 |

신규 Principle ID는 `P-028 ~ P-029`다.

## Cross Benchmark 분류

### Shared Pattern

- Market / Portal Entry
- Source / Freshness Signal
- Context Preservation risk
- Command interface candidate
- Table / Chart role separation
- Repeated row / table grammar

### Variant Pattern

- Public Web vs Terminal Responsibility Split
- Function-oriented Navigation vs Page Navigation
- Workspace-centered Workflow vs Quote-centered Research
- Professional Workflow Density vs Public Information Density
- Embedded News vs External Article Routing

### Benchmark-specific Pattern

- Terminal Function Model
- Product Family Layering
- Enterprise Entitlement Model
- Data License / API / B-PIPE Integration
- Instant Bloomberg Collaboration

### Potential Contradiction

직접 반대 Evidence는 생성하지 않았다.

### Insufficient Evidence

- Command Autocomplete
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

## Product Hypothesis 영향

Product Hypothesis Evidence는 15개다.

| Evidence Type | 수 |
| --- | ---: |
| Supporting | 5 |
| Variant | 5 |
| Contradicting | 0 |
| Neutral | 0 |
| Insufficient | 5 |

## 남아 있는 Open Question

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

## Evidence 품질

Bloomberg Evidence는 Public Web Observation과 Official Product Description이 섞여 있다. Product Boundary, Public / Terminal responsibility split, Markets Table은 비교 가능한 Evidence다. Terminal Workflow, Security Context, Workspace Persistence, Collaboration Context, Data Lineage는 Scope Limitation이 필요하다.

## Final Quality Review 상태

Final Quality Review Passed.

## Commit Readiness

Ready to Commit.

## 다음 단계

다음 단계는 별도 지시가 있을 때 SaveTicker Benchmark 또는 Cross Benchmark Synthesis로 진행한다.
