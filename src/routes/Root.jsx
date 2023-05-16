import { Outlet } from "react-router-dom";
import BaseHeader from "../components/BaseHeader";

function Root() {
  return (
    <div>
      <BaseHeader />
      <div className="mt-[70px] p-10 container mx-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default Root;
