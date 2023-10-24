import React, { Dispatch, useState } from "react";
import Time from "../types/Time";
import IWorkListAction from "../interfaces/IWorkListAction";
import IWorkListItem from "../interfaces/IWorkListItem";
import GanttItem from "./GanttItem";
import ConfirmDialog from "./ConfirmDialog";
import EditTimeDialog from "./EditTimeDialog";
import TimerAction from "../types/TimerAction";
import { WorkListActionType } from "../types/WorkListActionType";
import { WorkListItemId } from "../types/WorkListItemId";
import { useAppContext } from "./AppContext";

interface IProps {
  items: IWorkListItem[];
  workItemDispatcher: Dispatch<IWorkListAction>;
}

interface IActiveTimer {
  id: WorkListItemId;
  timer: TimerAction;
}

const CONFIRM_RESET_ALL_DIALOG = (
  <ConfirmDialog
    message="Are you sure you want to delete all items?"
    acceptText="Yes"
    cancelText="No"
    className="warning"
  />
);

const CONFIRM_RESET_TIMES_DIALOG = (
  <ConfirmDialog
    message="Are you sure you want to reset all times?"
    acceptText="Yes"
    cancelText="No"
    className="warning"
  />
);

const CONFIRM_DELETE_DIALOG = (
  <ConfirmDialog message="Delete the item?" acceptText="Yes" cancelText="No" className="warning" />
);

const EDIT_TIME_OF_ACTIVE_TIMER_NOT_ALLOWED_DIALOG = (
  <ConfirmDialog message="Editing the time of an active timer is not allowed." acceptText="OK" className="error" />
);

export default function GanttList({ items, workItemDispatcher }: IProps) {
  const { settings } = useAppContext();
  const [activeTimer, setActiveTimer] = useState<IActiveTimer | null>(null);
  const [dragSource, setDragSource] = useState<WorkListItemId | null>(null);
  const [dragTarget, setDragTarget] = useState<WorkListItemId | null>(null);

  const appContext = useAppContext();

  const addItem = (title: string) => {
    const lastIdx = items.reduce<WorkListItemId>((prev, curr) => (curr.id > prev ? curr.id : prev), 0);

    workItemDispatcher({
      type: WorkListActionType.Create,
      value: {
        id: lastIdx + 1,
        title: title,
        startTime: new Time(),
        lastStartTime: new Time(),
        elapsedTime: new Time(),
      },
    });
  };

  const deleteItem = async (id: number) => {
    const confirm = await appContext.pushView<boolean>(CONFIRM_DELETE_DIALOG);
    if (!confirm) return;

    workItemDispatcher({
      type: WorkListActionType.Delete,
      value: id,
    });

    if (activeTimer && activeTimer.id === id) {
      activeTimer.timer.stop();
      setActiveTimer(null);
    }
  };

  const updateItem = (id: WorkListItemId, title: string, startTime: Time, lastStartTime: Time, elapsedTime: Time) => {
    workItemDispatcher({
      type: WorkListActionType.Update,
      value: {
        id,
        title,
        startTime,
        lastStartTime,
        elapsedTime,
      },
    });
  };

  const startItemTimer = (item: IWorkListItem, resume = false) => {
    if (!resume) {
      if (item.startTime.timeInMilliseconds === 0) {
        item.startTime = Time.now();
      }

      item.lastStartTime = Time.now();
    }

    if (activeTimer) {
      activeTimer.timer.stop();
    }

    const timer = new TimerAction(
      item.elapsedTime,
      item.lastStartTime,
      (currentElapsedTime) => {
        workItemDispatcher({
          type: WorkListActionType.Update,
          value: { ...item, elapsedTime: currentElapsedTime },
        });
      },
      appContext.settings.updateInterval
    );

    timer.start();
    setActiveTimer({ id: item.id, timer });
  };

  const resetAll = async () => {
    const confirm = await appContext.pushView<boolean>(CONFIRM_RESET_ALL_DIALOG);
    if (!confirm) {
      return;
    }

    workItemDispatcher({
      type: WorkListActionType.Reset,
    });

    if (activeTimer) {
      activeTimer.timer.stop();
      setActiveTimer(null);
    }
  };

  const resetTimes = async () => {
    const confirm = await appContext.pushView<boolean>(CONFIRM_RESET_TIMES_DIALOG);
    if (!confirm) {
      return;
    }

    workItemDispatcher({
      type: WorkListActionType.ResetTimes,
    });

    if (activeTimer) {
      activeTimer.timer.stop();
      setActiveTimer(null);
    }
  };

  const dragItemStart = (id: WorkListItemId) => {
    setDragSource(id);
  };

  const dragItemEnd = () => {
    if (dragSource !== dragTarget) {
      const sourceIdx = items.findIndex((x) => x.id === dragSource);
      const targetIdx = items.findIndex((x) => x.id === dragTarget);

      if (sourceIdx >= 0 && targetIdx >= 0) {
        const sourceItem = items[sourceIdx];
        const targetItem = items[targetIdx];

        items.splice(sourceIdx, 1);
        items.splice(targetIdx, 0, sourceItem);

        workItemDispatcher({
          type: WorkListActionType.Update,
          value: sourceItem,
        });

        workItemDispatcher({
          type: WorkListActionType.Update,
          value: targetItem,
        });
      }
    }

    setDragSource(null);
  };

  const dragItemEnter = (id: WorkListItemId) => {
    setDragTarget(id);
  };

  const editTime = async (id: WorkListItemId) => {
    const idx = items.findIndex((x) => x.id === id);
    if (idx < 0) {
      return;
    }

    const item = items[idx];
    const startTime = item.startTime;
    const lastStartTime = item.lastStartTime;
    const elapsedTime = item.elapsedTime;

    if (id === activeTimer?.id) {
      await appContext.pushView<boolean>(EDIT_TIME_OF_ACTIVE_TIMER_NOT_ALLOWED_DIALOG);
      return;
    }

    const view = <EditTimeDialog startTime={startTime} elapsedTime={elapsedTime} />;
    const viewResult = await appContext.pushView<{ startTime: Time; elapsedTime: Time }>(view);

    if (viewResult) {
      updateItem(id, item.title, viewResult.startTime, lastStartTime, viewResult.elapsedTime);
    }
  };

  const renderGanttItems = () => {
    return items.map((x, idx) => (
      <GanttItem
        key={x.id}
        id={x.id}
        title={x.title}
        startTime={x.startTime}
        lastStartTime={x.lastStartTime}
        elapsedTime={x.elapsedTime}
        disabled={activeTimer?.id === x.id}
        onDeleteWorkItem={deleteItem}
        onStartItemTimer={(id) => startItemTimer(items.filter((x) => x.id === id)[0])}
        onUpdateWorkItem={updateItem}
        onDragStart={dragItemStart}
        onDragEnd={dragItemEnd}
        onDragEnter={dragItemEnter}
        onEditTime={editTime}
      />
    ));
  };

  return <div className="gantt-list">
    <div className="gantt-list-items">

      {renderGanttItems()}
    </div>
  </div>;
}