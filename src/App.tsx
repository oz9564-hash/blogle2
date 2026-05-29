import { useState } from 'react'
import type { ReactNode } from 'react'
import { CalendarCheck, ClipboardCheck, FlaskConical, UserRoundCheck } from 'lucide-react'

type UserRole = 'recruiter' | 'candidate' | 'interviewer'
type ApplicationStatus = 'submitted' | 'confirmed' | 'evaluating' | 'completed'

type FakeUser = {
  id: string
  name: string
  role: UserRole
  title: string
}

type CandidateProfile = {
  userId: string
  email: string
  phone: string
  position: string
  resumeSummary: string
  portfolioSummary: string
  availableTimes: string[]
}

type Application = {
  id: string
  candidateId: string
  status: ApplicationStatus
  recommendedTime: string
  confirmedTime: string
  interviewerId: string
}

type InterviewQuestionSet = {
  applicationId: string
  questions: string[]
}

type Evaluation = {
  applicationId: string
  score: string
  status: string
  comment: string
}

const fakeUsers: FakeUser[] = [
  { id: 'user_soohyun', name: '김수현', role: 'candidate', title: '프론트엔드 지원자' },
  { id: 'user_haneul', name: '정하늘', role: 'candidate', title: 'AI 서비스 기획 지원자' },
  { id: 'user_jiyoung', name: '박지영', role: 'recruiter', title: '채용담당자' },
  { id: 'user_minjae', name: '이민재', role: 'interviewer', title: '기술 면접관' },
]

const candidateProfiles: CandidateProfile[] = [
  {
    userId: 'user_soohyun',
    email: 'soohyun@example.com',
    phone: '010-1234-5678',
    position: '프론트엔드 개발자',
    resumeSummary: 'React 기반 대시보드와 예약 플로우 구현 경험',
    portfolioSummary: '면접 일정 조율 UI, 캘린더 컴포넌트, 폼 검증 예제 포함',
    availableTimes: ['2026-06-02 10:00', '2026-06-03 14:00', '2026-06-04 16:00'],
  },
  {
    userId: 'user_haneul',
    email: 'haneul@example.com',
    phone: '010-9876-5432',
    position: 'AI 서비스 기획자',
    resumeSummary: '채용 자동화 챗봇 기획과 사용자 리서치 경험',
    portfolioSummary: '질문 추천 정책, 평가 루브릭, 온보딩 개선안 포함',
    availableTimes: ['2026-06-02 15:00', '2026-06-05 11:00', '2026-06-05 17:00'],
  },
]

const applications: Application[] = [
  {
    id: 'app_2026_001',
    candidateId: 'user_soohyun',
    status: 'confirmed',
    recommendedTime: '2026-06-03 14:00',
    confirmedTime: '2026-06-03 14:00',
    interviewerId: 'user_minjae',
  },
  {
    id: 'app_2026_002',
    candidateId: 'user_haneul',
    status: 'evaluating',
    recommendedTime: '2026-06-05 11:00',
    confirmedTime: '2026-06-05 11:00',
    interviewerId: 'user_minjae',
  },
]

const questionSets: InterviewQuestionSet[] = [
  {
    applicationId: 'app_2026_001',
    questions: [
      '예약 가능한 시간을 사용자가 빠르게 수정하게 하려면 어떤 UI가 적절한가요?',
      'React 상태와 서버 데이터를 어떤 기준으로 분리하겠나요?',
      '면접 일정 조율 중 오류 상황을 어떻게 안내하겠나요?',
    ],
  },
  {
    applicationId: 'app_2026_002',
    questions: [
      '지원자 이력 기반 질문 추천을 어떤 지표로 검증하겠나요?',
      '기업과 인재의 가능한 시간이 충돌할 때 우선순위를 어떻게 정하겠나요?',
      '면접관 평가 화면에서 가장 먼저 보여줘야 할 정보는 무엇인가요?',
    ],
  },
]

