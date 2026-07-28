# Component Style Rules

## 문서 목적

이 문서는 DATE Visual Language 1.0에서 product element별 style responsibility를 정의한다.

이 문서는 build-ready element specification을 작성하지 않는다. 여기서 component는 visual role category를 의미한다.

## Style Rule Summary

| Metric | Count |
| --- | ---: |
| Product Element Style Rule | 14 |
| Typography Role | 8 |
| Icon Rule | 4 |
| AI Rule | 6 |
| Workspace Rule | 4 |
| Evidence Rule | 6 |
| Architecture Alignment | 15 |
| Principle Alignment | 12 |

## Product Element Style Rule

| Product Element | Visual Rule | Reason | Related Principle |
| --- | --- | --- | --- |
| Button | may use soft tactile affordance | user action changes state | DPP-003 |
| Segment | selected state must be clear | mode switch changes context | DPP-004 |
| Toggle | on/off state must be explicit | state ownership matters | DPP-008 |
| Slider | control value must feel adjustable | user is changing criteria | DPP-002 |
| Search | must show resolvable intent | Search resolves target before handoff | DPP-003 |
| Filter | must keep criteria-output relation visible | Discovery needs comparable set | DPP-002 |
| Chip | must show selected or removable state | Tag and Collection need ownership clarity | DPP-008 |
| Tab | local context only | Entity owns local modes | DPP-004 |
| Table | flat and readable | data reading outranks decoration | DPP-002 |
| Chart | flat and neutral | chart does not interpret alone | DPP-004, DPP-005 |
| News List | flat scan pattern | headline scan needs speed | DPP-006 |
| Evidence Card | layered boundary | Evidence owns Source and Freshness | DPP-005 |
| Workspace Shell | glass composition layer | Workspace composes without owning truth | DPP-010 |
| AI Assistant | floating bounded layer | AI never replaces Evidence | DPP-006 |

## Typography Philosophy

Typography role is semantic.

Font family and scale are not defined in this phase.

| Typography Role | Responsibility |
| --- | --- |
| Display | rare product-level orientation |
| Headline | major Information group title |
| Title | local Information section title |
| Body | explanation and reading text |
| Label | control, state, and metadata labels |
| Caption | Source, Freshness, limitation support |
| Data | tabular and structured values |
| Metric | high-salience quantitative value |

## Icon Philosophy

| Icon Rule | Meaning |
| --- | --- |
| Outline First | default icon state should stay quiet. |
| Filled for Active | active or selected state can use filled style. |
| Simple Geometry | geometry should communicate role quickly. |
| No Decorative Icons | icons must not exist only for decoration. |

## AI Rule

| AI Responsibility | Rule |
| --- | --- |
| Explain | AI can explain Evidence context. |
| Compare | AI can compare visible Information. |
| Summarize | AI can reduce reading cost. |
| Reason | AI can show reasoning steps as interpretation. |
| Context | AI can carry selected Entity and Evidence context. |
| No Decision | AI must not make final user decision. |

## Workspace Rule

| Workspace Area | Visual Role |
| --- | --- |
| Dashboard | return and overview context |
| Research | Evidence and Entity working context |
| Monitor | observed state context |
| Journal | user reasoning and revisit context |

## Evidence Rule

| Evidence Element | Visual Role |
| --- | --- |
| Evidence Card | item boundary |
| Evidence Timeline | time order |
| Evidence Graph | relation |
| Evidence Tree | nested Source or method |
| Evidence Score | strength cue with boundary |
| Evidence Compare | competing Evidence |

## Do Not Style

| Do Not | Reason |
| --- | --- |
| Do not style table cells as tactile controls. | data must remain flat. |
| Do not make AI visually equal to Evidence. | AI is interpretation. |
| Do not make Workspace own Source style. | Workspace is composition. |
| Do not use icon decoration for trust. | trust requires Source and boundary. |

## Phase Boundary

This document defines product element style responsibility only.

It does not define reusable production elements or asset files.
