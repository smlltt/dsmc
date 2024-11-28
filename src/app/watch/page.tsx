import { Toggle } from "@/components/ui/toggle";

export default () => {
  return (
    <div>
      <div className="mb-10 text-2xl text-red-600">
        {"Choose a movie to watch"}
      </div>
      <div className="flex gap-10">
        <div>
          <p className="mb-4 font-bold">{"Who is watching?"}</p>
          <div className="flex max-w-60 flex-wrap gap-2">
            <Toggle variant="outline">{"User 1"}</Toggle>
            <Toggle variant="outline">{"User 2"}</Toggle>
            <Toggle variant="outline">{"User aaaaa"}</Toggle>
            <Toggle variant="outline">{"User Long name"}</Toggle>
          </div>
        </div>
        <div>
          <p className="mb-4 font-bold">{"What genre?"}</p>
          <div className="flex max-w-60 flex-wrap gap-2">
            <Toggle variant="outline">{"Horror"}</Toggle>
            <Toggle variant="outline">{"Drama"}</Toggle>
            <Toggle variant="outline">{"Comedy"}</Toggle>
            <Toggle variant="outline">{"Thriller"}</Toggle>
          </div>
        </div>
        <div>
          <p className="mb-4 font-bold">{"How long?"}</p>
          <div className="flex max-w-60 flex-wrap gap-2">
            <Toggle variant="outline">{"Any"}</Toggle>
            <Toggle variant="outline">{"< 2h"}</Toggle>
            <Toggle variant="outline">{"< 1:40h"}</Toggle>
          </div>
        </div>
      </div>
    </div>
  );
};
