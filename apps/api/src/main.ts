import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import helmet from "helmet";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.enableCors({
    origin: [
      process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
      "http://localhost:3000",
    ],
    credentials: true,
  });
  app.setGlobalPrefix("api");
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  const port = process.env.API_PORT || 4000;
  await app.listen(port);
  console.log(`MBD Solutions API running on http://localhost:${port}/api`);
}

bootstrap();
