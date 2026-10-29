
// netlify/functions/creer-espace.js
// ORIAS 14007177 - masanteprofessionnelle.com
// Validation téléphone obligatoire 06/07 10 chiffres
exports.handler = async (event) => {
  const TEL_REGEX = /^0[67][0-9]{8}$/;
  try {
    const { email, password, telephone, rgpd } = JSON.parse(event.body);
    
    if (!rgpd) return { statusCode: 400, body: JSON.stringify({error: "RGPD obligatoire"}) };
    if (!telephone || telephone.length !== 10) return { statusCode: 400, body: JSON.stringify({error: "Téléphone doit contenir exactement 10 chiffres"}) };
    if (!TEL_REGEX.test(telephone)) return { statusCode: 400, body: JSON.stringify({error: "Téléphone invalide : doit commencer par 06 ou 07"}) };
    
    // Ici : hash password bcrypt + sauvegarde Supabase/PlanetScale HDS
    // Génération code 2FA
    const code = Math.floor(100000 + Math.random()*900000);
    
    // Envoi SMS via Twilio (clé dans Netlify env)
    // await twilioClient.messages.create({ body: `masantepro ORIAS 14007177 : code ${code} expire 5min`, to: '+33'+telephone.slice(1) })
    
    // Envoi Email via Brevo avec ORIAS
    // subject: `[masanteprofessionnelle.com - ORIAS 14007177] Votre code`

    return { statusCode: 200, body: JSON.stringify({ ok: true, message: "Code 2FA envoyé", orias: "14007177" }) };
  } catch(e){
    return { statusCode: 500, body: JSON.stringify({error: e.message}) };
  }
};
