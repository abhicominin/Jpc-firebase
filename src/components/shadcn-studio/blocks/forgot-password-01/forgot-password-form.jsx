'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import useAuth from '@/app/backend/context/auth'

const ForgotPasswordForm = () => {
  const { resetPassword } = useAuth()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const err = await resetPassword(email)
    if (err) setError(err)
    setLoading(false)
  }

  return (
    <form className='space-y-4' onSubmit={handleSubmit}>
      {error && (
        <p className='text-sm text-destructive text-center'>{error}</p>
      )}
      {/* Email */}
      <div className='space-y-1'>
        <Label className='leading-5' htmlFor='userEmail'>
          Email address*
        </Label>
        <Input
          type='email'
          id='userEmail'
          placeholder='Enter your email address'
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </div>
      <Button className='w-full' type='submit' disabled={loading}>
        {loading ? 'Sending...' : 'Send Reset Link'}
      </Button>
    </form>
  )
}

export default ForgotPasswordForm
