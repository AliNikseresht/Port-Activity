import { useState } from "react";
import type { TableProps } from "@/types/tablesType";

function CustomTable<T>({
  columns,
  data,
  className,
  onRowClick,
}: TableProps<T>) {
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);

  const handleRowClick = (row: T, idx: number) => {
    setSelectedRowIndex(idx);
    onRowClick?.(row);
  };

  return (
    <div className="overflow-x-auto w-full">
      <table className={`min-w-full border border-gray-300 ${className ?? ""}`}>
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            {columns.map((col, i) => (
              <th
                key={col.id || i}
                className="pl-2 py-2 border-b border-gray-300 text-left text-sm"
              >
                <div className="flex items-center gap-2 justify-between">
                  {col.header}
                  {i !== columns.length - 1 && (
                    <div className="h-6 w-[1.5px] bg-gray-300 rounded-md"></div>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr
              key={idx}
              onClick={() => handleRowClick(row, idx)}
              className={`hover:bg-gray-100 hover:cursor-pointer duration-200 ${
                selectedRowIndex === idx ? "bg-blue-100" : ""
              }`}
            >
              {columns.map((col, cidx) => (
                <td
                  key={cidx}
                  className="pl-2 py-2 border-b border-gray-200 text-sm"
                >
                  {col.accessor(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomTable;
