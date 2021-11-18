import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Col, Container, Row } from 'reactstrap';
import NotificationSystem from 'rc-notification';
import BasicNotifications from './components/BasicNotifications';
import ImageNotifications from './components/ImageNotifications';
import ColorStates from './components/ColorStates';
import ColorStatesFullWidth from './components/ColorStatesFullWidth';
import { RTLProps, ThemeProps } from '../../../shared/prop-types/ReducerProps';

let notificationLU = null;
let notificationRU = null;
let notificationTC = null;

const Notifications = ({ rtl, theme }) => {
  const { t } = useTranslation('common');

  useEffect(() => {
    NotificationSystem.newInstance({ style: { top: 65 } }, (n) => { notificationLU = n; });
    NotificationSystem.newInstance({ style: { top: 65 } }, (n) => { notificationRU = n; });
    NotificationSystem.newInstance({ style: { top: 65 } }, (n) => { notificationTC = n; });
    return (() => {
      notificationLU.destroy();
      notificationRU.destroy();
      notificationTC.destroy();
    });
  }, []);

  const showNotification = ({ notification, position }, direction) => {
    const notificationDefaultProps = {
      content: notification(theme),
      duration: 5,
      closable: true,
      className: `${position} ${direction}-support`,
    };
    switch (position) {
      case 'left-up':
        notificationLU.notice(notificationDefaultProps);
        // eslint-disable-next-line no-case-declarations
        const leftUpNotificationIntervalKey = setInterval(() => {
          notificationLU.notice({
            ...notificationDefaultProps,
            content: notification(theme),
            style: { top: 0, left: 0 },
            className: `${position} ${direction}-support`,
            onClose() {
              setTimeout(() => { clearInterval(leftUpNotificationIntervalKey); });
            },
          });
        }, 100);
        setTimeout(() => { clearInterval(leftUpNotificationIntervalKey); }, 5000);
        break;
      case 'right-up':
        notificationRU.notice(notificationDefaultProps);
        // eslint-disable-next-line no-case-declarations
        const rightUpNotificationIntervalKey = setInterval(() => {
          notificationRU.notice({
            ...notificationDefaultProps,
            content: notification(theme),
            style: { top: 0, left: 'calc(100vw - 100%)' },
            className: `${position} ${direction}-support`,
            onClose() {
              setTimeout(() => { clearInterval(rightUpNotificationIntervalKey); });
            },
          });
        }, 100);
        setTimeout(() => { clearInterval(rightUpNotificationIntervalKey); }, 5000);
        break;
      default:
        notificationTC.notice({
          ...notificationDefaultProps,
          style: { top: 0, left: 0 },
        });
        break;
    }
  };

  return (
    <Container>
      <Row>
        <Col md={12}>
          <h3 className="page-title">{t('ui_elements.notifications.title')}</h3>
          <h3 className="page-subhead subhead">Use this elements, if you want to show some hints or additional
            information
          </h3>
        </Col>
      </Row>
      <Row>
        <BasicNotifications
          theme={theme}
          showNotification={
            ({ notification, position }) => showNotification({ notification, position }, rtl.direction)
          }
        />
        <ImageNotifications
          theme={theme}
          showNotification={
            ({ notification, position }) => showNotification({ notification, position }, rtl.direction)
          }
        />
        <ColorStates
          theme={theme}
          showNotification={
            ({ notification, position }) => showNotification({ notification, position }, rtl.direction)
          }
        />
        <ColorStatesFullWidth
          showNotification={
            ({ notification, position }) => showNotification({ notification, position }, rtl.direction)
          }
        />
      </Row>
    </Container>
  );
};

Notifications.propTypes = {
  rtl: RTLProps.isRequired,
  theme: ThemeProps.isRequired,
};

export default compose(connect(state => ({
  rtl: state.rtl,
  theme: state.theme,
})))(Notifications);
