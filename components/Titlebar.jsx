import Head from "next/dist/shared/lib/head";

const WhatsappIcon = "/favicon.svg";

const Titlebar = ({ title, favicon = WhatsappIcon }) => {
   return (
      <Head>
         <title>{title}</title>
         <meta
            name="description"
            content="Particle-Chat is a free app that works with you email."
         />
         <link rel="icon" href={favicon} />
      </Head>
   );
};

export default Titlebar;
