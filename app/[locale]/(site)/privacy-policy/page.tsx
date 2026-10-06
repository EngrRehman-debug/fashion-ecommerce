import LegalPage, { type LegalSection } from "@/components/LegalPage";
import type { Locale } from "@/lib/i18n/config";
import { initLocale, type LocaleParams } from "@/lib/i18n/server";
import { rich } from "@/lib/i18n/rich";
import { pageMetadata } from "@/lib/seo";
import { BRAND_NAME, COMPANY_NO, WHATSAPP_DISPLAY } from "@/lib/site";

const UPDATED = "2026-09-28";

const CONTENT: Record<Locale, { name: string; eyebrow: string; title: string; description: string; sections: LegalSection[] }> = {
  en: {
    name: "Privacy Policy",
    eyebrow: "Your data",
    title: "Privacy *Policy*",
    description: `How ${BRAND_NAME} collects, uses and protects your personal data when you browse our site and order on WhatsApp, in line with Malaysia's Personal Data Protection Act 2010.`,
    sections: [
      {
        id: "who-we-are",
        title: "Who we are",
        body: (
          <p>
            This website is operated by {BRAND_NAME} ({COMPANY_NO}), a business registered in
            Malaysia. We are responsible for the personal data you share with us. You can reach us
            on WhatsApp at {WHATSAPP_DISPLAY}.
          </p>
        ),
      },
      {
        id: "what-we-collect",
        title: "What we collect",
        body: (
          <>
            <p>We only collect what we need to fulfil your order and answer your questions:</p>
            <ul>
              <li><strong>Order details</strong> — the items, options, sizes and quantities you choose.</li>
              <li><strong>Contact and delivery details</strong> — your name, phone number and delivery address, entered at checkout.</li>
              <li><strong>Messages</strong> — anything you send us on WhatsApp, including payment receipts.</li>
            </ul>
            <p>We do not ask for or store card or bank details on this website.</p>
          </>
        ),
      },
      {
        id: "on-your-device",
        title: "Data stored on your device",
        body: (
          <>
            <p>
              Your cart, the details you enter at checkout and your language choice are saved in your
              browser, on your own device, so they are still there when you come back. This data is
              not sent to our servers, except the language choice, which is used only to show the
              site in your language.
            </p>
            <p>
              You can clear it at any time by emptying your cart or clearing your browser’s site
              data. We do not use advertising or tracking cookies.
            </p>
          </>
        ),
      },
      {
        id: "how-we-use",
        title: "How we use your data",
        body: (
          <ul>
            <li>To confirm, process, ship and support your order.</li>
            <li>To contact you on WhatsApp about your order, payment or delivery.</li>
            <li>To send you new-arrival updates, only if you ask to join our list.</li>
            <li>To meet our legal and accounting obligations.</li>
          </ul>
        ),
      },
      {
        id: "sharing",
        title: "Who we share it with",
        body: (
          <p>
            We share your name, phone number and address only with the courier delivering your
            order. Your order reaches us through WhatsApp, which processes messages under its own
            privacy policy. We never sell your personal data.
          </p>
        ),
      },
      {
        id: "retention",
        title: "How long we keep it",
        body: (
          <p>
            We keep order records for as long as needed to provide after-sales support and to
            meet legal and tax requirements, after which they are deleted.
          </p>
        ),
      },
      {
        id: "your-rights",
        title: "Your rights",
        body: (
          <p>
            Under the Personal Data Protection Act 2010 you may ask to access, correct or delete
            the personal data we hold about you, or withdraw consent to marketing messages. Message
            us on WhatsApp at {WHATSAPP_DISPLAY} and we will respond promptly.
          </p>
        ),
      },
      {
        id: "changes",
        title: "Changes to this policy",
        body: <p>We may update this policy from time to time. The date at the top shows when it last changed.</p>,
      },
    ],
  },

  ms: {
    name: "Dasar Privasi",
    eyebrow: "Data anda",
    title: "Dasar *Privasi*",
    description: `Cara ${BRAND_NAME} mengumpul, menggunakan dan melindungi data peribadi anda semasa anda melayari laman kami dan membuat pesanan di WhatsApp, selaras dengan Akta Perlindungan Data Peribadi 2010 Malaysia.`,
    sections: [
      {
        id: "who-we-are",
        title: "Siapa kami",
        body: (
          <p>
            Laman web ini dikendalikan oleh {BRAND_NAME} ({COMPANY_NO}), sebuah perniagaan yang
            berdaftar di Malaysia. Kami bertanggungjawab ke atas data peribadi yang anda kongsikan
            dengan kami. Anda boleh menghubungi kami di WhatsApp {WHATSAPP_DISPLAY}.
          </p>
        ),
      },
      {
        id: "what-we-collect",
        title: "Apa yang kami kumpul",
        body: (
          <>
            <p>Kami hanya mengumpul apa yang diperlukan untuk memenuhi pesanan dan menjawab soalan anda:</p>
            <ul>
              <li><strong>Butiran pesanan</strong> — item, pilihan, saiz dan kuantiti yang anda pilih.</li>
              <li><strong>Butiran hubungan dan penghantaran</strong> — nama, nombor telefon dan alamat penghantaran anda, yang dimasukkan semasa daftar keluar.</li>
              <li><strong>Mesej</strong> — apa sahaja yang anda hantar kepada kami di WhatsApp, termasuk resit pembayaran.</li>
            </ul>
            <p>Kami tidak meminta atau menyimpan butiran kad atau bank di laman web ini.</p>
          </>
        ),
      },
      {
        id: "on-your-device",
        title: "Data yang disimpan pada peranti anda",
        body: (
          <>
            <p>
              Troli anda, butiran yang anda masukkan semasa daftar keluar dan pilihan bahasa anda
              disimpan dalam pelayar, pada peranti anda sendiri, supaya ia masih ada apabila anda
              kembali. Data ini tidak dihantar ke pelayan kami, kecuali pilihan bahasa, yang hanya
              digunakan untuk memaparkan laman dalam bahasa anda.
            </p>
            <p>
              Anda boleh memadamnya pada bila-bila masa dengan mengosongkan troli atau memadam data
              laman dalam pelayar anda. Kami tidak menggunakan kuki pengiklanan atau penjejakan.
            </p>
          </>
        ),
      },
      {
        id: "how-we-use",
        title: "Cara kami menggunakan data anda",
        body: (
          <ul>
            <li>Untuk mengesahkan, memproses, menghantar dan menyokong pesanan anda.</li>
            <li>Untuk menghubungi anda di WhatsApp tentang pesanan, bayaran atau penghantaran anda.</li>
            <li>Untuk menghantar maklumat koleksi terbaru, hanya jika anda meminta untuk menyertai senarai kami.</li>
            <li>Untuk memenuhi kewajipan undang-undang dan perakaunan kami.</li>
          </ul>
        ),
      },
      {
        id: "sharing",
        title: "Dengan siapa kami berkongsi",
        body: (
          <p>
            Kami berkongsi nama, nombor telefon dan alamat anda hanya dengan syarikat kurier yang
            menghantar pesanan anda. Pesanan anda sampai kepada kami melalui WhatsApp, yang
            memproses mesej di bawah dasar privasinya sendiri. Kami tidak sekali-kali menjual data
            peribadi anda.
          </p>
        ),
      },
      {
        id: "retention",
        title: "Berapa lama kami menyimpannya",
        body: (
          <p>
            Kami menyimpan rekod pesanan selama yang diperlukan untuk memberikan sokongan selepas
            jualan dan memenuhi keperluan undang-undang dan cukai, selepas itu ia akan dipadam.
          </p>
        ),
      },
      {
        id: "your-rights",
        title: "Hak anda",
        body: (
          <p>
            Di bawah Akta Perlindungan Data Peribadi 2010, anda boleh meminta untuk mengakses,
            membetulkan atau memadam data peribadi yang kami simpan tentang anda, atau menarik balik
            persetujuan untuk mesej pemasaran. Hantar mesej kepada kami di WhatsApp{" "}
            {WHATSAPP_DISPLAY} dan kami akan membalas dengan segera.
          </p>
        ),
      },
      {
        id: "changes",
        title: "Perubahan pada dasar ini",
        body: <p>Kami mungkin mengemas kini dasar ini dari semasa ke semasa. Tarikh di bahagian atas menunjukkan bila ia terakhir diubah.</p>,
      },
    ],
  },
};

export async function generateMetadata({ params }: LocaleParams) {
  const t = await initLocale(params);
  const c = CONTENT[t.locale];
  return pageMetadata({ title: c.name, description: c.description, path: "/privacy-policy", locale: t.locale });
}

export default async function PrivacyPolicyPage({ params }: LocaleParams) {
  const t = await initLocale(params);
  const c = CONTENT[t.locale];
  return (
    <LegalPage
      path="/privacy-policy"
      name={c.name}
      eyebrow={c.eyebrow}
      title={rich(c.title)}
      description={c.description}
      updated={UPDATED}
      sections={c.sections}
    />
  );
}
