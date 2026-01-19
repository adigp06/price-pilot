'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import HomeScreen from '@/components/HomeScreen'
import ItemSelectionScreen from '@/components/ItemSelectionScreen'
import RecommendationScreen from '@/components/RecommendationScreen'

type Screen = 'home' | 'items' | 'recommendation'

interface SelectedItems {
  [key: string]: boolean
}

interface PrioritySelection {
  type: 'cheapest' | 'fastest' | 'lowest-fee'
}

export default function PricePilot() {
  const [screen, setScreen] = useState<Screen>('home')
  const [selectedItems, setSelectedItems] = useState<SelectedItems>({})
  const [priority, setPriority] = useState<PrioritySelection>({ type: 'cheapest' })

  const handleStartComparing = () => {
    setScreen('items')
  }

  const handleItemSelection = (items: SelectedItems) => {
    setSelectedItems(items)
  }

  const handlePriorityChange = (type: PrioritySelection['type']) => {
    setPriority({ type })
  }

  const handleSeeResults = () => {
    setScreen('recommendation')
  }

  const handleNewComparison = () => {
    setSelectedItems({})
    setPriority({ type: 'cheapest' })
    setScreen('items')
  }

  return (
    <div className="min-h-screen bg-background">
      {screen === 'home' && (
        <HomeScreen onStartComparing={handleStartComparing} />
      )}
      {screen === 'items' && (
        <ItemSelectionScreen
          selectedItems={selectedItems}
          priority={priority}
          onItemSelection={handleItemSelection}
          onPriorityChange={handlePriorityChange}
          onSeeResults={handleSeeResults}
        />
      )}
      {screen === 'recommendation' && (
        <RecommendationScreen
          selectedItems={selectedItems}
          priority={priority}
          onNewComparison={handleNewComparison}
        />
      )}
    </div>
  )
}
