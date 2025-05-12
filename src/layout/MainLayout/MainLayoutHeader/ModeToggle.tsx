import React from "react";
import { ArrowDown } from "components";

export const ModeToggle = () => {

    return (

        <div className='main-layout-topBar-mode-toggle'>

            <p> DEMO </p>

            <span dangerouslySetInnerHTML={{ __html: ArrowDown }} />

        </div>

    )

}