import React from "react";
import "../../styles/TasksComponent.css";

const AnnouncementComponent = ({ announcement }) => {
  return (
    <div className="published-announcements">
      <h2></h2>
      <ul>
        {announcement.map((announce) => (
          <li
            key={announce.id}
            className="published"
          >
            <span className="announcement-announcement">{announce.announcement}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnnouncementComponent;
