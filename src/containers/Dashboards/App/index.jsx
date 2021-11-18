import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Col, Container, Row } from 'reactstrap';
import CurrentUsers from './components/CurrentUsers';
import ActiveUsers from './components/ActiveUsers';
import SessionShort from './components/SessionShort';
import ActiveUsersShort from './components/ActiveUsersShort';
import NewUsersShort from './components/NewUsersShort';
import PageViewsShort from './components/PageViewsShort';
import AppTileClicks from './components/AppTileClicks';
import WeeklyStatMobile from './components/WeeklyStatMobile';
import SocialMarketing from './components/SocialMarketing';
import { RTLProps } from '../../../shared/prop-types/ReducerProps';

const AppDashboard = ({ rtl }) => {
  const { t } = useTranslation('common');

  return (
    <Container className="dashboard">
      <Row>
        <Col md={12}>
          <h3 className="page-title">{t('app_dashboard.page_title')}</h3>
        </Col>
      </Row>
      <Row>
        <NewUsersShort />
        <SessionShort />
        <ActiveUsersShort />
        <PageViewsShort />
      </Row>
      <Row>
        <WeeklyStatMobile />
        <ActiveUsers dir={rtl.direction} />
        <CurrentUsers />
      </Row>
      
      <Row> 
        {/* <AppTileClicks dir={rtl.direction} />
        <SocialMarketing /> */}
      </Row>
    </Container>
  );
};

AppDashboard.propTypes = {
  rtl: RTLProps.isRequired,
};

export default connect(state => ({
  rtl: state.rtl,
}))(AppDashboard);