const evaluations: Evaluation[] = [
  {
    applicationId: 'app_2026_001',
    score: '대기',
    status: '평가 예정',
    comment: '면접 후 질문 검토 필요',
  },
  {
    applicationId: 'app_2026_002',
    score: '88',
    status: '평가 완료',
    comment: '문제 정의와 사용자 흐름 설명이 명확함',
  },
]

function App() {
  const [currentUser, setCurrentUser] = useState<FakeUser>(fakeUsers[0])
  const pathname = window.location.pathname

  const content =
    pathname === '/test'
      ? <TestPage currentUser={currentUser} />
      : pathname === '/test2'
        ? <Test2Page currentUser={currentUser} />
        : <RoleView currentUser={currentUser} />

  return (
    <main className="min-h-svh bg-background text-foreground">
      <GlobalNavigation currentUser={currentUser} onUserChange={setCurrentUser} />
      <section className="mx-auto flex w-full max-w-[1200px] flex-col gap-6 px-6 py-6">
        {content}
      </section>
    </main>
  )
}

function GlobalNavigation({
  currentUser,
  onUserChange,
}: {
  currentUser: FakeUser
  onUserChange: (user: FakeUser) => void
}) {
  return (
    <header className="flex min-h-16 w-full items-center border-b border-border bg-background">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-3 px-6 py-3 sm:flex-row sm:items-center sm:justify-between sm:py-0">
        <div>
          <p className="text-sm font-semibold text-primary">Interview Scheduler MVP</p>
          <p className="text-xs text-muted-foreground">
            현재 사용자 {currentUser.name} · {getRoleLabel(currentUser.role)}
          </p>
        </div>
        <nav className="flex flex-wrap gap-2" aria-label="데모 사용자 전환">
          {fakeUsers.map((user) => {
            const isActive = currentUser.id === user.id

            return (
              <button
                key={user.id}
                type="button"
                className={[
                  'h-10 rounded-lg border px-4 text-sm font-semibold',
                  isActive
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-background text-foreground',
                ].join(' ')}
                aria-pressed={isActive}
                onClick={() => onUserChange(user)}
              >
                {user.name} {getRoleLabel(user.role)}
              </button>
            )
          })}
        </nav>
      </div>
    </header>
  )
}

function Test2Page({ currentUser }: { currentUser: FakeUser }) {
  return (
    <section className="flex flex-col gap-6">
      <ViewHeader
        icon={<FlaskConical className="size-5" aria-hidden="true" />}
        title="/test2 테스트 페이지"
        badge={getRoleLabel(currentUser.role)}
        description={`${currentUser.name} 사용자 상태를 유지한 채 확인하는 테스트 페이지입니다.`}
      />
      <div className="grid gap-4 md:grid-cols-3">
        <section className="rounded-lg border border-border bg-card p-4">
          <h2 className="mb-2 text-base font-semibold">현재 사용자</h2>
          <p className="text-sm text-muted-foreground">{currentUser.name}</p>
        </section>
        <section className="rounded-lg border border-border bg-card p-4">
          <h2 className="mb-2 text-base font-semibold">역할</h2>
          <p className="text-sm text-muted-foreground">{getRoleLabel(currentUser.role)}</p>
        </section>
        <section className="rounded-lg border border-border bg-card p-4">
          <h2 className="mb-2 text-base font-semibold">경로</h2>
          <p className="text-sm text-muted-foreground">/test2</p>
        </section>
      </div>
    </section>
  )
}

