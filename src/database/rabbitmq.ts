import amqp from "amqplib";

let channel: amqp.Channel;

export async function conectarRabbitMQ(): Promise<void> {
  const uri = process.env.RABBITMQ_URI as string;

  const connection = await amqp.connect(uri);

  channel = await connection.createChannel();

  await channel.assertQueue("relatorios", { durable: true });

  console.log("Conectado ao RabbitMQ!");
}

export function getChannel(): amqp.Channel {
  if (!channel) {
    throw new Error("Fila não conectada. Chame conectarRabbitMQ() primeiro.");
  }
  return channel;
}
