"use client"
export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">Assignment Name</label>
      <input id="wd-name" defaultValue="A1 - ENV + HTML" /><br /><br />
      <textarea  defaultValue="The assignment is available online. Submit a link to the landing page of" id="wd-description"></textarea>
      <br />
      <table>
        <tbody>
        <tr>
          <td align="left" valign="top">
            <label htmlFor="wd-points">Points</label>
          </td>
          <td>
            <input id="wd-points" defaultValue={100} />
          </td>
        </tr>
        {/* Complete on your own */}
      {/* </table>
      <table> */}
        <tr>
            <td>
                <label htmlFor="wd-group"> Assignment Group: </label>
            </td>
            <td align="left" valign="top">
            <select id="wd-group">
                <option value="SOLO">Solo</option>
                <option value="DUO">Duo</option>
                <option value="GROUP">Group</option>
            </select>
            </td>
        </tr>
        <tr>
            <td>
                <label htmlFor="wd-display-grade-as"> Grade Scale: </label>
            </td>
            <td align="left" valign="top">
            <select id="wd-display-grade-as">
                <option value="PERCENTAGE">Percentage</option>
                <option value="GRADE">Grade</option>
                <option value="MARKS">Marks</option>
            </select>
            </td>
        </tr>
        <tr>
            <td>
                <label htmlFor="wd-submission-type"> Submission Type: </label>
            </td>
            <td align="left" valign="top">
            <select id="wd-submission-type">
                <option value="ONLINE">Online</option>
                <option value="OFFLINE">Offline</option>
            </select>
            </td>
        </tr>
        <tr>
            <td>
                <label>Online Entry Type:</label><br/>
            </td>
            <td align="left" valign="top">
            <input type="checkbox" name="check-genre" id="wd-text-entry"/>
            <label htmlFor="wd-text-entry">Text Entry</label><br/>
            <input type="checkbox" name="check-genre" id="wd-website-url"/>
            <label htmlFor="wd-website-url">Website URL</label><br/>
            <input type="checkbox" name="check-genre" id="wd-media-recordings"/>
            <label htmlFor="wd-media-recordings">Media Recordings</label><br/>
            <input type="checkbox" name="check-genre" id="wd-student-annotation"/>
            <label htmlFor="wd-student-annotation">Student Annotation</label><br/>
            <input type="checkbox" name="check-genre" id="wd-file-upload"/>
            <label htmlFor="wd-file-upload">File Upload</label>
            </td>
        </tr>
        <tr>
            <td>
                <label>Assign:</label>
            </td>
            <td align="right" valign="top">
               <input defaultValue="Everyone" suppressHydrationWarning={true} type="text" title="John" id="wd-assign-to"/>
            </td>
        </tr>
        <tr>
            <td>
                <label>Due Date:</label>
            </td>
            <td align="right" valign="top">
               <input
                        type="text"
                        id="wd-due-date"
                        placeholder="MM-DD-YYYY"
                        pattern="\d{2}-\d{2}-\d{4}"
                        defaultValue="01-24-2004"
                        /><br/>
            </td>
        </tr>
        <tr>
            <td>
                <label>Available From:</label>
            </td>
            <td align="right" valign="top">
               <input
  type="date"
  id="wd-due-date"
  placeholder="MM-DD-YYYY"
  pattern="\d{2}-\d{2}-\d{4}"
  defaultValue="01-24-2004"
/><br/>
            </td>
            <td>
                <label>Until:</label>
            </td>
            <td align="right" valign="top">
               <input type="date"
                    defaultValue="2004-01-24"
                    id="wd-available-until"/><br/>
            </td>
        </tr>
        </tbody>
      </table><br/>
      <div>
        <button suppressHydrationWarning={true} type="button" onClick={() => alert("Saved successfully!")} id="wd-save-button" >Save</button>
        <button suppressHydrationWarning={true} type="button" onClick={() => alert("Cancelled!")}id="wd-cancel-button">Cancel</button>
      </div>
    </div>
    
);}
