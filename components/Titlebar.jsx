import Head from "next/dist/shared/lib/head";

const WhatsappIcon = "/whatsapp-icon.svg";

const Titlebar = ({ title, favicon = WhatsappIcon }) => {
   return (
      <Head>
         <title>{title}</title>
         <link rel="icon" href={favicon} />
      </Head>
   );
};

export default Titlebar;
