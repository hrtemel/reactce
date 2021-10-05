import React, { useRef, useEffect } from 'react';
// @ts-ignore
import Notifications from 'react-notification-system';
import styles from './styles';

import {NotificationManager,resetToDefault,NotificationType,setNotificationUI} from '@reactce/core/lib/notifications';

const NotificationUi=() =>{
  const ref=useRef();

  useEffect( ()=> {
    if (ref && ref.current){
      const showNotification=(options:NotificationType)=>(ref.current as any).addNotification({...options});

      NotificationManager.showNotification=showNotification;
      
      NotificationManager.showError=(options)=> showNotification({
        position:'tr',
        autoDismiss: 3,
        level:"error",
        title:'Error',
        ...options
      });

      NotificationManager.showSuccess=(options)=> showNotification({
        position:'tr',
        autoDismiss: 3,
        level:"success",
        title:'Success',
        ...options
      });

      NotificationManager.showErrorText=(message)=>showNotification({
        position:'tr',
        autoDismiss: 3,
        level:"error",
        title:'Error',
        message
      });

      NotificationManager.showSuccessText=(message)=> showNotification({
        position:'tr',
        autoDismiss: 3,
        level:"success",
        title:'Success',
        message
      });

    };
    return resetToDefault;
  },[ref]);

  return <Notifications ref={ref} style={styles} />;
}

export default NotificationUi;
