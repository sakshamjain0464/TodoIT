import { Outlet } from "react-router-dom";
import Loader from "../Loader/Loader";

export default function MainSection({ loading }) {
  return (
    <section className="sm:h-[85vh] h-fit min-h-screen sm:min-h-[85vh] w-full flex sm:items-center justify-center">
      {loading ? <Loader /> : <Outlet />}
    </section>
  );
}
