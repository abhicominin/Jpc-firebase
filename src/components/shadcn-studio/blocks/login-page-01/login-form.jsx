'use client'

import { useState, useEffect } from 'react'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import useAuth from '@/app/backend/context/auth'

const LoginForm = () => {
  const { signInUserWithEmailAndPassword, error, clearError } = useAuth()
  const [isVisible, setIsVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false)

  // Clear stale context errors when form mounts
  useEffect(() => {
    clearError()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await signInUserWithEmailAndPassword(email, password, rememberMe)
    setLoading(false)
  }

  return (
    <form className='space-y-4' onSubmit={handleSubmit}>
      {/* Error */}
      {error && (
        <p className='text-sm text-destructive text-center'>{error}</p>
      )}
      {/* Email */}
      <div className='space-y-1'>
        <Label htmlFor='userEmail' className='leading-5'>
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
      {/* Password */}
      <div className='w-full space-y-1'>
        <Label htmlFor='password' className='leading-5'>
          Password*
        </Label>
        <div className='relative'>
          <Input
            id='password'
            type={isVisible ? 'text' : 'password'}
            placeholder='••••••••••••••••'
            className='pr-9'
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <Button
            variant='ghost'
            size='icon'
            type='button'
            onClick={() => setIsVisible(prev => !prev)}
            className='text-muted-foreground focus-visible:ring-ring/50 absolute inset-y-0 right-0 rounded-l-none hover:bg-transparent'>
            {isVisible ? <EyeOffIcon /> : <EyeIcon />}
            <span className='sr-only'>{isVisible ? 'Hide password' : 'Show password'}</span>
          </Button>
        </div>
      </div>
      {/* Remember Me and Forgot Password */}
      <div className='flex items-center justify-between gap-y-2'>
        <div className='flex items-center gap-3'>
          <Checkbox
            id='rememberMe'
            className='size-6'
            checked={rememberMe}
            onCheckedChange={setRememberMe}
          />
          <Label htmlFor='rememberMe' className='text-muted-foreground cursor-pointer'>
            Remember Me
          </Label>
        </div>
        <a href='/forgot-password' className='hover:underline text-sm'>
          Forgot Password?
        </a>
      </div>
      <Button className='w-full' type='submit' disabled={loading}>
        {loading ? 'Signing in...' : 'Sign in'}
      </Button>
    </form>
  )
}

export default LoginForm
