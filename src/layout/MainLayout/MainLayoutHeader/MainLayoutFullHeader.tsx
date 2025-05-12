import React from 'react';
import Link from 'next/link';
import router from 'next/router';
import MainLayoutLegend from '../MainLayoutLegend';
import { MainLayoutHeaderBalances } from './MainLayoutHeaderBalances';
import { ModeToggle } from './ModeToggle';

export const MainLayoutFullHeader: React.FC<Props> = ({ title }) => {
  return (
    <div className="main-layout-topBar">
      <div className="main-layout-topBar-userBox">

        {title && <MainLayoutLegend title={title} />}


        <Link href={"/account"}
          tabIndex={0}
          role={"button"}
          onKeyDown={(e) => e.key === "Enter" && router.push("/account")}
        >
          <img src={"/assets/comX.svg"} alt={'user--'} />

        </Link>

        <div className='main-layout-topBar-processBox'>

          <MainLayoutHeaderBalances />

          <ModeToggle />

        </div>

      </div>
    </div>
  );
};


interface Props {
  avatar?: string,
  title?: string
}
