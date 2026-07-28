# DATE Product Principles

## 문서 목적

이 문서는 Phase 9 범위에서 DATE Product Constitution으로 사용할 Product Principle을 정의한다.

이 문서는 Benchmark를 설명하지 않는다. Product Principle은 Architecture Domain과 Pattern을 Product Rule로 일반화한 것이다. Registry는 수정하지 않는다. 신규 Candidate Principle은 만들지 않는다.

## Principle Summary

| Metric | Count |
| --- | ---: |
| Product Principle | 12 |
| Critical Priority | 5 |
| High Priority | 5 |
| Medium Priority | 2 |
| Low Priority | 0 |
| Architecture Domain Coverage | 15 |
| High Confidence Principle | 5 |
| Medium Confidence Principle | 7 |

## Rule Format

각 Principle의 `Rule`은 명령문으로 작성한다.

허용 표현:

- `The system must ...`
- `The product should ...`
- `Users must always ...`

금지 범위:

- UI layout
- Wireframe
- Navigation design
- Entity Model
- Information Architecture
- implementation detail

## DPP-001 Entry Must Produce Actionable Direction

| Field | 내용 |
| --- | --- |
| Principle Name | Entry Must Produce Actionable Direction |
| Priority | Critical |
| Purpose | first entry에서 user가 다음 task를 선택할 수 있게 한다. |
| Problem | Entry가 broad content만 제공하면 user는 where to start problem을 겪는다. |
| Rule | The system must make every primary entry point produce an actionable next direction. |
| Why It Exists | Entry Architecture는 Market orientation과 active route를 함께 제공해야 Discovery, Search, Evidence path로 이어질 수 있다. |
| Expected User Benefit | Market Orientation, Entry Cost Reduction, Discoverability |
| Trade-off | Entry에 route가 많아지면 cognitive load와 content overload가 생길 수 있다. |
| Applies To | Entry Architecture, Discovery Architecture, Search Architecture |
| Does Not Apply To | deep Evidence validation, saved state persistence, Workspace composition |
| Required Domain | AD-001 Entry Architecture |
| Required Pattern | PT-001, PT-003, PT-026 |
| Required Dependency | AD-001 -> AD-002, AD-001 -> AD-003 |
| Architecture Alignment | Entry owns first task framing and route exposure. |
| Success Criteria | user can move from first entry to Discovery, Search, or Evidence context without guessing the Product responsibility. |
| Failure Condition | Entry becomes a passive content page without clear action route. |
| Future Validation | logged-in entry and public entry responsibility must be compared. |
| Evidence Quality | Mixed |
| Confidence | Medium |

### Do Not Do

- Do not make Entry a generic content container.
- Do not let Entry own deep Evidence validation.
- Do not hide the difference between passive reading and active research entry.

## DPP-002 Discovery Must Produce Comparable Candidate Sets

| Field | 내용 |
| --- | --- |
| Principle Name | Discovery Must Produce Comparable Candidate Sets |
| Priority | Critical |
| Purpose | broad candidate space를 comparison-ready set으로 줄인다. |
| Problem | user는 많은 Stock, Company, Event, content candidate를 같은 basis로 비교해야 한다. |
| Rule | The system must make Discovery produce comparable candidate sets, not isolated items. |
| Why It Exists | Discovery Architecture의 역할은 final decision이 아니라 candidate narrowing과 comparison grammar다. |
| Expected User Benefit | Comparison Efficiency, Discoverability, Decision Speed |
| Trade-off | filter control이 강할수록 novice cost가 커질 수 있다. |
| Applies To | Discovery Architecture, Calendar Architecture, Search Architecture |
| Does Not Apply To | final judgment, provider methodology, personal saved state |
| Required Domain | AD-002 Discovery Architecture |
| Required Pattern | PT-013, PT-022, PT-025, PT-018 |
| Required Dependency | AD-001 -> AD-002, AD-002 -> AD-004 |
| Architecture Alignment | Discovery owns candidate narrowing and result grammar. |
| Success Criteria | candidate output preserves filter context and supports comparison. |
| Failure Condition | result output is unstructured, non-comparable, or detached from filter context. |
| Future Validation | saved filter and result row context must be validated. |
| Evidence Quality | High |
| Confidence | High |

### Do Not Do

- Do not treat Discovery as final decision.
- Do not separate filter change from result feedback without context.
- Do not drop candidate criteria when handing off to Entity context.

## DPP-003 Search Must Resolve Intent Before Routing

