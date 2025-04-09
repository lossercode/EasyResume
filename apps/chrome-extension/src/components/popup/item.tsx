import { ReactElement } from "react";


export interface PopupItemProps {
    icon: ReactElement,
    title: string,
    onclick: () => void,
}

export default function PopupItem({ icon, title, onclick }: PopupItemProps) {
    return (
        <div className="flex flex-row items-center justify-start gap-3 cursor-pointer hover:bg-gray-100 p-3 rounded-md">
            {icon}
            <div className="text-sm font-medium cursor-pointer" onClick={onclick}>{title}</div>
        </div>
    )
}