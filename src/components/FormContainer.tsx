import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ProgressIndicator } from './ProgressIndicator';

interface FormContainerProps {
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
  title: string;
  subtitle?: string;
  maklerName?: string;
}

export const FormContainer: React.FC<FormContainerProps> = ({
  children,
  currentStep,
  totalSteps,
  title,
  subtitle,
  maklerName,
}) => {
  const [showImpressum, setShowImpressum] = useState(false);
  const [showDatenschutz, setShowDatenschutz] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 relative">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-success-600 bg-clip-text text-transparent mb-2"
          >
            Immobilien-Bewertungstool
            {maklerName && (
              <>
                <br />
                <span className="text-xl font-medium">{`von ${maklerName}`}</span>
              </>
            )}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg"
          >
            Erhalten Sie eine professionelle Erstbewertung Ihrer Immobilie
          </motion.p>
        </div>

        {/* Progress */}
        <div className="max-w-md mx-auto mb-8">
          <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />
        </div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="max-w-2xl mx-auto"
        >
          <div className="step-card">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                {title}
              </h2>
              {subtitle && (
                <p className="text-muted-foreground text-lg mb-8">{subtitle}</p>
              )}

              <div className="animate-fade-in-up">{children}</div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Impressum Link unten rechts */}
      <button
        onClick={() => setShowImpressum(true)}
        className="fixed bottom-4 right-4 bg-white border border-gray-200 rounded-xl shadow-md px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 transition z-50"
        aria-label="Impressum anzeigen"
      >
        Impressum
      </button>
      <button
        onClick={() => setShowDatenschutz(true)}
        className="bg-white border border-gray-200 rounded-xl shadow-md px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 transition"
        aria-label="Datenschutz anzeigen"
      >
        Datenschutz
      </button>

      {/* Impressum Modal */}
      {/* Impressum Modal */}
{showImpressum && (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
    <div className="bg-white rounded-2xl shadow-xl p-6 max-w-lg w-full relative overflow-y-auto max-h-[90vh]">
      <button
        className="absolute top-2 right-3 text-gray-400 hover:text-gray-600 text-xl"
        onClick={() => setShowImpressum(false)}
        aria-label="Impressum schließen"
      >
        &times;
      </button>
      <h2 className="text-xl font-bold mb-2">Impressum</h2>
      <p className="mb-1 font-semibold">Angaben gemäß § 5 TMG:</p>
      <p>
        Mike Mildenberger<br />
        Rosenweg 21<br />
        53604 Bad Honnef<br />
        Deutschland
      </p>
      <p className="mt-2">
        Telefon: 0173 8376392<br />
        E-Mail: mike@nocodestud.io<br />
      </p>
      <p className="mt-2">
        Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:<br />
        Mike Mildenberger, Rosenweg 21, 53604 Bad Honnef
      </p>
      <p className="mt-4 font-semibold">Haftungsausschluss:</p>
      <p>
        Trotz sorgfältiger inhaltlicher Kontrolle übernehme ich keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.
      </p>
      <p className="mt-4 font-semibold">Online-Streitbeilegung:</p>
      <p>
        Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
        <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="underline text-blue-600">
          https://ec.europa.eu/consumers/odr/
        </a>
        <br />
        Ich bin weder verpflichtet noch bereit, an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
      </p>
    </div>
  </div>
)}

