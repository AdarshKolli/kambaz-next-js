"use client"

import { ReactNode } from "react";
import React from "react";
import TOC from "./TOC";
import { Provider } from "react-redux";
import store from "./store"; 

export default function LabsLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <Provider store={store}>
      <table>
        <tbody>
          <tr>
            <td valign="top" width="100px">
              <TOC />
            </td>
            <td valign="top">{children}</td>
          </tr>
        </tbody>
      </table>
    </Provider>
  );
}