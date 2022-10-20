import React, { Dispatch, useState } from "react";
import IWorkListItemAction from "../interfaces/IWorkListAction";
import IWorkListItem from "../interfaces/IWorkListItem";
import Time from "../types/Time";
import TimerAction from "../types/TimerAction";
import { WorkListActionType } from "../types/WorkListActionType";
import { WorkListItemId } from "../types/WorkListItemId";
import { useAppContext } from "./AppContext";
import Button from "./Button";
import ConfirmDialog from "./ConfirmDialog";
import WorkItem from "./WorkItem";

interface IProps {
  items: IWorkListItem[];
  workItemDispatcher: Dispatch<IWorkListItemAction>;
}

const CONFIRM_RESET_ALL_DIALOG = (
  <ConfirmDialog message="Are you sure you want to delete all items?" acceptText="Yes" cancelText="No" />
);

const CONFIRM_RESET_TIMES_DIALOG = (
  <ConfirmDialog message="Are you sure you want to reset all times?" acceptText="Yes" cancelText="No" />
);

const CONFIRM_DELETE_DIALOG = <ConfirmDialog message="Delete the item?" acceptText="Yes" cancelText="No" />;

export default function WorkList({ items, workItemDispatcher }: IProps) {
  const [activeTimer, setActiveTimer] = useState<TimerAction | null>(null);
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

    if (activeTimer && activeTimer.workListItem.id === id) {
      activeTimer.stop();
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

  const startItemTimer = (id: number) => {
    const idx = items.findIndex((x) => x.id === id);
    if (idx < 0) {
      return;
    }

    if (items[idx].startTime.timeInMilliseconds === 0) {
      items[idx].startTime = Time.now();
    }

    items[idx].lastStartTime = Time.now();

    if (activeTimer) {
      activeTimer.stop();
    }

    const timer = new TimerAction(
      items[idx],
      () => {
        workItemDispatcher({
          type: WorkListActionType.Update,
          value: items[idx],
        });
      },
      appContext.settings.updateInterval
    );

    timer.start();
    setActiveTimer(timer);
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
      activeTimer.stop();
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
      activeTimer.stop();
      setActiveTimer(null);
    }
  };

  const dragItemStart = (id: WorkListItemId) => {
    setDragSource(id);
  };

  const dragItemEnd = (id: WorkListItemId) => {
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

  const renderWorkItems = () => {
    return items.map((x) => (
      <WorkItem
        key={x.id}
        id={x.id}
        title={x.title}
        startTime={x.startTime}
        lastStartTime={x.lastStartTime}
        elapsedTime={x.elapsedTime}
        disabled={activeTimer?.workListItem.id === x.id}
        onDeleteWorkItem={deleteItem}
        onStartItemTimer={startItemTimer}
        onUpdateWorkItem={updateItem}
        onDragStart={dragItemStart}
        onDragEnd={dragItemEnd}
        onDragEnter={dragItemEnter}
      />
    ));
  };

  return (
    <div className="work-list">
      <div className="work-list-items">
        <div className="work-item header">
          <div className="handle"></div>
          <div className="delete"></div>
          <div className="title"></div>
          <div className="start-time">Start Time</div>
          <div className="last-start-time">Last Start Time</div>
          <div className="elapsed-time">Elapsed</div>
        </div>
        {renderWorkItems()}
        {/* new item */}
        <WorkItem onCreateWorkItem={addItem} />
      </div>
      <div className="work-list-actions">
        <Button onClick={resetAll}>Delete All</Button>
        <Button onClick={resetTimes}>Reset Times</Button>
      </div>
    </div>
  );
}