| Field | 내용 |
| --- | --- |
| Principle Name | Search Must Resolve Intent Before Routing |
| Priority | High |
| Purpose | known target을 Entity나 task로 정확히 연결한다. |
| Problem | user가 ticker, company name, command intent를 입력해도 target type이 ambiguous할 수 있다. |
| Rule | The system must resolve user intent before routing Search output to a Domain. |
| Why It Exists | Search Architecture는 broad content finder가 아니라 Entity resolver와 expert entry variant를 포함한다. |
| Expected User Benefit | Decision Speed, Learnability, error reduction |
| Trade-off | disambiguation step은 expert user에게 friction이 될 수 있다. |
| Applies To | Search Architecture, Entity Architecture, Workflow Architecture |
| Does Not Apply To | final workflow execution, personal command history until validated |
| Required Domain | AD-003 Search Architecture |
| Required Pattern | PT-002, PT-017 |
| Required Dependency | AD-001 -> AD-003, AD-003 -> AD-004 |
| Architecture Alignment | Search owns query resolution but does not own Entity lifecycle. |
| Success Criteria | Search result keeps target type visible before Entity or task handoff. |
| Failure Condition | ambiguous query routes directly to wrong Entity type or task Surface. |
| Future Validation | autocomplete, recent command, result grouping need validation. |
| Evidence Quality | Mixed |
| Confidence | Medium |

### Do Not Do

- Do not route ambiguous Search intent silently.
- Do not merge retail Search and professional command behavior without scope.
- Do not let Search own full workflow execution.

## DPP-004 Entity Context Must Own Local Analysis Modes

| Field | 내용 |
| --- | --- |
| Principle Name | Entity Context Must Own Local Analysis Modes |
| Priority | Critical |
| Purpose | 같은 Entity에 대한 local analysis mode를 하나의 context 아래 둔다. |
| Problem | user는 같은 Stock, Company, Security에 대한 Chart, Metric, News, Document context를 흩어져 확인한다. |
| Rule | The system must make Entity context the owner of local analysis modes. |
| Why It Exists | Entity Architecture는 Product의 core object context를 유지하고 Evidence, Workflow, Research로 handoff한다. |
| Expected User Benefit | Context Preservation, Information Density Control, Decision Speed |
| Trade-off | Entity Hub가 과도하게 dense해지면 overload가 생길 수 있다. |
| Applies To | Entity Architecture, Evidence Architecture, Research Architecture |
| Does Not Apply To | Source methodology, Watchlist persistence, provider policy |
| Required Domain | AD-004 Entity Architecture |
| Required Pattern | PT-012, PT-023, PT-015 |
| Required Dependency | AD-003 -> AD-004, AD-004 -> AD-005 |
| Architecture Alignment | Entity owns object context and local mode grouping. |
| Success Criteria | local modes preserve selected Entity type and do not blur Stock, Company, Security boundary. |
| Failure Condition | local modes display adjacent content without stable Entity owner. |
| Future Validation | Stock, Company, Security boundary must be clarified. |
| Evidence Quality | High |
| Confidence | High |

### Do Not Do

- Do not make each analysis mode define its own Entity.
- Do not hide Entity type when switching local modes.
- Do not let Watchlist or Portfolio redefine Entity identity.

## DPP-005 Evidence Must Preserve Source, Freshness, And Boundary

| Field | 내용 |
| --- | --- |
| Principle Name | Evidence Must Preserve Source, Freshness, And Boundary |
| Priority | Critical |
| Purpose | judgment context에서 Source, Freshness, method, Original Evidence path를 유지한다. |
| Problem | Source나 timing이 없는 data and content는 trust calibration이 어렵다. |
| Rule | The system must preserve Source, Freshness, and Evidence boundary wherever information can influence judgment. |
| Why It Exists | Evidence Architecture는 Source cue, methodology, provider label, external path를 분리해 trust boundary를 만든다. |
| Expected User Benefit | Trust Calibration, Evidence Traceability, Decision Speed |
| Trade-off | complete Traceability를 모두 inline으로 노출하면 complexity가 커질 수 있다. |
| Applies To | Evidence Architecture, Research Architecture, Policy Architecture |
| Does Not Apply To | chart rendering, community opinion, ranking algorithm |
| Required Domain | AD-005 Evidence Architecture |
| Required Pattern | PT-007, PT-020, PT-024, PT-027 |
| Required Dependency | AD-004 -> AD-005 |
| Architecture Alignment | Evidence owns trust boundary and Original Evidence path. |
| Success Criteria | user can distinguish Source Visibility, methodology support, provider identity, and Original Evidence path. |
| Failure Condition | Source cue is displayed as if it were complete Traceability. |
| Future Validation | item-level Source and method access need validation. |
| Evidence Quality | Mixed |
| Confidence | Medium |

