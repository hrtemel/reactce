import * as React from 'react';
export interface NotificationType{
    position?:string,
    title?:string,
    message?:any,
    autoDismiss?: number,
    level?:string
}

export interface NotificationManagerType{
    showNotification:(not:NotificationType)=>void;
    showSuccess:(not:NotificationType)=>void;
    showError:(not:NotificationType)=>void;
    showSuccessText:(message:string)=>void;
    showErrorText:(message:string)=>void;
    reset?:()=>void
}

const _default:NotificationManagerType={
    showNotification:(not:NotificationType)=>console[not.level=="error"?"error":"warn"](not.message),
    showSuccess:(not:NotificationType)=>console.warn(not.message),
    showError:(not:NotificationType)=>console.error(not.message),
    showSuccessText:(message:string)=>console.warn(message),
    showErrorText:(message:string)=>console.error(message)
}
export const NotificationManager:NotificationManagerType={
    ..._default,
};


export const resetToDefault=()=>{
    NotificationManager.showNotification=_default.showNotification;
    NotificationManager.showError=_default.showError;
    NotificationManager.showErrorText=_default.showErrorText;
    NotificationManager.showSuccess=_default.showSuccess;
    NotificationManager.showSuccessText=_default.showSuccessText;
}

export default NotificationManager;