'use client'

import { useState, useEffect } from 'react'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import useAuth from '@/app/backend/context/auth'

const RegisterForm = () => {
  const { createUserWithEmailAndPassword, error, clearError } = useAuth()
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [validationError, setValidationError] = useState('')
  const [loading, setLoading] = useState(false)

  // Clear stale context errors when form mounts
  useEffect(() => {
    clearError()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setValidationError('Passwords do not match')
      return
    }
    if (password.length < 6) {
      setValidationError('Password must be at least 6 characters')
      return
    }
    setValidationError('')
    setLoading(true)
    await createUserWithEmailAndPassword(email, password, name)
    setLoading(false)
  }

  const displayError = validationError || error

  return (
    <form className='space-y-4' onSubmit={handleSubmit}>
      {/* Error */}
      {displayError && (
        <p className='text-sm text-destructive text-center'>{displayError}</p>
      )}
      {/* Username */}
      <div className='space-y-1'>
        <Label className='leading-5' htmlFor='username'>
          Username*
        </Label>
        <Input
          type='text'
          id='username'
          placeholder='Enter your username'
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      </div>
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
      {/* Password */}
      <div className='w-full space-y-1'>
        <Label className='leading-5' htmlFor='password'>
          Password*
        </Label>
        <div className='relative'>
          <Input
            id='password'
            type={isPasswordVisible ? 'text' : 'password'}
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
            onClick={() => setIsPasswordVisible(prev => !prev)}
            className='text-muted-foreground focus-visible:ring-ring/50 absolute inset-y-0 right-0 rounded-l-none hover:bg-transparent'>
            {isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
            <span className='sr-only'>{isPasswordVisible ? 'Hide password' : 'Show password'}</span>
          </Button>
        </div>
      </div>
      {/* Confirm Password */}
      <div className='w-full space-y-1'>
        <Label className='leading-5' htmlFor='confirmPassword'>
          Confirm Password*
        </Label>
        <div className='relative'>
          <Input
            id='confirmPassword'
            type={isConfirmPasswordVisible ? 'text' : 'password'}
            placeholder='••••••••••••••••'
            className='pr-9'
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
          />
          <Button
            variant='ghost'
            size='icon'
            type='button'
            onClick={() => setIsConfirmPasswordVisible(prev => !prev)}
            className='text-muted-foreground focus-visible:ring-ring/50 absolute inset-y-0 right-0 rounded-l-none hover:bg-transparent'>
            {isConfirmPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
            <span className='sr-only'>{isConfirmPasswordVisible ? 'Hide password' : 'Show password'}</span>
          </Button>
        </div>
      </div>
      <Button className='w-full' type='submit' disabled={loading}>
        {loading ? 'Creating account...' : 'Sign Up'}
      </Button>
    </form>
  )
}

export default RegisterForm
