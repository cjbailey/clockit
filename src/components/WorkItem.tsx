import { ChangeEvent, KeyboardEvent, useState } from "react";
import Time from "../types/Time";
import { WorkListItemId } from "../types/WorkListItemId";
import DeleteButton from "./DeleteButton";

interface IProps {
  id?: WorkListItemId;
  title?: string;
  startTime?: Time;
  lastStartTime?: Time;
  elapsedTime?: Time;
  disabled?: boolean;
  onCreateWorkItem?: (title: string) => void;
  onDeleteWorkItem?: (id: WorkListItemId) => void;
  onStartItemTimer?: (id: WorkListItemId) => void;
}

export default function WorkItem({
  id,
  title = "",
  startTime,
  lastStartTime,
  elapsedTime,
  disabled = false,
  onCreateWorkItem,
  onDeleteWorkItem,
  onStartItemTimer
}: IProps) {
  const [_title, setTitle] = useState(title);

  const titleInput = (ev: ChangeEvent<HTMLInputElement>) => {
    setTitle(ev.currentTarget.value || "");
  };

  const keyUp = (ev: KeyboardEvent<HTMLInputElement>) => {
    if (ev.key === "Enter") {
      // ev.preventDefault();

      let val = ev.currentTarget.value || "???";
      if (!id) {
        // ev.currentTarget.value = "";
        setTitle("");
      }

      if (onCreateWorkItem) onCreateWorkItem(val);
    }
  };

  const deleteItem = (id: WorkListItemId | undefined) => {
    if (id === undefined) {
      return;
    }

    if (onDeleteWorkItem) {
      onDeleteWorkItem(id);
    }
  };

  const startTimer = (id: WorkListItemId | undefined) => {
    if (id === undefined) {
      return;
    }

    if (onStartItemTimer) {
      onStartItemTimer(id);
    }
  };

  return (
    <div key={id} className="work-item">
      {title && title.length > 0 ? (
        <div className="delete">
          <DeleteButton onClick={() => deleteItem(id)} />
        </div>
      ) : (
        <div></div>
      )}
      <div className="title">
        <input onChange={titleInput} onKeyUp={keyUp} value={_title} />
      </div>
      {startTime ? (
        <div className="start-time">{startTime.toString("hh:mm:ss")}</div>
      ) : (
        <div className="start-time"></div>
      )}
      {lastStartTime ? (
        <div className="last-start-time">
          {lastStartTime.toString("hh:mm:ss")}
        </div>
      ) : (
        <div className="last-start-time"></div>
      )}
      <div className="elapsed-time">{elapsedTime?.toString("hh:mm:ss")}</div>
      {title && title.length > 0 && (
        <>
          <div>
            <button onClick={() => startTimer(id)} disabled={disabled}>
              Start
            </button>
          </div>
        </>
      )}
    </div>
  );
}