function TestPage({ currentUser }: { currentUser: FakeUser }) {
  return (
    <section className="flex flex-col gap-6">
      <ViewHeader
        icon={<FlaskConical className="size-5" aria-hidden="true" />}
        title="/test 테스트 페이지"
        badge={getRoleLabel(currentUser.role)}
        description={`${currentUser.name} 사용자 상태를 유지한 채 /test 경로를 확인하는 페이지입니다.`}
      />
      <div className="grid gap-4 md:grid-cols-3">
        <section className="rounded-lg border border-border bg-card p-4">
          <h2 className="mb-2 text-base font-semibold">경로</h2>
          <p className="text-sm text-muted-foreground">/test</p>
        </section>
        <section className="rounded-lg border border-border bg-card p-4">
          <h2 className="mb-2 text-base font-semibold">현재 사용자</h2>
          <p className="text-sm text-muted-foreground">{currentUser.name}</p>
        </section>
        <section className="rounded-lg border border-border bg-card p-4">
          <h2 className="mb-2 text-base font-semibold">상태</h2>
          <p className="text-sm text-muted-foreground">렌더링 정상</p>
        </section>
      </div>
    </section>
  )
}

function RoleView({ currentUser }: { currentUser: FakeUser }) {
  if (currentUser.role === 'recruiter') {
    return <RecruiterView currentUser={currentUser} />
  }

  if (currentUser.role === 'interviewer') {
    return <InterviewerView currentUser={currentUser} />
  }

  return <CandidateView currentUser={currentUser} />
}

function CandidateView({ currentUser }: { currentUser: FakeUser }) {
  const profile = candidateProfiles.find((candidateProfile) => candidateProfile.userId === currentUser.id)
  const application = applications.find((item) => item.candidateId === currentUser.id)
  const evaluation = application
    ? evaluations.find((item) => item.applicationId === application.id)
    : undefined

  if (!profile || !application) {
    return <EmptyState title="지원자 데이터가 없습니다." description="데모 지원자 데이터 연결 상태를 확인하세요." />
  }

  return (
    <section className="flex flex-col gap-6">
      <ViewHeader
        icon={<UserRoundCheck className="size-5" aria-hidden="true" />}
        title={`${currentUser.name} 지원자 화면`}
        badge={getStatusLabel(application.status)}
        description={`${currentUser.title}로 선택된 상태입니다. 본인의 신청 정보와 면접 진행 상태를 확인합니다.`}
      />
      <div className="grid gap-4 lg:grid-cols-[1fr_1.2fr]">
        <section className="rounded-lg border border-border bg-card p-4">
          <h2 className="mb-4 text-base font-semibold">기본 프로필</h2>
          <DescriptionList
            items={[
              ['이름', currentUser.name],
              ['지원 포지션', profile.position],
              ['이메일', profile.email],
              ['전화번호', profile.phone],
            ]}
          />
        </section>
        <section className="rounded-lg border border-border bg-card p-4">
          <h2 className="mb-4 text-base font-semibold">이력서와 포트폴리오 요약</h2>
          <DescriptionList
            items={[
              ['이력서', profile.resumeSummary],
              ['포트폴리오', profile.portfolioSummary],
            ]}
          />
        </section>
      </div>
      <section className="rounded-lg border border-border bg-card p-4">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-base font-semibold">면접 신청 상태</h2>
          <StatusBadge label={getStatusLabel(application.status)} />
        </div>
        <DataTable
          columns={['신청 ID', '가능 시간', '추천 일정', '확정 일정', '면접관', '평가 상태']}
          rows={[
            [
              application.id,
              profile.availableTimes.join(', '),
              application.recommendedTime,
              application.confirmedTime,
              getUserName(application.interviewerId),
              evaluation?.status ?? '평가 전',
            ],
          ]}
        />
      </section>
    </section>
  )
}

function RecruiterView({ currentUser }: { currentUser: FakeUser }) {
  return (
    <section className="flex flex-col gap-6">
      <ViewHeader
        icon={<CalendarCheck className="size-5" aria-hidden="true" />}
        title={`${currentUser.name} 채용담당자 화면`}
        badge="전체 신청 관리"
        description="모든 지원자의 신청, 추천 일정, 확정 일정, 배정 면접관을 확인합니다."
      />
      <section className="rounded-lg border border-border bg-card p-4">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-base font-semibold">지원자 일정 조율 현황</h2>
          <StatusBadge label={`${applications.length}건`} />
        </div>
        <DataTable
          columns={['지원자', '포지션', '신청 상태', '추천 일정', '확정 일정', '배정 면접관']}
          rows={applications.map((application) => {
            const profile = candidateProfiles.find((item) => item.userId === application.candidateId)

            return [
              getUserName(application.candidateId),
              profile?.position ?? '-',
              getStatusLabel(application.status),
              application.recommendedTime,
              application.confirmedTime,
              getUserName(application.interviewerId),
            ]
          })}
        />
      </section>
    </section>
  )
}

