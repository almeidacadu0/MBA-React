import { useEffect, useState } from 'react';
import Checkboxinput from './components/Checkboxinput';
import DateInput from './components/DateInput';
import Header from './components/Header';
import Main from './components/Main';
import OnlineOffline from './components/OnlineOffline';
import TextInput from './components/TextInput';
import Timer from './components/Timer';
import { getAgeFrom } from './helpers/dateHelpers';
import { getNewId } from './services/idService';
//import Test from './components/Test';

export default function App() {
  // const state = useState('Carlos');
  // const name = state[0];
  // const setName = state[1];

  const [name, setName] = useState('Carlos');
  const [birthDate, setBirthDate] = useState('1996-05-22');
  const [showTimer, setshowTimer] = useState(false);
  const [isOnline, setisOnline] = useState(true);

  useEffect(() => {
    document.title = name;
  }, [name]);

  useEffect(() => {
    function toggleOnline() {
      setisOnline(true);
    }
    function toggleOffline() {
      setisOnline(false);
    }
    window.addEventListener('online', toggleOnline);
    window.addEventListener('offline', toggleOffline);

    return () => {
      window.removeEventListener('online', toggleOnline);
      window.removeEventListener('offline', toggleOffline);
    };
  }, []);
  function handleNameChange(newName) {
    setName(newName);
  }

  function handleBirthDateChange(newBirthDate) {
    setBirthDate(newBirthDate);
  }
  function toggleShowTimer() {
    setshowTimer(currentShowTimer => !currentShowTimer);
  }

  return (
    <>
      <Header size="large"> Componente Header - projeto react-hello</Header>
      <Main>
        <OnlineOffline isOnline={isOnline} />
        {showTimer && (
          <div className="text-right mt-1">
            <Timer />
          </div>
        )}

        <Checkboxinput
          labelDescription="Mostrar cronômetro"
          onCheckboxChange={toggleShowTimer}
        />
        <TextInput
          id={getNewId()}
          labelDescription="Digite o seu nome:"
          inputValue={name}
          onInputChange={handleNameChange}
          autoFocus
        />
        <DateInput
          id={getNewId()}
          labelDescription="Digite a sua data de nascimento:"
          inputValue={birthDate}
          onInputChange={handleBirthDateChange}
        />
        <p>
          O seu nome é {name} , com caracteres {name.length}, e voce possui{' '}
          {getAgeFrom(birthDate)} anos
        </p>
      </Main>
    </>
  );
}