### Do Not Do

- Do not hide Source or Freshness.
- Do not present provider identity as complete Traceability.
- Do not remove the Original Evidence path when external validation exists.

## DPP-006 Interpretation Must Never Replace Evidence

| Field | 내용 |
| --- | --- |
| Principle Name | Interpretation Must Never Replace Evidence |
| Priority | Critical |
| Purpose | Summary, Translation, generated interpretation을 Original Evidence와 분리한다. |
| Problem | user는 compressed or translated content를 Original Evidence로 오인할 수 있다. |
| Rule | The product should reduce reading cost with interpretation layers, but the system must never let interpretation replace Evidence. |
| Why It Exists | Interpretation Layer는 reading cost를 줄일 수 있지만 Evidence Architecture에 종속되어야 한다. |
| Expected User Benefit | Reading Cost Reduction, Trust Calibration |
| Trade-off | boundary label과 Original Evidence path를 유지하면 reading speed가 일부 줄어들 수 있다. |
| Applies To | Interpretation Layer, Evidence Architecture, Research Architecture |
| Does Not Apply To | Original Evidence creation, Source truth, accuracy scoring |
| Required Domain | AD-006 Interpretation Layer, AD-005 Evidence Architecture |
| Required Pattern | PT-030, PT-008 |
| Required Dependency | AD-005 -> AD-006 |
| Architecture Alignment | Interpretation consumes Evidence and produces boundary-labeled interpretation context. |
| Success Criteria | every interpretation output keeps visible relation to Original Evidence and Source cue. |
| Failure Condition | summary, translation, or generated output becomes standalone Evidence. |
| Future Validation | methodology, update time, correction policy need validation. |
| Evidence Quality | Mixed |
| Confidence | Medium |

### Do Not Do

- Do not show Summary as Evidence.
- Do not show Translation as Original Evidence.
- Do not hide methodology gaps behind generated interpretation.

## DPP-007 Workflow Must Carry Entity And Evidence Context

| Field | 내용 |
| --- | --- |
| Principle Name | Workflow Must Carry Entity And Evidence Context |
| Priority | High |
| Purpose | task transition cost를 줄이되 Entity and Evidence context를 유지한다. |
| Problem | user가 Chart, Report, Monitoring, Workspace task로 전환할 때 context를 잃을 수 있다. |
| Rule | The system must carry Entity and Evidence context across workflow handoffs. |
| Why It Exists | Workflow Architecture는 task chain을 owns하지만 Source truth나 Workspace persistence를 owns하지 않는다. |
| Expected User Benefit | Workflow Efficiency, Context Preservation, Professional Scalability |
| Trade-off | context handoff contract가 많아질수록 Domain coupling이 커질 수 있다. |
| Applies To | Workflow Architecture, Context Preservation, Workspace Architecture |
| Does Not Apply To | full Workspace implementation, enterprise access policy |
| Required Domain | AD-007 Workflow Architecture |
| Required Pattern | PT-029, PT-017, PT-009, PT-022 |
| Required Dependency | AD-004 -> AD-007, AD-005 -> AD-007 |
| Architecture Alignment | Workflow owns task handoff and transition contract. |
| Success Criteria | next task can identify prior Entity and Evidence context. |
| Failure Condition | task transition starts a new isolated context without origin reference. |
| Future Validation | actual transition cost and context propagation need validation. |
| Evidence Quality | Mixed |
| Confidence | Medium |

### Do Not Do

- Do not optimize task speed by dropping Evidence context.
- Do not make professional command entry mandatory for all users.
- Do not let Workflow own Workspace persistence.

## DPP-008 Monitoring Must Be User-owned And State-aware

