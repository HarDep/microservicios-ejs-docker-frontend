import { IonButton, IonButtons, IonCard, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory, useParams } from 'react-router';
import '../Page.css';
import { checkmark } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { saveVendor, searchVendor } from './VendorApi';
import Vendor from './Vendor';

const VendorAddEdit: React.FC = () => {

  const { id } = useParams<{ id: string }>();
  const [vendor, setVendor] = useState<Vendor>({});
  const [isTouched, setIsTouched] = useState(false);
  const [isValid, setIsValid] = useState<boolean>();
  const history = useHistory();

  useEffect(()=>{
    search();
  },[history.location.pathname]);

  const search = async () => {
    let number = Number(id);
    if(!isNaN(number)){
      let data:Vendor = await searchVendor(number);
      setVendor(data);
    }
  };

  const validateEmail = (email: string) => {
    return email.match(
      /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    );
  };

  const validate = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value;
    vendor.email = value;
    setIsValid(undefined);
    if (value === '') return;
    validateEmail(value) !== null ? setIsValid(true) : setIsValid(false);
  };

  const markTouched = () => {
    setIsTouched(true);
  };

  const save = async () =>{
    await saveVendor(vendor);
    history.push('/page/vendors');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Proveedores</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{id=='new'? 'Agregar' : 'Editar'} proveedor</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonCard>
          <IonTitle size='large'>{id=='new'? 'Agregar' : 'Editar'} proveedor</IonTitle>

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
            onIonChange={e => vendor.name = String(e.detail.value)}
            value={vendor.name}
            counterFormatter={(inputLength, maxLength) => `${maxLength - inputLength} Caracteres disponibles`}
            ></IonInput>
            <br/>
            <IonInput
            id="lastName"
            label="Apellido"
            type='text'
            fill="solid"
            labelPlacement="floating"
            helperText="Ingrese el apellido"
            placeholder="Texto"
            onIonChange={e => vendor.lastName = String(e.detail.value)}
            value={vendor.lastName}
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
            placeholder="email@dominio.extension"
            helperText="Ingrese el email"
            errorText="Email invalido"
            value={vendor.email}
            onIonChange={e => vendor.email = String(e.detail.value)}
            onIonInput={(event) => validate(event)}
            onIonBlur={() => markTouched()}
            ></IonInput>
            <br/>
            <IonInput
            id="phone"
            label="Telefono"
            fill="solid"
            type='number'
            labelPlacement="floating"
            helperText="Ingrese el telefono"
            placeholder="888-888-8888"
            onIonChange={e => vendor.phone = String(e.detail.value)}
            value={vendor.phone}
            counter={true}
            maxlength={50}
            min={0}
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
            onIonChange={e => vendor.address = String(e.detail.value)}
            value={vendor.address}
            counter={true}
            maxlength={50}
            counterFormatter={(inputLength, maxLength) => `${maxLength - inputLength} Caracteres disponibles`}
            ></IonInput>
            <br/>
            <IonInput
            id="web"
            label="Web"
            fill="solid"
            type='text'
            labelPlacement="floating"
            helperText="Ingrese la direccion web"
            placeholder="dominio.extension"
            onIonChange={e => vendor.web = String(e.detail.value)}
            value={vendor.web}
            counter={true}
            maxlength={50}
            counterFormatter={(inputLength, maxLength) => `${maxLength - inputLength} Caracteres disponibles`}
            ></IonInput>
          </IonGrid>
          <IonItem>
            <IonButton onClick={save} disabled={false} color="success" fill='solid' slot='start' size='default'><IonIcon icon={checkmark}/>Guardar {id == 'new'? 'proveedor' : 'cambios'}</IonButton>
          </IonItem>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default VendorAddEdit;
