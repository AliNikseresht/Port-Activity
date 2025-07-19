import { useState } from "react";
import CustomTable from "./components/ui/tables/CustomTable";
import PortActivityTable from "./components/ui/tables/PortActivityTable";
import { laytimeColumns, laytimeData } from "./data/LayTimeData";

function App() {
  const [isPortActivityEnabled, setIsPortActivityEnabled] = useState(false);

  const handleLaytimeRowSelect = () => {
    setIsPortActivityEnabled(true);
  };

  return (
    <div className="flex w-full min-h-screen flex-col gap-4">
      <section className="shadow bg-white rounded-xl p-4">
        <h2 className="flex items-center gap-2 mb-4 font-bold text-xl">
          <div className="h-5 w-[3px] bg-indigo-500 rounded-lg"></div>
          Lay Times
        </h2>
        <CustomTable
          onRowClick={handleLaytimeRowSelect}
          columns={laytimeColumns}
          data={laytimeData}
          className="w-full"
        />
      </section>
      <PortActivityTable isEnabled={isPortActivityEnabled} />
    </div>
  );
}

export default App;
