import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { v4 as uuidv4 } from 'uuid';

var dynamodb = new DynamoDBClient({ region: "sa-east-1" });

const params = [
  {
    TableName: "Envio",
    Item: {
      id: { S: uuidv4().toString() },
      fechaAlta: { S: new Date().toISOString() },
      destino: { S: "Mendoza" },
      email: { S: "johndoe@example.com" }
    } as { [key: string]: any; }
  },
  {
    TableName: "Envio",
    Item: {
      id: { S: uuidv4().toString() },
      fechaAlta: { S: new Date().toISOString() },
      destino: { S: "Cordoba" },
      email: { S: "janedoe@example.com" },
      pendiente: { S: "si" }
    } as { [key: string]: any; },
  }
];

const run = () => {
  params.forEach(async i => {
    try {
      await dynamodb.send(new PutItemCommand(i));
      console.log("item added: " + JSON.stringify(i.Item));
    } catch (err) {
      console.error("item cannot be added: " + JSON.stringify(i.Item));
    }
  });
};

run();
