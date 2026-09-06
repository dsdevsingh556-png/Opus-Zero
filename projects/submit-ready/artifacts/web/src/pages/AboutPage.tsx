import { ABOUT_BLURB } from '../components/ColophonFooter'

/** About expand target (CREDIT.md #3) — secondary page, not splash. */
export function AboutPage() {
  return (
    <section>
      <h1>About</h1>
      <p>{ABOUT_BLURB}</p>
      <p className="muted">No upload. No account. No telemetry in v1.</p>
    </section>
  )
}
