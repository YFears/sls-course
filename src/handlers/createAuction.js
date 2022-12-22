import { v4 } from 'uuid';
import AWS from 'aws-sdk';


const dynamoDB = new AWS.DynamoDB.DocumentClient();

async function createAuction (event, context) {
    const { title } = JSON.parse(event.body);
    const now = new Date();
    const auction = {
        id: v4(),
        title,
        status: 'OPEN',
        createdAt: now.toISOString()
    };

    await dynamoDB.put({
        TableName: 'auctionsTable',
        Item: auction
    }).promise();

    return {
        statusCode: 201,
        body: JSON.stringify(auction)
    };
}

export const handler = createAuction;


