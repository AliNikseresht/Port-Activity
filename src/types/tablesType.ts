export interface Column<T> {
  header: string;
  accessor: (row: T) => React.ReactNode;
  id?: string;
  width?: string | number;
}

export interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  className?: string;
onRowClick?: (row: T) => void;

}
