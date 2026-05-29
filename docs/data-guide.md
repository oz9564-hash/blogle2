# 데이터 가이드

더미 데이터와 DB 연결 기준을 정리하는 문서입니다.

## 목적

- 헤더 유저 전환 구조와 역할별 화면이 같은 데이터 기준을 사용하게 합니다.
- 더미 데이터와 실제 DB 구조가 크게 달라지지 않게 합니다.
- AI가 화면마다 임의의 데이터 구조를 만들지 않게 합니다.

## 기본값

### 핵심 전제

- 현재 앱은 헤더에서 유저를 전환해 역할별 화면을 확인합니다.
- Firebase 로그인은 사용하지 않습니다.
- 현재 선택된 유저의 `role`을 기준으로 화면을 분기합니다.
- 데이터는 역할별 화면에서 필요한 정보만 필터링해서 보여줍니다.

### 역할 기준

역할 값은 아래를 기본으로 합니다.

- `candidate`: 지원자
- `recruiter`: 채용담당자
- `interviewer`: 면접관

역할 이름을 바꾸거나 새 역할을 추가하려면 먼저 팀 논의가 필요합니다.

### 데이터 작성 기준

- 필드명은 영어 `camelCase`를 사용합니다.
- 각 데이터에는 가능하면 `id`, `createdAt`, `updatedAt`을 포함합니다.
- 날짜는 문자열 또는 Firebase Timestamp 중 하나로 통일합니다.
- 상태값은 자유 텍스트가 아니라 정해진 값만 사용합니다.
- 화면별로 같은 의미의 필드를 다른 이름으로 만들지 않습니다.

### 더미 데이터

- 더미 데이터는 실제 DB 구조를 예상해서 만듭니다.
- 헤더 유저 전환에서 선택 가능한 유저는 더미 데이터와 연결되어야 합니다.
- 화면만 맞추기 위한 임시 필드는 나중에 제거 여부를 표시합니다.
- Firebase 연결 전에도 더미 데이터만으로 역할별 화면을 확인할 수 있어야 합니다.

### DB 연결 기준

- DB 구조가 정해지기 전에는 화면 컴포넌트와 데이터 접근 코드를 분리합니다.
- Firebase 연결 코드는 한 곳에서 관리합니다.
- 화면 컴포넌트는 가능한 한 데이터 형태에만 의존하게 만듭니다.

## 논의할 항목

- 주요 데이터 종류
- 컬렉션 이름
- 유저와 역할 구조
- 문서 id 생성 방식
- 필수 필드와 선택 필드
- 날짜 저장 방식
- 상태값 목록
- 더미 데이터 위치
- 화면별 필요한 데이터
- 실제 Firebase 구조와 더미 데이터 구조를 언제 맞출지

## 기본 데이터 모델 초안

아래는 논의 출발점입니다. 실제 서비스 기획에 맞게 수정합니다.

### users

- `id`
- `name`
- `role`
- `title`
- `createdAt`
- `updatedAt`

### candidateProfiles

- `id`
- `userId`
- `email`
- `phone`
- `position`
- `resumeSummary`
- `portfolioSummary`
- `availableTimes`
- `createdAt`
- `updatedAt`

### applications

- `id`
- `candidateId`
- `status`
- `recommendedTime`
- `confirmedTime`
- `interviewerId`
- `createdAt`
- `updatedAt`

### interviewQuestionSets

- `id`
- `applicationId`
- `questions`
- `createdAt`
- `updatedAt`

### evaluations

- `id`
- `applicationId`
- `score`
- `status`
- `comment`
- `createdAt`
- `updatedAt`

## 최종 결정

아직 팀 결정 전입니다.

결정되면 아래에 기록합니다.

- 주요 컬렉션:
- 역할 기준:
- 필드명 규칙:
- 날짜 저장 방식:
- 상태값 기준:
- 더미 데이터 위치:
- DB 연결 기준:

## 변경 이력

- 2026-05-29: SPA 유저 전환과 역할 기반 데이터 기준 반영
