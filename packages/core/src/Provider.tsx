import React from "react";
import { ReactCeDialogProvider } from '@reactce/dialogs';
import l from './localizations';

type ReactCeProviderProps={
    form:React.ElementType,
    notifications:React.ElementType,
    dialogComponents:any,
    children:any
};

const Provider=({notifications:Notifications,form,dialogComponents,children}:ReactCeProviderProps)=><>
    <Notifications/>
    <ReactCeDialogProvider 
        components={dialogComponents} 
        form={form} 
        okButtonText={l`OK`}
        cancelButtonText={l`Cancel`}
        closeButtonText={l`Close`}
        schemaCustomizer={(schema:any) => ({
            ...schema,
            "ui:hideTitle":true,
            "ui:hideBorder":true
        })}
    >
        {children}
    </ReactCeDialogProvider>
</>;

export default Provider;
