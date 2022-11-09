import React from "react";
import SomePage from '@containers/SomePage';
import WhiteBoard from '@containers/WhiteBoard';
import Wrapper from "../../components/Wrapper";
import {
  createBrowserRouter,
} from "react-router-dom";
export default createBrowserRouter([
  {
    path: "/page2",
    element: <Wrapper />,
    children: [
      {
        path: "/page2/board",
        element: <WhiteBoard/>
      },
      {
        path: "/page2/p1",
        element: <SomePage />,
      }
    ]
  }
]);