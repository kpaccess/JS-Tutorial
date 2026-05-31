import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'
  const redirectUrl = new URL('/login', origin)

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`)
    }

    redirectUrl.searchParams.set('error', 'auth')
    redirectUrl.searchParams.set('message', error.message)
    return NextResponse.redirect(redirectUrl)
  }

  redirectUrl.searchParams.set('error', 'missing_code')
  return NextResponse.redirect(redirectUrl)
}
