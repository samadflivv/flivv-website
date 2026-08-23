'use client';

const ITEMS = [
  { label: 'Available', swatchClass: 'bg-gray-200' },
  { label: 'Sold', swatchClass: 'bg-[#E05252]' },
  { label: 'Resale', swatchClass: 'bg-[#3B82F6]' },
];

export default function PlotLegend() {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-gray-200 bg-white px-4 py-2.5 text-xs text-gray-600">
      {ITEMS.map((item) => (
        <div key={item.label} className="flex items-center gap-1.5">
          <span className={`h-3 w-3 rounded-sm ${item.swatchClass}`} />
          {item.label}
        </div>
      ))}
      <div className="flex items-center gap-1.5">
        <span
          className="h-3 w-3 rounded-sm border border-gray-300"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, #6b7280 0, #6b7280 1px, transparent 1px, transparent 4px)',
          }}
        />
        Mortgage
      </div>
    </div>
  );
}
