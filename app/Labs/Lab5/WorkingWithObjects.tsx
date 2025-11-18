"use client"

import React, { useState } from "react";
import { Form } from "react-bootstrap";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

export default function WorkingWithObjects() {
  const [assignment, setAssignment] = useState({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
  });
  
  const [module, setModule] = useState({
    id: "CS101",
    name: "Introduction to Programming",
    description: "Learn the basics of programming",
    course: "CS5610",
  });
  
  const ASSIGNMENT_API_URL = `${HTTP_SERVER}/lab5/assignment`;
  const MODULE_API_URL = `${HTTP_SERVER}/lab5/module`;
  
  return (
    <div id="wd-working-with-objects">
      <h3>Working With Objects</h3>
      
      {/* ASSIGNMENT SECTION */}
      <h4>Retrieving Objects</h4>
      <a 
        id="wd-retrieve-assignments" 
        className="btn btn-primary"
        href={`${ASSIGNMENT_API_URL}`}
      >
        Get Assignment
      </a>
      <hr/>
      
      <h4>Retrieving Properties</h4>
      <a 
        id="wd-retrieve-assignment-title" 
        className="btn btn-primary"
        href={`${ASSIGNMENT_API_URL}/title`}
      >
        Get Title
      </a>
      <hr/>
      
      <h4>Modifying Properties</h4>
      <div className="d-flex align-items-center mb-2">
        <Form.Control 
          className="flex-grow-1 me-2" 
          id="wd-assignment-title"
          value={assignment.title} 
          onChange={(e) =>
            setAssignment({ ...assignment, title: e.target.value })
          }
        />
        <a 
          id="wd-update-assignment-title"
          className="btn btn-primary"
          href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}
        >
          Update Title
        </a>
      </div>
      
      <div className="d-flex align-items-center mb-2">
        <Form.Control 
          className="flex-grow-1 me-2" 
          id="wd-assignment-score"
          type="number"
          value={assignment.score} 
          onChange={(e) =>
            setAssignment({ ...assignment, score: parseInt(e.target.value) })
          }
        />
        <a 
          id="wd-update-assignment-score"
          className="btn btn-primary"
          href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}
        >
          Update Score
        </a>
      </div>
      
      <div className="d-flex align-items-center mb-2">
        <Form.Check 
          className="flex-grow-1" 
          id="wd-assignment-completed"
          type="checkbox"
          checked={assignment.completed} 
          onChange={(e) =>
            setAssignment({ ...assignment, completed: e.target.checked })
          }
          label="Completed"
        />
        <a 
          id="wd-update-assignment-completed"
          className="btn btn-primary"
          href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}
        >
          Update Completed
        </a>
      </div>
      <hr/>
      
      {/* MODULE SECTION */}
      <h4>Retrieving Module</h4>
      <a 
        id="wd-retrieve-module" 
        className="btn btn-primary"
        href={`${MODULE_API_URL}`}
      >
        Get Module
      </a>
      <hr/>
      
      <h4>Retrieving Module Name</h4>
      <a 
        id="wd-retrieve-module-name" 
        className="btn btn-primary"
        href={`${MODULE_API_URL}/name`}
      >
        Get Module Name
      </a>
      <hr/>
      
      <h4>Modifying Module Properties</h4>
      <div className="d-flex align-items-center mb-2">
        <Form.Control 
          className="flex-grow-1 me-2" 
          id="wd-module-name"
          value={module.name} 
          onChange={(e) =>
            setModule({ ...module, name: e.target.value })
          }
        />
        <a 
          id="wd-update-module-name"
          className="btn btn-primary"
          href={`${MODULE_API_URL}/name/${module.name}`}
        >
          Update Name
        </a>
      </div>
      
      <div className="d-flex align-items-center mb-2">
        <Form.Control 
          className="flex-grow-1 me-2" 
          id="wd-module-description"
          value={module.description} 
          onChange={(e) =>
            setModule({ ...module, description: e.target.value })
          }
        />
        <a 
          id="wd-update-module-description"
          className="btn btn-primary"
          href={`${MODULE_API_URL}/description/${module.description}`}
        >
          Update Description
        </a>
      </div>
      <hr/>
    </div>
  );
}