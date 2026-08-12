import styles from "./AdSlot.module.scss";

export function AdSlot({ label }: { label: string }) {
  return (
    <aside className={styles.adSlot} aria-label={label}>
      <span>{label}</span>
    </aside>
  );
}

export function SideAdRails({ leftLabel, rightLabel }: { leftLabel: string; rightLabel: string }) {
  return (
    <div className={styles.sideAdRails} aria-label="페이지 좌우 광고">
      <aside aria-label={leftLabel}>
        <span>{leftLabel}</span>
      </aside>
      <aside aria-label={rightLabel}>
        <span>{rightLabel}</span>
      </aside>
    </div>
  );
}
