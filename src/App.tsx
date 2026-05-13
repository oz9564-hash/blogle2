import { Database, Flame, Layers3, Server, type LucideIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { hasFirebaseConfig } from '@/lib/firebase'

const stackItems: Array<{
  label: string
  value: string
  Icon: LucideIcon
}> = [
  { label: 'Frontend', value: 'Vite + React 19 + TypeScript', Icon: Layers3 },
  { label: 'Backend', value: 'Firebase SDK', Icon: Database },
  { label: 'Runtime', value: 'bun package manager', Icon: Server },
]

function App() {
  return (
    <main className="min-h-svh bg-background">
      <section className="mx-auto flex min-h-svh w-full max-w-6xl flex-col px-6 py-6">
        <nav className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              B
            </span>
            blogle
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="rounded-md border border-border px-2 py-1">Vite</span>
            <span className="rounded-md border border-border px-2 py-1">React 19</span>
            <span className="rounded-md border border-border px-2 py-1">bun</span>
          </div>
        </nav>

        <div className="grid flex-1 items-center gap-10 py-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-7">
            <div className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-1 text-sm text-muted-foreground">
              <Flame className="size-4 text-primary" />
              Firebase backend ready
            </div>
            <div className="space-y-4">
              <h1 className="max-w-2xl text-4xl font-semibold tracking-normal text-foreground sm:text-5xl">
                Firebase 기반 React SPA 시작점
              </h1>
              <p className="max-w-xl text-base leading-7 text-muted-foreground">
                Vite, React 19, TypeScript, Tailwind v4, shadcn 스타일 컴포넌트, bun 환경을 한 번에 맞춘 로컬 앱입니다.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button>대시보드 열기</Button>
              <Button variant="outline">컴포넌트 확인</Button>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-card-foreground">환경 상태</p>
                <p className="text-sm text-muted-foreground">로컬 개발 서버 기준</p>
              </div>
              <span className="rounded-md bg-accent px-2 py-1 text-xs font-medium text-accent-foreground">
                Active
              </span>
            </div>
            <div className="grid gap-3">
              {stackItems.map(({ label, value, Icon }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 rounded-md border border-border bg-background p-3"
                >
                  <Icon className="size-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">{label}</p>
                    <p className="text-sm text-muted-foreground">{value}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-md bg-muted p-3 text-sm text-muted-foreground">
              Firebase env: {hasFirebaseConfig ? 'configured' : 'waiting for .env'}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
