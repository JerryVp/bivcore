import { CollectionAggregationOptions, ObjectID } from 'mongodb';
import { StorageService } from '../services/storage';
import { BaseModel } from './base';

export interface IFaucet {
  _id?: ObjectID;
  txid: string;
  address: string;
  ip: string;
  chain: string;
  network: string;
  time: Date;
  value: string;
  fee?: number | undefined;
  blockHeight?: number | undefined;
  confirmations?: number | undefined;
}

export class FaucetModel extends BaseModel<IFaucet> {
  constructor(storage?: StorageService) {
    super('faucet', storage);
  }
  allowedPaging = [];

  onConnect() {}

  async getHistory(params: { query: any }, options: CollectionAggregationOptions = {}) {
    let { query } = params;

    const result = await this.collection.aggregate<{ txid: string; address: string }>([{ $match: query }], options);

    return result;
  }

  async addFaucetRecord(params: {
    chain: string;
    network: string;
    txid: string;
    address: string;
    ip: string;
    value: string;
  }) {
    const { chain, network, txid, address, ip, value } = params;
    const time = new Date(Date.now());
    return this.collection.insertOne({ txid, chain, network, address, ip, time, value });
  }
}

export let FaucetStorage = new FaucetModel();
