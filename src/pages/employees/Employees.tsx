import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory } from 'react-router';
import '../Page.css';
import { add, close, pencil } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { removeEmployee, searchEmployees } from './EmployeeApi';
import Employee from './Employee';

const Employees: React.FC = () => {

  const [ employees, setEmployees ] = useState<Employee[]>([]);
  const history = useHistory();

  useEffect(()=>{
    search();
  },[history.location.pathname]);

  const search = async () => {
    let data = await searchEmployees();
    setEmployees(data);
  };

  const deleteEmployee = async (id:any) =>{
    await removeEmployee(id);
    search();
  };

  const addEditEmployee = (id:any) => {
    history.push('/page/employees/' + id);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Empleados</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Empleados</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonCard>
          <IonTitle size='large'>Gestion de empleados</IonTitle>
          <IonGrid className='table'>
            <IonRow key='a'>
              <IonCol size="6" size-md="4" size-lg="2">Nombre</IonCol>
              <IonCol size="6" size-md="4" size-lg="2">Email</IonCol>
              <IonCol size="6" size-md="4" size-lg="2">Telefono</IonCol>
              <IonCol size="6" size-md="4" size-lg="2">Direccion</IonCol>
              <IonCol size="6" size-md="4" size-lg="2">Acciones</IonCol>
            </IonRow>
            {employees.map((employee: Employee) => 
              <IonRow key={'b' + employee.id}>
                <IonCol size="6" size-md="4" size-lg="2">{employee.name} {employee.lastName}</IonCol>
                <IonCol size="6" size-md="4" size-lg="2">{employee.email}</IonCol>
                <IonCol size="6" size-md="4" size-lg="2">{employee.phone}</IonCol>
                <IonCol size="6" size-md="4" size-lg="2">{employee.address}</IonCol>
                <IonCol size="6" size-md="4" size-lg="2">
                  <IonButton onClick={() => addEditEmployee(employee.id)} size="small" size-md="4" size-lg="2" color="primary" fill='solid'><IonIcon icon={pencil}/>Editar</IonButton>
                  <IonButton onClick={() => deleteEmployee(employee.id)} size="small" size-md="4" size-lg="2" color="danger" fill='solid'><IonIcon icon={close}/>Eliminar</IonButton>
                </IonCol>
              </IonRow>
            )}
          </IonGrid>
          <IonItem>
            <IonButton onClick={() => addEditEmployee('new')} color="primary" fill='solid' slot='start' size='default'><IonIcon icon={add}/>Agregar empleado</IonButton>
          </IonItem>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Employees;
