"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  KRConfidenceBadge,
  KRCTAGroup,
  KREmptyState,
  KREntityChip,
  KREvidenceCard,
  KRHero,
  KRInformationBadge,
  KRRelatedEntityRow,
  KRSectionHeader,
  KRStatusBadge,
  KRThemeChip,
  KRTimelineItem
} from "../_components/design-language";
import type { AnalysisMock } from "./analysis-mock-data";
import styles from "./page.module.scss";

type EditableSection = "question" | "interpretation" | "alternatives" | "hypotheses" | "unknowns" | "conditions" | "next";

type EditableState = {
  question: AnalysisMock["currentQuestion"];
  interpretation: AnalysisMock["userInterpretation"];
  alternatives: AnalysisMock["alternatives"];
  hypotheses: AnalysisMock["hypotheses"];
  unknowns: AnalysisMock["unknowns"];
  conditions: AnalysisMock["reviewConditions"];
  next: AnalysisMock["nextChecks"];
};

type DraftState = {
  question: string;
  interpretationText: string;
  interpretationRationale: string;
  alternatives: AnalysisMock["alternatives"];
  hypotheses: AnalysisMock["hypotheses"];
  unknowns: AnalysisMock["unknowns"];
  conditions: AnalysisMock["reviewConditions"];
  next: AnalysisMock["nextChecks"];
};

const sectionLabels: Record<EditableSection, string> = {
  question: "현재 질문",
  interpretation: "내 해석",
  alternatives: "다른 해석 가능성",
  hypotheses: "현재 가설",
  unknowns: "아직 확인되지 않은 내용",
  conditions: "판단 변경 조건",
  next: "다음 확인 항목"
};

function badgeClass(state: string) {
  return state === "미확인" ? styles.unconfirmedBadge : styles.confidenceBadge;
}

function getPrimaryAnchor(analysis: AnalysisMock) {
  if (analysis.status === "새 근거 검토 필요") return "#changes-title";
  if (analysis.status === "추가 확인 필요") return "#unknown-title";
  if (analysis.status === "작성 중") return "#question-title";
  if (analysis.status === "판단 수정 필요") return "#condition-title";
  return "#question-title";
}

function getSectionOrder(analysis: AnalysisMock) {
  if (analysis.status === "새 근거 검토 필요") {
    return ["changes", "evidence", "question", "facts", "observation", "interpretation", "unknowns", "conditions", "alternatives", "hypotheses", "related", "next", "history", "actions"];
  }

  if (analysis.status === "추가 확인 필요") {
    return ["unknowns", "next", "question", "facts", "interpretation", "conditions", "evidence", "observation", "alternatives", "hypotheses", "related", "history", "actions"];
  }

  if (analysis.status === "작성 중") {
    return ["question", "interpretation", "hypotheses", "facts", "unknowns", "evidence", "observation", "alternatives", "conditions", "related", "next", "history", "actions"];
  }

  return ["question", "changes", "facts", "observation", "interpretation", "alternatives", "hypotheses", "unknowns", "conditions", "evidence", "related", "next", "history", "actions"];
}

function createEditableState(analysis: AnalysisMock): EditableState {
  return {
    question: analysis.currentQuestion,
    interpretation: analysis.userInterpretation,
    alternatives: analysis.alternatives,
    hypotheses: analysis.hypotheses,
    unknowns: analysis.unknowns,
    conditions: analysis.reviewConditions,
    next: analysis.nextChecks
  };
}

function createDraft(editable: EditableState): DraftState {
  return {
    question: editable.question.text,
    interpretationText: editable.interpretation.text,
    interpretationRationale: editable.interpretation.rationale,
    alternatives: editable.alternatives.map((item) => ({ ...item })),
    hypotheses: editable.hypotheses.map((item) => ({ ...item })),
    unknowns: editable.unknowns.map((item) => ({ ...item })),
    conditions: editable.conditions.map((item) => ({ ...item })),
    next: editable.next.map((item) => ({ ...item }))
  };
}

function isDirty(section: EditableSection | null, draft: DraftState | null, editable: EditableState) {
  if (!section || !draft) return false;

  if (section === "question") return draft.question !== editable.question.text;
  if (section === "interpretation") {
    return draft.interpretationText !== editable.interpretation.text || draft.interpretationRationale !== editable.interpretation.rationale;
  }
  if (section === "alternatives") return JSON.stringify(draft.alternatives) !== JSON.stringify(editable.alternatives);
  if (section === "hypotheses") return JSON.stringify(draft.hypotheses) !== JSON.stringify(editable.hypotheses);
  if (section === "unknowns") return JSON.stringify(draft.unknowns) !== JSON.stringify(editable.unknowns);
  if (section === "conditions") return JSON.stringify(draft.conditions) !== JSON.stringify(editable.conditions);
  return JSON.stringify(draft.next) !== JSON.stringify(editable.next);
}

function EditableHeader({
  id,
  title,
  eyebrow,
  description,
  section,
  editingSection,
  beginEdit
}: {
  id: string;
  title: string;
  eyebrow: string;
  description?: string;
  section: EditableSection;
  editingSection: EditableSection | null;
  beginEdit: (section: EditableSection) => void;
}) {
  return (
    <div className={styles.editableHeader}>
      <KRSectionHeader className={styles.sectionHeader} eyebrow={eyebrow} eyebrowClassName={styles.eyebrow} id={id} title={title} description={description} />
      <button aria-label={`${title} 수정`} disabled={editingSection === section} type="button" onClick={() => beginEdit(section)}>
        {editingSection === section ? "편집 중" : "수정"}
      </button>
    </div>
  );
}

