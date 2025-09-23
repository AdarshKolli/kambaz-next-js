// src/(Kambaz)/Courses/[cid]/Assignments/[aid]/page.tsx
"use client";
export default function AssignmentEditor() {
  return (
    <div id="wd-assignment-editor">
      <h3>Assignment Name</h3>
      <input
        id="wd-assignment-name"
        defaultValue="A1 - ENV + HTML"
      />
      <br />

      <textarea
        id="wd-assignment-description"
        rows={5}
        cols={50}
        defaultValue={`The assignment is available online. Submit a link to the landing page of your Web application running on Netlify. The landing page should include:
- Your full name and section
- Links to each of the lab assignments
- Link to the Kambaz application
- Links to all relevant source code repositories

The Kambaz application should include a link to navigate back to the landing page.`}
      />
      <br />

      {/* Points */}
      <label htmlFor="wd-assignment-points">Points</label><br />
      <input id="wd-assignment-points" type="number" defaultValue={100} />
      <br />

      {/* Assignment Group */}
      <label htmlFor="wd-assignment-group">Assignment Group</label><br />
      <select id="wd-assignment-group" defaultValue="ASSIGNMENTS">
        <option value="ASSIGNMENTS">ASSIGNMENTS</option>
        <option value="QUIZZES">QUIZZES</option>
        <option value="EXAMS">EXAMS</option>
        <option value="PROJECTS">PROJECTS</option>
      </select>
      <br />

      {/* Display Grade */}
      <label htmlFor="wd-display-grade">Display Grade as</label><br />
      <select id="wd-display-grade" defaultValue="Percentage">
        <option>Percentage</option>
        <option>Points</option>
        <option>Letter</option>
        <option>Complete/Incomplete</option>
      </select>
      <br />

      {/* Submission Type */}
      <label htmlFor="wd-submission-type">Submission Type</label><br />
      <select id="wd-submission-type" defaultValue="Online">
        <option>Online</option>
        <option>On Paper</option>
        <option>No Submission</option>
      </select>
      <br />

      {/* Online Entry Options */}
      <fieldset>
        <legend>Online Entry Options</legend>
        <input type="checkbox" id="wd-entry-text" /> <label htmlFor="wd-entry-text">Text Entry</label><br />
        <input type="checkbox" id="wd-entry-url" /> <label htmlFor="wd-entry-url">Website URL</label><br />
        <input type="checkbox" id="wd-entry-media" /> <label htmlFor="wd-entry-media">Media Recordings</label><br />
        <input type="checkbox" id="wd-entry-annotation" /> <label htmlFor="wd-entry-annotation">Student Annotation</label><br />
        <input type="checkbox" id="wd-entry-upload" /> <label htmlFor="wd-entry-upload">File Uploads</label>
      </fieldset>
      <br />

      {/* Assign */}
      <label htmlFor="wd-assign-to">Assign To</label><br />
      <input id="wd-assign-to" defaultValue="Everyone" />
      <br />

      {/* Dates */}
      <label htmlFor="wd-due-date">Due</label><br />
      <input id="wd-due-date" type="date" defaultValue="2024-05-13" />
      <br />

      <label>Available From</label><br />
      <input id="wd-available-from" type="date" defaultValue="2024-05-06" />
      <br />

      <label>Until</label><br />
      <input id="wd-available-until" type="date" defaultValue="2024-05-20" />
      <br /><br />

      {/* Buttons */}
      <button>Cancel</button>
      <button>Save</button>
    </div>
  );
}
