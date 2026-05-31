import { NextRequest, NextResponse } from 'next/server'
import { getRequestOrigin, getSafeNextPath } from '@/lib/auth/redirect-url'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const origin = getRequestOrigin(request)
  const code = searchParams.get('code')
  const next = getSafeNextPath(searchParams.get('next'))
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
