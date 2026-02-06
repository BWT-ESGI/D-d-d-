#!/bin/bash

echo "Building project..."
npm run build

echo "Starting server in background..."
node dist/main.js > server.log 2>&1 &
SERVER_PID=$!

echo "Waiting for server to start..."
sleep 5

echo "---------------------------------------------------"
echo "1. Creating Community"
RESPONSE=$(curl -s -X POST http://localhost:3000/communities \
  -H "Content-Type: application/json" \
  -d '{"name": "DDD Subdomains", "description": "Testing interaction", "isPrivate": true}')
echo "Response: $RESPONSE"

COMMUNITY_ID=$(echo $RESPONSE | grep -o '"id":"[^"]*"' | cut -d'"' -f4)
echo "Community ID: $COMMUNITY_ID"

echo "---------------------------------------------------"
echo "2. Joining Community: Triggers Identity Check, Notification, Gamification"
echo ">> Attempt with VALID user (user-123)"
curl -s -X POST http://localhost:3000/communities/$COMMUNITY_ID/join \
  -H "Content-Type: application/json" \
  -d '{"userId": "user-123", "userName": "Valid User", "userEmail": "valid@example.com"}'
echo ""

echo ">> Attempt with INVALID user (guest-123)"
curl -s -X POST http://localhost:3000/communities/$COMMUNITY_ID/join \
  -H "Content-Type: application/json" \
  -d '{"userId": "guest-123", "userName": "Invalid User", "userEmail": "invalid@example.com"}'
echo ""

echo "---------------------------------------------------"
echo "3. Checking Logs for Subdomain Activities..."
echo ""
grep "\[Analytics\]" server.log || echo "❌ Analytics log missing"
grep "\[Gamification\]" server.log || echo "❌ Gamification log missing"
grep "\[Notification\]" server.log || echo "❌ Notification log missing"

echo "---------------------------------------------------"
echo "Stopping server..."
kill $SERVER_PID
