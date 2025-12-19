import { COLORS } from 'color-my-json';
import os from 'os';
import { buildApp } from './app';
import { ConfigKeys } from './configurations';

async function startServer() {
  const app = await buildApp({
    ajv: {
      customOptions: {
        removeAdditional: false, // <--- defaults to `true`. true remove additional keys added to object, thus refraining from throwing an error. Setting this to `false` makes validation fail & throw instead.
      },
    },
  });

  try {
    await app.listen({ port: 8000 });

    const PORT = app.configService.get<number>(ConfigKeys.Port);

    console.log(`${COLORS.green}${os.EOL}✨ Server is running on port ${PORT} 🚀${os.EOL}${COLORS.stop}`);
    console.log(`${COLORS.green}Open in browser: ${COLORS.blue}http://localhost:${PORT}${COLORS.stop}`);
  } catch (error: any) {
    app.logger.error(error.message, { error });
    process.exit(1);
  }
}

startServer();

process.on('unhandledRejection', (err) => {
  console.error('unhandledRejection', { err });
  console.error('Should not get here!  You are missing a try/catch somewhere.');
});

process.on('uncaughtException', (err) => {
  console.error('uncaughtException', { err });
  console.error('Should not get here! You are missing a try/catch somewhere.');
});
