"use client";

import { useState } from "react";

type VehucleEquipmentProps = {
  items: {
    id: string;
    name: string;
  }[];
};

const MAX_VEHICLE_EQUIPMENT = 18;

export default function VehicleEquipment({ items }: VehucleEquipmentProps) {
  const [displayMax, setDisplayMax] = useState(MAX_VEHICLE_EQUIPMENT);

  return (
    <div className="mt-7.5 lg:mt-0">
      <div className="text-lg font-medium text-white uppercase">Equipment:</div>
      <div className="mt-2.5 columns-1 space-y-2.5 gap-x-5 sm:columns-3">
        {items.slice(0, displayMax).map((item) => (
          <div
            key={item.id}
            className="text-primary-500 font-semibold uppercase"
          >
            {item.name}
          </div>
        ))}
      </div>
      {items.length > displayMax && (
        <button
          onClick={() => setDisplayMax(items.length)}
          className="btn-secondary mx-auto mt-7.5 flex h-11 w-full items-center justify-center px-13 text-lg sm:w-auto"
        >
          View all
        </button>
      )}
    </div>
  );
}
