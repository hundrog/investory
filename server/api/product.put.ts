// server/api/refill.ts
import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import type { Database } from '~/database.types'

export default defineEventHandler(async (event) => {
    const client = await serverSupabaseClient<Database>(event)
    const user = await serverSupabaseUser(event)
    const body = await readBody(event)

    if (!user) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })

    // Separate body into individual fields
    const { id, name, price, amount, cost } = body

    const { data, error } = await client.from('products')
        .update({ name, price, amount, cost })
        .eq('id', id)
        .eq('status', 'active')
        .select()

    if (error) {
        throw createError({ statusCode: 500, statusMessage: 'Failed to update product' })
    }

    return { data: data[0] }
})
