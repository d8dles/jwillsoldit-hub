import type { Service } from '../data/types';
import { ServiceLedgerRow } from './ServiceLedgerRow';

interface ServiceLedgerProps {
  services: Service[];
  onDark?: boolean;
}

export function ServiceLedger({ services, onDark = false }: ServiceLedgerProps) {
  return (
    <div role="list">
      {services.map((service, i) => (
        <ServiceLedgerRow key={service.id} service={service} index={i} onDark={onDark} />
      ))}
    </div>
  );
}
