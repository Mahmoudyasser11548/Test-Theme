import { Activity } from "react-feather";
import { Link } from "react-router-dom";

const ProgressDropdown = () => {
  return (
    <>
      <div className="d-flex flex-column">
        <Link to={"/requests/list"}>
          {" "}
          <Activity width={"40px"} color="black" size={16} />
        </Link>

        <div
          className="demo-vertical-spacing"
          style={{ marginTop: "4px", width: "40px" }}
        ></div>
      </div>
    </>
  );
};
export default ProgressDropdown;
