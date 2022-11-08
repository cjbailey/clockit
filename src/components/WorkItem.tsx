import React, { ChangeEvent, DragEvent, KeyboardEvent, useState } from "react";
import Time from "../types/Time";
import { WorkListItemId } from "../types/WorkListItemId";
import { useAppContext } from "./AppContext";
import Button from "./Button";
import DeleteButton from "./DeleteButton";
import { ReactComponent as GrabHandleIcon } from "../icons/grab-handle.svg";

interface IProps {
  id?: WorkListItemId;
  title?: string;
  startTime?: Time;
  lastStartTime?: Time;
  elapsedTime?: Time;
  disabled?: boolean;
  onCreateWorkItem?: (title: string) => void;
  onUpdateWorkItem?: (
    id: WorkListItemId,
    title: string,
    startTime: Time,
    lastStartTime: Time,
    elapsedTime: Time
  ) => void;
  onDeleteWorkItem?: (id: WorkListItemId) => void;
  onStartItemTimer?: (id: WorkListItemId) => void;
  onDragStart?: (id: WorkListItemId) => void;
  onDragEnd?: (id: WorkListItemId) => void;
  onDragEnter?: (id: WorkListItemId) => void;
  onEditTime?: (id: WorkListItemId) => void;
}

export default function WorkItem({
  id,
  title = "",
  startTime,
  lastStartTime,
  elapsedTime,
  disabled = false,
  onCreateWorkItem,
  onUpdateWorkItem,
  onDeleteWorkItem,
  onStartItemTimer,
  onDragStart,
  onDragEnd,
  onDragEnter,
  onEditTime,
}: IProps) {
  const { settings } = useAppContext();
  const [_title, setTitle] = useState(title);

  const timeFormatStyle = {
    "--format": `"${settings.timeFormat}"`,
  };

  const titleInput = (ev: ChangeEvent<HTMLInputElement>) => {
    const title: string = ev.currentTarget.value || "";
    setTitle(title);

    if (onUpdateWorkItem && id && title && startTime && lastStartTime && elapsedTime)
      onUpdateWorkItem(id, title, startTime, lastStartTime, elapsedTime);
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

  const dragBegin = (id: WorkListItemId | undefined) => {
    if (id === undefined) {
      return;
    }

    if (onDragStart) {
      onDragStart(id);
    }
  };

  const grabEnd = (id: WorkListItemId | undefined, ev: DragEvent) => {
    if (id === undefined) {
      return;
    }

    if (onDragEnd) {
      onDragEnd(id);
    }
  };

  const dragEnter = (id: WorkListItemId | undefined, ev: DragEvent) => {
    if (id === undefined) {
      return;
    }

    if (onDragEnter) {
      onDragEnter(id);
    }
  };

  const editTime = (id: WorkListItemId | undefined) => {
    if (id === undefined) {
      return;
    }

    if (onEditTime) {
      onEditTime(id);
    }
  };

  return (
    <div
      key={id}
      data-id={id}
      className="work-item"
      draggable={id !== undefined}
      onDragStart={() => dragBegin(id)}
      onDragEnd={(ev) => grabEnd(id, ev)}
      onDragEnter={(ev) => dragEnter(id, ev)}
    >
      <div className="handle">{id !== undefined && <GrabHandleIcon />}</div>
      {title && title.length > 0 ? (
        <div className="delete">
          <DeleteButton onClick={() => deleteItem(id)} />
        </div>
      ) : (
        <div></div>
      )}
      <div className="title">
        <input onChange={titleInput} onKeyUp={keyUp} value={_title} placeholder={!id ? "Type something here" : ""} />
      </div>
      {startTime ? (
        <div className="start-time time-hdr" style={timeFormatStyle as any} onDoubleClick={() => editTime(id)}>
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
        <div className="elapsed-time time-hdr" style={timeFormatStyle as any} onDoubleClick={() => editTime(id)}>
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
