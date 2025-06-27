// server/api/refill.ts
import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import type { Database } from '~/database.types'

export default defineEventHandler(async (event) => {
    const client = await serverSupabaseClient<Database>(event)
    const user = await serverSupabaseUser(event)
    const body = await readBody(event)

    if (!user) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })

    // Separate body into individual fields
    const { name, price } = body

    const { data, error } = await client.from('products')
        .insert({
            name,
            price,
            cost: 0,
            amount: 0,
            user_id: user.id,
        })
        .select()

    if (error) {
        throw createError({ statusCode: 500, statusMessage: error.message })
    }

    return { data: data[0] }
})

