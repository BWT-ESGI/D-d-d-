#!/bin/bash
set -e

echo "Running Unit Tests (Domain)"
npm run test src/modules/communities/domain/community.aggregate.spec.ts
echo "Unit Tests Passed"

echo "---------------------------------------------------"

echo "Running fonction Tests (Functional)"
npm run test:fct
echo "Tests Passed"

echo "---------------------------------------------------"
echo "All Jest Tests Passed Successfully!"
