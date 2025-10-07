import { IoEllipsisVertical } from "react-icons/io5";
import { BsPlus } from "react-icons/bs";
import { Button, Badge } from "react-bootstrap";
import "./style.css";

export default function ModuleControlButtons() {
  return (
    <div className="module-control-buttons">
      <Badge pill bg="light" text="dark" className="module-total-pill">
        40% of Total
      </Badge>

      <Button variant="link" className="module-icon-btn fs-4">
        <BsPlus />
      </Button>

      <Button variant="link" className="module-icon-btn fs-4">
        <IoEllipsisVertical />
      </Button>
    </div>
  );
}