import { NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function DELETE(request: NextRequest) {
  try {
    const form = await request.formData();

    const email = form.get('email');

    if (!email) {
      return;
    }

    const trimmedEmail = String(email).trim()

    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    )

    // Check if email is already in the database
    const { data: data, error: error } = await supabase
      .from('mailing')
      .select('email')
      .eq('email', trimmedEmail)
      .maybeSingle()

    if (data) {
      const { data: data, error: error } = await supabase
        .from('mailing')
        .delete()
        .eq('email', trimmedEmail)

      if (error) {
        return Response.json(
          { ok: false, error: 'A database error occurred' },
          { status: 500 },
        )
      }

      return Response.json(
        { ok: true, error: 'Unsubscribed from the mailing list' },
        { status: 201 },
      )
    } else {
      return Response.json(
        { ok: false, error: 'A database error occurred' },
        { status: 500 },
      )
    }
  } catch (error) {
    return Response.json(
      { ok: false, error: `An unknown error occurred: ${error}` },
      { status: 500 }
    )
  }
}