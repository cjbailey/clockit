import React, { Dispatch, useState } from "react";
import Time from "../types/Time";
import IWorkListAction from "../interfaces/IWorkListAction";

interface IGanttListItem {
  startTime: Time;
  endTime: Time;
  title: string;
}

interface IProps {
  items: IGanttListItem[];
  workItemDispatcher: Dispatch<IWorkListAction>;
}

export default function GanttList({ items, workItemDispatcher }: IProps) {

  return <div className="gantt-list">
    <div className="gantt-list-items">
      Hellooooo!
    </div>
  </div>;
}