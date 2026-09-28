/* ============================================================
   CLUBE DO CARDÁPIO: CONFIGURAÇÃO CENTRAL
   ------------------------------------------------------------
   Este é o ÚNICO arquivo que precisa ser editado para trocar
   links de compra, preços, contatos e códigos de medição.

   Como editar:
   - Troque o texto entre aspas; mantenha as aspas e as vírgulas.
   - Um campo vazio ("") aparece no site como [PREENCHER]
     e bloqueia a publicação até ser preenchido.
   - NUNCA coloque senhas ou chaves secretas aqui: este arquivo
     é público.
   ============================================================ */

window.CC_CONFIG = {

  /* ---- Empresa e contato (rodapé, termos, política) ---- */
  empresa: {
    razaoSocial: "BESILVA COMERCIO DE PRODUTOS E UTENSILIOS LTDA - EPP",
    cnpj: "29.164.635/0001-06",
    endereco: "Avenida Paulista, 1636, Sala 1105/2751 - Bela Vista, São Paulo - SP, CEP 01310-200",
    email: "contato@clubedocardapio.com.br",
    whatsapp: "5511986276303", // só números com DDI e DDD
    whatsappExibicao: "(11) 98627-6303",
    instagram: "clubedocardapio", // sem @
  },

  /* ---- Responsável técnica ---- */
  rita: {
    nome: "Rita Magalhães",
    crn: "",                   // ex.: "CRN-3 00000"
  },

  /* ---- Produtos (links de checkout da Eduzz e preços) ----
     preco: valor exibido, ex.: "R$ 27,00"
     precoDe: preço riscado (opcional; deixe "" para não mostrar)
     parcelas: texto opcional, ex.: "ou 3x de R$ 9,90"
  */
  produtos: {
    "idosos-7":    { nome: "Cardápio Digital de 7 Dias · Para Idosos",                       checkout: "", preco: "", precoDe: "", parcelas: "" },
    "idosos-30":   { nome: "Assinatura de Cardápio Digital de 30 Dias · Para Idosos",        checkout: "", preco: "", precoDe: "", parcelas: "" },
    "familias-7":  { nome: "Cardápio Digital de 7 Dias · Para Famílias",                     checkout: "", preco: "", precoDe: "", parcelas: "" },
    "familias-30": { nome: "Assinatura de Cardápio Digital de 30 Dias · Para Famílias",      checkout: "", preco: "", precoDe: "", parcelas: "" },
    "voce-7":      { nome: "Cardápio Digital de 7 Dias · Para Você",                         checkout: "", preco: "", precoDe: "", parcelas: "" },
    "voce-30":     { nome: "Assinatura de Cardápio Digital de 30 Dias · Para Você", checkout: "", preco: "", precoDe: "", parcelas: "" },
  },

  /* ---- Condições da assinatura de 30 dias (FAQ e oferta) ---- */
  assinatura: {
    renovacao: "A assinatura renova automaticamente a cada 30 dias, com mais 4 semanas de cardápio.",
    cancelamento: "Cancele quando quiser pela área do cliente da Eduzz, sem multa.",
  },

  /* ---- Medição (só carrega depois que o visitante aceita cookies) ---- */
  medicao: {
    ga4: "",                   // ex.: "G-XXXXXXXXXX"
    metaPixel: "",             // ex.: "123456789012345"
  },
};
