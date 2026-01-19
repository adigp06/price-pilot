'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight } from 'lucide-react'

interface RecommendationScreenProps {
  selectedItems: { [key: string]: boolean }
  priority: { type: 'cheapest' | 'fastest' | 'lowest-fee' }
  onNewComparison: () => void
}

const APP_DATA = {
  blinkit: {
    name: 'Blinkit',
    total: 2145,
    delivery: 30,
    deliveryFee: 49,
    badge: 'Fastest',
    color: 'from-yellow-400 to-yellow-600',
  },
  zepto: {
    name: 'Zepto',
    total: 1980,
    delivery: 25,
    deliveryFee: 29,
    badge: 'Cheapest',
    color: 'from-red-400 to-red-600',
  },
  amazon: {
    name: 'Amazon Fresh',
    total: 2310,
    delivery: 45,
    deliveryFee: 0,
    badge: 'No Delivery Fee',
    color: 'from-orange-400 to-orange-600',
  },
}

const getRecommendation = (
  priority: 'cheapest' | 'fastest' | 'lowest-fee'
) => {
  switch (priority) {
    case 'cheapest':
      return 'zepto'
    case 'fastest':
      return 'blinkit'
    case 'lowest-fee':
      return 'amazon'
  }
}

const getPriorityReason = (
  priority: 'cheapest' | 'fastest' | 'lowest-fee'
): string => {
  switch (priority) {
    case 'cheapest':
      return 'Lowest item prices + lower delivery fee'
    case 'fastest':
      return 'Quickest delivery time + competitive pricing'
    case 'lowest-fee':
      return 'Zero delivery fee + reasonable item prices'
  }
}

export default function RecommendationScreen({
  selectedItems,
  priority,
  onNewComparison,
}: RecommendationScreenProps) {
  const recommendedKey = getRecommendation(priority.type)
  const recommended = APP_DATA[recommendedKey as keyof typeof APP_DATA]
  const otherApps = Object.entries(APP_DATA).filter(
    ([key]) => key !== recommendedKey
  )

  const selectedCount = Object.values(selectedItems).filter(Boolean).length

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <div className="bg-background border-b border-border">
        <div className="max-w-md mx-auto px-6 py-4">
          <h1 className="text-xl font-bold text-foreground">
            Best option for your order
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {selectedCount} items selected
          </p>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6 space-y-6">
        {/* Recommended App Card - Highlighted */}
        <div className="space-y-4">
          <div
            className={`relative bg-gradient-to-br ${recommended.color} rounded-xl p-6 text-white shadow-lg`}
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold opacity-90">
                    RECOMMENDED FOR YOU
                  </p>
                  <h2 className="text-3xl font-bold mt-1">
                    {recommended.name}
                  </h2>
                </div>
                <Badge className="bg-white/30 text-white border-0">
                  ⭐ {recommended.badge}
                </Badge>
              </div>

              {/* Price & Delivery Info */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <p className="text-sm opacity-90">Total for order</p>
                  <p className="text-3xl font-bold">₹{recommended.total}</p>
                </div>
                <div>
                  <p className="text-sm opacity-90">Delivery time</p>
                  <p className="text-2xl font-bold">
                    {recommended.delivery}
                    <span className="text-sm ml-1">min</span>
                  </p>
                </div>
              </div>

              {/* Delivery Fee */}
              <div className="bg-white/20 rounded-lg p-3 text-sm">
                <p>Delivery fee: ₹{recommended.deliveryFee}</p>
              </div>
            </div>
          </div>

          {/* Why This App Section */}
          <div className="bg-secondary rounded-lg p-4 border border-border">
            <p className="text-sm text-muted-foreground font-medium">
              Why this app?
            </p>
            <p className="text-foreground mt-2 font-semibold">
              {getPriorityReason(priority.type)}
            </p>
          </div>
        </div>

        {/* Other Apps - Comparison */}
        <div className="space-y-3 pt-6 border-t border-border">
          <p className="text-sm font-semibold text-muted-foreground">
            Other options
          </p>
          {otherApps.map(([key, app]) => (
            <div
              key={key}
              className="bg-card rounded-lg p-4 border border-border flex items-center justify-between opacity-75 hover:opacity-100 transition-opacity"
            >
              <div>
                <p className="font-semibold text-foreground">{app.name}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  ₹{app.total} • {app.delivery} min
                </p>
              </div>
              <div className="text-right text-sm text-muted-foreground">
                <p className="line-through">₹{app.total}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="bg-muted rounded-lg p-4 mt-8">
          <p className="text-xs text-muted-foreground text-center">
            ℹ️ Prices and delivery times are estimates and may vary. Actual
            prices may differ based on current availability and promotions.
          </p>
        </div>
      </div>

      {/* Sticky Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border">
        <div className="max-w-md mx-auto px-6 py-4 space-y-3">
          <Button
            className="w-full h-12 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
            size="lg"
          >
            Continue to {recommended.name}
            <ArrowRight className="w-5 h-5" />
          </Button>
          <Button
            onClick={onNewComparison}
            variant="outline"
            className="w-full h-12 border-border text-foreground font-semibold rounded-lg hover:bg-secondary transition-colors bg-transparent"
            size="lg"
          >
            New Comparison
          </Button>
        </div>
      </div>
    </div>
  )
}
