import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import NotificationSystem from 'rc-notification';
import Topbar from './topbar/Topbar';
import TopbarWithNavigation from './topbar_with_navigation/TopbarWithNavigation';
import Sidebar from './sidebar/Sidebar';
import SidebarMobile from './topbar_with_navigation/sidebar_mobile/SidebarMobile';
import Customizer from './customizer/Customizer';
import { BasicNotification } from '../../shared/components/Notification';
import { changeMobileSidebarVisibility, changeSidebarVisibility } from '../../redux/actions/sidebarActions';
import {
  changeThemeToDark, changeThemeToLight,
} from '../../redux/actions/themeActions';
import {
  changeDirectionToRTL, changeDirectionToLTR,
} from '../../redux/actions/rtlActions';
import { changeBorderRadius, toggleBoxShadow, toggleTopNavigation } from '../../redux/actions/customizerActions';
import {
  CustomizerProps, SidebarProps, ThemeProps, RTLProps, UserProps,
} from '../../shared/prop-types/ReducerProps';
import BuyNowButton from './button_buy_now/BuyNowButton';

let notification = null;

// eslint-disable-next-line no-return-assign
NotificationSystem.newInstance({ style: { top: 65 } }, n => notification = n);

const Layout = ({
  dispatch, customizer, sidebar, theme, rtl, user,
}) => {
  // useEffect(() => {
  //   const title = 'Welcome to the EasyDev!';
  //   const message = 'You have successfully registered in the EasyDev. Now you can start to explore the dashboard'
  //     + 'interface with a bunch of components and applications. Enjoy!';
  //   const notificationInitialProps = {
  //     content: <BasicNotification
  //       title={title}
  //       message={message}
  //       theme={theme}
  //     />,
  //     closable: true,
  //     duration: 5,
  //     style: { top: 0, left: 'calc(100vw - 100%)' },
  //     className: `right-up ${rtl.direction}-support`,
  //   };
  //   notification.notice(notificationInitialProps);
  //   const notificationIntervalKey = setInterval(() => {
  //     notification.notice({
  //       ...notificationInitialProps,
  //       content: <BasicNotification
  //         title={title}
  //         message={message}
  //         theme={theme}
  //       />,
  //       className: `right-up ${rtl.direction}-support`,
  //       onClose() {
  //         setTimeout(() => { clearInterval(notificationIntervalKey); });
  //       },
  //     });
  //   }, 100);
  //   setTimeout(() => { clearInterval(notificationIntervalKey); }, 5000);
  //   return (() => notification.destroy());
  // }, [rtl.direction, theme]);

  const sidebarVisibility = () => {
    dispatch(changeSidebarVisibility());
  };

  const mobileSidebarVisibility = () => {
    dispatch(changeMobileSidebarVisibility());
  };

  const changeToDark = () => {
    dispatch(changeThemeToDark());
  };

  const changeToLight = () => {
    dispatch(changeThemeToLight());
  };

  const changeToRTL = () => {
    dispatch(changeDirectionToRTL());
  };

  const changeToLTR = () => {
    dispatch(changeDirectionToLTR());
  };

  const topNavigation = () => {
    dispatch(toggleTopNavigation());
  };

  const borderRadius = () => {
    dispatch(changeBorderRadius());
  };

  const boxShadow = () => {
    dispatch(toggleBoxShadow());
  };

  const layoutClass = classNames({
    layout: true,
    'layout--collapse': sidebar.collapse,
    'layout--top-navigation': customizer.topNavigation,
  });

  return (
    <div className={layoutClass}>
      <Customizer
        customizer={customizer}
        sidebar={sidebar}
        theme={theme}
        rtl={rtl}
        changeSidebarVisibility={sidebarVisibility}
        toggleTopNavigation={topNavigation}
        changeToDark={changeToDark}
        changeToLight={changeToLight}
        changeToRTL={changeToRTL}
        changeToLTR={changeToLTR}
        changeBorderRadius={borderRadius}
        toggleBoxShadow={boxShadow}
      />
      {/* <BuyNowButton /> */}
      {customizer.topNavigation
        ? (
          <TopbarWithNavigation
            changeMobileSidebarVisibility={mobileSidebarVisibility}
          />
        )
        : (
          <Topbar
            changeMobileSidebarVisibility={mobileSidebarVisibility}
            changeSidebarVisibility={sidebarVisibility}
            user={user}
          />
        )
      }
      {customizer.topNavigation
        ? (
          <SidebarMobile
            sidebar={sidebar}
            changeToDark={changeToDark}
            changeToLight={changeToLight}
            changeMobileSidebarVisibility={changeMobileSidebarVisibility}
          />
        )
        : (
          <Sidebar
            sidebar={sidebar}
            changeToDark={changeToDark}
            changeToLight={changeToLight}
            changeMobileSidebarVisibility={changeMobileSidebarVisibility}
          />
        )
      }
    </div>
  );
};

Layout.propTypes = {
  dispatch: PropTypes.func.isRequired,
  sidebar: SidebarProps.isRequired,
  customizer: CustomizerProps.isRequired,
  theme: ThemeProps.isRequired,
  rtl: RTLProps.isRequired,
  user: UserProps.isRequired,
};

export default withRouter(connect(state => ({
  customizer: state.customizer,
  sidebar: state.sidebar,
  theme: state.theme,
  rtl: state.rtl,
  user: state.user,
}))(Layout));
