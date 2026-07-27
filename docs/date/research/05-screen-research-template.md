# Screen Research Template

아래 템플릿은 Benchmark 화면을 반복 조사할 때 복사해서 사용한다. 관찰한 사실과 해석을 분리하고, 확인하지 못한 항목은 `Unknown` 또는 `Not verified`로 기록한다.

```markdown
# Screen Research: [Service] — [Screen]

## Basic Metadata

- Service:
- Screen:
- URL:
- Access Date:
- Login Requirement:
- Subscription Level:
- Access Status:
- Access Limitation:
- Device:
- Viewport:

## Scenario Context

- User Goal:
- Entry Point:
- Expected Outcome:

## Entity Context

- Primary Entity:
- Secondary Entities:
- Page Purpose:
- Global Navigation Position:
- Local Navigation:

## Actions and Controls

- Primary Action:
- Secondary Actions:
- Search Availability:
- Keyboard Support:
- Context Preservation:

## Information Architecture

- Information Hierarchy:
- Density Strategy:
- Card / Table / Chart / Panel Usage:
- Side Panel / Overlay Usage:
- New Page vs In-place Disclosure:
- Source:
- Freshness:
- Trust Signal:

## State Coverage

- Empty State:
- Loading State:
- Error State:

## Decision Support

- Effective Decision:
- Why It Works:
- User Cost:
- Structural Weakness:
- Observation vs Interpretation Boundary:

## DATE Implication

- DATE Applicability:
- Conditions Required:
- Do Not Copy:
- Open Question:

## Observation Record

Observation:

Interpretation:

User Impact:

DATE Implication:

Confidence:

Evidence:
```

## Usage Notes

- `Observation`에는 실제 확인한 화면 사실만 기록한다.
- `Interpretation`에는 왜 그런 구조를 사용했는지에 대한 해석을 기록한다.
- `User Impact`에는 사용자의 판단, 속도, 신뢰, 인지 비용에 미치는 영향을 기록한다.
- `DATE Implication`은 DATE에 적용 가능한 시사점이며 결정 사항이 아니다.
- `Do Not Copy`에는 DATE가 그대로 가져오면 안 되는 구조나 조건을 기록한다.
- `Access Status`는 `Public`, `Login Required`, `Paid Required`, `Unavailable`, `Not Verified` 중 하나로 기록한다.
- `Observation vs Interpretation Boundary`에는 사실과 해석이 섞일 위험이 있는 항목을 별도 표시한다.
