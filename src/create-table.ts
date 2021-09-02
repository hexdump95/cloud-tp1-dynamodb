import { CreateTableCommand, DynamoDBClient } from '@aws-sdk/client-dynamodb';

var dynamodb = new DynamoDBClient({ region: "sa-east-1" });

var params = {
  TableName: "Envio",
  KeySchema: [
    { AttributeName: "id", KeyType: "HASH" },
    { AttributeName: "fechaAlta", KeyType: "RANGE" }
  ],
  AttributeDefinitions: [
    { AttributeName: "id", AttributeType: "S" },
    { AttributeName: "fechaAlta", AttributeType: "S" }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 2,
    WriteCapacityUnits: 2
  }
};

const createTable = async () => {
  try {
    const data = await dynamodb.send(new CreateTableCommand(params));
    console.log(JSON.stringify(data, null, "  "));
  } catch (err) {
    console.error(JSON.stringify(err, null, "  "));
  }
};
createTable();
