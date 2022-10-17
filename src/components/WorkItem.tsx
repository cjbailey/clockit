import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import Time from "../types/Time";
import { WorkListItemId } from "../types/WorkListItemId";
import { useAppContext } from "./AppContext";
import Button from "./Button";
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
  onStartItemTimer,
}: IProps) {
  const { settings } = useAppContext();
  const [_title, setTitle] = useState(title);

  const timeFormatStyle = {
    "--format": `"${settings.timeFormat}"`,
  };

  const titleInput = (ev: ChangeEvent<HTMLInputElement>) => {
    setTitle(ev.currentTarget.value || "");
  };

  const keyUp = (ev: KeyboardEvent<HTMLInputElement>) => {
    if (ev.key === "Enter") {
      // ev.preventDefault();

      const val = ev.currentTarget.value || "???";
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
        <div className="start-time time-hdr" style={timeFormatStyle as any}>
          {startTime.toString(settings.timeFormat)}
        </div>
      ) : (
        <div className="start-time"></div>
      )}

      {lastStartTime ? (
        <div className="last-start-time time-hdr" style={timeFormatStyle as any}>
          {lastStartTime.toString(settings.timeFormat)}
        </div>
      ) : (
        <div className="last-start-time"></div>
      )}

      {elapsedTime ? (
        <div className="elapsed-time time-hdr" style={timeFormatStyle as any}>
          {elapsedTime?.toString(settings.timeFormat)}
        </div>
      ) : (
        <div className="elapsed-time"></div>
      )}

      {title && title.length > 0 && !disabled && (
        <div>
          <Button onClick={() => startTimer(id)}>Start</Button>
        </div>
      )}
    </div>
  );
}
