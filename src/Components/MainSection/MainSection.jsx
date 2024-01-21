import { Outlet } from "react-router-dom";

export default function MainSection() {
  return (
    <section className="sm:h-[85vh] h-fit min-h-screen sm:min-h-[85vh] w-full flex sm:items-center justify-center">
      <Outlet />
    </section>
  );
}
