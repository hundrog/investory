// server/api/product.get.ts
import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import type { Database } from '~/database.types'

export default defineEventHandler(async (event) => {
    const client = await serverSupabaseClient<Database>(event)
    const user = await serverSupabaseUser(event)
    const query = getQuery(event)

    const productId = query.id as string
    if (!productId) throw createError({ statusCode: 400, statusMessage: 'Product ID is required' })

    if (!user) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })

    const { data: product, error: productError } = await client
        .from('products')
        .select('*')
        .eq('id', productId)
        .eq('status', 'active')
        .single()
    if (productError) {
        throw createError({ statusCode: 500, statusMessage: 'Failed to fetch product' })
    }
    return { data: product }
})

