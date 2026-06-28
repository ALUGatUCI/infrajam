"use server"

import { NextRequest } from 'next/server'
import supabase from '../../../services/supabase'

export async function PUT(request: NextRequest) {
  try {
    const form = await request.formData();

    const appId = form.get('app_id');
    const confirmationCode = form.get('confirmation_code')

    if (!appId) {
      return Response.json(
        { ok: false, error: 'Missing application id' },
        { status: 400 },
      )
    }

    const trimmedAppId = String(appId).trim()
    const trimmedConfirmationCode = String(confirmationCode).trim()

    const { data, error } = await supabase
      .from('applications')
      .select('confirmed, confirmation_code')
      .eq('id', trimmedAppId)
      .maybeSingle()

    // Check if the application is already in the database
    if (error) {
      return Response.json(
        { ok: false, error: `Application was not found` },
        { status: 404 }
      )
    }

    // Check if the application was already confirmed
    if (data?.confirmed) {
      return Response.json(
        { ok: false, error: `Application has already been confirmed` },
        { status: 404 }
      )
    }

    // Confirm the application if the code matches
    if (trimmedConfirmationCode == data?.confirmation_code) {
      const { error: updateError } = await supabase
        .from('applications')
        .update({ confirmed: true })
        .eq('id', trimmedAppId)

      if (updateError) {
        return Response.json(
          { ok: false, error: `An error occurred confirming your application` },
          { status: 500 }
        )
      }

      return Response.json(
        { ok: true, message: 'Application has been confirmed' },
        { status: 201 }
      )
    } else {
      return Response.json(
        { ok: false, error: `The confirmation code is not valid` },
        { status: 403 }
      )
    }
  } catch {
    return Response.json(
      { ok: false, error: `An unknown server error occurred` },
      { status: 500 }
    )
  }
}