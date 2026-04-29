'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { ChevronLeftIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import ForgotPasswordForm from '@/components/shadcn-studio/blocks/forgot-password-01/forgot-password-form'
import AuthBackgroundShape from '@/assets/svg/auth-background-shape'
import Logo from '@/components/shadcn-studio/logo'
import useAuth from '@/app/backend/context/auth'
import { withPublicRoute } from '@/app/backend/hooks/route'

const ForgotPassword = () => {
  const { resetPassword } = useAuth()
  const searchParams = useSearchParams()
  const sent = searchParams.get('sent') === 'true'
  const sentEmail = searchParams.get('email') || ''

  const [resendStatus, setResendStatus] = useState('')
  const [resending, setResending] = useState(false)

  const handleResend = async () => {
    setResendStatus('')
    setResending(true)
    const err = await resetPassword(sentEmail)
    setResendStatus(err ? err : 'Reset link resent! Check your inbox.')
    setResending(false)
  }

  return (
    <div className='relative flex h-auto min-h-screen items-center justify-center overflow-x-hidden px-4 py-10 sm:px-6 lg:px-8'>
      <div className='absolute'>
        <AuthBackgroundShape />
      </div>
      <Card className='z-1 w-full border-none shadow-md sm:max-w-md'>
        <CardHeader className='gap-6'>
          <Logo className='gap-3' />
          <div>
            <CardTitle className='mb-1.5 text-2xl'>
              {sent ? 'Check your inbox' : 'Forgot Password?'}
            </CardTitle>
            <CardDescription className='text-base'>
              {sent
                ? <>
                    We sent a password reset link to{' '}
                    <span className='text-foreground font-medium'>{sentEmail}</span>.
                    Click the link in the email to reset your password.
                  </>
                : "Enter your email and we'll send you instructions to reset your password"}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className='space-y-4'>
          {sent ? (
            <>
              {resendStatus && (
                <p className={`text-sm text-center ${resendStatus.includes('resent') ? 'text-green-500' : 'text-destructive'}`}>
                  {resendStatus}
                </p>
              )}
              <Button className='w-full' onClick={handleResend} disabled={resending}>
                {resending ? 'Sending...' : 'Resend reset link'}
              </Button>
              <a href='/login' className='group mx-auto flex w-fit items-center gap-2 text-sm'>
                <ChevronLeftIcon className='size-4 transition-transform duration-200 group-hover:-translate-x-0.5' />
                <span>Back to login</span>
              </a>
            </>
          ) : (
            <>
              <ForgotPasswordForm />
              <a href='/login' className='group mx-auto flex w-fit items-center gap-2 text-sm'>
                <ChevronLeftIcon className='size-4 transition-transform duration-200 group-hover:-translate-x-0.5' />
                <span>Back to login</span>
              </a>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default withPublicRoute(ForgotPassword)
