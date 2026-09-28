import LegalPage from "@/components/LegalPage";
import { pageMetadata } from "@/lib/seo";
import { BRAND_NAME, COMPANY_NO, WHATSAPP_DISPLAY } from "@/lib/site";

const DESCRIPTION = `How ${BRAND_NAME} collects, uses and protects your personal data when you browse our site and order on WhatsApp, in line with Malaysia's Personal Data Protection Act 2010.`;

export const metadata = pageMetadata({ title: "Privacy Policy", description: DESCRIPTION, path: "/privacy-policy" });

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      path="/privacy-policy"
      name="Privacy Policy"
      eyebrow="Your data"
      title={<>Privacy <em className="text-primary">Policy</em></>}
      description={DESCRIPTION}
      updated="2026-09-28"
      sections={[
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
                Your cart and the details you enter at checkout are saved in your browser’s local
                storage, on your own device, so they are still there when you come back. This data
                is not sent to our servers.
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
      ]}
    />
  );
}