| Field | 내용 |
| --- | --- |
| Principle Name | Monitoring Must Be User-owned And State-aware |
| Priority | High |
| Purpose | user-owned Monitoring state를 반복 Observation과 revisit에 연결한다. |
| Problem | Watchlist, Alert, Notification, saved state가 섞이면 ownership이 불명확하다. |
| Rule | The system must make Monitoring state user-owned, scoped, and separable from other saved state. |
| Why It Exists | Monitoring Architecture는 observed set을 owns하지만 Notification delivery와 Personal Continuity를 모두 owns하지 않는다. |
| Expected User Benefit | Monitoring, Personal Continuity, revisit speed |
| Trade-off | state scope를 세분화하면 setup and management cost가 늘 수 있다. |
| Applies To | Monitoring Architecture, Notification Architecture, Personal Continuity |
| Does Not Apply To | full alert rule engine, push payload detail, Entity definition |
| Required Domain | AD-008 Monitoring Architecture, AD-009 Personal Continuity |
| Required Pattern | PT-006, PT-010, PT-014 |
| Required Dependency | AD-004 -> AD-008, AD-008 -> AD-009 |
| Architecture Alignment | Monitoring owns observed state, Personal Continuity owns saved intent. |
| Success Criteria | Watchlist, alert candidate, saved state, notification candidate have distinct owners. |
| Failure Condition | Watchlist becomes a catch-all state container. |
| Future Validation | research state persistence and alert payload need validation. |
| Evidence Quality | Mixed |
| Confidence | Medium |

### Do Not Do

- Do not treat Watchlist as all Personal Continuity.
- Do not let Notification own Monitoring trigger logic.
- Do not persist user state without owner and scope.

## DPP-009 Context Preservation Must Be Explicit At Boundaries

| Field | 내용 |
| --- | --- |
| Principle Name | Context Preservation Must Be Explicit At Boundaries |
| Priority | High |
| Purpose | Surface, external path, task transition boundary에서 origin context를 보존한다. |
| Problem | user가 Evidence validation이나 task transition 중 origin을 잃을 수 있다. |
| Rule | The system must make Context Preservation explicit at every Domain boundary where context can be lost. |
| Why It Exists | Context Preservation owns transition context and origin reference, not external product behavior. |
| Expected User Benefit | Context Preservation, Evidence Traceability, reduced rework |
| Trade-off | explicit context markers can add visible complexity. |
| Applies To | Context Preservation, Evidence Architecture, Workflow Architecture |
| Does Not Apply To | external site behavior, all Workspace persistence |
| Required Domain | AD-010 Context Preservation |
| Required Pattern | PT-009, PT-024, PT-021 |
| Required Dependency | AD-004 -> AD-010, AD-010 -> AD-005 |
| Architecture Alignment | Context Preservation owns transition context and return anchor candidate. |
| Success Criteria | transition output carries origin reference, selected Entity, and Source path where relevant. |
| Failure Condition | external or internal transition creates isolated context with no return anchor. |
| Future Validation | return anchor and state restoration need validation. |
| Evidence Quality | Mixed |
| Confidence | Medium |

### Do Not Do

- Do not assume external Source will preserve DATE context.
- Do not hide origin context during Surface transition.
- Do not make Context Preservation depend on UI back behavior only.

## DPP-010 Workspace Must Compose States Without Owning Truth

| Field | 내용 |
| --- | --- |
| Principle Name | Workspace Must Compose States Without Owning Truth |
| Priority | Medium |
| Purpose | reusable research composition을 만들되 Source truth와 Entity definition을 owns하지 않는다. |
| Problem | Dashboard, Chart, Widget, Layout state가 Source, Entity, user state ownership을 흐릴 수 있다. |
| Rule | The product should let Workspace compose reusable states, but the system must not let Workspace own Evidence truth or Entity identity. |
| Why It Exists | Workspace Architecture는 composition and layout state candidate를 owns하지만 Source method와 command model을 owns하지 않는다. |
| Expected User Benefit | Workflow Efficiency, Personal Continuity, expert reuse |
| Trade-off | Workspace composition은 setup cost and restore complexity를 만든다. |
| Applies To | Workspace Architecture, Personal Continuity, Workflow Architecture |
| Does Not Apply To | Source method, command model, Product Family layer |
| Required Domain | AD-011 Workspace Architecture |
| Required Pattern | PT-016, PT-011, PT-021 |
| Required Dependency | AD-009 -> AD-011 |
| Architecture Alignment | Workspace consumes saved state and Entity context, produces composition candidate. |
| Success Criteria | workspace state maps to owner types and does not redefine Source or Entity. |
| Failure Condition | Workspace becomes a hidden owner for Evidence, Entity, and user state. |
| Future Validation | linked context and dashboard boundary need validation. |
| Evidence Quality | Mixed |
| Confidence | Medium |

### Do Not Do

- Do not make Workspace the owner of Source truth.
- Do not make Workspace redefine Entity identity.
- Do not assume linked context before validation.

## DPP-011 Opinion And Research Must Keep Evidence Boundaries

