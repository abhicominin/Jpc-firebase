'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Logo from '@/components/shadcn-studio/logo'
import AuthBackgroundShape from '@/assets/svg/auth-background-shape'
import useAuth from '@/app/backend/context/auth'
import { withUnverifiedRoute } from '@/app/backend/hooks/route'

const VerifyEmail = () => {
  const { resendVerificationEmail, reloadUser, logOut } = useAuth()
  const searchParams = useSearchParams()
  const email = searchParams.get('email') || 'your email address'

  const [resendStatus, setResendStatus] = useState(null)
  const [resending, setResending] = useState(false)
  const [checking, setChecking] = useState(false)

  // Poll every 5 seconds to auto-redirect once user clicks the link
  useEffect(() => {
    const interval = setInterval(async () => {
      const verified = await reloadUser()
      if (verified) clearInterval(interval)
    }, 5000)
    return () => clearInterval(interval)
  }, [reloadUser])

  const handleResend = async () => {
    setResending(true)
    setResendStatus(null)
    const error = await resendVerificationEmail()
    setResendStatus(error ? error : 'Email sent! Check your inbox.')
    setResending(false)
  }

  const handleCheckNow = async () => {
    setChecking(true)
    await reloadUser()
    setChecking(false)
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
            <CardTitle className='mb-1.5 text-2xl'>Verify your email</CardTitle>
            <CardDescription className='text-base'>
              An activation link has been sent to <span className='text-foreground font-medium'>{email}</span>. Please check your inbox and click on the link to complete the activation process.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <div className='space-y-4'>
            <Button className='w-full' onClick={handleCheckNow} disabled={checking}>
              {checking ? 'Checking...' : "I've verified my email"}
            </Button>

            {resendStatus && (
              <p className={`text-sm text-center ${resendStatus.includes('sent') ? 'text-green-500' : 'text-destructive'}`}>
                {resendStatus}
              </p>
            )}

            <p className='text-muted-foreground text-center'>
              Didn&apos;t get the mail?{' '}
              <button
                onClick={handleResend}
                disabled={resending}
                className='text-card-foreground hover:underline disabled:opacity-50'
              >
                {resending ? 'Sending...' : 'Resend'}
              </button>
            </p>

            <p className='text-muted-foreground text-center text-sm'>
              <button onClick={logOut} className='hover:underline'>
                Sign out
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default withUnverifiedRoute(VerifyEmail)

