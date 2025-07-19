import type { LayTime } from "@/types/layTimesType";
import type { Column } from "@/types/tablesType";

export const laytimeData: LayTime[] = [
  {
    id: "1",
    portName: "Bandar Abbas",
    countryCode: "IR",
    cargo: "Wheat",
    f: "A1",
    blCode: "BL123456",
    quantity: 15000,
    ldRate: 5000,
    term: "FOB",
    demRate: 10000,
    desRateD: 5000,
    allowed: 3,
    used: "02d 04:30",
    deduction: "00d 12:00",
    balance: "00d 06:30",
    laycanFrom: new Date("2025-07-10"),
    laycanTo: new Date("2025-07-15"),
  },
  {
    id: "2",
    portName: "Jebel Ali",
    countryCode: "AE",
    cargo: "Sugar",
    f: "B2",
    blCode: "BL789012",
    quantity: 20000,
    ldRate: 4000,
    term: "CFR",
    demRate: 12000,
    desRateD: 6000,
    allowed: 4,
    used: "03d 00:00",
    deduction: "01d 00:00",
    balance: "00d 00:00",
    laycanFrom: new Date("2025-07-12"),
    laycanTo: new Date("2025-07-18"),
  },
  {
    id: "3",
    portName: "Mumbai",
    countryCode: "IN",
    cargo: "Corn",
    f: "C3",
    blCode: "BL456789",
    quantity: 18000,
    ldRate: 4500,
    term: "CIF",
    demRate: 11000,
    desRateD: 5500,
    allowed: 3.5,
    used: "02d 12:00",
    deduction: "00d 18:00",
    balance: "00d 18:00",
    laycanFrom: new Date("2025-07-11"),
    laycanTo: new Date("2025-07-17"),
  },
  {
    id: "4",
    portName: "Santos",
    countryCode: "BR",
    cargo: "Soybeans",
    f: "D4",
    blCode: "BL654321",
    quantity: 25000,
    ldRate: 4800,
    term: "FAS",
    demRate: 9500,
    desRateD: 4700,
    allowed: 4,
    used: "02d 20:00",
    deduction: "00d 10:00",
    balance: "01d 00:00",
    laycanFrom: new Date("2025-07-14"),
    laycanTo: new Date("2025-07-20"),
  },
  {
    id: "5",
    portName: "Houston",
    countryCode: "US",
    cargo: "Oil",
    f: "E5",
    blCode: "BL321987",
    quantity: 30000,
    ldRate: 6000,
    term: "CIF",
    demRate: 15000,
    desRateD: 7500,
    allowed: 5,
    used: "04d 06:00",
    deduction: "01d 02:00",
    balance: "00d 16:00",
    laycanFrom: new Date("2025-07-16"),
    laycanTo: new Date("2025-07-22"),
  },
];

export const laytimeColumns: Column<LayTime>[] = [
  {
    header: "Port Name",
    accessor: (row) => (
      <div className="flex items-center gap-2">
        <span>{row.portName}</span>
        <img
          src={`https://flagcdn.com/w40/${row.countryCode.toLowerCase()}.png`}
          alt={row.countryCode}
          className="w-5 h-5 object-cover rounded-sm"
        />
      </div>
    ),
  },
  {
    header: "Cargo",
    accessor: (row) => row.cargo,
  },
  {
    header: "F",
    accessor: (row) => row.f,
  },
  {
    header: "BL Code",
    accessor: (row) => row.blCode,
  },
  {
    header: "Quantity",
    accessor: (row) => row.quantity.toLocaleString(),
  },
  {
    header: "L/D Rate",
    accessor: (row) => `${row.ldRate.toLocaleString()}`,
  },
  {
    header: "Term",
    accessor: (row) => row.term,
  },
  {
    header: "Dem Rate",
    accessor: (row) => `${row.demRate}`,
  },
  {
    header: "Des Rate/D",
    accessor: (row) => `${row.desRateD}`,
  },
  {
    header: "Allowed",
    accessor: (row) => `${row.allowed}`,
  },
  {
    header: "Used",
    accessor: (row) => row.used,
  },
  {
    header: "Deduction",
    accessor: (row) => row.deduction,
  },
  {
    header: "Balance",
    accessor: (row) => row.balance,
  },
  {
    header: "Laycan From",
    accessor: (row) => {
      const date = row.laycanFrom;
      const dayShort = date.toLocaleDateString(undefined, { weekday: "short" }); // Mon, Tue ...
      const time = date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      return (
        <div className="flex flex-col text-sm">
          <span>{date.toLocaleDateString()}</span>
          <span className="text-gray-500 text-xs">
            {dayShort} {time}
          </span>
        </div>
      );
    },
  },
  {
    header: "Laycan To",
    accessor: (row) => {
      const date = row.laycanTo;
      const dayShort = date.toLocaleDateString(undefined, { weekday: "short" });
      const time = date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      return (
        <div className="flex flex-col text-sm">
          <span>{date.toLocaleDateString()}</span>
          <span className="text-gray-500 text-xs">
            {dayShort} {time}
          </span>
        </div>
      );
    },
  },
];
