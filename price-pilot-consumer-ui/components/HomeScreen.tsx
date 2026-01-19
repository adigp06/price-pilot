'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

interface HomeScreenProps {
  onStartComparing: () => void
}

export default function HomeScreen({ onStartComparing }: HomeScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12 bg-background">
      <div className="w-full max-w-md space-y-8 text-center">
        {/* Logo / Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary">
            <span className="text-2xl font-bold text-primary-foreground">₹</span>
          </div>
        </div>

        {/* Main Heading */}
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-foreground leading-tight">
            Where should you order from today?
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed">
            Compare prices for everyday groceries across Blinkit, Zepto, and Amazon Fresh.
          </p>
        </div>

        {/* Trust Note */}
        <div className="bg-secondary/50 rounded-lg p-4 border border-border">
          <p className="text-sm text-muted-foreground">
            ✓ Estimates based on typical prices and delivery patterns
          </p>
        </div>

        {/* CTA Button */}
        <div className="pt-4">
          <Button
            onClick={onStartComparing}
            className="w-full h-12 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
            size="lg"
          >
            Start Comparing
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Footer Note */}
        <div className="pt-8 space-y-2">
          <p className="text-xs text-muted-foreground">
            Powered by PricePilot
          </p>
          <p className="text-xs text-muted-foreground">
            Your quick-commerce price comparison tool
          </p>
        </div>
      </div>
    </div>
  )
}
