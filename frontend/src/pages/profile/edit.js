import Head from "next/head";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useState } from "react"
import { useRouter } from "next/router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import moment from "moment";

export default function AccountEdit(){
    const router = useRouter()
    const [startDate, setStartDate] = useState(new Date(1995, 0, 1));

    const validationEdit = yup.object().shape({
      name: yup.string().required("Campo NOME é obrigatório!"),
      actual_password: yup.string().min(8, "Senha deve ter 8 caracteres!"),
      new_password: yup.string().min(8, "Senha deve ter 8 caracteres!"),
      confirmPassword: yup.string().oneOf([yup.ref("new_password"), null], "As senhas não são iguais!"),
      email: yup.string().email().required("Campo EMAIL é obrigatório!"),
    });
  
    async function handleClickEdit(dados) {
        const { ['mybookshelf-token']: token} = parseCookies();
        const dateFake = moment(startDate).format('DD/MM/YYYY')

        if(dados.actual_password){
            await axios.put("http://localhost:3030/u/profile/edit", {
                senhaAntiga: dados.actual_password,
                novaSenha: dados.new_password,
                nome: dados.name,
                email: dados.email,
                data_nascimento: dateFake,
            }, {
                headers: {
                    'Authorizathion': `Bearer ${token}` 
                }
            }).then((response) => {
                destroyCookie(undefined, 'mybookshelf-token');
                router.push('/')
                console.log(response.status)
            })
        }
        else{
            await axios.put("http://localhost:3030/u/profile/edit", {
                nome: dados.name,
                email: dados.email,
                data_nascimento: dateFake,
            }, {
                headers: {
                    'Authorizathion': `Bearer ${token}` 
                }
            }).then((response) => {
                router.push('/home');
                console.log(response.status)
            })
        }
     
    };
  
    function testDate() {
      startDate === null ? setStartDate(new Date(1995, 0, 1)) : startDate
    }
  
    return (
      <div className="pt-28 flex flex-col overflow-y-scroll items-stretch justify-between bg-romantic-1 min-h-screen">
        <Head>
          <title>MyBookshelf | Editar Perfil</title>
          <link rel="icon" href="/logo.png" />
        </Head>
        <div className="flex flex-col items-center mt-10">
          <Formik initialValues={{}} onSubmit={handleClickEdit} validationSchema={validationEdit}>
            <Form className="signup-form">
              <h1 className="signup-form-title">Editar Informações</h1>
              <div className="signup-form-group">
                <label className="signup-form-field-type">Nome:
                  <Field name="name" className="form-field" placeholder="Digite seu nome" />
                  <ErrorMessage component="span" name="name" className="form-error" />
                </label>
              </div>
              <div className="signup-form-group">
                <label className="signup-form-field-type">Email:
                  <Field name="email" className="form-field" placeholder="Digite seu email" />
                  <ErrorMessage component="span" name="email" className="form-error" />
                </label>
              </div>
              <div className="signup-form-group">
                <label className="signup-form-field-type">Senha Atual:
                  <Field type="password" name="actual_password" className="form-field" placeholder="Digite sua senha" />
                  <ErrorMessage component="span" name="actual_password" className="form-error" />
                </label>
              </div>
              <div className="signup-form-group">
                <label className="signup-form-field-type">Nova Senha:
                  <Field type="password" name="new_password" className="form-field" placeholder="Digite sua senha" />
                  <ErrorMessage component="span" name="new_password" className="form-error" />
                </label>
              </div>
              <div className="signup-form-group">
                <label className="signup-form-field-type">Confirmar Senha:
                  <Field type="password" name="confirmPassword" className="form-field" placeholder="Confirme sua senha" />
                  <ErrorMessage component="span" name="confirmPassword" className="form-error" />
                </label>
              </div>
              <div className="signup-form-group">
                <label className="signup-form-field-type">Data de nascimento:
                  <DatePicker showYearDropdown dropdownMode="select" name="birthdate" selected={startDate} onChange={(date) => setStartDate(date)} inline={false} dateFormat="dd/MM/yyyy" onClickOutside={testDate} onCalendarClose={testDate} />
                  <ErrorMessage component="span" name="birthdate" className="form-error" />
                </label>
              </div>
              <button className="button" type="submit">
                Confirmar Alterações
              </button>
  
            </Form>
          </Formik>
        </div>
      </div>
    )
}