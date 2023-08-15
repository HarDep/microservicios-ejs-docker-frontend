import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactHashRouter, IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Menu from './components/Menu';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Customers from './pages/customers/Customers';
import CustomerAddEdit from './pages/customers/CustomerAddEdit';
import Employees from './pages/employees/Employees';
import EmployeeAddEdit from './pages/employees/EmployeeAddEdit';
import VendorAddEdit from './pages/vendors/VendorAddEdit';
import Vendors from './pages/vendors/Vendors';

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactHashRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <Route path="/" exact={true}>
              <Redirect to="/page/customers" />
            </Route>
            <Route path="/page/customers" exact={true}>
              <Customers/>
            </Route>
            <Route path="/page/customers/:id" exact={true}>
              <CustomerAddEdit/>
            </Route>
            <Route path="/page/employees" exact={true}>
              <Employees/>
            </Route>
            <Route path="/page/employees/:id" exact={true}>
              <EmployeeAddEdit/>
            </Route>
            <Route path="/page/vendors" exact={true}>
              <Vendors/>
            </Route>
            <Route path="/page/vendors/:id" exact={true}>
              <VendorAddEdit/>
            </Route>
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactHashRouter>
    </IonApp>
  );
};

export default App;
