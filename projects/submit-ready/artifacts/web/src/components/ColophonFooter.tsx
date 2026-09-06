import { useState } from 'react'
import { Link } from 'react-router-dom'

/** CREDIT.md #3 — quiet colophon. Non-removable. No hide toggle. */
export const COLOPHON_FOOTER = 'SubmitReady · a Devendra Singh work · Opus Zero'

export const ABOUT_BLURB =
  'SubmitReady is designed by Devendra Singh and built with the Opus Zero system. Files never leave your device.'

export function ColophonFooter() {
  const [open, setOpen] = useState(false)
  return (
    <footer className="colophon" data-credit="colophon-footer">
      <div className="colophon-line">{COLOPHON_FOOTER}</div>
      <button
        type="button"
        className="about-link"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        About
      </button>
      {' · '}
      <Link to="/about">About page</Link>
      {open ? <p className="about-blurb">{ABOUT_BLURB}</p> : null}
    </footer>
  )
}
