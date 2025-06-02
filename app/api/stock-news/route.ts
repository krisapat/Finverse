import { NextResponse } from 'next/server'
import NodeCache from 'node-cache'

// Cache instance with 10 minutes TTL to avoid excessive API calls
const stockNewsCache = new NodeCache({ stdTTL: 600 })

// Get API key from environment variable
const API_KEY = process.env.MARKETAUX_API_KEY

// Marketaux base API endpoint
const BASE_URL = 'https://api.marketaux.com/v1/news/all'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const symbol = searchParams.get('symbol') || 'AAPL' // Default to AAPL if no symbol is provided

  // Check if the result is cached to avoid hitting the API unnecessarily
  const cachedData = stockNewsCache.get(symbol)
  if (cachedData) {
    return NextResponse.json({ articles: cachedData })
  }

  try {
    // Construct API URL with query parameters
    const url = `${BASE_URL}?symbols=${symbol}&language=en&filter_entities=true&api_token=${API_KEY}`
    const res = await fetch(url)

    if (!res.ok) {
      // Log error if the API response is not OK
      console.error(`Marketaux error: ${res.status} ${res.statusText}`)
      return NextResponse.json({ articles: [] }, { status: 200 })
    }

    const data = await res.json()

    // Transform and map raw API data to frontend-friendly format
    const articles = (data.data || []).slice(0, 10).map((item: any) => ({
      title: item.title || 'No title available',
      url: item.url || '#',
      date: item.published_at
        ? new Date(item.published_at).toLocaleString('th-TH', {
            dateStyle: 'short',
            timeStyle: 'short',
          })
        : 'No date available',
      description: item.description || 'No description available',
      source: item.source || 'Unknown',
    }))

    // Store the result in cache for 10 minutes
    stockNewsCache.set(symbol, articles)

    return NextResponse.json({ articles })
  } catch (error) {
    // Log any unexpected errors (e.g. network, JSON parsing)
    console.error('Unexpected error fetching Marketaux:', error)
    return NextResponse.json(
      { articles: [], error: 'An error occurred while fetching the news.' },
      { status: 500 }
    )
  }
}
