// server/api/products.get.ts
import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import type { Database } from '~/database.types'

export default defineEventHandler(async (event) => {
    const client = await serverSupabaseClient<Database>(event)
    const user = await serverSupabaseUser(event)

    if (!user) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })

    const { data: products, error: productError } = await client
        .from('products')
        .select('*')
        .eq('status', 'active')
    if (productError) {
        throw createError({ statusCode: 500, statusMessage: 'Failed to fetch products' })
    }
    return { data: products }
})

