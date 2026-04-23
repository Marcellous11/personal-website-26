#!/usr/bin/env bash
set -euo pipefail

CLIENT_ID="178078"
CODE="9446a1a8e56d4c98e311c30ca48346f4e1c0f0f1"

read -rsp "Strava Client Secret: " CLIENT_SECRET
echo

echo "Exchanging code for refresh token..."
RESPONSE=$(curl -sS -X POST https://www.strava.com/oauth/token \
  -d "client_id=${CLIENT_ID}" \
  -d "client_secret=${CLIENT_SECRET}" \
  -d "code=${CODE}" \
  -d "grant_type=authorization_code")

REFRESH_TOKEN=$(echo "$RESPONSE" | python3 -c "import sys,json; print(json.load(sys.stdin).get('refresh_token',''))")

if [ -z "$REFRESH_TOKEN" ]; then
  echo "ERROR. Full response:"
  echo "$RESPONSE"
  exit 1
fi

echo "Got refresh token. Updating Cloudflare Worker secret..."
cd "$(dirname "$0")"
printf '%s' "$REFRESH_TOKEN" | npx wrangler secret put STRAVA_REFRESH_TOKEN

echo "Done. Testing worker..."
sleep 2
curl -sS https://strava-stats.1mcj001.workers.dev/ | python3 -c "import sys,json; d=json.load(sys.stdin); print('recentActivities:', len(d.get('recentActivities',[]))); print('activitiesError:', d.get('activitiesError'))"
