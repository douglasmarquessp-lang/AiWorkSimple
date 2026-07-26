import {
  LayoutDashboard,
  PenLine,
  Workflow,
  FileText,
  BarChart3,
  Search,
  Sparkles,
} from 'lucide-react'

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Overview', active: true },
  { icon: PenLine, label: 'AI Writing' },
  { icon: Workflow, label: 'Automation' },
  { icon: FileText, label: 'Notes' },
  { icon: BarChart3, label: 'Analytics' },
]

const bars = [38, 55, 42, 68, 60, 82, 74]

export function DashboardMockup() {
  return (
    <div className="relative rounded-2xl border border-border bg-card p-2 shadow-2xl shadow-primary/5 ring-1 ring-black/[0.02]">
      <div className="overflow-hidden rounded-xl border border-border bg-background">
        <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-3">
          <div className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-border" />
            <span className="size-2.5 rounded-full bg-border" />
            <span className="size-2.5 rounded-full bg-border" />
          </div>
          <div className="mx-auto flex items-center gap-2 rounded-md border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
            <Search className="size-3" />
            app.aiworksimple.com
          </div>
        </div>

        <div className="flex">
          <aside className="hidden w-40 shrink-0 border-r border-border p-3 sm:block">
            <div className="flex items-center gap-2 px-2 pb-3">
              <span className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Sparkles className="size-3.5" />
              </span>
              <span className="text-xs font-semibold text-foreground">Workspace</span>
            </div>
            <nav className="space-y-1">
              {sidebarItems.map((item) => (
                <div
                  key={item.label}
                  className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs font-medium ${
                    item.active
                      ? 'bg-accent text-primary'
                      : 'text-muted-foreground'
                  }`}
                >
                  <item.icon className="size-3.5" />
                  {item.label}
                </div>
              ))}
            </nav>
          </aside>

          <div className="min-w-0 flex-1 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Good morning, Alex</p>
                <p className="text-sm font-semibold text-foreground">Productivity Overview</p>
              </div>
              <span className="rounded-md bg-primary px-2.5 py-1 text-[10px] font-medium text-primary-foreground cursor-pointer">
                + New task
              </span>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
              {[
                { k: 'Hours saved', v: '12.4h' },
                { k: 'Tasks automated', v: '86' },
                { k: 'Drafts created', v: '31' },
              ].map((s) => (
                <div key={s.k} className="rounded-lg border border-border bg-card p-2.5">
                  <p className="text-[10px] text-muted-foreground">{s.k}</p>
                  <p className="mt-1 text-sm font-semibold text-foreground">{s.v}</p>
                </div>
              ))}
            </div>

            <div className="mt-3 rounded-lg border border-border bg-card p-3">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-medium text-foreground">Weekly output</p>
                <span className="text-[10px] font-medium text-primary">+24%</span>
              </div>
              <div className="mt-3 flex h-20 items-end gap-2">
                {bars.map((h, i) => (
                  <div key={i} className="flex flex-1 flex-col justify-end">
                    <div
                      className={`w-full rounded-sm ${i === bars.length - 1 ? 'bg-primary' : 'bg-primary/25'}`}
                      style={{ height: `${h}%` }}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-3 flex items-center gap-2.5 rounded-lg border border-primary/20 bg-accent/60 p-2.5">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Sparkles className="size-3.5" />
              </span>
              <p className="text-[11px] leading-snug text-foreground">
                <span className="font-medium">AI suggestion:</span> Automate your
                weekly report — save ~2h.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
