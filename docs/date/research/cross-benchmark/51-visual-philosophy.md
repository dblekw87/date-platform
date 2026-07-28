# Visual Philosophy

## 문서 목적

이 문서는 Phase 14 범위에서 DATE Visual Language 1.0의 철학과 design direction을 정의한다.

이 문서는 fixed production values나 build-ready artifacts를 작성하지 않는다. Registry는 수정하지 않는다.

## Visual Language Summary

| Metric | Count |
| --- | ---: |
| Design Philosophy | 8 |
| Brand Personality | 7 |
| Visual Keyword | 10 |
| Visual Principle | 8 |
| Do Not Design | 8 |
| Architecture Alignment | 15 |
| Principle Alignment | 12 |
| Open Question | 12 |

## Design Philosophy

| Philosophy | Meaning | Visual Responsibility | Architecture Alignment | Related Principle |
| --- | --- | --- | --- | --- |
| Data -> Flat | data must remain direct and low decoration | financial numbers, tables, lists stay flat | AD-002, AD-004 | DPP-002, DPP-004 |
| Evidence -> Layered | Evidence must show responsibility and boundary | Source, Freshness, Original Evidence, method use layered hierarchy | AD-005 | DPP-005 |
| Control -> Soft Neumorphism | interactive controls may feel physical and calm | control affordance can use soft raised or pressed feeling | AD-003, AD-008 | DPP-003, DPP-008 |
| Navigation -> Glass | navigation context may be translucent and spatial | Navigation can float above data without owning data | AD-001, AD-010 | DPP-001, DPP-009 |
| Chart -> Minimal | chart must not compete with interpretation | chart line, axis, marker, range stay neutral | AD-004, AD-005 | DPP-004, DPP-005 |
| Monitoring -> High Contrast | monitoring state must be instantly scannable | alert, warning, change, status need strong contrast | AD-008, AD-015 | DPP-008, DPP-012 |
| AI -> Floating Layer | AI assistance must remain optional and bounded | AI explains, compares, summarizes, reasons in a separate layer | AD-006 | DPP-006 |
| Evidence-first over decoration | visual priority follows decision clarity | decoration never outranks decision speed or Evidence Traceability | AD-005, AD-010 | DPP-005, DPP-009 |

## Brand Personality

| Personality | Meaning | Design Implication |
| --- | --- | --- |
| Calm | judgment pressure를 낮춘다. | reduce visual noise and urgency inflation |
| Professional | 반복 사용에 견딘다. | avoid playful or editorial excess |
| Focused | user attention을 한 판단 단위에 둔다. | make primary context clear |
| Scientific | claims and Evidence are separable. | show boundary, method, and uncertainty |
| Reliable | state and Source should feel stable. | use consistent hierarchy and status language |
| Readable | dense Information must remain legible. | prioritize spacing role and typography role |
| Precise | every visual signal must have a responsibility. | avoid decorative ambiguity |

## Visual Keywords

| Keyword | Role |
| --- | --- |
| Calm | stress reduction |
| Professional | sustained work context |
| Focused | primary task clarity |
| Scientific | Evidence and method boundary |
| Reliable | trust calibration |
| Readable | dense Information access |
| Minimal | low decoration |
| Layered | responsibility hierarchy |
| Soft | control comfort |
| Precise | clear state and boundary |

## Visual Principles

| Visual Principle | Rule | Why It Exists | Trade-off | Related Principle |
| --- | --- | --- | --- | --- |
| Information First | The system must make Information hierarchy visible before decorative identity. | DATE exists for decision speed and clarity. | less expressive brand surface | DPP-001, DPP-002 |
| Decoration Never Beats Data | The product must not let decoration reduce data readability. | Data is primary material for decision. | less dramatic presentation | DPP-002, DPP-004 |
| Evidence Before Opinion | The system must show Evidence boundary before opinion or reaction. | opinion can distort judgment when visually equal to Evidence. | slower community scanning | DPP-005, DPP-011 |
| Layer Shows Responsibility | The product should use visual layers to show ownership and responsibility. | Source, AI, Workspace, Navigation have different ownership. | more layer management | DPP-005, DPP-009 |
| Controls Feel Physical | Control affordance should be tactile only where user action changes state. | soft neumorphism can clarify action without decorating data. | risk of overuse | DPP-003, DPP-008 |
| Charts Stay Neutral | Chart visuals must stay minimal and high clarity. | chart should reveal change, not brand style. | less emotional chart identity | DPP-004, DPP-005 |
| Context Must Never Be Lost | The system must keep origin, selected Entity, and Evidence state visually traceable. | decision flow depends on context preservation. | added context markers | DPP-009 |
| Motion Supports Understanding | Motion must clarify state, relationship, or update. | motion without meaning weakens focus. | reduced decorative motion | DPP-007, DPP-012 |

## Do Not Design

| Do Not | Reason |
| --- | --- |
| Do not make DATE a pretty finance magazine. | editorial beauty can obscure Evidence boundary. |
| Do not use decoration as trust signal. | trust must come from Source, Freshness, and boundary. |
| Do not apply soft neumorphism to data containers. | financial data needs flat readability. |
| Do not apply glass to dense data. | blur and translucency weaken scanning. |
| Do not make charts brand-heavy. | chart should stay neutral. |
| Do not let AI look like final decision. | AI is assistive interpretation. |
| Do not use motion for delight only. | motion must support understanding. |
| Do not hide Context Preservation markers. | user must see origin and handoff state. |

## Open Questions

| Open Question ID | Question | Related Area |
| --- | --- | --- |
| VQ-001 | DATE visual density threshold는 어디까지 허용되는가 | Information First |
| VQ-002 | Evidence layer depth는 몇 단계까지 읽기 부담을 만들지 않는가 | Evidence Layer |
| VQ-003 | Control physicality와 professional restraint의 균형은 어디인가 | Soft Neumorphism |
| VQ-004 | Glass Navigation이 dense data와 충돌하지 않는 boundary는 무엇인가 | Glass |
| VQ-005 | Chart contrast와 neutrality의 균형은 무엇인가 | Chart |
| VQ-006 | Monitoring contrast가 anxiety를 만들지 않는 기준은 무엇인가 | Monitoring |
| VQ-007 | AI Floating Layer가 과도하게 주목받지 않는 기준은 무엇인가 | AI |
| VQ-008 | Workspace glass layer가 ownership을 흐리지 않는 기준은 무엇인가 | Workspace |
| VQ-009 | Evidence-first hierarchy와 scanning speed의 균형은 무엇인가 | Decision Speed |
| VQ-010 | community opinion visual boundary는 얼마나 강해야 하는가 | Community |
| VQ-011 | accessibility contrast 기준은 어떤 validation으로 확인할 것인가 | Accessibility |
| VQ-012 | future Design System에서 tokenization해야 할 role boundary는 무엇인가 | Design System Readiness |

## Phase Boundary

Visual Language 1.0 defines design philosophy and role rules only.

It does not define fixed production values or build-ready artifacts.
