
# Déploiement Netlify - masanteprofessionnelle.com - ORIAS 14007177

## 1. Deploy
- Connecte ce dossier à Netlify : drag & drop sur app.netlify.com ou git push
- Netlify détecte netlify.toml automatiquement

## 2. Variables d'environnement Netlify (Site settings > Env vars)
TWILIO_ACCOUNT_SID=...
TWILIO_AUTH_TOKEN=...
TWILIO_FROM=+33...
BREVO_API_KEY=...
DATABASE_URL= (Supabase ou PlanetScale HDS - obligatoire pour données santé)
BLOBS_ENCRYPTION_KEY= (clé AES-256 pour chiffrement docs)

## 3. Règles à activer
- Dans Netlify > Identity : désactiver (on gère custom)
- Dans Netlify > Functions : vérifier Node 18

## 4. Validation téléphone OBLIGATOIRE (déjà codée)
Frontend : /^0[67][0-9]{8}$/ + maxlength 10
Backend : même regex + length check dans /netlify/functions/creer-espace.js

## 5. ORIAS 14007177 - Déjà intégré dans:
- public/index.html footer
- netlify.toml commentaires
- Toutes les functions : creer-espace.js, upload-document.js, transmettre-dossier.js
- Emails : sujet contient [ORIAS 14007177]
- SMS : corps contient ORIAS 14007177

## 6. RGPD & HDS
- Frontend Netlify OK pour site vitrine
- Données santé : NE PAS stocker dans Netlify Blobs seul
  -> Utiliser S3 HDS externe (OVH HDS ou Scaleway) pour /upload-document
  -> Chiffrement AES-256 avant envoi
- Mention footer obligatoire : "masanteprofessionnelle.com - ORIAS n°14007177"

## 7. Lien depuis page d'accueil existante
<a href="/espace-assure">Espace Assuré - Demande d'étude ORIAS 14007177</a>

## 8. Test
- Tester 06XXXXXXXX OK, 05XXXXXXXX KO, 06 12 34 KO, 06123456789 (11 chiffres) KO
- Tester double vérification code
- Tester confirmation d'envoi
