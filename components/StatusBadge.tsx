import { cn } from '@/lib/utils'
import type { ItemStatus, ClaimStatus } from '@/types'

interface StatusBadgeProps {
  status: ItemStatus | ClaimStatus
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'available':
        return {
          label: 'Available',
          className: 'bg-success-100 text-success-800'
        }
      case 'on_hold':
        return {
          label: 'On Hold',
          className: 'bg-warning-100 text-warning-800'
        }
      case 'claimed':
        return {
          label: 'Claimed',
          className: 'bg-primary-100 text-primary-800'
        }
      case 'donated':
        return {
          label: 'Donated',
          className: 'bg-blue-100 text-blue-800'
        }
      case 'disposed':
        return {
          label: 'Disposed',
          className: 'bg-gray-100 text-gray-800'
        }
      case 'requested':
        return {
          label: 'Requested',
          className: 'bg-yellow-100 text-yellow-800'
        }
      case 'verified':
        return {
          label: 'Verified',
          className: 'bg-green-100 text-green-800'
        }
      case 'rejected':
        return {
          label: 'Rejected',
          className: 'bg-red-100 text-red-800'
        }
      case 'picked_up':
        return {
          label: 'Picked Up',
          className: 'bg-purple-100 text-purple-800'
        }
      default:
        return {
          label: status,
          className: 'bg-gray-100 text-gray-800'
        }
    }
  }

  const config = getStatusConfig(status)

  return (
    <span className={cn(
      'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
      config.className,
      className
    )}>
      {config.label}
    </span>
  )
}