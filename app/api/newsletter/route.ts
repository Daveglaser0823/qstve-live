import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required.' }, { status: 400 })
    }

    const apiKey = process.env.BUTTONDOWN_API_KEY

    if (!apiKey) {
      // Dev mode: log and succeed
      console.log('[Newsletter] Signup:', email, '(no API key configured)')
      return NextResponse.json({ success: true })
    }

    const res = await fetch('https://api.buttondown.email/v1/subscribers', {
      method: 'POST',
      headers: {
        Authorization: `Token ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email_address: email }),
    })

    if (!res.ok) {
      const data = await res.json()
      // Buttondown returns an error if already subscribed
      if (data.email_address?.[0]?.includes('already subscribed')) {
        return NextResponse.json({ success: true })
      }
      return NextResponse.json({ error: 'Subscription failed. Try again.' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }
}
