const STRAVA_TOKEN_URL = 'https://www.strava.com/oauth/token'
const STRAVA_ATHLETE_URL = 'https://www.strava.com/api/v3/athlete'
const STRAVA_ACTIVITIES_URL = 'https://www.strava.com/api/v3/athlete/activities?per_page=6'

async function getAccessToken(env) {
  const res = await fetch(STRAVA_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: env.STRAVA_CLIENT_ID,
      client_secret: env.STRAVA_CLIENT_SECRET,
      refresh_token: env.STRAVA_REFRESH_TOKEN,
      grant_type: 'refresh_token',
    }),
  })
  const data = await res.json()
  if (!data.access_token) return data  // pass error object through
  return data.access_token
}

export default {
  async fetch(request, env) {
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders })
    }

    try {
      const tokenData = await getAccessToken(env)
      if (!tokenData || tokenData.errors) {
        return Response.json({ error: 'Token exchange failed', detail: tokenData }, { status: 401, headers: corsHeaders })
      }
      const token = tokenData

      // Fetch athlete profile and recent activities in parallel
      const [athleteRes, activitiesRes] = await Promise.all([
        fetch(STRAVA_ATHLETE_URL, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(STRAVA_ACTIVITIES_URL, { headers: { Authorization: `Bearer ${token}` } }),
      ])

      const athlete = await athleteRes.json()
      const activities = await activitiesRes.json()

      if (athlete.errors || athlete.message) {
        return Response.json({ error: 'Athlete fetch failed', detail: athlete }, { status: 401, headers: corsHeaders })
      }

      // Fetch stats using athlete id from profile
      const statsRes = await fetch(
        `https://www.strava.com/api/v3/athletes/${athlete.id}/stats`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      const stats = await statsRes.json()

      return Response.json({
        athlete: {
          name: `${athlete.firstname} ${athlete.lastname}`,
          username: athlete.username,
          city: athlete.city,
          country: athlete.country,
          profile: athlete.profile,
        },
        ytd: {
          runs: {
            count: stats.ytd_run_totals?.count ?? 0,
            distance: stats.ytd_run_totals?.distance ?? 0,
            movingTime: stats.ytd_run_totals?.moving_time ?? 0,
            elevationGain: stats.ytd_run_totals?.elevation_gain ?? 0,
          },
          rides: {
            count: stats.ytd_ride_totals?.count ?? 0,
            distance: stats.ytd_ride_totals?.distance ?? 0,
            movingTime: stats.ytd_ride_totals?.moving_time ?? 0,
            elevationGain: stats.ytd_ride_totals?.elevation_gain ?? 0,
          },
          swims: {
            count: stats.ytd_swim_totals?.count ?? 0,
            distance: stats.ytd_swim_totals?.distance ?? 0,
            movingTime: stats.ytd_swim_totals?.moving_time ?? 0,
          },
        },
        recentTotals: {
          runs: {
            count: stats.recent_run_totals?.count ?? 0,
            distance: stats.recent_run_totals?.distance ?? 0,
            movingTime: stats.recent_run_totals?.moving_time ?? 0,
            elevationGain: stats.recent_run_totals?.elevation_gain ?? 0,
          },
          rides: {
            count: stats.recent_ride_totals?.count ?? 0,
            distance: stats.recent_ride_totals?.distance ?? 0,
            movingTime: stats.recent_ride_totals?.moving_time ?? 0,
          },
          swims: {
            count: stats.recent_swim_totals?.count ?? 0,
            distance: stats.recent_swim_totals?.distance ?? 0,
            movingTime: stats.recent_swim_totals?.moving_time ?? 0,
          },
        },
        allTime: {
          runs: {
            count: stats.all_run_totals?.count ?? 0,
            distance: stats.all_run_totals?.distance ?? 0,
          },
          rides: {
            count: stats.all_ride_totals?.count ?? 0,
            distance: stats.all_ride_totals?.distance ?? 0,
          },
          swims: {
            count: stats.all_swim_totals?.count ?? 0,
            distance: stats.all_swim_totals?.distance ?? 0,
          },
        },
        recentActivities: Array.isArray(activities) ? activities.slice(0, 6).map(a => ({
          id: a.id,
          name: a.name,
          type: a.type,
          distance: a.distance,
          movingTime: a.moving_time,
          totalElevationGain: a.total_elevation_gain,
          averageSpeed: a.average_speed,
          maxSpeed: a.max_speed,
          averageHeartrate: a.average_heartrate,
          maxHeartrate: a.max_heartrate,
          startDate: a.start_date_local,
          kudosCount: a.kudos_count,
          achievementCount: a.achievement_count,
          sufferScore: a.suffer_score,
          calories: a.calories,
        })) : [],
      }, { headers: corsHeaders })
    } catch (e) {
      return Response.json({ error: 'Failed to fetch Strava data', detail: e.message }, { status: 500, headers: corsHeaders })
    }
  },
}
