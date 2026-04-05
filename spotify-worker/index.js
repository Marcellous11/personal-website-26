const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token'
const SPOTIFY_NOW_PLAYING_URL = 'https://api.spotify.com/v1/me/player/currently-playing'
const SPOTIFY_RECENT_URL = 'https://api.spotify.com/v1/me/player/recently-played?limit=1'

async function getAccessToken(env) {
  const creds = btoa(`${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`)
  const res = await fetch(SPOTIFY_TOKEN_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${creds}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: env.SPOTIFY_REFRESH_TOKEN,
    }),
  })
  const data = await res.json()
  return data.access_token
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || ''
    const allowed = env.ALLOWED_ORIGIN || 'https://marcellousnotes.pages.dev'

    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders })
    }

    try {
      const token = await getAccessToken(env)

      // Try now playing first
      const npRes = await fetch(SPOTIFY_NOW_PLAYING_URL, {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (npRes.status === 200) {
        const data = await npRes.json()
        if (data && data.item) {
          return Response.json({
            isPlaying: data.is_playing,
            title: data.item.name,
            artist: data.item.artists.map(a => a.name).join(', '),
            album: data.item.album.name,
            albumArt: data.item.album.images[0]?.url,
            songUrl: data.item.external_urls.spotify,
          }, { headers: corsHeaders })
        }
      }

      // Fallback: recently played
      const recentRes = await fetch(SPOTIFY_RECENT_URL, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const recentData = await recentRes.json()
      const item = recentData.items?.[0]?.track

      if (item) {
        return Response.json({
          isPlaying: false,
          title: item.name,
          artist: item.artists.map(a => a.name).join(', '),
          album: item.album.name,
          albumArt: item.album.images[0]?.url,
          songUrl: item.external_urls.spotify,
        }, { headers: corsHeaders })
      }

      return Response.json({ isPlaying: false, title: null }, { headers: corsHeaders })
    } catch (e) {
      return Response.json({ error: 'Failed to fetch' }, { status: 500, headers: corsHeaders })
    }
  }
}
