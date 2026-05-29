# Firebase 가이드

Firebase 연결, 환경변수, 데이터 저장, 배포 기준을 정리하는 문서입니다.

## 목적

- Firebase 사용 범위를 명확히 합니다.
- Firebase 로그인 없이도 프로젝트의 유저 전환 구조를 유지합니다.
- 환경변수와 배포 설정을 안전하게 관리합니다.

## 기본값

### 사용 범위

- Firebase 로그인은 구현하지 않습니다.
- 헤더의 유저 전환 UI를 로그인 대체 장치로 유지합니다.
- Firebase는 필요 시 Firestore, Storage, Hosting 중심으로 사용합니다.
- Firebase Auth가 필요해 보여도 먼저 팀 논의와 문서 수정이 필요합니다.

### 환경변수

- Firebase 설정값은 `.env`에 저장합니다.
- `.env`는 Git에 올리지 않습니다.
- 공유용 파일은 `.env.example`만 사용합니다.
- 현재 필요한 환경변수는 다음과 같습니다.
  - `VITE_FIREBASE_API_KEY`
  - `VITE_FIREBASE_AUTH_DOMAIN`
  - `VITE_FIREBASE_PROJECT_ID`
  - `VITE_FIREBASE_STORAGE_BUCKET`
  - `VITE_FIREBASE_MESSAGING_SENDER_ID`
  - `VITE_FIREBASE_APP_ID`
  - `VITE_FIREBASE_MEASUREMENT_ID`

### Firebase 연결

- Firebase 초기화 코드는 `src/lib/firebase.ts`에서 관리합니다.
- 환경변수가 없을 때 앱이 바로 깨지지 않도록 처리합니다.
- 데이터 구조는 `docs/data-guide.md` 결정 후 Firebase에 반영합니다.
- 화면 컴포넌트에서 Firebase를 직접 많이 호출하지 않도록 합니다.

### Hosting

- 빌드 결과물은 `dist`를 사용합니다.
- Firebase Hosting 설정은 `firebase.json`에서 관리합니다.
- 배포 전 `bun run build`를 먼저 확인합니다.

### 보안

- Firebase 콘솔 권한은 필요한 사람에게만 부여합니다.
- 보안 규칙은 임시 허용 상태로 오래 두지 않습니다.
- 실제 사용자 데이터가 들어가기 전 Firestore 규칙을 검토합니다.

## 논의할 항목

- Firebase 프로젝트 생성 담당자
- Firebase 콘솔 접근 권한
- Firestore 사용 여부
- Storage 사용 여부
- Hosting 배포 담당자
- 개발용과 배포용 프로젝트를 나눌지
- 보안 규칙 검토 시점
- Firebase Auth를 끝까지 제외할지, 예외 조건을 둘지

## 최종 결정

아직 팀 결정 전입니다.

결정되면 아래에 기록합니다.

- Firebase 프로젝트 담당:
- 콘솔 접근 권한:
- Auth 사용 여부: 사용하지 않음
- Firestore 사용 여부:
- Storage 사용 여부:
- Hosting 사용 여부:
- 배포 담당:
- 보안 규칙 기준:

## 변경 이력

- 2026-05-29: Firebase 로그인 제외와 데이터/배포 중심 사용 기준 반영
