import { MessageCircle } from "lucide-react";

export function WhatsAppFloat() {
  return (
    <a
      href="https://api.whatsapp.com/send/?phone=5511915610022&text=Ol%C3%A1+Maur%C3%ADcio%2C+quero+aplicar+a+Mentoria+M.A.T.I.L.H.A.+no+meu+neg%C3%B3cio.&type=phone_number&app_absent=0"
      target="_blank"
      rel="noreferrer"
      aria-label="Conversar pelo WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-all duration-300 hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#25D366] sm:bottom-6 sm:right-6"
    >
      <MessageCircle className="h-7 w-7 fill-current" strokeWidth={1.5} />
    </a>
  );
}
