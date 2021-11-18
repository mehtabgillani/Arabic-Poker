import React from 'react';
import { Route } from 'react-router-dom';
import Layout from '../../../Layout/index';
import OnLineMarketingDashboard from '../../../Dashboards/OnLineMarketing/index';
import AppDashboard from '../../../Dashboards/App/index';
import BookingDashboard from '../../../Dashboards/Booking/index';
import FitnessDashboard from '../../../Dashboards/Fitness/index';
import Mail from '../../../Mail/index';
import Chat from '../../../Chat/index';
import Todo from '../../../Todo/index';
import UI from './ThemeRoutes/UI';
import Forms from './ThemeRoutes/Forms';
import Tables from './ThemeRoutes/Tables';
import Charts from './ThemeRoutes/Charts';
import Maps from './ThemeRoutes/Maps';
import Account from './ThemeRoutes/Account';
import ECommerce from './ThemeRoutes/ECommerce';
import DefaultPages from './ThemeRoutes/DefaultPages';
import Documentation from './ThemeRoutes/Documentation';
import Commerce from './ThemeRoutes/Commerce';
import Finance from './ThemeRoutes/Finance';
import User from "./AppRoutes/User"

export default () => (
  <div>
    <Layout />
    <div className="container__wrap">
      <Route path="/e_commerce_dashboard" component={Commerce} />
      <Route path="/online_marketing_dashboard" component={OnLineMarketingDashboard} />
      <Route exact path="/app_dashboard" component={AppDashboard} />
      <Route path="/booking_dashboard" component={BookingDashboard} />
      <Route path="/finance_dashboard" component={Finance} />
      <Route path="/fitness_dashboard" component={FitnessDashboard} />
      <Route path="/ui" component={UI} />
      <Route path="/mail" component={Mail} />
      <Route path="/chat" component={Chat} />
      <Route path="/todo" component={Todo} />
      <Route path="/forms" component={Forms} />
      <Route path="/tables" component={Tables} />
      <Route path="/charts" component={Charts} />
      <Route path="/maps" component={Maps} />
      <Route path="/account" component={Account} />
      <Route path="/e-commerce" component={ECommerce} />
      <Route path="/default_pages" component={DefaultPages} />
      <Route path="/documentation" component={Documentation} />
      {/* //Admin Panel Routes */}
      <Route path="/user" component={User} />
    </div>
  </div>
);
