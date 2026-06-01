import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SocialLinks } from '../components/SocialLinks'
import { Footer } from '../components/Footer'
import { About } from '../components/About'

describe('SocialLinks', () => {
  it('renders all four social links', () => {
    render(<SocialLinks />)
    expect(screen.getByLabelText('GitHub')).toBeInTheDocument()
    expect(screen.getByLabelText('LinkedIn')).toBeInTheDocument()
    expect(screen.getByLabelText('Instagram')).toBeInTheDocument()
    expect(screen.getByLabelText('Facebook')).toBeInTheDocument()
  })

  it('links open in a new tab', () => {
    render(<SocialLinks />)
    const github = screen.getByLabelText('GitHub')
    expect(github).toHaveAttribute('target', '_blank')
    expect(github).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('github link points to the correct URL', () => {
    render(<SocialLinks />)
    expect(screen.getByLabelText('GitHub')).toHaveAttribute(
      'href',
      'https://github.com/walexnelson'
    )
  })
})

describe('Footer', () => {
  it('renders the site name', () => {
    render(<Footer />)
    expect(screen.getByText('WALEX.ME')).toBeInTheDocument()
  })

  it('renders the copyright year', () => {
    render(<Footer />)
    const year = new Date().getFullYear()
    expect(screen.getByText(`© ${year} Alex Nelson`)).toBeInTheDocument()
  })
})

describe('About', () => {
  it('renders the heading', () => {
    render(<About />)
    expect(screen.getByText("Hi, I'm Alex.")).toBeInTheDocument()
  })

  it('renders the gravatar image with correct src', () => {
    render(<About />)
    const img = screen.getByAltText('Alex Nelson')
    expect(img).toHaveAttribute(
      'src',
      'https://www.gravatar.com/avatar/8ad72a6d9df91e7cdb79fd88a5f4cb4d?s=240&d=retro'
    )
  })

  it('renders the location', () => {
    render(<About />)
    expect(screen.getByText('Lehi, Utah')).toBeInTheDocument()
  })

  it('renders the first bio paragraph', () => {
    render(<About />)
    expect(screen.getByText(/getting to the heart of complex problems/)).toBeInTheDocument()
  })
})
