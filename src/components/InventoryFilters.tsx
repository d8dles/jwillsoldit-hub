import type { PublicStatus } from '../data/inventory';
import { PUBLIC_STATUS_FILTERS, STATUS_LABELS } from '../data/inventory';
import styles from './InventoryFilters.module.css';

export type InventoryFilter = 'all' | PublicStatus;

interface InventoryFiltersProps {
  value: InventoryFilter;
  onChange: (value: InventoryFilter) => void;
  statuses?: PublicStatus[];
}

export function InventoryFilters({ value, onChange, statuses = PUBLIC_STATUS_FILTERS }: InventoryFiltersProps) {
  return (
    <div className={styles.filters} aria-label="Filter inventory by status">
      <button type="button" className={value === 'all' ? styles.active : ''} onClick={() => onChange('all')}>All</button>
      {statuses.map((status) => (
        <button key={status} type="button" className={value === status ? styles.active : ''} onClick={() => onChange(status)}>
          {STATUS_LABELS[status]}
        </button>
      ))}
    </div>
  );
}
