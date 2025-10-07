import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
export default function PeopleTable() {
  return (
    <div id="wd-people-table">
      <Table striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="wd-full-name text-nowrap">
              <FaUserCircle className="me-2 fs-1 text-secondary" />
              <span className="wd-first-name">Yashwanth</span>{" "}
              <span className="wd-last-name">Kandak</span>
            </td>
            <td className="wd-login-id">001234561S</td>
            <td className="wd-section">S101</td>
            <td className="wd-role">STUDENT</td>
            <td className="wd-last-activity">2020-10-01</td>
            <td className="wd-total-activity">11:20:35</td>
          </tr>
          {/* Add at least 3 more users such as Bruce Wayne, Steve Rogers, and Natasha Romanoff */}
          <tr>
            <td className="wd-full-name text-nowrap">
              <FaUserCircle className="me-2 fs-1 text-secondary" />
              <span className="wd-first-name">Anakin</span>{" "}
              <span className="wd-last-name">Skywalker</span>
            </td>
            <td className="wd-login-id">001234561T</td>
            <td className="wd-section">S101</td>
            <td className="wd-role">TA</td>
            <td className="wd-last-activity">2020-10-05</td>
            <td className="wd-total-activity">07:34:22</td>
          </tr>
          <tr>
            <td className="wd-full-name text-nowrap">
              <FaUserCircle className="me-2 fs-1 text-secondary" />
              <span className="wd-first-name">Luke</span>{" "}
              <span className="wd-last-name">Skywalker</span>
            </td>
            <td className="wd-login-id">001234562S</td>
            <td className="wd-section">S101</td>
            <td className="wd-role">STUDENT</td>
            <td className="wd-last-activity">2020-09-15</td>
            <td className="wd-total-activity">09:45:02</td>
          </tr>
          <tr>
            <td className="wd-full-name text-nowrap">
              <FaUserCircle className="me-2 fs-1 text-secondary" />
              <span className="wd-first-name">Yoda</span>{" "}
              <span className="wd-last-name"> </span>
            </td>
            <td className="wd-login-id">001234563S</td>
            <td className="wd-section">S101</td>
            <td className="wd-role">STUDENT</td>
            <td className="wd-last-activity">2020-10-10</td>
            <td className="wd-total-activity">12:00:00</td>
          </tr>
          <tr>
            <td className="wd-full-name text-nowrap">
              <FaUserCircle className="me-2 fs-1 text-secondary" />
              <span className="wd-first-name">Sarthak</span>{" "}
              <span className="wd-last-name">Mehta</span>
            </td>
            <td className="wd-login-id">0000111113P</td>
            <td className="wd-section">S101</td>
            <td className="wd-role">PROFESSOR</td>
            <td className="wd-last-activity">2020-10-09</td>
            <td className="wd-total-activity">02:45:00</td>
          </tr>
          <tr>
            <td className="wd-full-name text-nowrap">
              <FaUserCircle className="me-2 fs-1 text-secondary" />
              <span className="wd-first-name">Dimitri</span>{" "}
              <span className="wd-last-name">Schevenkov</span>
            </td>
            <td className="wd-login-id">001234564S</td>
            <td className="wd-section">S101</td>
            <td className="wd-role">STUDENT</td>
            <td className="wd-last-activity">2020-10-10</td>
            <td className="wd-total-activity">12:59:49</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
