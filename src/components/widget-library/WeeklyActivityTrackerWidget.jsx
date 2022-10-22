/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React from 'react';
import Widget from "../widget/Widget";
import {ElevenDropDown} from "../../index";
import {Button, ToastNotification} from "@carbon/react";


import mockNotifications from "../../assets/mockdata/notifications/activity-notifications";

const WeeklyActivityTrackerWidget = props => {

  const notifications = mockNotifications.notifications;

  const loadMoreAction = [
    {
      actionKey: "loadmore",
      onClick: () => alert("load more clicked"),
      kind: "link",
      text:"Load more",
      iconDescription: "Go To Page",
    },
  ];
// TODO: think about how to represent actions in json.
// The notifications can come with notification ids and a list of text action verbs and labels for each action button.
// Clicking the action button would call the notification service with the notificationid and the action verb.
// The notification would contain the details to execute that verb for that notification.
// This way, any app can supply notifications to the activity widget without having to update the widget.
// or we just standardize on routes and do that.
// i.e. notification/:id/action
// or <workspace>/user/1322  i.e usermgmt/user/1332
  return (
    <Widget
      slim={true}
      footerCenterActions = {loadMoreAction}
      metadata = {
        <ElevenDropDown
          ariaLabel={"Filter notifications"}
          items={[
            {label:"Most recent",value:0},
            {label:"Most severe",value:1},
            {label:"Group by application", value:2}
          ]}
          selectedItem={
            {label:"Most recent",value:0}
          }
          type={"default"}
        />}

      {...props}
      footerLeftActions = {null}
      footerRightActions = {null}
    >
      <div style={{display:"grid",gridGap:4}} >
        { notifications.map ((note,index) => (

          <ToastNotification
            key={index}
            style={{width:"100%"}}
            lowContrast={true}
            caption={note.date}
            title={note.title}
            subtitle={note.subTitle}
            kind={note.kind}
          >
            {
              note.actionText && <Button size="small" kind="ghost" onClick={()=>props.actions.customAction.click("45",note.action)
              }
              >{note.actionText}</Button> }
          </ToastNotification>
        ))
        }
      </div>
      <br/>
    </Widget>

  )
}

export default WeeklyActivityTrackerWidget;
