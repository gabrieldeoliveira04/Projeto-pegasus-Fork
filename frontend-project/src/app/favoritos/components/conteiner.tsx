import { ReactNode } from "react";

export function ContainerFavorite({ children }: { children: ReactNode }) {
  return (
    <div
      className="
        max-w-screen-xl 
        mx-auto 
        px-4 
        sm:px-6 
        md:px-8 
        lg:px-12 
        py-8 
        rounded-lg 
        shadow-md
        min-h-[calc(100vh-4rem)] 
        flex 
        flex-col
      "
    >
      {children}
    </div>
  );
}
