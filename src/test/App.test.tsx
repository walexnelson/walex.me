import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SocialLinks } from '../components/SocialLinks'

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
