# Blogle2

수강생들이 같은 기준으로 AI와 함께 개발하기 위한 SPA 프로젝트입니다.

이 레포의 문서는 완성된 정답이 아니라, 팀이 기본값을 기준으로 논의하고 확정해가는 출발점입니다.

## 프로젝트 전제

- 이 프로젝트는 React, TypeScript, Vite 기반 SPA입니다.
- 헤더의 유저 전환 UI는 개발과 시연을 위한 핵심 구조입니다.
- Firebase 로그인은 구현하지 않습니다.
- 세부 작업 규칙은 `AGENTS.md`와 `docs` 문서를 기준으로 합니다.

## 실행 방법

1. 의존성을 설치합니다.
   - 권장: `bun install`
2. 환경변수 파일을 준비합니다.
   - `.env.example`을 참고해 `.env`를 만듭니다.
3. 개발 서버를 실행합니다.
   - `bun run dev`
4. 배포 전 빌드를 확인합니다.
   - `bun run build`

## 문서 검토 순서

모든 작업에서 아래 문서를 전부 읽는 것이 아니라, 먼저 작업 성격을 판단한 뒤 필요한 문서만 추가로 확인합니다.

1. `AGENTS.md`
   - AI가 실제 작업 중 반드시 지킬 실행 규칙을 정합니다.
2. `docs/project-rules.md`
   - 협업, 브랜치, PR, 승인, 병합 기준을 정합니다.
3. `docs/data-guide.md`
   - 유저, 역할, 더미 데이터, DB 구조 기준을 정합니다.
4. `docs/design-system.md`
   - 모든 화면이 따라야 할 최소 디자인 기준을 정합니다.
5. `docs/firebase-guide.md`
   - Firebase 사용 범위, 환경변수, 배포 기준을 정합니다.

## 문서 확인 기준

- 일반 코드/문서 작업: `AGENTS.md`
- 협업, 브랜치, PR, 병합, 승인: `docs/project-rules.md`
- 데이터 이름, 컬렉션, 필드, 상태값, 역할 값: `docs/data-guide.md`
- 화면 톤, 레이아웃, 컴포넌트, 반응형: `docs/design-system.md`
- Firebase 연결, 환경변수, 배포, 보안: `docs/firebase-guide.md`
- 작업이 여러 영역에 걸치면 해당 문서만 추가로 확인합니다.

## 문서 운영 방식

- `README.md`는 문서 입구 역할만 합니다.
- 실제 기준은 담당 문서에 기록합니다.
- 팀 논의 후 확정한 내용은 각 문서의 `최종 결정` 영역에 기록합니다.
- 결정이 바뀌면 `변경 이력`에 이유를 남깁니다.
- 코드보다 문서 기준이 먼저입니다. 기준이 없으면 먼저 담당 문서에 기록합니다.

## AI 작업 요청 기본 흐름

1. 작업 목적을 정합니다.
2. 영향을 받는 역할 화면을 정합니다.
   - 지원자
   - 채용담당자
   - 면접관
   - 공통 헤더
   - 데이터/Firebase
3. 관련 문서를 확인합니다.
4. AI에게 작업을 요청합니다.
5. AI가 실행, 빌드, 린트 결과를 확인합니다.
6. 수강생이 결과를 검토하고 승인합니다.

## 현재 기술 기준

- React
- TypeScript
- Vite
- Tailwind CSS
- Firebase
- Bun

## 주의사항

- `.env`는 Git에 올리지 않습니다.
- Firebase 키는 `.env.example`에 값 없이 이름만 공유합니다.
- Firebase 로그인은 구현하지 않습니다.
- 공통 헤더와 유저 전환 구조는 `AGENTS.md`와 `docs/project-rules.md` 기준을 따릅니다.
- 디자인 기준은 `docs/design-system.md` 기준을 따릅니다.
