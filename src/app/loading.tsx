import React from "react";

import { Spinner } from "@nextui-org/react";

function loading() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Spinner size="lg" />
    </div>
  );
}

export default loading;
