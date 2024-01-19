import { Outlet } from "react-router-dom";
import { TagsProvider } from "../../Context/TagsContext/TagsContext";

export default function MainSection() {
  const tags = ["Important", "Due", "Completed"];
  return (
    <section className="h-[85vh] w-full flex items-center justify-center">
      <TagsProvider value={{ tags }}>
        <Outlet />
      </TagsProvider>
    </section>
  );
}
