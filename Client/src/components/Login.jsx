
import { Accordion, AccordionTab } from 'primereact/accordion';
import LoginManager from './LoginManager';
import LoginUser from './LoginUser';

export default function Login() {
  return (
    <Accordion activeIndex={0}>
      <AccordionTab header="User Login">
        <p className="m-0">
          <LoginUser/>
        </p>
      </AccordionTab>
      <AccordionTab header="Manager Login">
        <p className="m-0">
          <LoginManager/>
        </p>
      </AccordionTab>
    </Accordion>
  );
}