{/* Datenschutz Modal */}
{showDatenschutz && (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
    <div className="bg-white rounded-2xl shadow-xl p-6 max-w-lg w-full relative overflow-y-auto max-h-[90vh]">
      <button
        className="absolute top-2 right-3 text-gray-400 hover:text-gray-600 text-xl"
        onClick={() => setShowDatenschutz(false)}
        aria-label="Datenschutz schließen"
      >
        &times;
      </button>
      <h2 className="text-xl font-bold mb-2">Datenschutzerklärung</h2>
      <p className="font-semibold mt-2 mb-1">1. Verantwortlicher</p>
      <p>
        Mike Mildenberger<br />
        Rosenweg 21<br />
        53604 Bad Honnef<br />
        E-Mail: mike@nocodestud.io<br />
        Telefon: 0173 8376392
      </p>
      <p className="font-semibold mt-4 mb-1">2. Allgemeine Hinweise zur Datenverarbeitung</p>
      <p>
        Der Schutz Ihrer persönlichen Daten ist mir wichtig. Ich verarbeite Ihre Daten ausschließlich auf Grundlage der gesetzlichen Bestimmungen (DSGVO, BDSG, TMG).
        Nachfolgend informiere ich Sie über die wichtigsten Aspekte der Datenverarbeitung im Rahmen dieser Web-App.
      </p>
      <p className="font-semibold mt-4 mb-1">3. Erhebung und Speicherung personenbezogener Daten</p>
      <p>
        Bei Nutzung der Bewertungs-Webapp werden keine personenbezogenen Daten wie Name, E-Mail-Adresse oder Telefonnummer erhoben.
        Es werden ausschließlich objektbezogene Daten (z.B. Lage, Größe, Baujahr, Ausstattung einer Immobilie) zur Durchführung der Bewertung verarbeitet.
      </p>
      <p className="font-semibold mt-4 mb-1">4. Server-Logfiles</p>
      <p>
        Beim Aufruf dieser Webseite werden durch den Hosting-Provider automatisch Informationen erfasst, die Ihr Browser übermittelt (sog. Server-Logfiles). Diese Informationen sind:
        <ul className="list-disc ml-5">
          <li>Browsertyp und Browserversion</li>
          <li>verwendetes Betriebssystem</li>
          <li>Referrer URL</li>
          <li>Hostname des zugreifenden Rechners</li>
          <li>Uhrzeit der Serveranfrage</li>
          <li>IP-Adresse (gekürzt und nicht direkt zuordenbar)</li>
        </ul>
        Diese Daten werden ausschließlich zur Sicherstellung eines störungsfreien Betriebs der Seite und zur Verbesserung meines Angebots ausgewertet und erlauben mir keinen Rückschluss auf Ihre Person.
      </p>
      <p className="font-semibold mt-4 mb-1">5. Cookies</p>
      <p>
        Die Webseite verwendet ausschließlich technisch notwendige Cookies, die für den Betrieb und die Funktionalität der Seite erforderlich sind. Es werden keine Tracking-Cookies oder Marketing-Cookies eingesetzt.
      </p>
      <p className="font-semibold mt-4 mb-1">6. Nutzung und Weitergabe der Daten</p>
      <p>
        Die im Rahmen der Bewertung eingegebenen Objektdaten werden ausschließlich zur Berechnung und Anzeige des Ergebnisses genutzt. Eine Weitergabe an Dritte erfolgt nicht.
      </p>
      <p className="font-semibold mt-4 mb-1">7. Ihre Rechte</p>
      <p>
        Sie haben das Recht auf Auskunft über die von Ihnen gespeicherten Daten sowie ggf. das Recht auf Berichtigung, Löschung, Einschränkung der Verarbeitung und Datenübertragbarkeit.
        Wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer Daten gegen das Datenschutzrecht verstößt oder Ihre datenschutzrechtlichen Ansprüche in sonst einer Weise verletzt worden sind,
        können Sie sich bei der zuständigen Aufsichtsbehörde beschweren.
      </p>
      <p className="font-semibold mt-4 mb-1">8. Kontakt</p>
      <p>
        Für Fragen zum Datenschutz können Sie mich jederzeit kontaktieren:<br />
        Mike Mildenberger, Rosenweg 21, 53604 Bad Honnef<br />
        E-Mail: mike@nocodestud.io
      </p>
      <p className="font-semibold mt-4 mb-1">9. Änderungen dieser Datenschutzerklärung</p>
      <p>
        Ich behalte mir vor, diese Datenschutzerklärung bei Bedarf anzupassen, um sie an aktuelle rechtliche Anforderungen oder Änderungen im Angebot anzupassen.
      </p>
    </div>
  </div>
)}

    </div>
  );
};
