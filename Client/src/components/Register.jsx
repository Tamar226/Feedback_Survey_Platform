/*//FIXME:
 * לדאוג שיחזור אותו דבר בכניסה חדשה ובהתחברות של משתמש קיים
 */

import { Accordion, AccordionTab } from 'primereact/accordion';
import RegisterManager from './RegisterManager';
import RegisterUser from './RegisterUser';
export default function Register() {
  return (
    <>
      <Accordion activeIndex={0}>
        <AccordionTab header="User Register">
          <p className="m-0">
            <RegisterUser />
          </p>
        </AccordionTab>
        <AccordionTab header="Manager Register">
          <p className="m-0">
            <RegisterManager />
          </p>
        </AccordionTab>
      </Accordion>
    </>
  );
}

