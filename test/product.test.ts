import request from "supertest";
import {StatusCodes} from "http-status-codes";
import app from "../app/app";
import {PRODUCT_URL} from "../app/shared.url";

describe('Products', () => {
  it('gets all products', async () => {
    const { body, status } = await request(app).get(
        `${PRODUCT_URL}`,
    );
    expect(status).toEqual(StatusCodes.OK);
    expect(body).toHaveProperty('data');
    expect(body.data).toHaveProperty('products');
    expect(body).toHaveProperty('message');
    expect(body.status).toEqual(true);
  });
});
