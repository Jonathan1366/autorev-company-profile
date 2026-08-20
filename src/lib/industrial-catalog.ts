import { catalog77100 } from "./catalog-77100";
import { catalog77393 } from "./catalog-77393";
import { catalog77395 } from "./catalog-77395";

export type CatalogPriority = "top" | "easy" | "standard" | "specialist";

export type CatalogItem = {
  id: string;
  number: number;
  name: { id: string; en: string };
  category: string;
  summary: { id: string; en: string };
  useCases: string[];
  rental: string;
  priority: CatalogPriority;
  imageKey: string;
  tags: string[];
  kbli: "77100" | "77393" | "77395";
};

const handlingItems: Omit<CatalogItem, "kbli">[] = [
  [26, "diesel-forklift", "Diesel Forklift", "Diesel Forklift", "Warehouse & Material Handling", "Forklift tangguh untuk pallet dan material di area warehouse maupun site.", "A robust forklift for pallets and materials across warehouses and project sites.", ["Warehouse", "Mine warehouse", "Manufacturing"], "Harian / bulanan", "top", ["forklift", "pallet", "warehouse"]],
  [27, "electric-forklift", "Electric Forklift", "Electric Forklift", "Warehouse & Material Handling", "Forklift bertenaga baterai untuk operasi indoor yang lebih senyap.", "A battery-powered forklift for quieter indoor operations.", ["Indoor warehouse", "FMCG", "Factory"], "Bulanan / tahunan", "easy", ["electric", "forklift", "indoor"]],
  [28, "reach-truck", "Reach Truck", "Reach Truck", "Warehouse & Material Handling", "Unit bermast tinggi untuk melayani rak warehouse bertingkat.", "A high-mast unit for multi-level warehouse racking.", ["Distribution center", "High-bay warehouse"], "Bulanan", "easy", ["reach-truck", "racking", "warehouse"]],
  [29, "pallet-stacker", "Pallet Stacker", "Pallet Stacker", "Warehouse & Material Handling", "Stacker elektrik ringkas untuk pallet ringan dan lorong terbatas.", "A compact electric stacker for lighter pallets and narrow aisles.", ["Warehouse", "Retail backroom"], "Bulanan", "easy", ["pallet", "stacker", "electric"]],
  [30, "pallet-mover", "Pallet Mover / Hand Pallet", "Pallet Mover / Hand Pallet", "Warehouse & Material Handling", "Alat sederhana untuk perpindahan pallet jarak dekat.", "A practical unit for short-distance pallet movement.", ["Warehouse", "Loading area"], "Bulanan", "easy", ["pallet", "mover", "warehouse"]],
  [31, "telehandler", "Telehandler", "Telehandler", "Warehouse & Material Handling", "Boom teleskopik untuk material handling di medan proyek yang lebih kasar.", "A telescopic boom handler for materials across rougher project terrain.", ["Construction", "Mining", "Oilfield"], "Harian / bulanan", "standard", ["telehandler", "rough-terrain", "lifting"]],
  [32, "reach-stacker", "Reach Stacker", "Reach Stacker", "Port & Container Handling", "Unit heavy-duty untuk mengangkat dan menumpuk container penuh.", "A heavy-duty unit for lifting and stacking laden containers.", ["Port", "Container depot"], "Bulanan / proyek", "specialist", ["container", "port", "stacker"]],
  [33, "empty-container-handler", "Empty Container Handler", "Empty Container Handler", "Port & Container Handling", "Container handler untuk penumpukan empty container di depot.", "A container handler for stacking empty boxes at depots.", ["Container depot", "Port"], "Bulanan", "standard", ["container", "handler", "depot"]],
  [34, "terminal-tractor", "Terminal Tractor", "Terminal Tractor", "Port & Container Handling", "Tractor yard ringkas untuk memindahkan trailer dan container.", "A compact yard tractor for moving trailers and containers.", ["Port", "Warehouse yard"], "Bulanan", "standard", ["terminal", "tractor", "yard"]],
  [35, "mobile-dock-ramp", "Mobile Dock Ramp", "Mobile Dock Ramp", "Warehouse & Material Handling", "Ramp baja bergerak untuk akses forklift ke truck atau container.", "A mobile steel ramp giving forklifts access to trucks and containers.", ["Warehouse", "Loading dock"], "Bulanan", "easy", ["dock", "ramp", "forklift"]],
  [36, "boom-lift", "Boom Lift", "Boom Lift", "Access Equipment", "Platform boom untuk inspeksi dan pekerjaan pada area tinggi.", "A boom platform for inspection and work at height.", ["Construction", "Plant maintenance"], "Harian / bulanan", "easy", ["boom-lift", "height", "maintenance"]],
  [37, "scissor-lift", "Scissor Lift", "Scissor Lift", "Access Equipment", "Platform vertikal stabil untuk maintenance dan instalasi.", "A stable vertical platform for maintenance and installation.", ["Factory", "Warehouse", "MEP"], "Harian / bulanan", "easy", ["scissor-lift", "height", "factory"]],
].map(([number, id, nameId, nameEn, category, summaryId, summaryEn, useCases, rental, priority, tags]) => ({
  number: number as number,
  id: id as string,
  name: { id: nameId as string, en: nameEn as string },
  category: category as string,
  summary: { id: summaryId as string, en: summaryEn as string },
  useCases: useCases as string[],
  rental: rental as string,
  priority: priority as CatalogPriority,
  imageKey: id as string,
  tags: tags as string[],
}));

const withKbli = <T extends Omit<CatalogItem, "kbli">>(items: T[], kbli: CatalogItem["kbli"]) =>
  items.map((item) => ({ ...item, kbli })) as CatalogItem[];

const merged = [
  ...withKbli(catalog77100 as unknown as Omit<CatalogItem, "kbli">[], "77100"),
  ...withKbli(handlingItems, "77393"),
  ...withKbli(catalog77393 as Omit<CatalogItem, "kbli">[], "77393"),
  ...withKbli(catalog77395 as Omit<CatalogItem, "kbli">[], "77395"),
];

export const industrialCatalog = merged
  .filter((item, index, items) => items.findIndex((candidate) => candidate.number === item.number) === index)
  .sort((a, b) => a.number - b.number);

export function catalogImage(item: CatalogItem) {
  const number = String(item.number).padStart(3, "0");
  return `/images/equipment-catalog/${number}-${item.id}.jpg`;
}

export const catalogCount = industrialCatalog.length;
