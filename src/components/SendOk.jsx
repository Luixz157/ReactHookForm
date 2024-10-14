import React from 'react';
import styles from './send.module.css'; // Suponho que você tenha um arquivo CSS para estilizar este componente

function SendOk({ email }) {
  return (
    <div className={styles.successMessage}>
      <h2>Formulário Enviado com Sucesso!</h2>
      <p>Uma confirmação foi enviada para o e-mail: <strong>{email}</strong></p>
    </div>
  );
}

export default SendOk;
