import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { v4 as uuid } from "uuid";
import * as AWS from "aws-sdk";
import Blog from "./interface";

const dynamoDB = process.env.IS_OFFLINE
  ? new AWS.DynamoDB.DocumentClient({
      region: "localhost",
      endpoint: process.env.DYNAMODB_ENDPOINT,
    })
  : new AWS.DynamoDB.DocumentClient();
console.log(dynamoDB)
@Injectable()
export class AppService {
  async getBlogs(): Promise<any> {
    try {
      return dynamoDB
        .scan({
          TableName: "BlogsTable",
        })
        .promise();
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async createBlog(blog: Blog): Promise<any> {
    const blogObj = {
      id: uuid(),
      ...blog,
    };
    try {
      return await dynamoDB
        .put({
          TableName: "BlogsTable",
          Item: blogObj,
        })
        .promise();
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async getBlog(id: string): Promise<any> {
    try {
      return await dynamoDB
        .get({
          TableName: process.env.USERS_TABLE_NAME,
          Key: { id },
        })
        .promise();
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async deleteBlog(id: string): Promise<any> {
    try {
      return await dynamoDB
        .delete({
          TableName: "BlogsTable",
          Key: {
            todosId: id,
          },
        })
        .promise();
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
