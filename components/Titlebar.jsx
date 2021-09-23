import Head from "next/dist/shared/lib/head";

const Titlebar = ({ title, favicon = "/favicon.svg" }) => {
   return (
      <Head>
         <title>{title}</title>
         <meta
            name="description"
            content="Particle-Chat is a free chat app that works with you gmail account."
         />
         <meta
            name="keywords"
            content="Chat-APP, Free-chat-app, app, chat, nextjs-app, nextjs, react"
         />
         <meta name="author" content="Xparticle.in" />
         <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
         />

         <meta name="application-name" content="Particle-Chat" />
         <link rel="icon" href={favicon} />
      </Head>
   );
};

export default Titlebar;