| Field | 내용 |
| --- | --- |
| Principle Name | Opinion And Research Must Keep Evidence Boundaries |
| Priority | High |
| Purpose | Community opinion, provider research, document, estimate content의 responsibility를 분리한다. |
| Problem | reaction, report label, provider identity, estimate label이 Evidence와 혼동될 수 있다. |
| Rule | The system must separate opinion, provider research, document reference, and Evidence boundary before they influence user judgment. |
| Why It Exists | Community Architecture and Research Architecture both consume Evidence context but do not own Source truth. |
| Expected User Benefit | Trust Calibration, Discussion Awareness, Evidence Traceability |
| Trade-off | boundary separation can make content feel fragmented. |
| Applies To | Community Architecture, Research Architecture, Evidence Architecture |
| Does Not Apply To | editorial ranking, raw Market data infrastructure, moderation policy until validated |
| Required Domain | AD-012 Community Architecture, AD-013 Research Architecture |
| Required Pattern | PT-005, PT-027, PT-015, PT-019, PT-020 |
| Required Dependency | AD-004 -> AD-012, AD-005 -> AD-013 |
| Architecture Alignment | Community owns opinion context; Research owns provider context; Evidence owns trust boundary. |
| Success Criteria | user can distinguish opinion, provider-labeled research, document reference, and Evidence cue. |
| Failure Condition | reaction count or provider label is displayed as if it were Evidence. |
| Future Validation | moderation, provider method, revision timestamp need validation. |
| Evidence Quality | Medium |
| Confidence | Medium |

### Do Not Do

- Do not display Reaction as Evidence.
- Do not let provider label replace method detail.
- Do not merge Community opinion with Financial Evidence.

## DPP-012 Time And Delivery Must Depend On Evidence Context

| Field | 내용 |
| --- | --- |
| Principle Name | Time And Delivery Must Depend On Evidence Context |
| Priority | Medium |
| Purpose | Calendar and Notification context를 Evidence and Monitoring context에 종속시킨다. |
| Problem | Event timing이나 Notification delivery가 Source, trigger, Entity 없이 나타나면 판단 context가 약하다. |
| Rule | The system must make time-based and delivery-based signals depend on visible Evidence and Monitoring context. |
| Why It Exists | Calendar Architecture and Notification Architecture are useful only when date, trigger, Entity, and Source relation are clear. |
| Expected User Benefit | Timeline Awareness, Monitoring, Personal Continuity |
| Trade-off | trigger and Source details may make lightweight notification or calendar entry heavier. |
| Applies To | Calendar Architecture, Notification Architecture, Monitoring Architecture |
| Does Not Apply To | full economic calendar product, alert rule engine, push payload detail until validated |
| Required Domain | AD-014 Calendar Architecture, AD-015 Notification Architecture |
| Required Pattern | PT-018, PT-026, PT-006, PT-010, PT-014 |
| Required Dependency | AD-002 -> AD-014, AD-008 -> AD-015 |
| Architecture Alignment | Calendar owns time context; Notification owns delivery boundary; Monitoring owns observed state. |
| Success Criteria | Event and notification candidates preserve trigger, Entity, Source, and timing status where available. |
| Failure Condition | Event or notification appears without trigger context or Evidence boundary. |
| Future Validation | Event relation, alert payload, trigger Source need validation. |
| Evidence Quality | Medium |
| Confidence | Medium |

### Do Not Do

- Do not treat Calendar Event as verified Evidence without Source.
- Do not let Notification hide trigger origin.
- Do not describe app-only delivery as observed behavior without validation.

## Architecture Coverage Matrix

| Architecture Domain | Covered By |
| --- | --- |
| AD-001 Entry Architecture | DPP-001 |
| AD-002 Discovery Architecture | DPP-002 |
| AD-003 Search Architecture | DPP-003 |
| AD-004 Entity Architecture | DPP-004 |
| AD-005 Evidence Architecture | DPP-005, DPP-006, DPP-011 |
| AD-006 Interpretation Layer | DPP-006 |
| AD-007 Workflow Architecture | DPP-007 |
| AD-008 Monitoring Architecture | DPP-008, DPP-012 |
| AD-009 Personal Continuity | DPP-008, DPP-010 |
| AD-010 Context Preservation | DPP-009 |
| AD-011 Workspace Architecture | DPP-010 |
| AD-012 Community Architecture | DPP-011 |
| AD-013 Research Architecture | DPP-011 |
| AD-014 Calendar Architecture | DPP-012 |
| AD-015 Notification Architecture | DPP-012 |

## Phase Boundary

This document defines DATE Product Principles only.

It does not define Entity Model, Information Architecture, Navigation, Wireframe, UI, implementation, or Registry updates.
