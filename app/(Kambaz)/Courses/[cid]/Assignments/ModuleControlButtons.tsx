import { IoEllipsisVertical } from "react-icons/io5";
import { BsPlus } from "react-icons/bs";
import { Button, Badge } from "react-bootstrap";
import "./style.css";

export default function ModuleControlButtons() {
  return (
    <div className="module-control-buttons">
      {/* Pill showing percentage */}
      <Badge pill bg="light" text="dark" className="module-total-pill">
        40% of total
      </Badge>

      {/* Plus button */}
      <Button
        variant="link"
        className="module-icon-btn fs-4 p-0 ms-2"
        aria-label="Add Module"
      >
        <BsPlus />
      </Button>

      {/* Ellipsis (menu) button */}
      <Button
        variant="link"
        className="module-icon-btn fs-4 p-0 ms-1"
        aria-label="More Options"
      >
        <IoEllipsisVertical />
      </Button>
    </div>
  );
}