function InterviewerView({ currentUser }: { currentUser: FakeUser }) {
  const assignedApplications = applications.filter((application) => application.interviewerId === currentUser.id)

  return (
    <section className="flex flex-col gap-6">
      <ViewHeader
        icon={<ClipboardCheck className="size-5" aria-hidden="true" />}
        title={`${currentUser.name} 면접관 화면`}
        badge="배정 면접"
        description="본인에게 배정된 면접의 자동 생성 질문과 평가 상태를 확인합니다."
      />
      <section className="rounded-lg border border-border bg-card p-4">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-base font-semibold">배정된 면접 목록</h2>
          <StatusBadge label={`${assignedApplications.length}건`} />
        </div>
        <DataTable
          columns={['지원자', '확정 일정', '자동 생성 질문', '평가 점수', '평가 상태', '코멘트']}
          rows={assignedApplications.map((application) => {
            const questionSet = questionSets.find((item) => item.applicationId === application.id)
            const evaluation = evaluations.find((item) => item.applicationId === application.id)

            return [
              getUserName(application.candidateId),
              application.confirmedTime,
              questionSet?.questions.join(' / ') ?? '질문 없음',
              evaluation?.score ?? '대기',
              evaluation?.status ?? '평가 전',
              evaluation?.comment ?? '-',
            ]
          })}
        />
      </section>
    </section>
  )
}

function ViewHeader({
  icon,
  title,
  badge,
  description,
}: {
  icon: ReactNode
  title: string
  badge: string
  description: string
}) {
  return (
    <div className="flex flex-col gap-3 border-b border-border pb-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border text-primary">
          {icon}
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-xl font-semibold">{title}</h1>
            <StatusBadge label={badge} />
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  )
}

function DescriptionList({ items }: { items: Array<[string, string]> }) {
  return (
    <dl className="grid gap-4 sm:grid-cols-2">
      {items.map(([label, value]) => (
        <div key={label} className="flex flex-col gap-1">
          <dt className="text-sm font-semibold">{label}</dt>
          <dd className="text-sm text-muted-foreground">{value}</dd>
        </div>
      ))}
    </dl>
  )
}

function DataTable({ columns, rows }: { columns: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[760px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-border text-muted-foreground">
            {columns.map((column) => (
              <th key={column} className="px-3 py-3 font-semibold">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.join('|')} className="border-b border-border last:border-b-0">
              {row.map((cell, cellIndex) => (
                <td key={`${cell}-${cellIndex}`} className="px-3 py-3 align-top">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <section className="rounded-lg border border-border bg-card p-6">
      <h1 className="text-xl font-semibold">{title}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </section>
  )
}

function StatusBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex min-h-6 items-center rounded-lg border border-primary px-2 text-xs font-semibold text-primary">
      {label}
    </span>
  )
}

function getUserName(userId: string) {
  return fakeUsers.find((user) => user.id === userId)?.name ?? '알 수 없음'
}

function getRoleLabel(role: UserRole) {
  const labels: Record<UserRole, string> = {
    candidate: '지원자',
    recruiter: '채용담당자',
    interviewer: '면접관',
  }

  return labels[role]
}

function getStatusLabel(status: ApplicationStatus) {
  const labels: Record<ApplicationStatus, string> = {
    submitted: '신청 완료',
    confirmed: '일정 확정',
    evaluating: '평가 진행',
    completed: '평가 완료',
  }

  return labels[status]
}

export default App
