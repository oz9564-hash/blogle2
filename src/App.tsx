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
  { id: 'user_soohyun', name: 'Kim Soohyun', role: 'candidate', title: 'Frontend Engineer Applicant' },
  { id: 'user_haneul', name: 'Jung Haneul', role: 'candidate', title: 'AI Service Planner Applicant' },
  { id: 'user_jiyoung', name: 'Park Jiyoung', role: 'recruiter', title: 'Recruiting Manager' },
  { id: 'user_minjae', name: 'Lee Minjae', role: 'interviewer', title: 'Technical Interviewer' },
]

const candidateProfiles: CandidateProfile[] = [
  {
    userId: 'user_soohyun',
    email: 'soohyun@example.com',
    phone: '010-1234-5678',
    position: 'Frontend Developer',
    resumeSummary: 'Built React dashboards, calendar workflows, and booking validation flows.',
    portfolioSummary: 'Includes scheduling UI, calendar components, and accessibility-focused examples.',
    availableTimes: ['2026-06-02 10:00', '2026-06-03 14:00', '2026-06-04 16:00'],
  },
  {
    userId: 'user_haneul',
    email: 'haneul@example.com',
    phone: '010-9876-5432',
    position: 'AI Service Planner',
    resumeSummary: 'Planned recruiting automation chatbots and user research workflows.',
    portfolioSummary: 'Includes question recommendation specs, evaluation loops, and scheduling drafts.',
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
      'How would you design fast edits for available interview times?',
      'Where should React state end and server data begin in this workflow?',
      'How would you surface scheduling conflicts clearly in the UI?',
    ],
  },
  {
    applicationId: 'app_2026_002',
    questions: [
      'How would you validate the quality of AI-generated interview questions?',
      'How should schedule recommendations be prioritized across company and applicant constraints?',
      'What information should an interviewer see first during evaluation?',
    ],
  },
]

const evaluations: Evaluation[] = [
  {
    applicationId: 'app_2026_001',
    score: 'Pending',
    status: 'Evaluation scheduled',
    comment: 'Interview questions need final review.',
  },
  {
    applicationId: 'app_2026_002',
    score: '88',
    status: 'Evaluation complete',
    comment: 'Problem definition and user flow explanation were clear.',
  },
]

function App() {
  const [currentUser, setCurrentUser] = useState<FakeUser>(fakeUsers[0])
  const isTestPage = window.location.pathname === '/test'

  if (isTestPage) {
    return <TestPage />
  }

  return (
    <main className="min-h-svh bg-background text-foreground">
      <GlobalNavigation currentUser={currentUser} onUserChange={setCurrentUser} />
      <section className="mx-auto flex w-full max-w-[1200px] flex-col gap-6 px-6 py-6">
        <RoleView currentUser={currentUser} />
      </section>
    </main>
  )
}

function TestPage() {
  return (
    <main className="min-h-svh bg-background text-foreground">
      <section className="mx-auto flex w-full max-w-[960px] flex-col gap-6 px-6 py-10">
        <ViewHeader
          icon={<FlaskConical className="size-5" aria-hidden="true" />}
          title="Test Page"
          badge="Ready"
          description="A small standalone page for checking routing, styles, and deployment behavior."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ['Route', '/test'],
            ['Build', 'Vite + React'],
            ['Status', 'Rendered successfully'],
          ].map(([label, value]) => (
            <section key={label} className="rounded-lg border border-border bg-card p-4">
              <p className="text-sm font-semibold text-muted-foreground">{label}</p>
              <p className="mt-2 text-lg font-semibold">{value}</p>
            </section>
          ))}
        </div>
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
            Signed in as {currentUser.name} · {getRoleLabel(currentUser.role)}
          </p>
        </div>
        <nav className="flex flex-wrap gap-2" aria-label="Demo user switcher">
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
    return <EmptyState title="No candidate data found." description="Select a demo candidate with application data." />
  }

  return (
    <section className="flex flex-col gap-6">
      <ViewHeader
        icon={<UserRoundCheck className="size-5" aria-hidden="true" />}
        title={`${currentUser.name} Candidate View`}
        badge={getStatusLabel(application.status)}
        description={`${currentUser.title} can review submitted details and the current interview state.`}
      />
      <div className="grid gap-4 lg:grid-cols-[1fr_1.2fr]">
        <section className="rounded-lg border border-border bg-card p-4">
          <h2 className="mb-4 text-base font-semibold">Profile</h2>
          <DescriptionList
            items={[
              ['Name', currentUser.name],
              ['Position', profile.position],
              ['Email', profile.email],
              ['Phone', profile.phone],
            ]}
          />
        </section>
        <section className="rounded-lg border border-border bg-card p-4">
          <h2 className="mb-4 text-base font-semibold">Resume and Portfolio</h2>
          <DescriptionList
            items={[
              ['Resume', profile.resumeSummary],
              ['Portfolio', profile.portfolioSummary],
            ]}
          />
        </section>
      </div>
      <section className="rounded-lg border border-border bg-card p-4">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-base font-semibold">Interview Request</h2>
          <StatusBadge label={getStatusLabel(application.status)} />
        </div>
        <DataTable
          columns={['Request ID', 'Available Times', 'Recommended Time', 'Confirmed Time', 'Interviewer', 'Evaluation']}
          rows={[
            [
              application.id,
              profile.availableTimes.join(', '),
              application.recommendedTime,
              application.confirmedTime,
              getUserName(application.interviewerId),
              evaluation?.status ?? 'Pending',
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
        title={`${currentUser.name} Recruiter View`}
        badge="All requests"
        description="Review candidate requests, recommended schedules, confirmed times, and assigned interviewers."
      />
      <section className="rounded-lg border border-border bg-card p-4">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-base font-semibold">Scheduling Overview</h2>
          <StatusBadge label={`${applications.length} requests`} />
        </div>
        <DataTable
          columns={['Candidate', 'Position', 'Status', 'Recommended Time', 'Confirmed Time', 'Interviewer']}
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
        title={`${currentUser.name} Interviewer View`}
        badge="Assigned interviews"
        description="Review assigned interviews, generated questions, evaluation scores, and comments."
      />
      <section className="rounded-lg border border-border bg-card p-4">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-base font-semibold">Assigned Interviews</h2>
          <StatusBadge label={`${assignedApplications.length} requests`} />
        </div>
        <DataTable
          columns={['Candidate', 'Confirmed Time', 'Generated Questions', 'Score', 'Status', 'Comment']}
          rows={assignedApplications.map((application) => {
            const questionSet = questionSets.find((item) => item.applicationId === application.id)
            const evaluation = evaluations.find((item) => item.applicationId === application.id)

            return [
              getUserName(application.candidateId),
              application.confirmedTime,
              questionSet?.questions.join(' / ') ?? 'No questions',
              evaluation?.score ?? 'Pending',
              evaluation?.status ?? 'Pending',
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
  return fakeUsers.find((user) => user.id === userId)?.name ?? 'Unknown user'
}

function getRoleLabel(role: UserRole) {
  const labels: Record<UserRole, string> = {
    candidate: 'Candidate',
    recruiter: 'Recruiter',
    interviewer: 'Interviewer',
  }

  return labels[role]
}

function getStatusLabel(status: ApplicationStatus) {
  const labels: Record<ApplicationStatus, string> = {
    submitted: 'Submitted',
    confirmed: 'Confirmed',
    evaluating: 'Evaluating',
    completed: 'Complete',
  }

  return labels[status]
}

export default App
