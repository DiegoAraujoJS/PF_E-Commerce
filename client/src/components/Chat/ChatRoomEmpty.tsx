import style from "./Chat.module.css";
import profilePicture from "../../images/profile_pic.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";

export default function ChatRoomEmpty(props) {
 
  return (
    <>
      <div className={"w-100"}>
          <nav className={"navbar " + style.background}>
            <div
              className={
                "w-100 d-flex flex-row justify-content-start align-items-center"
              }
            >
              <img
                src={profilePicture}
                className={"rounded-circle mx-3 " + style.imgMessage}
                alt="profile"
              />
            </div>
          </nav>
          <section
            className={"d-flex flex-column justify-content-center bg-light"}
          >
            <main
              className={
                "d-flex flex-column justify-content-center align-items-center p-3 border " +
                style.main
              }
            >
              <h4>{props.message}</h4>
            </main>
            <form className={"d-flex bg-dark w-100"}>
              <input
                placeholder="Envia un mensaje"
                className={"border rounded-0 w-100 px-3 fs-6 bg-light "}
                disabled={true}
              />

              <button
                type="submit"
                disabled={true}
                className={"px-4 py-3 bg-secondary border-0"}
              >
                <FontAwesomeIcon icon={faPaperPlane} size={"1x"} />
              </button>
            </form>
          </section>
        </div>
    </>
  );
}
