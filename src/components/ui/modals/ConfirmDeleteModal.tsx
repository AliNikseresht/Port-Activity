interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function ConfirmDeleteModal({
  isOpen,
  onCancel,
  onConfirm,
}: ConfirmDeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#2424248e] flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-80 max-w-full shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Sure to delete?</h3>
        <div className="flex w-full justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
}
