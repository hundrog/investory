
// server/api/refill.ts
import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import type { Database } from '~/database.types'

export default defineEventHandler(async (event) => {
    const client = await serverSupabaseClient<Database>(event)
    const user = await serverSupabaseUser(event)
    const body = await readBody(event)

    const { productId, amount, cost } = body

    if (!user) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })

    const { error: txError } = await client.rpc('perform_refill', {
        input_product_id: productId,
        input_amount: amount,
        input_total_cost: cost,
        input_user_id: user.id
    })

    if (txError) throw createError({ statusCode: 500, statusMessage: txError.message })

    return { success: true }
})
