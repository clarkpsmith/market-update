import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import UserContext from "../common/UserContext";
import ProtectedRoute from "./ProtectedRoute";

it("renders without crashing", () => {
  render(
    <MemoryRouter>
      <ProtectedRoute />
    </MemoryRouter>
  );
});

it("matches snapshot", () => {
  const { asFragment } = render(
    <MemoryRouter>
      <ProtectedRoute />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

// it("matches snapshot when logged out ", () => {
//   const currentUser = undefined;
//   const { asFragment } = render(
//     <MemoryRouter>
//       <UserContext.Provider value={{ currentUser }}>
//         <ProtectedRoute />
//       </UserContext.Provider>
//     </MemoryRouter>
//   );
//   expect(asFragment()).toMatchSnapshot();
// });
