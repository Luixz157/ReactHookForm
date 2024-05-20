//Importante se qualquer coisa estiver escrito errado não irá rodar
import { useState } from 'react';
import { useForm } from 'react-hook-form'//Biblioteca Hook
import {yupResolver} from '@hookform/resolvers/yup' //Biblioteca yup
import * as yup from 'yup'//Importar tudo do Yup * tudo que eu chamar vai para variavel yup

import styles from './form.module.css'

//Schema
const schema = yup.object({
  nome: yup.string().required('Nome obrigatório'), //Nome é uma string e é obrigatorio, não esquecer da ,,,,,,
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatoria').min(6, 'No mínimo 6 caracteres'),
  password_confirmation: yup.string().oneOf([
    null, yup.ref('password')
  ], 'As senha precisam ser iguais')
}).required();

function App() {

  const [isSuccess, setisSuccess] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = () => {
    setisSuccess(true)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.contentForm} action='https://formsubmit.co/luiz.antoniodesouza004@gmail.com' method="POST">
      <div className={styles.formGroup}>
        <input 
        type="text"
        placeholder="Insira seu nome" 
        {...register("nome")}
        className={(errors.nome) ? `${styles.inputError}` : ''}
        />
        <span className={styles.labelError}>{errors.nome?.message}</span>
      </div>
      <div className={styles.formGroup}>
        <input 
        type="email"
        placeholder="Insira seu e-mail" 
        {...register("email")}
        className={(errors.email) ? `${styles.inputError}` : ''}
        />
        <span className={styles.labelError}>{errors.email?.message}</span>
      </div>
      <div className={styles.formGroup}>
        <input 
        type="password"
        placeholder="Insira sua senha" 
        {...register("password")}
        className={(errors.password) ? `${styles.inputError}` : ''}
        />
        <span className={styles.labelError}>{errors.password?.message}</span>
      </div>
      <div className={styles.formGroup}>
        <input 
        type="password"
        placeholder="Confirme sua senha" 
        {...register("password_confirmation")}
        className={(errors.password_confirmation) ? `${styles.inputError}` : ''}
        />
        <span className={styles.labelError}>{errors.password_confirmation?.message}</span>
      </div>

      <button type="submit">Enviar formulário</button>

      {
        isSuccess && <p>*Formulario enviado com sucesso!</p>
      }
    </form>
  )
}

export default App
