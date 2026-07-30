import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./design-language.module.scss";

type BadgeTone = "default" | "muted" | "unconfirmed";

type BadgeProps = {
  children: ReactNode;
  className?: string;
  tone?: BadgeTone;
};

type SectionHeaderProps = {
  title: string;
  description?: ReactNode;
  eyebrow?: string;
  id?: string;
  className?: string;
  eyebrowClassName?: string;
  descriptionAs?: "p" | "span";
};

type CTAAction = {
  href: string;
  label: string;
  variant?: "primary" | "secondary";
};

type CTAGroupProps = {
  actions: CTAAction[];
  className?: string;
  primaryClassName?: string;
};

type HeroProps = {
  title: string;
  eyebrow: string;
  children?: ReactNode;
  description?: ReactNode;
  id: string;
  className?: string;
  copyClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  aside?: ReactNode;
};

type EmptyStateProps = {
  title: string;
  description: ReactNode;
  actions?: ReactNode;
  eyebrow?: string;
  className?: string;
  titleId?: string;
};

type ChipProps = {
  label: string;
  href?: string;
  selected?: boolean;
  className?: string;
  children?: ReactNode;
};

type EntityChipProps = ChipProps & {
  code?: string;
  relation?: string;
};

type EvidenceCardProps = {
  title: string;
  href: string;
  source: string;
  publishedAt: string;
  confidence: ReactNode;
  supports: string;
  limitation: string;
  className?: string;
  metaClassName?: string;
  children?: ReactNode;
};

type TimelineItemProps = {
  time: string;
  title: string;
  linked: string;
  confidence: ReactNode;
  className?: string;
};

type RelatedEntityRowProps = {
  name: string;
  type: string;
  reason: string;
  href?: string;
  evidenceCount?: string;
  className?: string;
};

export function KRSectionHeader({
  title,
  description,
  eyebrow,
  id,
  className,
  eyebrowClassName,
  descriptionAs = "p"
}: SectionHeaderProps) {
  const DescriptionTag = descriptionAs;

  return (
    <div className={className ?? styles.sectionHeader}>
      {eyebrow ? <p className={eyebrowClassName}>{eyebrow}</p> : null}
      <h2 id={id}>{title}</h2>
      {description ? <DescriptionTag>{description}</DescriptionTag> : null}
    </div>
  );
}

export function KRConfidenceBadge({ children, className, tone = "default" }: BadgeProps) {
  return <span className={className ?? `${styles.badge} ${styles[tone]}`}>{children}</span>;
}

export function KRStatusBadge({ children, className, tone = "default" }: BadgeProps) {
  return <span className={className ?? `${styles.badge} ${styles[tone]}`}>{children}</span>;
}

export function KRInformationBadge({ children, className, tone = "muted" }: BadgeProps) {
  return <span className={className ?? `${styles.badge} ${styles[tone]}`}>{children}</span>;
}

export function KRCTAGroup({ actions, className, primaryClassName }: CTAGroupProps) {
  return (
    <div className={className ?? styles.ctaGroup}>
      {actions.map((action) => (
        <Link className={action.variant === "primary" ? primaryClassName : undefined} href={action.href} key={`${action.href}-${action.label}`}>
          {action.label}
        </Link>
      ))}
    </div>
  );
}

export function KRHero({
  title,
  eyebrow,
  children,
  description,
  id,
  className,
  copyClassName,
  titleClassName,
  descriptionClassName,
  aside
}: HeroProps) {
  return (
    <section className={className ?? styles.hero} aria-labelledby={id}>
      <div className={copyClassName ?? styles.heroCopy}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h1 className={titleClassName} id={id}>
          {title}
        </h1>
        {description ? <p className={descriptionClassName}>{description}</p> : null}
        {children}
      </div>
      {aside}
    </section>
  );
}

export function KREmptyState({ title, description, actions, eyebrow, className, titleId }: EmptyStateProps) {
  return (
    <section className={className ?? styles.emptyState} aria-labelledby={titleId}>
      <div>
        {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
        <h2 id={titleId}>{title}</h2>
        <p>{description}</p>
      </div>
      {actions}
    </section>
  );
}

export function KREntityChip({ label, code, relation, href, className, children }: EntityChipProps) {
  const content = children ?? (
    <>
      <strong>{label}</strong>
      {code ? <span>{code}</span> : null}
      {relation ? <small>{relation}</small> : null}
    </>
  );

  if (href) {
    return (
      <Link className={className} href={href}>
        {content}
      </Link>
    );
  }

  return <span className={className}>{content}</span>;
}

export function KRThemeChip({ label, selected, className, children }: ChipProps) {
  return (
    <button aria-pressed={selected} className={className} type="button">
      {children ?? label}
    </button>
  );
}

export function KREvidenceCard({
  title,
  href,
  source,
  publishedAt,
  confidence,
  supports,
  limitation,
  className,
  metaClassName,
  children
}: EvidenceCardProps) {
  return (
    <Link className={className ?? styles.evidenceCard} href={href}>
      <strong>{title}</strong>
      <span className={metaClassName ?? styles.metaLine}>
        {source} · {publishedAt}
      </span>
      {confidence}
      <dl>
        <div>
          <dt>확인할 수 있는 사실</dt>
          <dd>{supports}</dd>
        </div>
        <div>
          <dt>아직 단정할 수 없는 내용</dt>
          <dd>{limitation}</dd>
        </div>
      </dl>
      {children}
    </Link>
  );
}

export function KRTimelineItem({ time, title, linked, confidence, className }: TimelineItemProps) {
  return (
    <li className={className}>
      <time>{time}</time>
      <strong>{title}</strong>
      <span>{linked}</span>
      {confidence}
    </li>
  );
}

export function KRRelatedEntityRow({ name, type, reason, href, evidenceCount, className }: RelatedEntityRowProps) {
  const content = (
    <>
      <strong>{name}</strong>
      <span>{type}</span>
      <small>{reason}</small>
      {evidenceCount ? <em>{evidenceCount}</em> : null}
    </>
  );

  if (href) {
    return (
      <Link className={className ?? styles.relatedEntityRow} href={href}>
        {content}
      </Link>
    );
  }

  return <div className={className ?? styles.relatedEntityRow}>{content}</div>;
}
