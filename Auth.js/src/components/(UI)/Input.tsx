import React from "react";

type Props = React.ComponentPropsWithoutRef<"input">;

export function Input(props: Props) {
  return (
    <input
      className="h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
      {...props}
    />
  );
}