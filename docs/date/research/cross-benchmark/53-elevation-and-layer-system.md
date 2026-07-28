# Elevation And Layer System

## 문서 목적

이 문서는 DATE Visual Language 1.0의 elevation, layer, soft neumorphism, glass, chart, Evidence, Workspace rules를 정의한다.

수치와 token은 확정하지 않는다. Layer는 responsibility를 표현하기 위한 visual role이다.

## Layer Summary

| Metric | Count |
| --- | ---: |
| Elevation Layer | 6 |
| Soft Neumorphism Rule | 15 |
| Glass Rule | 6 |
| Chart Rule | 4 |
| Evidence Rule | 6 |
| Workspace Rule | 4 |
| Shadow Role | 4 |
| Radius Role | 6 |
| Spacing Role | 8 |

## Elevation Philosophy

| Layer | Name | Purpose | Owns | Does Not Own |
| --- | --- | --- | --- | --- |
| Layer 0 | Background | calm product environment | global continuity | data hierarchy |
| Layer 1 | Flat Data | financial reading surface | data, table, chart, list | control affordance |
| Layer 2 | Soft Control | tactile action affordance | button, toggle, filter, search control | data container |
| Layer 3 | Glass | navigation and overlay context | Navigation, overlay, panel separation | dense data |
| Layer 4 | Floating Workspace | reusable composition context | Workspace, restored context, journal shell | Evidence truth |
| Layer 5 | AI Assistant | bounded assistive layer | explain, compare, summarize, reason | decision ownership |

## Soft Neumorphism Rule

| Rule Type | Element | Rule |
| --- | --- | --- |
| Allowed | Button | can use soft raised or pressed affordance when action changes state |
| Allowed | Segment | can show selected state physically |
| Allowed | Toggle | can show on/off state physically |
| Allowed | Slider | can use tactile control depth |
| Allowed | Dial | can use physical manipulation metaphor |
| Allowed | Workspace Switch | can show mode switch affordance |
| Allowed | Search | can show input affordance without becoming decorative |
| Allowed | Filter | can show active filtering state |
| Allowed | Chip | can show removable or selected state |
| Allowed | Tab | can show local mode selection |
| Prohibited | Chart | chart must remain flat and minimal |
| Prohibited | Table | table readability must stay flat |
| Prohibited | News List | headline scanning must stay flat |
| Prohibited | Heatmap | color and density must not be distorted |
| Prohibited | Portfolio Grid | financial numbers must remain readable |

## Glass Rule

| Rule | Meaning |
| --- | --- |
| Glass may be used for Navigation context. | Navigation can float without owning data. |
| Glass may be used for Workspace shell. | Workspace is composition, not truth owner. |
| Glass may be used for Floating AI. | AI is assistive and separate. |
| Glass may be used for Overlay. | temporary context can sit above data. |
| Glass may be used for Panel. | secondary context can be layered. |
| Glass must not be used for Data Card. | data readability and Evidence clarity come first. |

## Chart Rule

| Rule | Meaning |
| --- | --- |
| Chart stays flat. | chart does not need tactile styling. |
| Chart stays minimal. | chart should not compete with Evidence or Metric reading. |
| Chart keeps high contrast. | trend and threshold must remain clear. |
| Chart uses low decoration. | decoration must not imply interpretation. |

## Evidence Layer Rule

| Evidence Element | Layer Responsibility |
| --- | --- |
| Evidence Card | groups one judgment-supporting item and its boundary |
| Evidence Timeline | orders Evidence and Event by time |
| Evidence Graph | shows relation among Entity, Evidence, Source, Event |
| Evidence Tree | shows nested Source and method structure |
| Evidence Score | indicates Evidence strength only when Source boundary is explicit |
| Evidence Compare | shows competing Evidence without hiding uncertainty |

## Workspace Rule

| Workspace Area | Role |
| --- | --- |
| Dashboard | overview and return context |
| Research | reusable Evidence and Entity context |
| Monitor | observed state and trigger context |
| Journal | user reasoning and revisit context |

Workspace uses Glass Layer but must not own Evidence truth or Entity identity.

## Shadow Philosophy

| Shadow Role | Meaning |
| --- | --- |
| Flat | no elevation for data reading |
| Soft | tactile affordance for controls |
| Glass | layer separation for navigation and overlay context |
| Floating | assistant or workspace context above current task |

## Radius Role

| Radius Role | Meaning |
| --- | --- |
| Button | action affordance |
| Input | editable or resolvable intent |
| Card | grouped Information without excessive softness |
| Panel | layered secondary context |
| Dialog | temporary high-attention boundary |
| Chip | small selected or removable state |

## Spacing Role

| Spacing Unit | Role |
| --- | --- |
| 4 | micro relation and tight data pairing |
| 8 | compact grouping |
| 12 | control and label grouping |
| 16 | standard Information separation |
| 24 | section separation |
| 32 | major group separation |
| 48 | domain separation |
| 64 | major workspace or reading break |

## Phase Boundary

This document defines layer roles only.

It does not define numeric elevation, shadow values, radius values, spacing values, or production-ready specifications.
