import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";
import { MdOutlineUnpublished } from "react-icons/md";
export default function ModulesControls() {
 return (
   <div id="wd-modules-controls" className="text-nowrap">
     <Button variant="danger" size="lg" className="me-1 float-end" id="wd-add-module-btn">
       <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
       Module
     </Button>
     <Dropdown className="float-end me-2">
       <DropdownToggle variant="secondary" size="lg" id="wd-publish-all-btn">
         <GreenCheckmark /> Publish All
       </DropdownToggle>
       <DropdownMenu>
         <DropdownItem id="wd-publish-all">
           <GreenCheckmark /> Publish All
         </DropdownItem>
         <DropdownItem id="wd-publish-all-modules-and-items">
           <GreenCheckmark /> Publish all modules and items
         </DropdownItem>
         <DropdownItem id="wd-publish-modules-only">
           <GreenCheckmark /> Publish modules only
         </DropdownItem>
         {/* Create two more items with IDs wd-unpublish-all-modules-and-items and wd-unpublish-modules-only with
             labels Unpublish all modules and items and Unpublish modules only */}
         <DropdownItem id="wd-unpublish-all-modules-and-items">
           <MdOutlineUnpublished /> Unpublish all modules and items
         </DropdownItem>
         <DropdownItem id="wd-unpublish-modules-only">
           <MdOutlineUnpublished /> Unpublish modules only
         </DropdownItem>
       </DropdownMenu>
     </Dropdown>
     {/* Implement the View Progress and Collapse All buttons with IDs wd-view-progress and wd-collapse-all */}
     <Button variant="danger" size="lg" className="me-1 float-end" id="wd-view-progress">
       <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
       View Progress
     </Button>
     <Button variant="danger" size="lg" className="me-1 float-end" id="wd-collapse-all">
       <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
       Collapse All
     </Button>
   </div>
);}
