import {
  Activity, Bot, Building2, CarFront, ChartNoAxesCombined, CircleDollarSign,
  Clock3, Gauge, MapPin, PackageSearch, Route, ShieldCheck, Store, Users, Wrench,
  type LucideIcon,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  activity: Activity,
  ai: Bot,
  business: Building2,
  car: CarFront,
  chart: ChartNoAxesCombined,
  finance: CircleDollarSign,
  clock: Clock3,
  gauge: Gauge,
  map: MapPin,
  package: PackageSearch,
  route: Route,
  shield: ShieldCheck,
  store: Store,
  users: Users,
  wrench: Wrench,
};

export function FeatureIcon({ name, size = 20 }: { name: string; size?: number }) {
  const Icon = icons[name] || Activity;
  return <Icon size={size} strokeWidth={1.8} aria-hidden="true" />;
}