function EditPanel({
  section,
  error,
  children,
  onCancel,
  onApply
}: {
  section: EditableSection;
  error?: string;
  children: ReactNode;
  onCancel: () => void;
  onApply: () => void;
}) {
  const firstFieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const field = firstFieldRef.current?.querySelector("textarea, input, button");
    if (field instanceof HTMLElement) field.focus();
  }, [section]);

  return (
    <div className={styles.editPanel} aria-label={`${sectionLabels[section]} 편집 영역`}>
      <div className={styles.editNotice}>
        <strong>{sectionLabels[section]} 편집 중</strong>
        <span>이번 단계의 적용은 서버 저장이 아니라 화면 안 임시 반영입니다.</span>
      </div>
      <div ref={firstFieldRef}>{children}</div>
      {error ? (
        <p className={styles.fieldError} id={`${section}-error`}>
          {error}
        </p>
      ) : null}
      <div className={styles.editActions}>
        <button type="button" onClick={onCancel}>
          취소
        </button>
        <button className={styles.primaryAction} type="button" onClick={onApply}>
          적용
        </button>
      </div>
    </div>
  );
}

function AnalysisHero({ analysis, isUnknown, editable }: { analysis: AnalysisMock; isUnknown: boolean; editable: EditableState }) {
  const primaryHref = isUnknown ? "/kr/stock/005930" : getPrimaryAnchor(analysis);
  const primaryLabel = isUnknown ? "종목에서 분석 시작하기" : analysis.primaryAction;

  return (
    <KRHero
      aside={
        <aside className={styles.statePanel} aria-label="분석 상태">
          <KRStatusBadge className={styles.statusBadge}>{analysis.status}</KRStatusBadge>
          <strong>{analysis.target.name}</strong>
          <span>
            {analysis.target.code} · {analysis.target.market}
          </span>
          <small>{analysis.updatedAt}</small>
          <dl>
            <div>
              <dt>연결된 근거</dt>
              <dd>{analysis.summary.evidenceCount}</dd>
            </div>
            <div>
              <dt>관련 종목</dt>
              <dd>{analysis.summary.relatedCount}</dd>
            </div>
          </dl>
        </aside>
      }
      className={styles.hero}
      copyClassName={styles.heroCopy}
      description={editable.question.text}
      eyebrow={`분석 대상 · ${analysis.target.name}`}
      id="analysis-title"
      title={analysis.title}
    >
      <div className={styles.heroMeta}>
        <KRInformationBadge className={styles.infoBadge}>{analysis.target.market}</KRInformationBadge>
        <KRInformationBadge className={styles.infoBadge}>{analysis.target.code}</KRInformationBadge>
        {analysis.themes.map((theme) => (
          <KRThemeChip className={styles.themeChip} key={theme} label={theme} selected={theme === analysis.themes[0]} />
        ))}
      </div>
      <p className={styles.changeSummary}>{analysis.summary.newChange}</p>
      <KRCTAGroup
        actions={
          isUnknown
            ? [
                { href: primaryHref, label: primaryLabel, variant: "primary" },
                { href: "/kr/evidence?id=dart-samsung-001", label: "공식 근거에서 시작" },
                { href: "/kr/market", label: "시장으로 돌아가기" }
              ]
            : [
                { href: primaryHref, label: primaryLabel, variant: "primary" },
                { href: "#linked-evidence-title", label: "근거 추가하기" },
                { href: "#related-heading", label: "관련 종목 보기" },
                { href: "/kr/watchlist?view=default", label: "관심 종목 상태 보기" }
              ]
        }
        className={styles.heroActions}
        primaryClassName={styles.primaryAction}
      />
    </KRHero>
  );
}

