"use client"

import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";

export default function DateStateVariable() {
  const [startDate, setStartDate] = useState<Date | null>(null);

  useEffect(() => {
    setStartDate(new Date());
  }, []);

  const dateObjectToHtmlDateString = (date: Date | null) => {
    if (!date) return "";
    return date.toISOString().split('T')[0];
  };

  if (!startDate) {
    return null; // or a loading state
  }

  return (
    <div id="wd-date-state-variables">
      <h2>Date State Variables</h2>
      <h3>{JSON.stringify(startDate)}</h3>
      <h3>{dateObjectToHtmlDateString(startDate)}</h3>
      <Form.Control
        type="date"
        value={dateObjectToHtmlDateString(startDate)}
        onChange={(e) => setStartDate(new Date(e.target.value))}
      />
      <hr/>
    </div>
  );
}