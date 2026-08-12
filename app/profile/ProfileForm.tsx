"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.scss";

const profileImageStorageKey = "date_profile_image";
const profileUpdatedEvent = "date-profile-updated";

export function ProfileForm({ defaultNickname }: { defaultNickname: string }) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    setPreviewUrl(localStorage.getItem(profileImageStorageKey));
  }, []);

  return (
    <form className={styles.form}>
      <section className={styles.avatarPanel}>
        <div aria-label="대표 이미지 미리보기">
          {previewUrl ? <img alt="대표 이미지 미리보기" src={previewUrl} /> : "M"}
        </div>
        <label>
          대표 이미지
          <input
            type="file"
            accept="image/*"
            onChange={(event) => {
              const file = event.target.files?.[0];

              if (!file) return;

              const reader = new FileReader();

              reader.onload = () => {
                if (typeof reader.result !== "string") return;
                setSelectedImage(reader.result);
                setPreviewUrl(reader.result);
              };
              reader.readAsDataURL(file);
            }}
          />
        </label>
      </section>
      <label>
        닉네임
        <input defaultValue={defaultNickname} />
      </label>
      <label>
        한 줄 소개
        <input placeholder="예: 장 초반 거래대금과 뉴스 반응을 봅니다" />
      </label>
      <label>
        관심 분야
        <input placeholder="예: 반도체, 전력설비, 장중 공시" />
      </label>
      <label>
        공개 메모
        <textarea placeholder="프로필에 보여줄 매매 스타일이나 참고 정보를 적어주세요" rows={6} />
      </label>
      <div className={styles.actions}>
        <button
          type="button"
          onClick={() => {
            if (selectedImage) {
              localStorage.setItem(profileImageStorageKey, selectedImage);
            }
            window.dispatchEvent(new Event(profileUpdatedEvent));
          }}
        >
          프로필 저장
        </button>
      </div>
    </form>
  );
}
