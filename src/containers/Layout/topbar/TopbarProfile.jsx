import React, { useState } from 'react';
import DownIcon from 'mdi-react/ChevronDownIcon';
import { Collapse } from 'reactstrap';
import TopbarMenuLink from './TopbarMenuLink';
import { UserProps, AuthOProps } from '../../../shared/prop-types/ReducerProps';

const Ava = `${process.env.PUBLIC_URL}/img/ava.png`;

const TopbarProfile = ({ user }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleProfile = () => {
    setIsCollapsed(!isCollapsed);
  };

  const logout = () => {
    localStorage.removeItem('easydev');
  };

  return (
    <div className="topbar__profile">
      <button className="topbar__avatar" type="button" onClick={toggleProfile}>
        <img
          className="topbar__avatar-img"
          src={Ava}
          alt="avatar"
        />
        <p className="topbar__avatar-name">
          {user.fullName}
        </p>
        <DownIcon className="topbar__icon" />
      </button>
      {isCollapsed && <button className="topbar__back" type="button" onClick={toggleProfile} />}
      <Collapse isOpen={isCollapsed} className="topbar__menu-wrap">
        <div className="topbar__menu">
          {/* <TopbarMenuLink
            title="My Profile"
            icon="user"
            path="/account/profile"
            onClick={toggleProfile}
          />
          <TopbarMenuLink
            title="Calendar"
            icon="calendar-full"
            path="/default_pages/calendar"
            onClick={toggleProfile}
          />
          <TopbarMenuLink
            title="Tasks"
            icon="list"
            path="/todo"
            onClick={toggleProfile}
          />
          <TopbarMenuLink
            title="Inbox"
            icon="inbox"
            path="/mail"
            onClick={toggleProfile}
          />
          <div className="topbar__menu-divider" /> */}
          {/* <TopbarMenuLink
            title="Account Settings"
            icon="cog"
            path="/account/profile"
            onClick={toggleProfile}
          /> */}
         
          <TopbarMenuLink
            title="Log Out"
            icon="exit" 
            path="/"
           
            onClick={()=>{
              localStorage.clear()
            }}
          />
        </div>
      </Collapse>
    </div>
  );
};

TopbarProfile.propTypes = {
  user: UserProps.isRequired,
};

export default TopbarProfile;
