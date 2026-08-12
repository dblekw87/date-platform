"use client";

import { useEffect, useState } from "react";
import { uploadMedia } from "../_lib/upload-media";
import styles from "./page.module.scss";

const profileImageStorageKey = "date_profile_image";
const profileUpdatedEvent = "date-profile-updated";

type ProfileFormProps = {
  defaultAvatarUrl?: string | null;
  defaultBio?: string | null;
  defaultInterests?: string | null;
  defaultNickname: string;
  defaultPublicMemo?: string | null;
};

export function ProfileForm({
  defaultAvatarUrl,
  defaultBio,
  defaultInterests,
  defaultNickname,
  defaultPublicMemo
}: ProfileFormProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(defaultAvatarUrl ?? null);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    queueMicrotask(() => {
      setPreviewUrl(defaultAvatarUrl ?? localStorage.getItem(profileImageStorageKey));
    });
  }, [defaultAvatarUrl]);

  async function saveProfile(formData: FormData) {
    let avatarUrl = previewUrl;

    setStatus("저장 중");

    try {
      if (selectedImageFile) {
        setStatus("이미지 업로드 중");
        avatarUrl = await uploadMedia(selectedImageFile, "profile");
      }

      setStatus("프로필 저장 중");

      const response = await fetch("/api/backend/me/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          avatarUrl,
          bio: String(formData.get("bio") ?? ""),
          interests: String(formData.get("interests") ?? ""),
          nickname: String(formData.get("nickname") ?? ""),
          publicMemo: String(formData.get("publicMemo") ?? "")
        })
      });

      if (!response.ok) {
        throw new Error("profile_update_failed");
      }

      if (avatarUrl) {
        localStorage.setItem(profileImageStorageKey, avatarUrl);
        setPreviewUrl(avatarUrl);
      }

      window.dispatchEvent(new Event(profileUpdatedEvent));
      setStatus("저장됐습니다");
    } catch {
      if (avatarUrl) {
        localStorage.setItem(profileImageStorageKey, avatarUrl);
        window.dispatchEvent(new Event(profileUpdatedEvent));
      }

      setStatus("백엔드 연결 전이라 이 브라우저에만 저장됐습니다");
    }
  }

  return (
    <form action={saveProfile} className={styles.form}>
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
                setSelectedImageFile(file);
                setPreviewUrl(reader.result);
              };
              reader.readAsDataURL(file);
            }}
          />
        </label>
      </section>
      <label>
        닉네임
        <input defaultValue={defaultNickname} name="nickname" />
      </label>
      <label>
        한 줄 소개
        <input defaultValue={defaultBio ?? ""} name="bio" placeholder="예: 장 초반 거래대금과 뉴스 반응을 봅니다" />
      </label>
      <label>
        관심 분야
        <input defaultValue={defaultInterests ?? ""} name="interests" placeholder="예: 반도체, 전력설비, 장중 공시" />
      </label>
      <label>
        공개 메모
        <textarea
          defaultValue={defaultPublicMemo ?? ""}
          name="publicMemo"
          placeholder="프로필에 보여줄 매매 스타일이나 참고 정보를 적어주세요"
          rows={6}
        />
      </label>
      <div className={styles.actions}>
        {status ? <span aria-live="polite">{status}</span> : null}
        <button type="submit">프로필 저장</button>
      </div>
    </form>
  );
}
