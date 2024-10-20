// 파일 사이즈 체크
export const checkFileSize = (fileSize: number) => {
  if (fileSize > 1.5 * 1024 * 1024) {
    console.error("파일 크기는 1.5MB를 초과할 수 없습니다.");
    return false;
  } else {
    return true;
  }
};

// 파일 형식 체크
export const checkFileType = (fileType: string) => {
  if (!["image/jpeg", "image/png", "image/jpg"].includes(fileType)) {
    console.error("지원하지 않는 파일 형식입니다.");
    return false;
  } else {
    return true;
  }
};

// User 모델에 담기는 경로
export const getUserPath = (storagePath: string) => {
  const path = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${process.env.NEXT_PUBLIC_STORAGE_BUCKET}/${storagePath}`;
  return path;
};

// Supabase Storage에 담기는 경로
export const getStoragePath = (sessionId: number, fileName: string) => {
  const timestamp = Date.now();
  const extension = fileName.split(".").pop();
  const randomSuffix = Math.random().toString(36).substring(2, 8);

  const path = `${sessionId}/${timestamp}_${randomSuffix}.${extension}`;
  return path;
};
