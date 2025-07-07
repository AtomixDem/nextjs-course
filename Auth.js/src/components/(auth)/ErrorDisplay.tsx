'use client';
import { useSearchParams } from 'next/navigation';

export const ErrorDisplay = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  if (!error) return null;
  
    let message = '';
    switch (error) {
      case 'already_exists':
        message = 'Questo account esiste già. Prova a fare il login.';
        break;
      case 'invalid_credentials':
        message = 'Oops! Credenziali non valide, riprova.';
        break;
      case "email_exists":
        message = "Questa email è già in uso con un altro metodo di accesso.";
        break;
      case 'use_github':
        message = 'Ci dispiace, prova a fare il login con GitHub.';
        break;
      case 'invalid_email':
        message = 'Per favore, inserisci un indirizzo email valido.';
        break;
      case 'wrong_provider':
        message = 'Questo account utilizza un altro metodo di accesso (es. GitHub).';
        break;
      case 'login_failed':
        message = 'Ci dispiace, si è verificato un errore durante il login.';
        break;
      case 'generic':
        message = 'Ci dispiace, si è verificato un errore. Riprova.';
        break;
      default:
        message = 'Ci dispiace, abbiamo riscontrato un errore sconosciuto.';
    }

    return (
      <div className="bg-red-100 text-red-700 p-2 rounded text-center">
        {message}
      </div>
    );
};