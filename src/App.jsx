// Importar as dependências necessárias
import { useState } from 'react';
import { useForm } from 'react-hook-form'; // Biblioteca react-hook-form
import { yupResolver } from '@hookform/resolvers/yup'; // Resolver do Yup para validação
import * as yup from 'yup'; // Biblioteca Yup para validação de schemas
import styles from './form.module.css'; // Importar o CSS module

// Definição do esquema de validação com o Yup
const schema = yup.object({
  nome: yup.string().required('Nome obrigatório'),
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup
    .string()
    .required('Senha obrigatória')
    .min(6, 'No mínimo 6 caracteres'),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'As senhas precisam ser iguais')
}).required();

function App() {
  // Estado para controlar se o envio foi bem-sucedido
  const [isSuccess, setIsSuccess] = useState(false);

  // Configuração do hook useForm com a validação do schema Yup
  const {
    register, // Função para registrar campos do formulário
    handleSubmit, // Função que lida com o envio do formulário
    formState: { errors } // Erros de validação do formulário
  } = useForm({
    resolver: yupResolver(schema) // Resolver utilizando o schema do Yup
  });

  // Função chamada no envio bem-sucedido do formulário
  const onSubmit = () => {
    setIsSuccess(true); // Atualiza o estado para indicar sucesso no envio
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)} // Lida com o envio
      className={styles.contentForm} // Estilo do formulário
      action="https://formsubmit.co/luiz.antoniodesouza004@gmail.com" // Destino do formulário
      method="POST" // Método de envio
    >
      {/* Campo de entrada para o nome */}
      <div className={styles.formGroup}>
        <input
          type="text"
          placeholder="Insira seu nome"
          {...register('nome')}
          className={errors.nome ? styles.inputError : ''} // Aplica estilo de erro, se houver
        />
        <span className={styles.labelError}>{errors.nome?.message}</span> {/* Exibe mensagem de erro */}
      </div>

      {/* Campo de entrada para o e-mail */}
      <div className={styles.formGroup}>
        <input
          type="email"
          placeholder="Insira seu e-mail"
          {...register('email')}
          className={errors.email ? styles.inputError : ''} // Aplica estilo de erro, se houver
        />
        <span className={styles.labelError}>{errors.email?.message}</span> {/* Exibe mensagem de erro */}
      </div>

      {/* Campo de entrada para a senha */}
      <div className={styles.formGroup}>
        <input
          type="password"
          placeholder="Insira sua senha"
          {...register('password')}
          className={errors.password ? styles.inputError : ''} // Aplica estilo de erro, se houver
        />
        <span className={styles.labelError}>{errors.password?.message}</span> {/* Exibe mensagem de erro */}
      </div>

      {/* Campo de entrada para confirmação da senha */}
      <div className={styles.formGroup}>
        <input
          type="password"
          placeholder="Confirme sua senha"
          {...register('password_confirmation')}
          className={errors.password_confirmation ? styles.inputError : ''} // Aplica estilo de erro, se houver
        />
        <span className={styles.labelError}>
          {errors.password_confirmation?.message}
        </span> {/* Exibe mensagem de erro */}
      </div>

      {/* Botão de envio */}
      <button type="submit">Enviar formulário</button>

      {/* Exibe mensagem de sucesso após envio */}
      {isSuccess && <p>* Formulário enviado com sucesso!</p>}
    </form>
  );
}

export default App;
