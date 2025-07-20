import ReactDatePicker from "react-datepicker";

import { usePortActivityRows } from "@/hooks/usePortActivityRows";
import { ACTIVITY_TYPES, PERCENT_OPTIONS } from "@/libs/constants";
import { formatDateTime, formatDuration } from "@/libs/helpers";
import ConfirmDeleteModal from "@/components/ui/modals/ConfirmDeleteModal";

import "react-datepicker/dist/react-datepicker.css";
import { AiOutlineDelete } from "react-icons/ai";
import { IoMdCopy } from "react-icons/io";
import { HiMiniAdjustmentsVertical } from "react-icons/hi2";

export default function PortActivityTable({
  isEnabled,
}: {
  isEnabled: boolean;
}) {
  const {
    rows,
    deleteId,
    setDeleteId,
    updateRowField,
    addNewRow,
    deleteRow,
    cloneRow,
    adjustRow,
  } = usePortActivityRows();

  return (
    <div className="shadow bg-white rounded-xl p-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="flex items-center gap-2 font-bold text-xl">
          <div className="h-5 w-[3px] bg-indigo-500 rounded-lg" />
          Port Activity
        </h2>
        <button
          onClick={addNewRow}
          className={`px-4 py-1.5 rounded-md duration-300 ${
            isEnabled
              ? "bg-gray-300 text-[#242424] hover:bg-gray-500 hover:text-white cursor-pointer"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
          disabled={!isEnabled}
        >
          + Add New
        </button>
      </div>

      <div className="overflow-auto max-w-full">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              {[
                "Day",
                "Activity Type",
                "From Date & Time",
                "Duration",
                "%",
                "To Date Time",
                "Remarks",
                "Deductions",
                "Actions",
              ].map((label, index, arr) => (
                <th
                  key={label}
                  className="pl-3 py-2 border-b border-gray-300 text-left text-sm"
                >
                  <div className="flex items-center gap-2 justify-between">
                    {label}
                    {index !== arr.length - 1 && (
                      <div className="h-6 w-[1.5px] bg-gray-300 rounded-md"></div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr
                key={row.id}
                className={`hover:bg-gray-50 duration-200 border-b border-gray-300 text-sm whitespace-nowrap ${
                  row.isHighlighted ? "bg-red-100" : ""
                }`}
              >
                <td className="pl-3 py-2 text-sm whitespace-nowrap">
                  {row.day}
                </td>

                <td className="pl-1 pr-3 py-2 text-sm">
                  <select
                    className="cursor-pointer outline-none rounded py-1 px-1 w-full"
                    value={row.activityType}
                    onChange={(e) =>
                      updateRowField(row.id, { activityType: e.target.value })
                    }
                  >
                    {ACTIVITY_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </td>

                <td className="pl-3 py-2 text-sm whitespace-nowrap">
                  <ReactDatePicker
                    selected={row.fromDateTime}
                    onChange={(date) =>
                      date && updateRowField(row.id, { fromDateTime: date })
                    }
                    showTimeSelect
                    dateFormat="Pp"
                    className="cursor-pointer outline-none rounded"
                    timeIntervals={15}
                  />
                </td>

                <td className="px-3 py-2 text-sm">
                  {formatDuration(row.durationHours)}
                </td>

                <td className="px-3 py-2 text-sm">
                  <select
                    className="cursor-pointer outline-none rounded py-1 px-1 w-full"
                    value={row.percent}
                    onChange={(e) =>
                      updateRowField(row.id, {
                        percent: Number(e.target.value),
                      })
                    }
                  >
                    {PERCENT_OPTIONS.map((p) => (
                      <option key={p} value={p}>
                        {p}%
                      </option>
                    ))}
                  </select>
                </td>

                <td className="px-3 py-2 text-sm whitespace-nowrap">
                  {formatDateTime(row.toDateTime)}
                </td>

                <td className="px-3 py-2 text-sm">
                  <input
                    type="text"
                    className="border border-gray-200 outline-none rounded py-1 px-1 w-full"
                    value={row.remarks}
                    onChange={(e) =>
                      updateRowField(row.id, { remarks: e.target.value })
                    }
                  />
                </td>

                <td className="px-3 py-2 text-sm text-left">
                  {formatDuration(row.deductionHours)}
                </td>

                <td className="px-2 py-2.5 text-sm whitespace-nowrap flex gap-1.5 items-center justify-end">
                  {row.isHighlighted && (
                    <button
                      onClick={() => adjustRow(row.id)}
                      className="hover:text-green-600 cursor-pointer duration-200"
                      title="Error entered in date. Click to correct."
                    >
                      <HiMiniAdjustmentsVertical size={21} />
                    </button>
                  )}
                  {idx !== 0 && (
                    <button
                      onClick={() => cloneRow(row.id)}
                      className="hover:text-blue-600 cursor-pointer duration-200"
                    >
                      <IoMdCopy size={22} />
                    </button>
                  )}
                  <button
                    onClick={() => setDeleteId(row.id)}
                    className="hover:text-red-600 cursor-pointer duration-200"
                  >
                    <AiOutlineDelete size={22} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {deleteId && (
        <ConfirmDeleteModal
          isOpen={!!deleteId}
          onCancel={() => setDeleteId(null)}
          onConfirm={deleteRow}
        />
      )}
    </div>
  );
}
