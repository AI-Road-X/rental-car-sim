#!/usr/bin/env bash
set -u

# Vercel: exit 0 = skip deployment, exit 1 = build.
# If there is no previous production SHA, build safely.
if [ -z "${VERCEL_GIT_PREVIOUS_SHA:-}" ]; then
  exit 1
fi

changed="$(git diff --name-only "$VERCEL_GIT_PREVIOUS_SHA" HEAD || true)"

# Only deploy when public product/runtime/discovery files changed,
# or when the explicit one-time deployment trigger changes.
if printf '%s\n' "$changed" | grep -Eq '^(deploy-trigger\.txt|index\.html|vercel\.json|api/|ai/|\.well-known/|sitemap\.xml|robots\.txt|llms\.txt|manifest\.webmanifest|icon\.svg|about/|privacy/|terms/|affiliate-disclosure/|ai-itinerary-checker/|ai-itinerary-critic/|chatgpt-itinerary-to-map/|china-itinerary-checker/|beijing-xian-chengdu-shanghai-best-order/|examples/|google-maps-route-to-itinerary/|how-route-score-works/|is-my-itinerary-too-rushed/|itinerary-map-maker/|japan-itinerary-checker/|multi-city-itinerary-checker/|optimize-travel-itinerary-route/|travel-route-visualizer/|trip-distance-calculator/|tokyo-hakone-kyoto-osaka-best-order/|trips/)'; then
  exit 1
fi

exit 0
