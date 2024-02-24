import React from "react";

import { Spinner } from "@nextui-org/react";

function loading() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Spinner size="lg" />
    </div>
  );
}

export default loading;
