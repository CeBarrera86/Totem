// Configuración de seguridad y firma para QZ Tray
import qz from 'qz-tray';

import { QZ_CERTIFICATE, QZ_PRIVATE_KEY } from '@/config/qzCerts';

const pemToArrayBuffer = (pem: string, label: string) => {
  const b64 = pem
    .replace(`-----BEGIN ${label}-----`, '')
    .replace(`-----END ${label}-----`, '')
    .replace(/\s/g, '');
  const binary = atob(b64);
  const buffer = new ArrayBuffer(binary.length);
  const view = new Uint8Array(buffer);
  for (let i = 0; i < binary.length; i++) {
    view[i] = binary.charCodeAt(i);
  }
  return buffer;
};

const signData = async (toSign: string): Promise<string> => {
  const keyBuffer = pemToArrayBuffer(QZ_PRIVATE_KEY, 'PRIVATE KEY');
  const cryptoKey = await window.crypto.subtle.importKey(
    'pkcs8',
    keyBuffer,
    { name: 'RSASSA-PKCS1-v1_5', hash: { name: 'SHA-1' } },
    false,
    ['sign']
  );
  const encoder = new TextEncoder();
  const signature = await window.crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    cryptoKey,
    encoder.encode(toSign)
  );
  return btoa(String.fromCharCode(...new Uint8Array(signature)));
};

export function setupQzSecurity() {
  qz.security.setCertificatePromise(
    (resolve: (cert: string) => void) => resolve(QZ_CERTIFICATE)
  );
  qz.security.setSignaturePromise(
    (toSign: string) =>
      (resolve: (sig: string) => void, reject: (err: Error) => void) => {
        signData(toSign).then(resolve).catch(reject);
      }
  );
}
