# Feedback Model

## 문서 목적

이 문서는 Interaction Feedback Model을 정의한다.

Feedback은 user action에 대한 product response signal이다. presentation format을 정의하지 않는다.

## Feedback Summary

| Metric | Count |
| --- | ---: |
| Feedback Model | 8 |
| Interaction Contract | 13 |
| Architecture Alignment | 15 |
| Principle Alignment | 12 |

## Feedback Type Matrix

| Feedback Type | Definition | Typical Trigger | System Response | Blocking Level | Recovery | Related Interaction |
| --- | --- | --- | --- | --- | --- | --- |
| Immediate | action 직후 바로 response signal 제공 | selection, criteria change, query | confirm state or update output | Non-blocking | continue next action | Entry, Discovery, Search, Entity |
| Deferred | processing 후 response signal 제공 | provider context, exposure context, restore | mark processing and show output when ready | Non-blocking | preserve previous context | Research, Portfolio, Workspace |
| Persistent | user가 다음 action까지 유지해야 하는 signal | selected Entity, Evidence boundary, monitoring state | keep state and owner visible | Non-blocking | clear by explicit action | Entity, Evidence, Monitoring |
| Temporary | short-lived response signal | minor update, state confirmation | acknowledge change | Non-blocking | auto clear after context handoff | Discovery, Personal |
| Passive | low urgency context signal | opinion boundary, entry summary | keep context available without interruption | Non-blocking | inspect if needed | Entry, Community |
| Critical | judgment-affecting limitation signal | Source missing, permission boundary | demand attention before relying on Information | Blocking candidate | inspect limitation | Evidence, System |
| Blocking | action cannot continue without required context | missing owner, missing permission | stop action and explain missing context | Blocking | provide required context or cancel | Monitoring, System |
| Non-blocking | limitation exists but action can continue | methodology gap, partial restore | mark limitation while preserving flow | Non-blocking | continue with limitation | Research, Workspace, Calendar |

## Feedback Assignment Matrix

| Interaction | Primary Feedback | Secondary Feedback | Required Context | State Relation | Error Recovery | Confidence |
| --- | --- | --- | --- | --- | --- | --- |
| Entry Direction Interaction | Immediate | Passive | Market | Idle -> Focused | return to broad Market context | Medium |
| Discovery Refinement Interaction | Immediate | Persistent | criteria | Focused -> Comparing | restore previous criteria | High |
| Search Resolution Interaction | Immediate | Warning | query | Idle -> Focused | require disambiguation | Medium |
| Entity Focus Interaction | Immediate | Persistent | Security | Browsing -> Focused | preserve target type cue | High |
| Evidence Inspection Interaction | Immediate | Critical | Evidence, Source | Focused -> Comparing | mark Source limitation | Medium |
| Interpretation Boundary Interaction | Immediate | Warning | Evidence | Focused -> Expanded | mark methodology gap | Low |
| Research Context Interaction | Deferred | Persistent | Report, Source | Focused -> Comparing | mark method gap | Medium |
| Monitoring Setup Interaction | Immediate | Persistent | User, Security | Focused -> Monitoring | request ownership context | Medium |
| Portfolio Context Interaction | Deferred | Persistent | User, Position | Focused -> Comparing | mark holdings Source gap | Medium |
| Workspace Restore Interaction | Deferred | Non-blocking | User, Context | Returning -> Focused | recover partial context | Low |
| Community Boundary Interaction | Immediate | Passive | User, News | Browsing -> Comparing | mark moderation gap | Medium |
| Calendar Event Interaction | Immediate | Warning | Event, date | Browsing -> Focused | mark Event Source limitation | Low |
| System Boundary Interaction | Critical | Blocking | User, Alert | Warning -> Completed | block or mark unknown | Low |

## Feedback Guardrail

Feedback Model defines response meaning.

It does not define presentation format or behavior implementation.
