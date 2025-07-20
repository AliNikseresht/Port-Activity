import { useState, useCallback } from "react";
import { generateId, getDayShort } from "@/libs/helpers";
import { ACTIVITY_TYPES } from "@/libs/constants";
import type { PortActivityRow } from "@/types/portActivityType";

export function usePortActivityRows() {
  const [rows, setRows] = useState<PortActivityRow[]>([]);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const recalculateRows = useCallback((rows: PortActivityRow[]) => {
    return rows.map((row, index, arr) => {
      const toDateTime =
        index < arr.length - 1 ? arr[index + 1].fromDateTime : row.fromDateTime;
      const duration = Math.max(
        (toDateTime.getTime() - row.fromDateTime.getTime()) / 3600000,
        0
      );
      return {
        ...row,
        toDateTime,
        durationHours: duration,
        deductionHours: (duration * row.percent) / 100,
        day: getDayShort(row.fromDateTime),
        isHighlighted:
          index > 0 && row.fromDateTime < arr[index - 1].fromDateTime,
      };
    });
  }, []);

  const updateRowField = useCallback(
    (id: string, updates: Partial<PortActivityRow>) => {
      setRows((prev) =>
        recalculateRows(
          prev.map((r) => (r.id === id ? { ...r, ...updates } : r))
        )
      );
    },
    [recalculateRows]
  );

  const addNewRow = useCallback(() => {
    setRows((prev) => {
      const now = new Date();
      const last = prev[prev.length - 1];

      const newRow: PortActivityRow = last
        ? {
            ...last,
            id: generateId(),
            fromDateTime: last.toDateTime,
            toDateTime: last.toDateTime,
            isHighlighted: false,
            remarks: "",
            activityType: ACTIVITY_TYPES[0],
            percent: 0,
          }
        : {
            id: generateId(),
            day: getDayShort(now),
            activityType: ACTIVITY_TYPES[0],
            fromDateTime: now,
            toDateTime: now,
            durationHours: 0,
            percent: 0,
            remarks: "",
            deductionHours: 0,
            isHighlighted: false,
          };

      return recalculateRows([...prev, newRow]);
    });
  }, [recalculateRows]);

  const deleteRow = useCallback(() => {
    if (!deleteId) return;
    setRows((prev) => recalculateRows(prev.filter((r) => r.id !== deleteId)));
    setDeleteId(null);
  }, [deleteId, recalculateRows]);

  const cloneRow = useCallback(
    (id: string) => {
      setRows((prev) => {
        const idx = prev.findIndex((r) => r.id === id);
        if (idx === -1) return prev;
        const row = prev[idx];
        const clone = {
          ...row,
          id: generateId(),
          isHighlighted: false,
        };
        const newRows = [...prev];
        newRows.splice(idx + 1, 0, clone);
        return recalculateRows(newRows);
      });
    },
    [recalculateRows]
  );

  const adjustRow = useCallback(
    (id: string) => {
      setRows((prev) => {
        const current = prev.find((r) => r.id === id);
        if (!current) return prev;
        const without = prev.filter((r) => r.id !== id);
        const index = without.findIndex(
          (r) => r.fromDateTime > current.fromDateTime
        );
        const insertIndex = index === -1 ? without.length : index;
        const adjusted = [...without];
        adjusted.splice(insertIndex, 0, { ...current, isHighlighted: false });
        return recalculateRows(adjusted);
      });
    },
    [recalculateRows]
  );

  return {
    rows,
    deleteId,
    setDeleteId,
    updateRowField,
    addNewRow,
    deleteRow,
    cloneRow,
    adjustRow,
  };
}
