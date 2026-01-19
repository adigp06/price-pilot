'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Check, ChevronLeft } from 'lucide-react'

interface ItemSelectionScreenProps {
  selectedItems: { [key: string]: boolean }
  priority: { type: 'cheapest' | 'fastest' | 'lowest-fee' }
  onItemSelection: (items: { [key: string]: boolean }) => void
  onPriorityChange: (type: 'cheapest' | 'fastest' | 'lowest-fee') => void
  onSeeResults: () => void
}

const ESSENTIAL_ITEMS = [
  { id: 'milk', name: 'Milk', size: '500ml' },
  { id: 'bread', name: 'Bread', size: 'Sliced loaf' },
  { id: 'eggs', name: 'Eggs', size: '6 pack' },
  { id: 'rice', name: 'Basmati Rice', size: '1kg' },
  { id: 'oil', name: 'Cooking Oil', size: '1L' },
  { id: 'salt', name: 'Salt', size: '1kg' },
  { id: 'sugar', name: 'Sugar', size: '1kg' },
  { id: 'onion', name: 'Onions', size: '1kg' },
  { id: 'tomato', name: 'Tomatoes', size: '1kg' },
  { id: 'potato', name: 'Potatoes', size: '2kg' },
  { id: 'dal', name: 'Moong Dal', size: '1kg' },
  { id: 'flour', name: 'All Purpose Flour', size: '1kg' },
]

const PRIORITY_OPTIONS = [
  { id: 'cheapest', label: 'Cheapest total', icon: '₹' },
  { id: 'fastest', label: 'Fastest delivery', icon: '⚡' },
  { id: 'lowest-fee', label: 'Lowest delivery fee', icon: '📦' },
]

export default function ItemSelectionScreen({
  selectedItems,
  priority,
  onItemSelection,
  onPriorityChange,
  onSeeResults,
}: ItemSelectionScreenProps) {
  const handleItemToggle = (itemId: string) => {
    onItemSelection({
      ...selectedItems,
      [itemId]: !selectedItems[itemId],
    })
  }

  const selectedCount = Object.values(selectedItems).filter(Boolean).length
  const isFormValid = selectedCount > 0

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b border-border z-10">
        <div className="max-w-md mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-foreground">Select items</h1>
          <span className="text-sm text-muted-foreground">
            {selectedCount} selected
          </span>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6 space-y-6">
        {/* Items Grid */}
        <div className="space-y-3">
          {ESSENTIAL_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleItemToggle(item.id)}
              className={`w-full p-4 rounded-lg border-2 transition-all flex items-start justify-between ${
                selectedItems[item.id]
                  ? 'border-primary bg-primary/5'
                  : 'border-border bg-card'
              }`}
            >
              <div className="text-left">
                <p className="font-semibold text-foreground">{item.name}</p>
                <p className="text-sm text-muted-foreground">{item.size}</p>
              </div>
              {selectedItems[item.id] && (
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <Check className="w-4 h-4 text-primary-foreground" />
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Priority Section */}
        <div className="space-y-4 pt-4 border-t border-border">
          <h2 className="font-semibold text-foreground text-lg">
            What matters most?
          </h2>
          <div className="space-y-2">
            {PRIORITY_OPTIONS.map((option) => (
              <button
                key={option.id}
                onClick={() =>
                  onPriorityChange(option.id as 'cheapest' | 'fastest' | 'lowest-fee')
                }
                className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                  priority.type === option.id
                    ? 'border-accent bg-accent/5'
                    : 'border-border bg-card'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{option.icon}</span>
                  <span className="font-medium text-foreground">
                    {option.label}
                  </span>
                  {priority.type === option.id && (
                    <div className="ml-auto w-4 h-4 rounded-full bg-accent" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border">
        <div className="max-w-md mx-auto px-6 py-4">
          <Button
            onClick={onSeeResults}
            disabled={!isFormValid}
            className="w-full h-12 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            size="lg"
          >
            See Best App
          </Button>
        </div>
      </div>
    </div>
  )
}
