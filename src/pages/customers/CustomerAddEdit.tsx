import { IonButton, IonButtons, IonCard, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory, useParams, useRouteMatch } from 'react-router';
import '../Page.css';
import { checkmark } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { saveCustomer, searchCustomer } from './CustomerApi';
import Customer from './Customer';

const CustomerAddEdit: React.FC = () => {

  const { id } = useParams<{ id: string; }>()
  const [customer, setCustomer] = useState<Customer>({});
  const [isTouched, setIsTouched] = useState(false);
  const [isValid, setIsValid] = useState<boolean>();
  const history = useHistory();

  useEffect(()=>{
    search();
  },[history.location.pathname]);

  const search = async () => {
    let num = Number(id);
    if(!isNaN(num)){
      let data:Customer = await searchCustomer(num);
      setCustomer(data);
    }
  };

  const validateEmail = (email: string) => {
    return email.match(
      /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    );
  };

  const validate = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value;
    customer.email = value;
    setIsValid(undefined);
    if (value === '') return;
    validateEmail(value) !== null ? setIsValid(true) : setIsValid(false);
  };

  const markTouched = () => {
    setIsTouched(true);
  };

  const save = async () =>{
    await saveCustomer(customer);
    history.push('/page/customers');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Clientes</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{id=='new'? 'Agregar' : 'Editar'} cliente</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonCard>
          <IonTitle size='large'>{id=='new'? 'Agregar' : 'Editar'} cliente</IonTitle>

          <IonGrid>
            <IonInput
            id="name"
            label="Nombre"
            fill="solid"
            type='text'
            labelPlacement="floating"
            helperText="Ingrese el nombre"
            placeholder="Texto"
            counter={true}
            maxlength={50}
            onIonChange={e => customer.name = String(e.detail.value)}
            value={customer.name}
            counterFormatter={(inputLength, maxLength) => `${maxLength - inputLength} Caracteres disponibles`}
            ></IonInput>
            <br/>
            <IonInput
            id="lastName"
            label="Apellido"
            fill="solid"
            type='text'
            labelPlacement="floating"
            helperText="Ingrese el apellido"
            placeholder="Texto"
            onIonChange={e => customer.lastName = String(e.detail.value)}
            value={customer.lastName}
            counter={true}
            maxlength={50}
            counterFormatter={(inputLength, maxLength) => `${maxLength - inputLength} Caracteres disponibles`}
            ></IonInput>
            <br/>
            <IonInput
            className={`${isValid && 'ion-valid'} ${isValid === false && 'ion-invalid'} ${isTouched && 'ion-touched'}`}
            type="email"
            fill="solid"
            label="Email"
            labelPlacement="floating"
            placeholder="email@dominio.com"
            helperText="Ingrese el email"
            errorText="Email invalido"
            value={customer.email}
            onIonChange={e => customer.email = String(e.detail.value)}
            onIonInput={(event) => validate(event)}
            onIonBlur={() => markTouched()}
            ></IonInput>
            <br/>
            <IonInput
            id="phone"
            type='number'
            label="Telefono"
            fill="solid"
            labelPlacement="floating"
            helperText="Ingrese el telefono"
            placeholder="888-888-8888"
            onIonChange={e => customer.phone = String(e.detail.value)}
            value={customer.phone}
            counter={true}
            min={0}
            maxlength={50}
            counterFormatter={(inputLength, maxLength) => `${maxLength - inputLength} Caracteres disponibles`}
            ></IonInput>
            <br/>
            <IonInput
            id="address"
            label="Direccion"
            fill="solid"
            type='text'
            labelPlacement="floating"
            helperText="Ingrese la direccion"
            placeholder="Cra/Cll -- # --  --"
            onIonChange={e => customer.address = String(e.detail.value)}
            value={customer.address}
            counter={true}
            maxlength={50}
            counterFormatter={(inputLength, maxLength) => `${maxLength - inputLength} Caracteres disponibles`}
            ></IonInput>
          </IonGrid>
          <IonItem>
            <IonButton onClick={save} disabled={false} color="success" fill='solid' slot='start' size='default'><IonIcon icon={checkmark}/>Guardar {id == 'new'? 'cliente' : 'cambios'}</IonButton>
          </IonItem>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default CustomerAddEdit;