function ChangesSection({ analysis }: { analysis: AnalysisMock }) {
  return (
    <section className={`${styles.changeNotice} ${styles.prioritySection}`} aria-labelledby="changes-title">
      <KRSectionHeader className={styles.sectionHeader} eyebrow="새로 달라진 내용" eyebrowClassName={styles.eyebrow} id="changes-title" title="시스템은 판단을 바꾸지 않고 다시 볼 이유만 알려줍니다." />
      {analysis.changes.length > 0 ? (
        <div className={styles.changeList}>
          {analysis.changes.map((change) => (
            <article className={styles.changeItem} key={`${change.type}-${change.time}`}>
              <KRInformationBadge className={styles.infoBadge}>{change.type}</KRInformationBadge>
              <h3>{change.reviewNeeded}</h3>
              <dl>
                <div>
                  <dt>변경 시각</dt>
                  <dd>{change.time}</dd>
                </div>
                <div>
                  <dt>변경 전</dt>
                  <dd>{change.before}</dd>
                </div>
                <div>
                  <dt>변경 후</dt>
                  <dd>{change.after}</dd>
                </div>
                <div>
                  <dt>연결된 근거</dt>
                  <dd>{change.evidence}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      ) : (
        <KREmptyState className={styles.inlineEmpty} description="새 공식 정보가 확인되면 이 영역에서 다시 볼 이유를 알려줍니다." eyebrow="새 변화 없음" title="기존 분석 이후 새로 달라진 내용은 없습니다." titleId="changes-empty" />
      )}
      <KRCTAGroup
        actions={[{ href: "/kr/changes?view=analysis", label: "변화 화면에서 비교하기", variant: "primary" }]}
        className={styles.heroActions}
        primaryClassName={styles.primaryAction}
      />
    </section>
  );
}

function QuestionSection({
  editable,
  draft,
  setDraft,
  editProps
}: {
  editable: EditableState;
  draft: DraftState | null;
  setDraft: (draft: DraftState) => void;
  editProps: EditControlProps;
}) {
  return (
    <section className={styles.questionSection} aria-labelledby="question-title">
      <EditableHeader id="question-title" eyebrow="현재 질문" title="이 분석이 답하려는 질문입니다." description="질문 형태로 작성하면 이후 근거와 미확인 내용을 연결하기 쉽습니다." section="question" {...editProps} />
      <div className={styles.questionBox}>
        {editProps.editingSection === "question" && draft ? (
          <EditPanel section="question" error={editProps.error} onCancel={editProps.cancelEdit} onApply={editProps.applyEdit}>
            <label className={styles.fieldLabel} htmlFor="analysis-question">
              현재 질문
            </label>
            <textarea
              aria-describedby={editProps.error ? "question-error question-help" : "question-help"}
              id="analysis-question"
              maxLength={160}
              rows={4}
              value={draft.question}
              onChange={(event) => setDraft({ ...draft, question: event.target.value })}
            />
            <small id="question-help">권장 최대 160자. 예: 이 변화가 실적이나 공급망에 어떤 영향을 주는가?</small>
          </EditPanel>
        ) : (
          <>
            <blockquote>{editable.question.text}</blockquote>
            <dl>
              <div>
                <dt>작성자</dt>
                <dd>{editable.question.author}</dd>
              </div>
              <div>
                <dt>마지막 수정</dt>
                <dd>{editable.question.editedAt}</dd>
              </div>
            </dl>
          </>
        )}
      </div>
    </section>
  );
}

function FactsSection({ analysis }: { analysis: AnalysisMock }) {
  return (
    <section className={styles.factsSection} aria-labelledby="facts-title">
      <KRSectionHeader className={styles.sectionHeader} eyebrow="공식적으로 확인된 사실" eyebrowClassName={styles.eyebrow} id="facts-title" title="사용자가 직접 편집하지 않는 읽기 전용 목록입니다." />
      {analysis.officialFacts.length > 0 ? (
        <div className={styles.factList}>
          {analysis.officialFacts.map((fact) => (
            <article className={styles.factItem} key={`${fact.fact}-${fact.source}`}>
              <strong>{fact.fact}</strong>
              <span>
                {fact.source} · {fact.publishedAt}
              </span>
              <small>{fact.related}</small>
              <KRConfidenceBadge className={badgeClass(fact.confidence)}>{fact.confidence}</KRConfidenceBadge>
              <Link href={fact.evidenceHref}>근거 상세 보기</Link>
            </article>
          ))}
        </div>
      ) : (
        <KREmptyState className={styles.inlineEmpty} description="공식 근거가 연결되기 전에는 사실 항목을 만들지 않습니다." eyebrow="공식 사실 없음" title="공식적으로 확인된 사실이 없습니다." titleId="facts-empty" />
      )}
    </section>
  );
}

function ObservationSection({ analysis }: { analysis: AnalysisMock }) {
  return (
    <section className={styles.observationSection} aria-labelledby="observation-title">
      <KRSectionHeader className={styles.sectionHeader} eyebrow="관찰된 시장 변화" eyebrowClassName={styles.eyebrow} id="observation-title" title="시장 변화는 compact 지표로 분리해서 봅니다." description="관찰된 시장 변화는 공식 정보와 동시에 발생한 변화이며 직접적인 인과관계가 확인되지 않을 수 있습니다." />
      <div className={styles.observationGrid}>
        {analysis.marketObservations.length > 0 ? (
          analysis.marketObservations.map((item) => (
            <article key={item.label}>
              <h3>{item.label}</h3>
              <p>{item.value}</p>
              <small>{item.observedAt}</small>
            </article>
          ))
        ) : (
          <article>
            <h3>관찰된 시장 변화 없음</h3>
            <p>공식 근거가 확인되면 가격, 거래량, 지수, 테마 반응을 분리해서 표시합니다.</p>
            <small>관찰 시각 없음</small>
          </article>
        )}
      </div>
    </section>
  );
}

function InterpretationSection({
  editable,
  draft,
  setDraft,
  editProps
}: {
  editable: EditableState;
  draft: DraftState | null;
  setDraft: (draft: DraftState) => void;
  editProps: EditControlProps;
}) {
  return (
    <section className={styles.interpretationSection} aria-labelledby="interpretation-title">
      <EditableHeader id="interpretation-title" eyebrow="내 해석" title="사용자가 직접 작성한 내용입니다." description="공식 사실을 복사하는 곳이 아니라 사용자의 해석을 남기는 영역입니다." section="interpretation" {...editProps} />
      <article className={styles.userBlock}>
        {editProps.editingSection === "interpretation" && draft ? (
          <EditPanel section="interpretation" onCancel={editProps.cancelEdit} onApply={editProps.applyEdit}>
            <label className={styles.fieldLabel} htmlFor="analysis-interpretation">
              현재 해석
            </label>
            <textarea id="analysis-interpretation" rows={6} value={draft.interpretationText} onChange={(event) => setDraft({ ...draft, interpretationText: event.target.value })} />
            <label className={styles.fieldLabel} htmlFor="analysis-rationale">
              해석 근거
            </label>
            <textarea id="analysis-rationale" rows={3} value={draft.interpretationRationale} onChange={(event) => setDraft({ ...draft, interpretationRationale: event.target.value })} />
          </EditPanel>
        ) : (
          <>
            <p>{editable.interpretation.text}</p>
            <dl>
              <div>
                <dt>해석 근거</dt>
                <dd>{editable.interpretation.rationale}</dd>
              </div>
              <div>
                <dt>연결된 근거</dt>
                <dd>{editable.interpretation.linkedEvidence}</dd>
              </div>
              <div>
                <dt>마지막 수정</dt>
                <dd>{editable.interpretation.editedAt}</dd>
              </div>
            </dl>
          </>
        )}
      </article>
    </section>
  );
}

type EditControlProps = {
  editingSection: EditableSection | null;
  beginEdit: (section: EditableSection) => void;
  cancelEdit: () => void;
  applyEdit: () => void;
  error?: string;
};

function ListEditPanel<T>({
  section,
  draft,
  items,
  emptyItem,
  renderFields,
  setItems,
  editProps
}: {
  section: EditableSection;
  draft: DraftState | null;
  items: T[];
  emptyItem: T;
  renderFields: (item: T, index: number, update: (next: T) => void) => ReactNode;
  setItems: (next: T[]) => void;
  editProps: EditControlProps;
}) {
  if (!draft) return null;

  return (
    <EditPanel section={section} onCancel={editProps.cancelEdit} onApply={editProps.applyEdit}>
      <div className={styles.listEditor}>
        {items.map((item, index) => (
          <article key={index}>
            {renderFields(item, index, (next) => {
              const updated = items.map((current, itemIndex) => (itemIndex === index ? next : current));
              setItems(updated);
            })}
            <button type="button" onClick={() => setItems(items.filter((_, itemIndex) => itemIndex !== index))}>
              항목 삭제
            </button>
          </article>
        ))}
        <button type="button" onClick={() => setItems([...items, emptyItem])}>
          항목 추가
        </button>
      </div>
    </EditPanel>
  );
}

function AlternativesContent({ items }: { items: AnalysisMock["alternatives"] }) {
  if (items.length === 0) {
    return <KREmptyState className={styles.inlineEmpty} description="다른 해석 가능성이 생기면 이곳에 기록합니다." eyebrow="대안 해석 없음" title="아직 기록된 다른 해석은 없습니다." titleId="alternative-empty" />;
  }

  return (
    <div className={styles.compareList}>
      {items.map((item) => (
        <article key={item.interpretation}>
          <h3>{item.interpretation || "대안 해석 Placeholder"}</h3>
          <p>{item.reason}</p>
          <dl>
            <div>
              <dt>필요한 추가 근거</dt>
              <dd>{item.neededEvidence}</dd>
            </div>
          </dl>
          <KRConfidenceBadge className={badgeClass(item.state)}>{item.state}</KRConfidenceBadge>
        </article>
      ))}
    </div>
  );
}

function AlternativesSection({ editable, draft, setDraft, editProps }: { editable: EditableState; draft: DraftState | null; setDraft: (draft: DraftState) => void; editProps: EditControlProps }) {
  return (
    <section className={styles.alternativeSection} aria-labelledby="alternative-title">
      <EditableHeader id="alternative-title" eyebrow="다른 해석 가능성" title="편향을 줄이기 위해 다른 설명도 남깁니다." section="alternatives" {...editProps} />
      {editProps.editingSection === "alternatives" && draft ? (
        <ListEditPanel
          section="alternatives"
          draft={draft}
          items={draft.alternatives}
          emptyItem={{ interpretation: "", reason: "", neededEvidence: "", state: "미확인" as const }}
          editProps={editProps}
          setItems={(next) => setDraft({ ...draft, alternatives: next })}
          renderFields={(item, index, update) => (
            <>
              <label className={styles.fieldLabel} htmlFor={`alternative-${index}`}>
                대안 해석
              </label>
              <textarea id={`alternative-${index}`} rows={3} value={item.interpretation} onChange={(event) => update({ ...item, interpretation: event.target.value })} />
              <label className={styles.fieldLabel} htmlFor={`alternative-reason-${index}`}>
                가능한 이유
              </label>
              <textarea id={`alternative-reason-${index}`} rows={3} value={item.reason} onChange={(event) => update({ ...item, reason: event.target.value })} />
              <label className={styles.fieldLabel} htmlFor={`alternative-evidence-${index}`}>
                필요한 추가 근거
              </label>
              <input id={`alternative-evidence-${index}`} value={item.neededEvidence} onChange={(event) => update({ ...item, neededEvidence: event.target.value })} />
            </>
          )}
        />
      ) : (
        <>
          <div className={styles.desktopOnly}>
            <AlternativesContent items={editable.alternatives} />
          </div>
          <details className={styles.mobileDisclosure}>
            <summary>{editable.alternatives[0]?.interpretation ?? "다른 해석 가능성 보기"}</summary>
            <AlternativesContent items={editable.alternatives} />
          </details>
        </>
      )}
    </section>
  );
}

function HypothesesContent({ items }: { items: AnalysisMock["hypotheses"] }) {
  if (items.length === 0) {
    return <KREmptyState className={styles.inlineEmpty} description="가설은 공식 확인 전 임시 판단입니다. 사실처럼 표시하지 않습니다." eyebrow="가설 없음" title="아직 기록된 현재 가설이 없습니다." titleId="hypothesis-empty" />;
  }

  return (
    <div className={styles.hypothesisRows}>
      {items.map((item) => (
        <article key={item.text}>
          <KRStatusBadge className={styles.statusBadge}>{item.state}</KRStatusBadge>
          <h3>{item.text || "가설 Placeholder"}</h3>
          <span>{item.requiredCondition}</span>
          <small>
            {item.linkedEvidence} · {item.decision}
          </small>
        </article>
      ))}
    </div>
  );
}

function HypothesesSection({ editable, draft, setDraft, editProps }: { editable: EditableState; draft: DraftState | null; setDraft: (draft: DraftState) => void; editProps: EditControlProps }) {
  return (
    <section className={styles.hypothesisSection} aria-labelledby="hypothesis-title">
      <EditableHeader id="hypothesis-title" eyebrow="현재 가설" title="공식 사실이 아닌 임시 판단으로 관리합니다." description="이번 Phase에서는 가설 문장만 수정하고 상태나 Confidence는 변경하지 않습니다." section="hypotheses" {...editProps} />
      {editProps.editingSection === "hypotheses" && draft ? (
        <ListEditPanel
          section="hypotheses"
          draft={draft}
          items={draft.hypotheses}
          emptyItem={{ text: "", state: "확인 필요" as const, linkedEvidence: "없음", requiredCondition: "", decision: "유지" }}
          editProps={editProps}
          setItems={(next) => setDraft({ ...draft, hypotheses: next })}
          renderFields={(item, index, update) => (
            <>
              <label className={styles.fieldLabel} htmlFor={`hypothesis-${index}`}>
                가설 문장
              </label>
              <textarea id={`hypothesis-${index}`} rows={3} value={item.text} onChange={(event) => update({ ...item, text: event.target.value })} />
              <label className={styles.fieldLabel} htmlFor={`hypothesis-condition-${index}`}>
                확인에 필요한 조건
              </label>
              <input id={`hypothesis-condition-${index}`} value={item.requiredCondition} onChange={(event) => update({ ...item, requiredCondition: event.target.value })} />
            </>
          )}
        />
      ) : (
        <>
          <div className={styles.desktopOnly}>
            <HypothesesContent items={editable.hypotheses} />
          </div>
          <details className={styles.mobileDisclosure}>
            <summary>{editable.hypotheses[0]?.text ?? "현재 가설 보기"}</summary>
            <HypothesesContent items={editable.hypotheses} />
          </details>
        </>
      )}
    </section>
  );
}

function UnknownsSection({ editable, draft, setDraft, editProps }: { editable: EditableState; draft: DraftState | null; setDraft: (draft: DraftState) => void; editProps: EditControlProps }) {
  return (
    <section className={styles.unknownSection} aria-labelledby="unknown-title">
      <EditableHeader id="unknown-title" eyebrow="아직 확인되지 않은 내용" title="미확인 내용은 기본 노출합니다." section="unknowns" {...editProps} />
      {editProps.editingSection === "unknowns" && draft ? (
        <ListEditPanel
          section="unknowns"
          draft={draft}
          items={draft.unknowns}
          emptyItem={{ item: "", whyImportant: "", neededInfo: "", recheckCondition: "", linked: "없음" }}
          editProps={editProps}
          setItems={(next) => setDraft({ ...draft, unknowns: next })}
          renderFields={(item, index, update) => (
            <>
              <label className={styles.fieldLabel} htmlFor={`unknown-${index}`}>
                미확인 항목
              </label>
              <textarea id={`unknown-${index}`} rows={2} value={item.item} onChange={(event) => update({ ...item, item: event.target.value })} />
              <label className={styles.fieldLabel} htmlFor={`unknown-why-${index}`}>
                왜 중요한지
              </label>
              <textarea id={`unknown-why-${index}`} rows={2} value={item.whyImportant} onChange={(event) => update({ ...item, whyImportant: event.target.value })} />
              <label className={styles.fieldLabel} htmlFor={`unknown-info-${index}`}>
                필요한 정보
              </label>
              <input id={`unknown-info-${index}`} value={item.neededInfo} onChange={(event) => update({ ...item, neededInfo: event.target.value })} />
              <label className={styles.fieldLabel} htmlFor={`unknown-condition-${index}`}>
                다시 확인할 조건
              </label>
              <input id={`unknown-condition-${index}`} value={item.recheckCondition} onChange={(event) => update({ ...item, recheckCondition: event.target.value })} />
            </>
          )}
        />
      ) : (
        <div className={styles.attentionList}>
          {editable.unknowns.length > 0 ? (
            editable.unknowns.map((item) => (
              <article key={item.item}>
                <strong>{item.item}</strong>
                <p>{item.whyImportant}</p>
                <dl>
                  <div>
                    <dt>필요한 정보</dt>
                    <dd>{item.neededInfo}</dd>
                  </div>
                  <div>
                    <dt>다시 확인할 조건</dt>
                    <dd>{item.recheckCondition}</dd>
                  </div>
                  <div>
                    <dt>연결된 근거 또는 대상</dt>
                    <dd>{item.linked}</dd>
                  </div>
                </dl>
              </article>
            ))
          ) : (
            <article>
              <strong>미확인 항목 없음</strong>
              <p>공식 근거가 연결되면 아직 확인되지 않은 내용이 이곳에 표시됩니다.</p>
            </article>
          )}
        </div>
      )}
    </section>
  );
}

function ConditionsSection({ editable, draft, setDraft, editProps }: { editable: EditableState; draft: DraftState | null; setDraft: (draft: DraftState) => void; editProps: EditControlProps }) {
  return (
    <section className={styles.conditionSection} aria-labelledby="condition-title">
      <EditableHeader id="condition-title" eyebrow="판단 변경 조건" title="다시 검토해야 하는 조건을 checklist로 봅니다." description="이번 Phase에서는 조건 문장만 수정하고 충족 여부는 변경하지 않습니다." section="conditions" {...editProps} />
      {editProps.editingSection === "conditions" && draft ? (
        <ListEditPanel
          section="conditions"
          draft={draft}
          items={draft.conditions}
          emptyItem={{ condition: "", type: "사용자 지정 조건", state: "대기 중", evidence: "없음", checkedAt: "확인 전", met: "미충족" }}
          editProps={editProps}
          setItems={(next) => setDraft({ ...draft, conditions: next })}
          renderFields={(item, index, update) => (
            <>
              <label className={styles.fieldLabel} htmlFor={`condition-${index}`}>
                조건 문장
              </label>
              <textarea id={`condition-${index}`} rows={3} value={item.condition} onChange={(event) => update({ ...item, condition: event.target.value })} />
            </>
          )}
        />
      ) : (
        <div className={styles.conditionChecklist}>
          {editable.conditions.length > 0 ? (
            editable.conditions.map((item) => (
              <article key={item.condition}>
                <span aria-hidden="true">□</span>
                <div>
                  <h3>{item.condition}</h3>
                  <p>
                    {item.type} · {item.state} · {item.met}
                  </p>
                  <small>
                    {item.evidence} · {item.checkedAt}
                  </small>
                </div>
              </article>
            ))
          ) : (
            <article>
              <span aria-hidden="true">□</span>
              <div>
                <h3>아직 판단 변경 조건이 없습니다.</h3>
                <p>어떤 정보가 나오면 판단을 다시 볼지 정해두면 좋습니다.</p>
              </div>
            </article>
          )}
        </div>
      )}
    </section>
  );
}

function EvidenceSection({ analysis }: { analysis: AnalysisMock }) {
  return (
    <section className={styles.evidenceSection} aria-labelledby="linked-evidence-title">
      <KRSectionHeader className={styles.sectionHeader} eyebrow="연결된 공식 근거" eyebrowClassName={styles.eyebrow} id="linked-evidence-title" title="근거가 어떤 분석 영역과 연결되는지 함께 봅니다." />
      <div className={styles.evidenceGrid}>
        {analysis.evidence.length > 0 ? (
          analysis.evidence.map((item) => (
            <KREvidenceCard className={styles.evidenceCard} confidence={<KRConfidenceBadge className={badgeClass(item.confidence)}>{item.confidence}</KRConfidenceBadge>} href={item.href} key={item.href} limitation={item.limitation} publishedAt={item.publishedAt} source={item.source} supports={item.supports} title={item.title}>
              <KRInformationBadge className={styles.infoBadge}>{item.type}</KRInformationBadge>
              <small>연결된 영역: {item.linkedSection}</small>
            </KREvidenceCard>
          ))
        ) : (
          <KREmptyState className={styles.inlineEmpty} description="공식 근거를 추가하면 공식 사실, 내 해석, 미확인 내용, 판단 변경 조건에 연결됩니다." eyebrow="연결 근거 없음" title="아직 연결된 공식 근거가 없습니다." titleId="evidence-empty" />
        )}
      </div>
    </section>
  );
}

function RelatedContent({ analysis }: { analysis: AnalysisMock }) {
  return (
    <>
      <div className={styles.targetChips}>
        <KREntityChip className={styles.entityChip} code={analysis.target.code} href={`/kr/stock/${analysis.target.code}`} label={analysis.target.name} relation="대표 종목" />
        {analysis.themes.map((theme) => (
          <KRThemeChip className={styles.themeChip} key={theme} label={theme} />
        ))}
      </div>
      <div className={styles.relatedRows}>
        {analysis.related.length > 0 ? (
          analysis.related.map((item) => <KRRelatedEntityRow className={styles.relatedRow} key={`${item.name}-${item.type}`} {...item} />)
        ) : (
          <KREmptyState className={styles.inlineEmpty} description="분석 대상이 정해지면 관련 종목, 기업, 테마, 시장이 표시됩니다." eyebrow="관련 대상 없음" title="아직 연결된 관련 대상이 없습니다." titleId="related-empty" />
        )}
      </div>
    </>
  );
}

function RelatedSection({ analysis }: { analysis: AnalysisMock }) {
  return (
    <section className={styles.relatedSection} id="related-title" aria-labelledby="related-heading">
      <KRSectionHeader className={styles.sectionHeader} eyebrow="관련 대상" eyebrowClassName={styles.eyebrow} id="related-heading" title="추천이 아니라 왜 연결되는지 확인합니다." />
      <div className={styles.desktopOnly}>
        <RelatedContent analysis={analysis} />
      </div>
      <details className={styles.mobileDisclosure}>
        <summary>{analysis.related[0]?.name ?? "관련 대상 보기"}</summary>
        <RelatedContent analysis={analysis} />
      </details>
    </section>
  );
}

function NextSection({ editable, draft, setDraft, editProps }: { editable: EditableState; draft: DraftState | null; setDraft: (draft: DraftState) => void; editProps: EditControlProps }) {
  return (
    <section className={styles.nextSection} aria-labelledby="next-title">
      <EditableHeader id="next-title" eyebrow="다음 확인 항목" title="투자 행동이 아니라 확인 행동을 관리합니다." section="next" {...editProps} />
      {editProps.editingSection === "next" && draft ? (
        <ListEditPanel
          section="next"
          draft={draft}
          items={draft.next}
          emptyItem={{ item: "", reason: "", due: "다음 확인 시점 Placeholder", evidence: "없음", done: "진행 전" }}
          editProps={editProps}
          setItems={(next) => setDraft({ ...draft, next })}
          renderFields={(item, index, update) => (
            <>
              <label className={styles.fieldLabel} htmlFor={`next-${index}`}>
                확인할 내용
              </label>
              <textarea id={`next-${index}`} rows={2} value={item.item} onChange={(event) => update({ ...item, item: event.target.value })} />
              <label className={styles.fieldLabel} htmlFor={`next-reason-${index}`}>
                확인 이유
              </label>
              <textarea id={`next-reason-${index}`} rows={2} value={item.reason} onChange={(event) => update({ ...item, reason: event.target.value })} />
            </>
          )}
        />
      ) : (
        <div className={styles.nextList}>
          {editable.next.length > 0 ? (
            editable.next.map((item) => (
              <article key={item.item}>
                <h3>{item.item}</h3>
                <p>{item.reason}</p>
                <dl>
                  <div>
                    <dt>다음 확인 시점</dt>
                    <dd>{item.due}</dd>
                  </div>
                  <div>
                    <dt>연결된 근거</dt>
                    <dd>{item.evidence}</dd>
                  </div>
                  <div>
                    <dt>완료 여부</dt>
                    <dd>{item.done}</dd>
                  </div>
                </dl>
              </article>
            ))
          ) : (
            <KREmptyState className={styles.inlineEmpty} description="다음에 확인할 공식 출처나 시점을 정하면 이곳에 표시됩니다." eyebrow="다음 확인 없음" title="아직 다음 확인 항목이 없습니다." titleId="next-empty" />
          )}
        </div>
      )}
    </section>
  );
}

function HistorySection({ analysis }: { analysis: AnalysisMock }) {
  return (
    <section className={styles.historySection} aria-labelledby="history-title">
      <KRSectionHeader className={styles.sectionHeader} eyebrow="변경 이력" eyebrowClassName={styles.eyebrow} id="history-title" title="전체 문서가 아니라 변경 항목 중심으로 남깁니다." />
      <div className={styles.desktopOnly}>
        <HistoryContent analysis={analysis} />
      </div>
      <details className={styles.mobileDisclosure}>
        <summary>{analysis.history[0]?.title ?? "변경 이력 보기"}</summary>
        <HistoryContent analysis={analysis} />
      </details>
    </section>
  );
}

function HistoryContent({ analysis }: { analysis: AnalysisMock }) {
  return (
    <ol>
      {analysis.history.length > 0 ? (
        analysis.history.map((item) => <KRTimelineItem className={styles.timelineItem} confidence={<KRStatusBadge className={badgeClass(item.confidence)}>{item.confidence}</KRStatusBadge>} key={`${item.time}-${item.title}`} linked={`${item.before} → ${item.after} · ${item.reason}`} time={item.time} title={item.title} />)
      ) : (
        <li className={styles.timelineItem}>
          <time>기록 없음</time>
          <strong>아직 변경 이력이 없습니다.</strong>
          <span>분석이 수정되면 변경 항목 중심으로 표시됩니다.</span>
          <KRStatusBadge className={styles.statusBadge}>작성 중</KRStatusBadge>
        </li>
      )}
    </ol>
  );
}

function ActionsSection({ analysis }: { analysis: AnalysisMock }) {
  return (
    <section className={styles.actionSection} aria-labelledby="action-title">
      <div>
        <KRSectionHeader className={styles.sectionHeader} eyebrow="분석으로 이어가기" eyebrowClassName={styles.eyebrow} id="action-title" title="판단을 대신하지 않고 다음 확인 행동만 제공합니다." />
        <p>기록으로 남기기는 현재 분석을 기록 화면의 Snapshot으로 보존하는 행동입니다. 이번 단계에서는 실제 저장을 구현하지 않습니다.</p>
      </div>
      <div className={styles.actionGroups}>
        <KRCTAGroup actions={[{ href: getPrimaryAnchor(analysis), label: analysis.primaryAction, variant: "primary" }, { href: "#interpretation-title", label: "내 해석 수정하기", variant: "primary" }]} className={styles.heroActions} primaryClassName={styles.primaryAction} />
        <nav className={styles.secondaryLinks} aria-label="보조 분석 행동">
          <Link href="#condition-title">판단 변경 조건 추가하기</Link>
          <Link href="#next-title">다음 확인 시점 설정하기</Link>
          <Link href="/kr/watchlist?view=default">관심 종목에서 보기</Link>
          <Link href="/kr/journal">기록으로 남기기</Link>
        </nav>
      </div>
    </section>
  );
}

export function AnalysisExperience({ analysis, isUnknown }: { analysis: AnalysisMock; isUnknown: boolean }) {
  const [editable, setEditable] = useState(() => createEditableState(analysis));
  const [editingSection, setEditingSection] = useState<EditableSection | null>(null);
  const [draft, setDraft] = useState<DraftState | null>(null);
  const [error, setError] = useState<string | undefined>();
  const [appliedSection, setAppliedSection] = useState<EditableSection | null>(null);
  const sectionOrder = useMemo(() => getSectionOrder(analysis), [analysis]);

  const dirty = isDirty(editingSection, draft, editable);

  function beginEdit(section: EditableSection) {
    if (editingSection && editingSection !== section && dirty) {
      const discard = window.confirm("변경한 내용을 버리시겠습니까?");
      if (!discard) return;
    }

    setError(undefined);
    setAppliedSection(null);
    setEditingSection(section);
    setDraft(createDraft(editable));
  }

  function cancelEdit() {
    if (dirty) {
      const discard = window.confirm("변경한 내용을 버리시겠습니까?");
      if (!discard) return;
    }

    setEditingSection(null);
    setDraft(null);
    setError(undefined);
  }

  function applyEdit() {
    if (!editingSection || !draft) return;

    if (editingSection === "question" && draft.question.trim().length === 0) {
      setError("현재 질문은 비워둘 수 없습니다.");
      return;
    }

    setEditable((current) => {
      if (editingSection === "question") return { ...current, question: { ...current.question, text: draft.question.trim() } };
      if (editingSection === "interpretation") return { ...current, interpretation: { ...current.interpretation, text: draft.interpretationText, rationale: draft.interpretationRationale } };
      if (editingSection === "alternatives") return { ...current, alternatives: draft.alternatives };
      if (editingSection === "hypotheses") return { ...current, hypotheses: draft.hypotheses };
      if (editingSection === "unknowns") return { ...current, unknowns: draft.unknowns };
      if (editingSection === "conditions") return { ...current, conditions: draft.conditions };
      return { ...current, next: draft.next };
    });

    setAppliedSection(editingSection);
    setEditingSection(null);
    setDraft(null);
    setError(undefined);
  }

  const editProps: EditControlProps = {
    editingSection,
    beginEdit,
    cancelEdit,
    applyEdit,
    error
  };

  function renderSection(section: string) {
    const sections: Record<string, ReactNode> = {
      changes: <ChangesSection analysis={analysis} />,
      question: <QuestionSection editable={editable} draft={draft} setDraft={setDraft} editProps={editProps} />,
      facts: <FactsSection analysis={analysis} />,
      observation: <ObservationSection analysis={analysis} />,
      interpretation: <InterpretationSection editable={editable} draft={draft} setDraft={setDraft} editProps={editProps} />,
      alternatives: <AlternativesSection editable={editable} draft={draft} setDraft={setDraft} editProps={editProps} />,
      hypotheses: <HypothesesSection editable={editable} draft={draft} setDraft={setDraft} editProps={editProps} />,
      unknowns: <UnknownsSection editable={editable} draft={draft} setDraft={setDraft} editProps={editProps} />,
      conditions: <ConditionsSection editable={editable} draft={draft} setDraft={setDraft} editProps={editProps} />,
      evidence: <EvidenceSection analysis={analysis} />,
      related: <RelatedSection analysis={analysis} />,
      next: <NextSection editable={editable} draft={draft} setDraft={setDraft} editProps={editProps} />,
      history: <HistorySection analysis={analysis} />,
      actions: <ActionsSection analysis={analysis} />
    };

    return (
      <div className={appliedSection === section ? styles.appliedSection : undefined} key={section}>
        {sections[section]}
        {appliedSection === section ? <p className={styles.appliedNotice}>화면에 임시 반영됐습니다. 서버 저장은 아직 구현하지 않았습니다.</p> : null}
      </div>
    );
  }

  if (isUnknown) {
    return (
      <main className={styles.page}>
        <AnalysisHero analysis={analysis} isUnknown editable={editable} />
        <KREmptyState
          className={styles.emptyFirst}
          description="입력한 분석 식별자에 연결된 내용이 없습니다. 시장, 종목, 공식 근거에서 다시 분석을 시작할 수 있습니다."
          eyebrow="분석 확인 불가"
          title="해당 분석을 확인할 수 없습니다."
          titleId="unknown-analysis"
          actions={
            <div className={styles.heroActions}>
              <Link className={styles.primaryAction} href="/kr/stock/005930">
                종목에서 분석 시작하기
              </Link>
              <Link href="/kr/evidence?id=dart-samsung-001">공식 근거에서 시작</Link>
              <Link href="/kr/market">시장으로 돌아가기</Link>
            </div>
          }
        />
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <AnalysisHero analysis={analysis} isUnknown={false} editable={editable} />
      {editingSection ? (
        <p className={styles.modeNotice} role="status">
          {sectionLabels[editingSection]}만 편집 중입니다. 다른 섹션은 읽기 상태로 유지됩니다.
        </p>
      ) : null}
      {sectionOrder.map(renderSection)}
    </main>
  );
}
