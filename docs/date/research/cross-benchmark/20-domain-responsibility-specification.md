# Domain Responsibility Specification

## 문서 목적

이 문서는 15개 Architecture Domain의 ownership boundary를 정의한다.

각 Domain은 `Owns`, `Does Not Own`, `Consumes`, `Produces`, `Requires`, `Never Controls`를 가진다.

## Responsibility Summary

| Metric | Count |
| --- | ---: |
| Domain Responsibility 정의 | 15 |
| Owns 정의 | 15 |
| Does Not Own 정의 | 15 |
| Consumes 정의 | 15 |
| Produces 정의 | 15 |
| Requires 정의 | 15 |
| Never Controls 정의 | 15 |

## Responsibility Matrix

| Domain | Owns | Does Not Own | Consumes | Produces | Requires | Never Controls |
| --- | --- | --- | --- | --- | --- | --- |
| Entry Architecture | entry context, route exposure, first task framing | full research state, deep Evidence validation | Market summary, public entry content | initial route, shallow context | clear route grouping | saved state persistence |
| Discovery Architecture | candidate narrowing, filter loop, comparison grammar | final decision, full Entity detail | broad candidate set, filter input | filtered candidate set, comparison table | Entry context | Evidence methodology |
| Search Architecture | query resolution, Entity route, command variant boundary | full workflow execution | query, ticker, company name, command text | resolved target, disambiguation candidate | Entry context, Entity taxonomy candidate | personal command history until validated |
| Entity Architecture | Entity context, local mode ownership, dense hub boundary | Source methodology, external return path | resolved Entity, selected row | Entity context, local mode context | Search or Discovery output | Watchlist persistence |
| Evidence Architecture | Evidence boundary, Source / Freshness Signal, Original Evidence path | chart rendering, community opinion, generated summary ownership | Entity, News, Report, Metric, Source | Evidence context, Source cue, method cue | Entity context | ranking algorithm |
| Interpretation Layer | summary boundary, translation boundary, generated interpretation label candidate | Original Evidence creation, accuracy scoring | article body, Original Evidence, translation candidate | interpretation context, boundary label | Evidence Architecture | Source truth |
| Workflow Architecture | task handoff, transition contract, professional workflow candidate | full Workspace implementation, entitlement policy | Entity context, Evidence context, task intent | next task context, workflow state candidate | Entity and Evidence context | enterprise access rule |
| Monitoring Architecture | monitored set, watch trigger, observed state candidate | notification payload, full persistence model | Entity, Watchlist action, live state cue | monitoring entry, observed state candidate | Entity context | push delivery details |
| Personal Continuity | saved state owner, user intent type, revisit entry | Entity definition, Evidence method | save action, monitored set, user profile candidate | saved state, restore candidate | Monitoring context | external Evidence citation |
| Context Preservation | transition context, origin reference, return anchor candidate | all Workspace persistence, external site behavior | Entity context, query, Source path | preserved context, return token candidate | Entity context | external product behavior |
| Workspace Architecture | composition, layout state candidate, widget contract | command model, Source method, full IA | saved state, Entity context, widget intent | workspace composition candidate | Personal Continuity | Product family layer |
| Community Architecture | participation boundary, opinion context, reaction unit | Financial Evidence, Source truth, editorial ranking | Entity context, post, reaction, user cue | discussion context, opinion boundary | Entity and Evidence context | Evidence validation |
| Research Architecture | provider boundary, report context, document reference | raw Market data infrastructure | Report, Document, provider label, estimate label | research context, provider boundary | Evidence Architecture | complete provider methodology when unavailable |
| Calendar Architecture | date context, event entry candidate | full economic calendar product, alert delivery | date, event candidate, Market context | time context, event route candidate | Discovery context | Event Source relation until validated |
| Notification Architecture | delivery boundary, notification item candidate, trigger reference | Alert rule engine, push payload detail | monitored state, alert candidate, user delivery preference | notification item candidate | Monitoring context | app-only behavior until validated |

## Ownership Guardrail

Architecture Domain은 adjacent Domain의 data를 consume할 수 있지만 ownership을 가져오지 않는다.

예를 들어 Evidence Architecture는 Source cue를 owns하지만 Chart, Portfolio, Community opinion을 owns하지 않는다. Personal Continuity는 saved state owner를 owns하지만 Entity definition을 owns하지 않는다.
