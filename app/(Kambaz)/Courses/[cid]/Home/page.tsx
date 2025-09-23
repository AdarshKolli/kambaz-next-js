import Modules from "../Modules/page";
import CourseStatus from "./Status";

export default function Home() {
  return (
    <div id="wd-home">
      <table width="100%">
        <tbody>
          <tr>
            {/* Left: Modules (70% width) */}
            <td valign="top" width="70%">
              <Modules />
            </td>

            {/* Right: Course Status */}
            <td valign="top">
              <CourseStatus />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
