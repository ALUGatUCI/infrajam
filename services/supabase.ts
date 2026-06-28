import { createClient, SupabaseClient } from '@supabase/supabase-js'

import { generateRandomCode } from './security'

class DatabaseService {
  private supabase: SupabaseClient

  public constructor() {
    this.supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    )
  }

  public async confirmApplication(appId: string, confirmationCode: string): Promise<void> {
    const { data, error } = await this.supabase
      .from('applications')
      .select('confirmed, confirmation_code')
      .eq('id', appId)
      .maybeSingle()

    if (error) {
      throw new Error("Application was not found")
    }

    if (data?.confirmed) {
      throw new Error("Application has already been confirmed")
    }

    if (confirmationCode == data?.confirmation_code) {
      const { error: updateError } = await this.supabase
        .from('applications')
        .update({ confirmed: true })
        .eq('id', appId)

      if (updateError) {
        throw new Error("An error occurred confirming your application")
      }
    } else {
      throw new Error("The confirmation code does not match")
    }
  }

  public async joinMailingList(email: string): Promise<void> {
    const { data, error } = await this.supabase
      .from('mailing')
      .select('email')
      .eq('email', email)
      .maybeSingle()

    if (error) {
      throw new Error("The email is already subscribed")
    }

    const { error: subscribeError } = await this.supabase
      .from('mailing')
      .insert({ email: email, unsubscribe_key: generateRandomCode() })

    if (subscribeError) {
      throw new Error("There was a problem subscribing the email to the mailing list")
    }
  }
}

const database = new DatabaseService()

export default database