import React from 'react';
import MainLayoutSideNav from './MainLayoutSideNav';
import MainLayoutHeader from './MainLayoutHeader';
import MainLayoutLegend from './MainLayoutLegend';
import { MetaHead } from 'components';
import { MainLayoutPageLeft } from './MainLayoutPageLeft';

export const MainLayout: React.FC<Props> = ({ title, active, contentClass, isMobile, deviceWidth, ...props }) => {
  return (
    <>
      <MetaHead title={title} />
      <div className="main-layout">

        <div className="main-layout-left">
          <MainLayoutSideNav active={active} />
        </div>

        <div className="main-layout-right">

          <MainLayoutHeader
            isMobile={isMobile}
            deviceWidth={deviceWidth}
            active={active || ""}
            title={props.displayTitle}
          />

          <div className="main-layout-page-content">

            <div className='main-layout-page-content-left'>

              <MainLayoutPageLeft />

            </div>

            <div className='main-layout-page-content-right'>

              {(props.displayTitle || props.displaySubtitle || props.subtitleComponent) && (
                <MainLayoutLegend
                  subtitle={props.displaySubtitle}
                  subtitleComponent={props.subtitleComponent} />
              )}

              <div className={`main-layout-page-content-space ${contentClass}`}>{props.children}</div>

            </div>

          </div>
        </div>
      </div>
    </>
  );
};

interface Props {
  title?: string,
  active?: string,
  contentClass?: string,
  displayTitle?: string,
  displaySubtitle?: string,
  isMobile: boolean,
  deviceWidth: number,
  subtitleComponent?: React.ReactElement<any, any>,
  children: React.ReactElement
}
