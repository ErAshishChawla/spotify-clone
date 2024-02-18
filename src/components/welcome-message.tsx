import React from "react";

import { getUser } from "@/actions/getUser";

async function WelcomeMessage() {
  const user = await getUser();

  return (
    <h1 className="text-white text-3xl font-semibold">
      {user
        ? `Welcome, we Missed you!`
        : `Welcome,  Signup to start listening!`}
    </h1>
  );
}

export default WelcomeMessage;
